const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "FZTyytj4nLImiER_Stv2vhL_5HWIZX7SurRyrs_1M78";
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// func to check all imgloaded
function imageLoaded() {
  // console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log("ready = ", ready);
  }
}

// Heleper function for Set Attirbutes on DOM ELEMENTS
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create a to link to unsplashed
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create img for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check
    img.addEventListener("load", imageLoaded);
    //put img inside a, then both inside imageContainer

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(unsplashUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch error here
    console.log(error);
  }
}
// Check to see if scrolling near bottom of page, Load More photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
    ready
  ) {
    // console.log("load more");

    ready = false;
    getPhotos();
  }
});

// ON load
getPhotos();
