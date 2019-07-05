'use strict'

let page = {
  pageNumber: 1,
}

let pageView = function() {
  if (page.pageNumber === 1) {
    $('section').hide();
    $('.page-one-image').show();
    $('#dropdown').html('');
    Image.pageOneImages.forEach(img => {
      img.dropdownBuilder();
    })
  }
  if (page.pageNumber === 2) {
    $('section').hide();
    $('.page-two-image').show();
    $('#dropdown').html('');
    Image.pageTwoImages.forEach(img => {
      img.dropdownBuilder();
    })
  }
};

let toggleView = (number) => {
  page.pageNumber = number;
  pageView();
};

// CONSTRUCTOR for images and adds it to the array of images.
function Image(img) {
  this.url = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
  this.page = img.page;
}

Image.pageOneImages = [];
Image.pageTwoImages = [];

// jQuery GETTER for .json  
Image.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(img => {
        img.page = 'page-one-image'
        Image.pageOneImages.push(new Image(img));
      });
      Image.pageOneImages.sort((a,b)=> a.title.localeCompare(b.title));
      Image.pageOneImages.forEach(img => {
        img.render();
        pageView();
      })
    })
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(img => {
        img.page = 'page-two-image'
        Image.pageTwoImages.push(new Image(img));
      });
      Image.pageTwoImages.sort((a,b)=> a.title.localeCompare(b.title));
      Image.pageTwoImages.forEach(img => {
        img.render();
        pageView();
      })
    })
  
};

// Renders the images to the screen
Image.prototype.render = function () {
  // New image section using jQuery 
  const $source = $('#handlebars-template').html();
  const template = Handlebars.compile($source);
  const newHtml = template(this);
  $('main').append(newHtml);
}

// Populates the dropdown selector
Image.prototype.dropdownBuilder = function () {
  const $dropdown = $('#dropdown');
  // Code cited at bottom.
  if ($(`#dropdown option[value='${this.keyword}']`).length <= 0) {
    $dropdown.append($('<option />').val(this.keyword).text(this.keyword));
  }
  
};

// Dropdown click handler that manages filtering.
$("#dropdown").on('change', function () {
  $('section').hide();
  if (this.value === 'default') {
    $('section').show();
    $('#photo-template').hide();
  }
  
  $(`.${this.value}`).show();
});

function sortByAlpha(){
  $('main').html('');
  Image.pageOneImages.sort((a,b)=> a.title.localeCompare(b.title));
  Image.pageOneImages.forEach(img => {
    img.render();
  })
  Image.pageTwoImages.sort((a,b)=> a.title.localeCompare(b.title));
  Image.pageTwoImages.forEach(img => {
    img.render();
  })
  pageView();
}

function sortByHorns(){
  $('main').html('');
  Image.pageOneImages.sort((a,b)=> a.horns - b.horns);
  Image.pageOneImages.forEach(img => {
    img.render();
  })
  Image.pageTwoImages.sort((a,b)=> a.horns - b.horns);
  Image.pageTwoImages.forEach(img => {
    img.render();
  })
  pageView();
}


Image.readJson();


// Works Cited:

// https://stackoverflow.com/questions/646317/how-can-i-check-whether-a-option-already-exist-in-select-by-jquery
