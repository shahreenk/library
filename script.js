// import { myLibrary } from './data.js';

const myLibrary = [];
const table = document.querySelector('table');
const tableBody = document.querySelector('tbody');
const newBookBtn = document.querySelector('#new-book-btn');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');

document.addEventListener('click', function(e){
    if(e.target.dataset.remove) {
        removeBook(e.target.dataset.remove)
    }
    else if(e.target.dataset.status) {
        changeStatus(e.target.dataset.status)
    }
})

newBookBtn.addEventListener('click', function() {
    overlay.classList.add('show-form');
})

form.addEventListener('submit', function(e) {
    e.preventDefault();
    overlay.classList.remove('show-form');
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const status = formData.get('status');
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
    renderTable();
    form.reset();
})


function renderTable() {
    if (!table.classList.contains('show-table')) {
        table.classList.add('show-table');
    }
    tableBody.innerHTML = ``;
    if (myLibrary.length === 0)  {
        table.classList.remove('show-table');
        return;
    }
    let statusBtnState;
    myLibrary.forEach((book, index) => {
        if (book.status === 'Read') {
            statusBtnState = 'read';
        }
        else {
            statusBtnState = 'unread'
        }
        tableBody.innerHTML +=
            `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td class="center">${book.pages}</td>
                <td class="center"><button class="${statusBtnState}" data-status="${index}">${book.status}</button></td>
                <td class="center"><button class="remove" data-remove="${index}">Remove</button></td>
            </tr>
            ` 
    })
}

function changeStatus(bookIndex) {
    if (myLibrary[bookIndex].status === 'Read') {
        myLibrary[bookIndex].status = 'Unread'
    }
    else {
        myLibrary[bookIndex].status = 'Read';
    }
    renderTable();
}

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    renderTable();
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

