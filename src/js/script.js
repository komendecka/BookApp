/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

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

function render () {
  for ( let book of dataSource.books) {
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
    bookContainer.appendChild(generateDOM);  }

}

render();
