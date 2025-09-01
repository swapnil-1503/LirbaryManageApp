require("dotenv").config();
console.log("✅ .env loaded. EMAIL_USER =", process.env.EMAIL_USER);

const { sendEmail } = require("./src/utils/emailService");

(async () => {
  console.log("🚀 Starting email test...");

  try {
    await sendEmail(
      "careermitra2k25@gmail.com",  // send to your Gmail
      "Test Email from Library System",
      "Hello Swapnil! 👋 This is a test email to check if nodemailer works."
    );
  } catch (err) {
    console.error("❌ Error inside test script:", err);
  }

  console.log("🏁 Test finished.");
})();
