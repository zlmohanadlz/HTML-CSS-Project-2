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
    option.addEventListener("click", function () {
        shuffleOptions.forEach((option) => option.classList.remove("active"));
        this.classList.add("active");
    });
    option.addEventListener("click", function () {
        manageImages(this.dataset.group);
    });
});

// Manage Images

function manageImages(dataset) {
    let imgs = document.querySelectorAll(".img-container img");
    imgs.forEach((img) => (img.parentElement.style.display = "none"));
    let selector = dataset || this.dataset.group;
    document.querySelectorAll(selector).forEach((img) => {
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
    } catch (error) {
        console.log(error);
    }
}

getImages();

// Show all images on button click
moreBtn.addEventListener("click", () => {
    loadMore(images);
    moreBtn.style.display = "none"; // hide button after click
    // shuffle these Added Images
    let chosenOption = document.querySelector(".shuffle .active").dataset.group;
    manageImages(chosenOption);
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

// Scroller On top

let scroller = document.querySelector(".scroller");

let width =
    (document.documentElement.clientHeight * 100) /
    document.documentElement.scrollHeight;

scroller.style.width = `${width}%`;

let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

window.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop;
    // console.log(scrollTop);
    let position = (scrollTop / height) * (100 - width);
    // console.log(position);
    scroller.style.left = `${position}%`;
});
/*
Has a width in percentage.
Slides smoothly from 0% to (100% - width)%.
*/

// Home Section Slide

let slides = document.querySelectorAll(".Landing");
let bullets = document.querySelectorAll(".bullets li");
let currentIndex = 0;

function showSlide(index) {
    // Reset All slides
    slides.forEach((slide) => slide.classList.remove("active"));
    bullets.forEach((bullet) => bullet.classList.remove("active"));
    // show current slide and bullet
    slides[index].classList.add("active");
    bullets[index].classList.add("active");
}

// click right arrow
document
    .querySelector(".change-background-right")
    .addEventListener("click", arrowRight);

function arrowRight() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// click left Arrow
document
    .querySelector(".change-background-left")
    .addEventListener("click", arrowLeft);

function arrowLeft() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// click left arrow or right on keyboard

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
        arrowLeft();
    } else if (e.key === "ArrowRight") {
        arrowRight();
    }
});

// bullets

bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

// Status Count Start

let statusSection = document.querySelector(".stats");
let countEl = document.querySelectorAll("div[data-counter]");
let started = false;

window.addEventListener("scroll", () => {
    if (window.scrollY >= statusSection.offsetTop - 400) {
        if (!started) {
            countEl.forEach((el) => counterAccelerator(el));
            started = true;
        }
    }
});

function counterAccelerator(el) {
    let limit = el.dataset.counter;
    let number = +el.textContent; // + will concat with text so we first convert to number
    let count = setInterval(() => {
        number++;
        el.textContent = number;
        if (el.textContent == limit) {
            clearInterval(count);
        }
    }, 5000 / limit);
}

// our skills Testimonials slide

let skillsSlides = document.querySelectorAll(".profiles");
let skillsBullets = document.querySelectorAll(".bullets-profiles li");

function showBullet(index) {
    // reset All Bullet and Slides
    skillsSlides.forEach((slide) => slide.classList.remove("active"));
    skillsBullets.forEach((bullet) => bullet.classList.remove("active"));
    // show the one with active class
    skillsBullets[index].classList.add("active");
    skillsSlides[index].classList.add("active");
}

skillsBullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        showBullet(index);
    });
});

// Skills progress
let progressSpans = document.querySelectorAll(".prog span[data-progress]");
let skillsSection = document.querySelector(".skills");
let started3 = false;

window.addEventListener("scroll", () => {
    if (window.scrollY >= skillsSection.offsetTop - 400) {
        if (!started3) {
            progressSpans.forEach((span) => counterAcceleratorWidth(span));
            started3 = true;
        }
    }
});

function counterAcceleratorWidth(el) {
    let limit = el.dataset.progress;
    let number = parseInt(el.style.width); // + will concat with text so we first convert to number
    let count = setInterval(() => {
        number++;
        el.style.width = `${number}%`;
        if (el.style.width == limit) {
            clearInterval(count);
        }
    }, 5000 / limit);
}

// Validating Email Input Field

let emailInput = document.querySelector(".Email");
let emailMessage = document.querySelector(".message input[type='email']");
let form = emailInput.parentElement;
let messageForm = emailMessage.parentElement;
let regex =
    /(?!.*\.\.)(?!\.)(?!.*\.$)([\w-+%.]+)@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)(\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*(\.[a-zA-Z]{2,63})$/i;

// console.log(regex.test("user@example.com")); // true

form.onsubmit = function (e) {
    e.preventDefault();
    if (regex.test(emailInput.value)) {
        form.submit();
    }
};

messageForm.onsubmit = function (e) {
    e.preventDefault();
    if (regex.test(emailMessage.value)) {
        form.submit();
    }
};
