// hamburgerMenu

let menu = document.querySelector(".toggle-menu");
let menuList = document.querySelector(".toggle-menu + ul");

menu.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("open");
});

document.addEventListener("click", () => {
    menu.classList.remove("open");
});

// Shuffle Images

let shuffleOptions = document.querySelectorAll(".shuffle li");

shuffleOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
        shuffleOptions.forEach((option) => option.classList.remove("active"));
        this.classList.add("active");
    });
    option.addEventListener("click", manageImages);
});

// Manage Images

function manageImages() {
    let imgs = document.querySelectorAll(".img-container img");
    imgs.forEach((img) => (img.parentElement.style.display = "none"));
    document.querySelectorAll(this.dataset.group).forEach((img) => {
        img.parentElement.style.display = "block";
    });
}

// more images
let moreBtn = document.querySelector(".show");
let imagesHolder = document.querySelector(".img-container");
let images = [];

// Fetch images from JSON
async function getImages() {
    try {
        let response = await fetch("JS/images.json");
        if (!response.ok) throw new Error("Data Was Not Successfully Loaded");
        images = await response.json();
        console.log(images);
    } catch (error) {
        console.log(error);
    }
}

getImages();

// Show all images on button click
moreBtn.addEventListener("click", () => {
    loadMore(images);
    moreBtn.style.display = "none"; // hide button after click
});

function loadMore(images) {
    images.forEach((image) => {
        let imageStructure = document.createElement("div");
        imageStructure.classList.add("box"); // cleaner than setAttribute
        imageStructure.innerHTML = `
            <img class="all ${image.category}" src="${image.src}" alt="${
            image.alt
        }">
            <div class="caption">
                <h4>Awesome Image</h4>
                <p>${
                    image.category.charAt(0).toUpperCase() +
                    image.category.slice(1)
                }</p>
            </div>
        `;
        imagesHolder.appendChild(imageStructure);
    });
}
/*
Relative paths in fetch() are relative to the HTML file, not the JS file.
So even if main.js and images.json are in the same folder, the browser looks at the location of the HTML file to resolve "./images.json".
*/
