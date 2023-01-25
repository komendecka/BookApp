/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';


  const select = {
    containerOf: {
      booksList: '.books-list',
      image: '.book__image',
      filters: '.filters',
    },
    templatesOf: {
      booksTemplate: '#template-book',
    },
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templatesOf.booksTemplate).innerHTML),
  };


  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements() {
      const thisBooksList = this;
      thisBooksList.bookContainer = document.querySelector(select.containerOf.booksList);

    }

    render() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratioForCalcRatingWidth = 10;
        const ratingWidth = ratioForCalcRatingWidth * book.rating;
        const generateHTML = templates.booksTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          details: book.details,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });

        const generateDOM = utils.createDOMFromHTML(generateHTML);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        bookContainer.appendChild(generateDOM);
      }

    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.bookContainer.addEventListener('dblclick',
        function (event) {
          event.preventDefault();
          const image = event.target.offsetParent;
          const bookId = image.getAttribute('data-id');
          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            image.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(indexOfBook, 1);
            image.classList.remove('favorite');
          }


        });


      const filteredBooks = document.querySelector(select.containerOf.filters);
      filteredBooks.addEventListener('click', function (callback) {
        const clickedElement = callback.target;
        if (clickedElement.tagName == 'INPUT' &&
                    clickedElement.type == 'checkbox' &&
                    clickedElement.name == 'filter') {
          if (clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const indexOfFilter = thisBooksList.filters.indexOf(clickedElement.value);
            thisBooksList.filters.splice(indexOfFilter, 1);
          }
        }
        thisBooksList.filterBooks();
      });

    }


    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        let filterHidden = document.querySelector(select.containerOf.image + '[data-id="' + book.id + '"]');
        filterHidden.classList.remove('hidden');
        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            filterHidden.classList.add('hidden');
            break;
          }

        }

      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    }

  }

  new BooksList();


}