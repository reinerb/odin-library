// Initial variables
let myLibrary = [];
const libraryDisplay = document.querySelector(".library-grid");
const newBook = document.querySelector("#new-book");
const bookForm = document.querySelector("#book-form");
const bookFormSubmit = bookForm.querySelector("#form-submit");

// Define a book object
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

//
function addBookToLibrary(library, book) {
  library.push(book);
}

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

const displayBook = function (book, div, index) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book-card");
  bookDiv.setAttribute("data-index", index);

  let title = document.createElement("h2");
  title.textContent = `${book.title}`;

  let author = document.createElement("h3");
  author.textContent = `by ${book.author}`;

  let pageCount = document.createElement("p");
  pageCount.textContent = `${book.pages} pages`;

  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(pageCount);
  div.appendChild(bookDiv);
};

const bookFromForm = function () {
  let book = new Book(
    bookForm.querySelector("#new-title").value,
    bookForm.querySelector("#new-author").value,
    bookForm.querySelector("#new-page-count").value
  );
  return book;
};

const displayBooks = function (library, div) {
  for (let i = 0; i < library.length; i++) {
    displayBook(library[i], div, i);
  }
};

const clearNewBookForm = function () {
  bookForm.querySelector("#new-title").value = "";
  bookForm.querySelector("#new-author").value = "";
  bookForm.querySelector("#new-page-count").value = "";
};

const clearDisplay = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

newBook.addEventListener("click", () => {
  bookForm.classList.toggle("inactive");
});
bookFormSubmit.addEventListener("click", () => {
  let bookToAdd = bookFromForm();
  addBookToLibrary(myLibrary, bookToAdd);
  bookForm.classList.add("inactive");
  clearDisplay(libraryDisplay);
  clearNewBookForm();
  displayBooks(myLibrary, libraryDisplay);
});
displayBooks(myLibrary, libraryDisplay);
