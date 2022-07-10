main();

function main() {
  let inventory = [];
  addBook();
}

function addBook(inventory) {
  let addBookButton = document.querySelector(".options>button");
  addBookButton.addEventListener("click", () => {
    pauseBackground();
    newBook(inventory);
  });
}

function pauseBackground() {}

function newBook(inventory) {
    createForm();
}

//Constructor for the form inputs
function Input(bookId, inputLabelText, inputPlaceHolder, inputType)
{
    this.inputField = document.createElement('input');
    this.inputLabel = document.createElement('label');
    this.inputField.id = bookId;
    this.inputLabel.htmlFor = bookId;
    if(inputPlaceHolder != 'NA')
    {
      this.inputField.placeholder = inputPlaceHolder;
    }
    this.inputLabel.textContent = inputLabelText;
    this.inputField.type = inputType;
    if(inputType == 'number')
    {
      this.inputField.min = 0;
    }
}

function createForm()
{

    let form = document.createElement('form');
    form.classList.add('inputForm');

    //header element of form
    let header = document.createElement('h1');
    header.textContent = "Add New Book";

    //Book Title elements
    let bookTitle = new Input('bookTitle', 'Book Title:', '  Percy Jackson and the ...', 'text');
    let bookDiv = document.createElement('div');
    bookDiv.appendChild(bookTitle.inputLabel);
    bookDiv.appendChild(bookTitle.inputField);

    //Author elements
    let author = new Input('author', 'Author:', '  J.K. Rowling', 'text');
    let authorDiv = document.createElement('div');
    authorDiv.appendChild(author.inputLabel);
    authorDiv.appendChild(author.inputField);
    
    //Current page elements
    let currentPage = new Input('currentPage', 'Current Page: ', '  0', 'number');
    let currentPageDiv = document.createElement('div');
    currentPageDiv.appendChild(currentPage.inputLabel);
    currentPageDiv.appendChild(currentPage.inputField);

    //Total pages elements
    let totalNumPages = new Input('totalPages', 'Total Pages: ', '  989', 'number');
    let totalPagesDiv = document.createElement('div');
    totalPagesDiv.appendChild(totalNumPages.inputLabel);
    totalPagesDiv.appendChild(totalNumPages.inputField);
    
    //Color picker elements
    let colorPicker = new Input('cardColor', 'Card Color: ', 'NA', 'color')
    let colorPickerDiv = document.createElement('div');
    colorPickerDiv.classList.add("colorPicker");
    colorPickerDiv.appendChild(colorPicker.inputLabel);
    colorPickerDiv.appendChild(colorPicker.inputField);

    //Buttons elements
    let addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.value = 'Add';

    let discardButton = document.createElement('input');
    discardButton.type = 'button';
    discardButton.value = 'Discard';

    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(addButton);
    buttonsDiv.appendChild(discardButton);

    form.appendChild(header);
    form.appendChild(bookDiv);
    form.appendChild(authorDiv);
    form.appendChild(currentPageDiv);
    form.appendChild(totalPagesDiv);
    form.appendChild(colorPickerDiv);
    form.appendChild(buttonsDiv);

    let body = document.querySelector('body');

    let shadeScreen = document.createElement('div');
    shadeScreen.classList.add('darkenScreen');
  
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
