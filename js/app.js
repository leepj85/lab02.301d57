'use strict'

// CONSTRUCTOR for images and adds it to the array of images.
function Image(img) {
  this.url = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}

Image.allImages = [];


// jQuery GETTER for .json  
Image.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(img => {
        Image.allImages.push(new Image(img));
      });
      Image.allImages.forEach(img => {
        img.render();
        img.dropdownBuilder();
      })
    })
};

// Renders the images to the screen
Image.prototype.render = function() {
  // New image section using jQuery 
  const $source = $('#handlebars-template').html();
  const template = Handlebars.compile($source);
  const newHtml = template(this);
  $('main').append(newHtml);

}

// Populates the dropdown selector
Image.prototype.dropdownBuilder = function() {
  const $dropdown = $('#dropdown');

  // Code cited at bottom.
  if ($(`#dropdown option[value='${this.keyword}']`).length <= 0) {
    $dropdown.append($('<option />').val(this.keyword).text(this.keyword));
  }
};

// Dropdown click handler that manages filtering.
$("#dropdown").on('change', function() { 
  $('section').hide();
  if (this.value === 'default') {
    $('section').show();
    $('#photo-template').hide();
  }
  $(`.${this.value}`).show();
});

Image.readJson();


// Works Cited:

// https://stackoverflow.com/questions/646317/how-can-i-check-whether-a-option-already-exist-in-select-by-jquery
