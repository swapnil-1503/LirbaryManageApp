import React from "react";

const BookTable = () => {
  const books = [
    { id: 1, title: "Book A", author: "Author A", category: "Fiction" },
    { id: 2, title: "Book B", author: "Author B", category: "Science" }
  ];

  return (
    <div>
      <h3>Books</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td><td>{book.title}</td><td>{book.author}</td><td>{book.category}</td>
              <td>
                <button>Edit</button> <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
