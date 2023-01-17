/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';


  const select = {
    containerOf: {
      booksList: '.books-list',
      image: '.book__image',
    },
    templatesOf: {
      booksTemplate: '#template-book',
    },
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templatesOf.booksTemplate).innerHTML),
  };

  function render() {
    for (let book of dataSource.books) {
      const generateHTML = templates.booksTemplate({
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
        details: book.details,
      });
      const generateDOM = utils.createDOMFromHTML(generateHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(generateDOM);
    }

  }

  render();
  
  const favoriteBooks = [];
  
  function initActions() {
    const booksImage = document.querySelectorAll(select.containerOf.image);
    // let node = document.getElementById("myDIV").offsetParent;
    //   console.log('node:', node);
    for (let image of booksImage) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (image.classList.contains('favorite')) {
          console.log ('class:', image.classList.value);
          image.classList.remove('favorite');
          const bookID = image.getAttribute('data-id');
          const indexOfBook = favoriteBooks.indexOf(bookID);
          favoriteBooks.splice(indexOfBook, 1);
        } else {
          image.classList.add('favorite');
          const bookId = image.getAttribute('data-id');
          favoriteBooks.push(bookId);
        }
        console.log('favorite books:', favoriteBooks);
      });
    }
  }
  
  initActions(); 
    
}