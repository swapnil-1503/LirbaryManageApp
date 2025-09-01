const cron = require("node-cron");
const db = require("../config/db");

const { sendEmail } = require("./emailService");

// Run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Running reminder job...");

  try {
    const [rows] = await db.query(`
      SELECT 
        ib.id AS issue_id,
        s.email,
        b.title,
        ib.issue_date,
        ib.return_date,
        ib.status
      FROM issued_books ib
      JOIN students s ON ib.student_id = s.id
      JOIN books b ON ib.book_id = b.id
      WHERE ib.status = 'issued'
    `);

    const today = new Date();
    rows.forEach((row) => {
      const returnDate = new Date(row.return_date);
      const diffTime = returnDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 7) {
        // On issue day, send confirmation email
        sendEmail(
          row.email,
          "📚 Book Issued Successfully",
          `Dear Student,\n\nYou have issued "${row.title}".\nPlease return it within 7 days (by ${returnDate.toDateString()}).`
        );
      } else if (diffDays === 1) {
        // One day before due date
        sendEmail(
          row.email,
          "⏳ Book Return Reminder",
          `Dear Student,\n\nThis is a reminder that your book "${row.title}" is due tomorrow (${returnDate.toDateString()}).\nPlease return it on time to avoid penalties.`
        );
      }
    });
  } catch (err) {
    console.error("❌ Error in reminder job:", err);
  }
});
