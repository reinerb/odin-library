// Initial variables
let myLibrary = [];
const libraryDisplay = document.querySelector(".library-grid");
const newBook = document.querySelector("#new-book");
const bookForm = document.querySelector("#book-form");
const bookFormSubmit = bookForm.querySelector("#form-submit");

// Clears a given div of all elements
const clearDisplay = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// Define a book object
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

// Book prototype functions

// Mark this book as read
Book.prototype.toggleRead = function () {
  this.isRead = this.isRead ? false : true;
};

// Generate a new book from form values
const bookFromForm = function () {
  let book = new Book(
    bookForm.querySelector("#new-title").value,
    bookForm.querySelector("#new-author").value,
    bookForm.querySelector("#new-page-count").value
  );
  return book;
};

// Clears the form to add a book
const clearNewBookForm = function () {
  bookForm.querySelector("#new-title").value = "";
  bookForm.querySelector("#new-author").value = "";
  bookForm.querySelector("#new-page-count").value = "";
};

// Add a Book object to library
function addBookToLibrary(library, book) {
  library.push(book);
  displayBooks(myLibrary, libraryDisplay);
}

// Remove the book at the given index from the library
function removeBookFromLibrary(library, index) {
  library.splice(index, 1);
  displayBooks(library, libraryDisplay);
}

// Toggles the book at the given index as read
function toggleLibraryBookRead(library, index) {
  library[index].toggleRead();
  displayBooks(library, libraryDisplay);
}

// Display a book inside of the given div
const displayBook = function (book, div, libraryIndex) {
  // Create the card
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book-card");

  // Display book info
  let title = document.createElement("h2");
  title.textContent = `${book.title}`;

  let author = document.createElement("h3");
  author.textContent = `by ${book.author}`;

  let pageCount = document.createElement("p");
  pageCount.textContent = `${book.pages} pages`;

  let isRead = document.createElement("p");
  isRead.textContent = book.isRead ? "Read" : "Not read";

  // Create buttons
  let bookButtons = document.createElement("div");
  bookButtons.classList.add("book-buttons");
  bookButtons.setAttribute("data-index", libraryIndex);

  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.setAttribute(
    "onclick",
    "removeBookFromLibrary(myLibrary, this.parentNode.getAttribute('data-index'))"
  );

  let readButton = document.createElement("button");
  readButton.textContent = book.isRead ? "Mark not read" : "Mark read";
  readButton.setAttribute(
    "onclick",
    "toggleLibraryBookRead(myLibrary, this.parentNode.getAttribute('data-index'))"
  );

  bookButtons.appendChild(readButton);
  bookButtons.appendChild(removeButton);

  // Add all above elements
  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(pageCount);
  bookDiv.appendChild(isRead);
  bookDiv.appendChild(bookButtons);
  div.appendChild(bookDiv);
};

// Display the full library
const displayBooks = function (library, div) {
  clearDisplay(div);
  for (let i = 0; i < library.length; i++) {
    displayBook(library[i], div, i);
  }
};

// Add event listeners to buttons
newBook.addEventListener("click", () => {
  bookForm.classList.toggle("inactive");
});

bookFormSubmit.addEventListener("click", () => {
  addBookToLibrary(myLibrary, bookFromForm());
  bookForm.classList.add("inactive");
  clearNewBookForm();
});

// Make some sample books
let hitchhiker = new Book(
  "The Hitchhiker's Guide to the Galaxy",
  "Douglas Adams",
  193
);
let pandora = new Book("Pandora's Star", "Peter F. Hamilton", 768);
let kitchen = new Book("Kitchen Confidential", "Anthony Bourdain", 312);

addBookToLibrary(myLibrary, hitchhiker);
addBookToLibrary(myLibrary, pandora);
addBookToLibrary(myLibrary, kitchen);

displayBooks(myLibrary, libraryDisplay);
