const imgContainer = $("#image-container");
const loader = $("#mainloader");

const TOKEN = "qc7VUAhvf6sNW26lPOCPA1Ps93j0edCdLRiUK9dBT9A";
const COUNT = 3;
const URL = "https://api.unsplash.com/photos/random"

let loadedImgs = 0;
let currentTotalImgs = 0;

function newImgLoaded() {
    loadedImgs++;
    
    if (loadedImgs === currentTotalImgs)
        loader.attr("hidden", true);
}

async function getPics() {
    $.getJSON(URL, {
        client_id: TOKEN,
        count: COUNT,
    }, data => displayPics(data));
}

function displayPics(picsArr) {
    loadedImgs = 0;
    currentTotalImgs = picsArr.length;

    picsArr.forEach(pic => {
        const img = $("<img>", {
            src: pic.urls.regular,
            title: pic.alt_description,
        });
        img.on("load", newImgLoaded);

        const link = $("<a>", {
            href: pic.links.html,
            target: "_blank",
        });

        link.append(img);
        imgContainer.append(link);
    });
}

$(window).scroll(() => {
    if ((window.innerHeight + window.scrollY > document.body.offsetHeight - window.innerHeight * 0.75) && loader.attr("hidden")) {
        loader.attr("hidden", false);
        getPics();
    }
});

$(document).ready(() => getPics());