//constants
var LARGE_IMAGE_SELECTOR = '[data-image-role="target"]';
var LARGE_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

//helper functions
//grabs thumbnail image
function getThumbImg(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

//grabs thumbnail title
function getThumbTitle(thumbnail) {
    return thumbnail.getAttribute('data-image-title');
}

//updates info for large image helper function
function setLargeInfo(img, title) {
    var largeImage = document.querySelector(LARGE_IMAGE_SELECTOR);
    largeImage.setAttribute('src', img);

    var largeTitle = document.querySelector(LARGE_TITLE_SELECTOR);
    largeTitle.textContent = title;
}

//updates info for large image
function setLargeInfoFromThumb(thumbnail) {
  setLargeInfo(getThumbImg(thumbnail), getThumbTitle(thumbnail));
}

//turns thumbnail nodes into array
function getThumbnailsArray() {
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

//click thumbnail to show large image
function showLargeImageOnClick(thumbnail) {
    thumbnail.addEventListener('click', function(event) {
        event.preventDefault();
        setLargeInfoFromThumb(thumbnail);
    });
}


//main function
//for all thumbnails enable showLargeImageOnClick
function initializeEvents() {
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(showLargeImageOnClick);
}

initializeEvents();