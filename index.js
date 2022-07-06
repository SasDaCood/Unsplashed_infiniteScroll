// THINGS TO ADD: blurhash, use jquery whenever possible

const imgContainer = document.getElementById("image-container"); //$("#image-container");
const loader = document.getElementById("mainloader"); // $("#mainloader");

const accessToken = "qc7VUAhvf6sNW26lPOCPA1Ps93j0edCdLRiUK9dBT9A";
const count = 3;
const url = `https://api.unsplash.com/photos/random?client_id=${accessToken}&count=${count}`

let loadedImgs = 0;
let currentTotalImgs = 0;

function newImgLoaded() {
    loadedImgs++;
    console.log(loadedImgs, currentTotalImgs)
    if (loadedImgs === currentTotalImgs) {
        loader.hidden = true;
        console.log("hidden");
    }
}

function setAllAttrs(element, attrs) {
    for (const key in attrs) {
        element.setAttribute(key, attrs[key]);
        // change this to jquery!
    }
}

async function getPics() {
    const response = await fetch(url);
    let picsArr = await response.json();
    // let picsArr = fetch(url).then(response => response.json());
    console.log(picsArr);
    displayPics(picsArr);
}

function displayPics(picsArr) {
    loadedImgs = 0;
    currentTotalImgs = picsArr.length;
    picsArr.forEach(element => {
        const img = document.createElement("img");
        setAllAttrs(img, {
            src: element.urls.regular,
            title: element.alt_description,
        });
        img.addEventListener("load", newImgLoaded);

        const link = document.createElement("a");
        setAllAttrs(link, {
            href: element.links.html,
            target: "_blank",
        });
        link.appendChild(img);
        imgContainer.appendChild(link);
    });
}

window.addEventListener("scroll", () => {
    // copied this condition coz i aint working out the specifics bruh
    if ((window.innerHeight + window.scrollY > document.body.offsetHeight - 1000) && loader.hidden) {
        loader.hidden = false;
        getPics();
    }
});

$(document).ready(() => {
    getPics();
})