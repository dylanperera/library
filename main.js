//Data Structures:

//1 object for the book type
//1 object for the library -> should contain the array, the methods to add, remove, etc., books
//1 object for the array to store the books
class Book {
  constructor(title, author, currentPage, totalPages, color) {
    this.title = title;
    this.author = author;
    this.currentPage = currentPage;
    this.totalNumPages = totalPages;
    this.color = color;
  }
}

class Library {
  constructor() {
    this.library = [];
  }

  //methods to edit the array
  addBook(newBook) {
    //check if book is present
    let bookNotPresent = this.library.find((currentBook) => {
      if (
        currentBook.title == newBook.title &&
        currentBook.author == newBook.author
      ) {
        return false;
      }
    });

    if (!bookNotPresent) {
      console.log("hello");
      let container = document.getElementById("container");

      let cardColor = document.createElement("div");
      cardColor.classList.add("card-Color");
      cardColor.style.backgroundColor = newBook.color;

      let cardContainer = document.createElement("div");
      cardContainer.classList.add("card-container");

      let bookTitle = document.createElement("div");
      bookTitle.classList.add("bookTitle");
      bookTitle.textContent = newBook.title;

      let author = document.createElement("div");
      author.classList.add("author");
      author.textContent = newBook.author;

      let pagesInfo = document.createElement("div");
      pagesInfo.classList.add("pagesInfo");

      //Add the current page context
      let currentPageLabel = document.createElement("label");
      currentPageLabel.htmlFor = "currentPage";
      currentPageLabel.textContent = "Current Page:";

      let currentPageInput = document.createElement("input");
      currentPageInput.id = "currentPage";
      currentPageInput.value = newBook.currentPage;

      //Add input to parent; label
      currentPageLabel.appendChild(currentPageInput);

      //Add the total pages context
      let totalPagesLabel = document.createElement("label");
      totalPagesLabel.htmlFor = "totalPages";
      totalPagesLabel.textContent = "Total Pages:";

      let totalPagesInput = document.createElement("input");
      totalPagesInput.id = "totalPages";
      totalPagesInput.value = newBook.totalNumPages;

      //Add input to parent; label
      totalPagesLabel.appendChild(totalPagesInput);

      //Add pages info to the parent element
      pagesInfo.appendChild(currentPageLabel);
      pagesInfo.appendChild(totalPagesLabel);

      //add a data attribute to element so we know which element it is in the array
      cardColor.dataset.position = this.library.length;

      //Set up and initiazlie remove button
      let removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        let positionToRemove = cardColor.dataset.position;

        //remove from the DOM
        let container = document.getElementById("container");

        let elementToRemove = document.querySelector(
          ".card-Color[data-position =" + CSS.escape(positionToRemove) + "]"
        );

        console.log(elementToRemove);

        container.removeChild(elementToRemove);

        //remove from array
        this.library.splice(positionToRemove, 1);

        //fix numbers of the rest of the elements
        this.library.forEach((currentBook) => {
          if (currentBook.dataset.position > positionToRemove) {
            currentBook.dataset.position -= 1;
          }
        });
      });

      //Append elements to cardContainer element
      cardContainer.appendChild(bookTitle);
      cardContainer.appendChild(author);
      cardContainer.appendChild(pagesInfo);
      cardContainer.appendChild(removeButton);

      cardColor.appendChild(cardContainer);

      //Add element to array
      this.library.push(cardColor);

      container.appendChild(cardColor);

      let form = document.querySelector("body>form");
      closeForm(form);
    }
  }
}

let inventory = new Library();

main();

function main() {
  addBookButton();
}

function addBookButton() {
  let addBookButton = document.querySelector(".options>button");
  addBookButton.addEventListener("click", () => {
    createForm();
  });
}

//Constructor for the form inputs
function Input(bookId, inputLabelText, inputPlaceHolder, inputType) {
  this.inputField = document.createElement("input");
  this.inputLabel = document.createElement("label");
  this.inputField.id = bookId;
  this.inputLabel.htmlFor = bookId;
  this.inputField.setAttribute("required", "true");
  this.inputField.addEventListener("click", () => {
    this.inputField.style.border = "none";
  });
  if (inputPlaceHolder != "NA") {
    this.inputField.placeholder = inputPlaceHolder;
  }
  this.inputLabel.textContent = inputLabelText;
  this.inputField.type = inputType;
  if (inputType == "number") {
    this.inputField.min = 0;
  }
}

function createForm() {
  let form = document.createElement("form");
  form.classList.add("inputForm");

  //header element of form
  let header = document.createElement("h1");
  header.textContent = "Add New Book";

  //Book Title elements
  let bookDiv = addBookTitleElement();

  //Author elements
  let authorDiv = addAuthorElement();

  //Current page elements
  let currentPageDiv = addCurrentPageElement();

  //Total pages elements
  let totalPagesDiv = addTotalPagesElement();

  //Color picker elements
  let colorPickerDiv = addColorPickerElement();

  //Buttons elements
  let divArray = [bookDiv, authorDiv, currentPageDiv, totalPagesDiv];
  let buttonsDiv = addButtons(form, divArray);

  appendChildrenToDoc(
    form,
    header,
    bookDiv,
    authorDiv,
    currentPageDiv,
    totalPagesDiv,
    colorPickerDiv,
    buttonsDiv
  );
}

function addBookTitleElement() {
  let bookTitle = new Input(
    "bookTitle",
    "Book Title:",
    "  Percy Jackson...",
    "text"
  );
  let bookDiv = document.createElement("div");
  bookDiv.appendChild(bookTitle.inputLabel);
  bookDiv.appendChild(bookTitle.inputField);
  return bookDiv;
}

function addAuthorElement() {
  let author = new Input("author", "Author:", "  J.K. Rowling", "text");
  let authorDiv = document.createElement("div");
  authorDiv.appendChild(author.inputLabel);
  authorDiv.appendChild(author.inputField);
  return authorDiv;
}

function addCurrentPageElement() {
  let currentPage = new Input(
    "currentPageForm",
    "Current Page: ",
    "  0",
    "number"
  );
  let currentPageDiv = document.createElement("div");
  currentPageDiv.appendChild(currentPage.inputLabel);
  currentPageDiv.appendChild(currentPage.inputField);
  return currentPageDiv;
}

function addTotalPagesElement() {
  let totalNumPages = new Input(
    "totalPagesForm",
    "Total Pages: ",
    "  989",
    "number"
  );

  let totalPagesDiv = document.createElement("div");
  totalPagesDiv.appendChild(totalNumPages.inputLabel);
  totalPagesDiv.appendChild(totalNumPages.inputField);
  return totalPagesDiv;
}

function addColorPickerElement() {
  let colorPicker = new Input("cardColor", "Card Color: ", "NA", "color");
  let colorPickerDiv = document.createElement("div");
  colorPickerDiv.classList.add("colorPicker");
  colorPickerDiv.appendChild(colorPicker.inputLabel);
  colorPickerDiv.appendChild(colorPicker.inputField);
  return colorPickerDiv;
}

function addButtons(form, divArray) {
  let addButton = document.createElement("input");
  addButton.type = "button";
  addButton.value = "Add";

  addButton.addEventListener("click", () => {
    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("author").value;
    let currentPage = document.getElementById("currentPageForm").value;
    let totalPages = document.getElementById("totalPagesForm").value;
    let color = document.getElementById("cardColor").value;
    if (
      title == "" ||
      author == "" ||
      currentPage == "" ||
      totalPages == "" ||
      color == ""
    ) {
      for (let i = 0; i < divArray.length; i++) {
        if (divArray[i].lastChild.value == "") {
          divArray[i].lastChild.style.border = "3px solid red";
        }
      }
    } else {
      let newBook = new Book(title, author, currentPage, totalPages, color);
      inventory.addBook(newBook);
    }
  });

  let discardButton = document.createElement("input");
  discardButton.type = "button";
  discardButton.value = "Discard";

  discardButton.addEventListener("click", () => {
    closeForm(form);
  });

  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(discardButton);
  return buttonsDiv;
}

function closeForm(form) {
  let body = document.querySelector("body");
  body.removeChild(form);
  let shadeScreen = document.getElementById("darkenScreen");
  body.removeChild(shadeScreen);
}

function appendChildrenToDoc(
  form,
  header,
  bookDiv,
  authorDiv,
  currentPageDiv,
  totalPagesDiv,
  colorPickerDiv,
  buttonsDiv
) {
  form.appendChild(header);
  form.appendChild(bookDiv);
  form.appendChild(authorDiv);
  form.appendChild(currentPageDiv);
  form.appendChild(totalPagesDiv);
  form.appendChild(colorPickerDiv);
  form.appendChild(buttonsDiv);

  let body = document.querySelector("body");

  let shadeScreen = document.createElement("div");
  shadeScreen.id = "darkenScreen";

  body.appendChild(shadeScreen);
  body.appendChild(form);
}

function mergeSort(inputArray) {
  let sortedArray;
  if (inputArray.length == 1) {
    sortedArray = inputArray;
  } else {
    let index = Math.floor((inputArray.length - 1) / 2);
    let lArray = mergeSort(inputArray.slice(0, index + 1));
    let rArray = mergeSort(inputArray.slice(index + 1, inputArray.length));
    sortedArray = merge(lArray, rArray);
  }
  return sortedArray;
}

function merge(lArray, rArray) {
  let sortedArray = [];
  console.log(lArray);
  console.log(rArray);
  lArray.push(Infinity);
  rArray.push(Infinity);
  let i = 0;
  let j = 0;
  for (let p = 0; p < lArray.length + rArray.length - 2; p++) {
    if (lArray[i] < rArray[j]) {
      sortedArray.push(lArray[i]);
      i++;
    } else {
      sortedArray.push(rArray[j]);
      j++;
    }
  }
  return sortedArray;
}
