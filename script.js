// The constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, No' pages: ${pages}. Read?:`;
  };
}

// Initialised variables.
const myLibrary = [];
const form = document.getElementById('bookForm');

// Display list of books in the library
function DisplayBooks(book, index) {
  const ul = document.getElementsByTagName('ul')[0];
  const li = document.createElement('li');
  ul.appendChild(li).innerHTML = `<li data-id="${index}"> ${book.info()} <button onclick="readToggle(this)">${book.read}</button> <button onclick="deleteBook(this)">Delete</button>`;
}

// Add book form submittion handler
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formValue = event.target.elements;

  const newBook = new Book(
    formValue.title.value,
    formValue.author.value,
    formValue.pages.value,
    formValue.read.value,
  );

  // Push Obj to library array.
  myLibrary.push(newBook);
  // Reset form fields
  form.reset();
  // Hide form
  form.style.display = 'none';
  // Update the list of books.
  DisplayBooks(newBook, myLibrary.length - 1);
});

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
  if (form.style.display === 'none') {
    form.style.display = 'flex';
  } else {
    form.style.display = 'none';
  }
});

// Delete book from library
function deleteBook(element) {
  const index = element.parentNode.getAttribute('data-id');
  myLibrary.splice(index, 1);
  element.parentNode.parentNode.remove();
}

// Toggle read status of a book
function readToggle(element) {
  const index = element.parentNode.getAttribute('data-id');
  // change read status on book
  const book = myLibrary[index];
  if (book.read === 'yes') {
    book.read = 'no';
  } else {
    book.read = 'yes';
  }
  // Change button text to match read.
  element.innerHTML = book.read;
}
