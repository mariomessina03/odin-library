// for the dialog element and NEWBOOK button

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("new-book");
const addButton = document.getElementById("add-new-book");
const closeButton = document.getElementById("close-new-book");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.show();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

addButton.addEventListener("submit", function () {
  event.preventDefault();
  addBookToLibrary();
});

// Form handling
const form = document.getElementById("book-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting
  addBookToLibrary();
  displayBook(); // Display updated library
  dialog.close(); // Close the dialog after adding the book
});

//ALTRO

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.sayInfo = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.read
    );
  };
}

Book.prototype.toggleRead = function () {
  this.read = this.read === "Read" ? "Not Read Yet" : "Read";
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayBook();
}

function addBookToLibrary() {
  // do stuff here
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBook();
}

// Manually adding books to display when landing the page for the first time

const theHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295",
  "Not Read Yet"
);

const tenderIsTheNight = new Book(
  "Tender is the Night",
  "F. Scott Fitzgerald",
  "320",
  "Not Read Yet"
);

const theOldManAndTheSea = new Book(
  "The Old Man and the Sea",
  "Ernest Hemingway",
  "52",
  "Read"
);

myLibrary.push(theHobbit);
myLibrary.push(tenderIsTheNight);
myLibrary.push(theOldManAndTheSea);

// creating divs to contain book info's

const container = document.querySelector(".container");

function displayBook() {
  container.replaceChildren();

  for (let book of myLibrary) {
    console.log(book.sayInfo());

    const newDiv = document.createElement("div");
    newDiv.className = "book-info-container";

    const titleP = document.createElement("p");
    titleP.textContent = `${book.title}`;
    newDiv.appendChild(titleP);

    const authorP = document.createElement("p");
    authorP.textContent = `${book.author}`;
    newDiv.appendChild(authorP);

    const pagesP = document.createElement("p");
    pagesP.textContent = `${book.pages}`;
    newDiv.appendChild(pagesP);

    const readP = document.createElement("button");
    readP.textContent = `${book.read}`;
    readP.addEventListener("click", () => {
      book.toggleRead();
      displayBook(); // Refresh the display to show updated read status
    });
    newDiv.appendChild(readP);

    const deleteBook = document.createElement("button");
    deleteBook.className = "delete-book";
    deleteBook.textContent = "Delete";

    deleteBook.addEventListener("click", () => {
      const index = myLibrary.indexOf(book);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        newDiv.remove();
      }
    });

    newDiv.appendChild(deleteBook);

    container.appendChild(newDiv);
  }
}

displayBook();
