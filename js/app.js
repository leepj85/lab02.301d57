'use strict'

//CONSTRUCTOR for images and adds it to the array of images.
function Image(img) {
  this.url = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}

Image.allImages = [];


//JQuery GETTER for .json  
Image.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(img => {
        Image.allImages.push(new Image(img));
      });
      Image.allImages.forEach(img => {
        img.render();
      })
    })
};


//render function
Image.prototype.render = function() {
  // New image section using JQuery 
  const $newImage = $('<section></section>');

  const imageTemplate = $('#photo-template').html();

  $newImage.html(imageTemplate);
  $newImage.find('h2').text(this.title);
  $newImage.find('img').attr('src', this.url);
  $newImage.find('p').text(this.description);

  $('main').append($newImage);

}

Image.readJson();
