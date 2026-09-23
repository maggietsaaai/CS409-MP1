/* Your JS here. */
console.log('Hello World!')



const navbar = document.querySelector("#navbar");
const navLinks = Array.from(navbar.querySelectorAll("a"));

const sections = navLinks.map(function (link) {
    return document.querySelector(link.hash);
});

function updateNavbarSize() {
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

// Navigation position indicator
function setActiveLink(activeIndex) {
    navLinks.forEach(function (link, index) {
        link.classList.toggle("active", index === activeIndex);
    });
}

function updatePositionIndicator() {
    const navbarBottom = navbar.getBoundingClientRect().bottom;

    const sectionScrollMargin =
        parseFloat(
            getComputedStyle(sections[0]).scrollMarginTop
        ) || 0;

    const triggerPosition =
        Math.max(navbarBottom, sectionScrollMargin) + 1;

    let activeIndex = 0;

    sections.forEach(function (section, index) {
        if (!section) {
            return;
        }

        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= triggerPosition) {
            activeIndex = index;
        }
    });

    const reachedBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

    if (reachedBottom) {
        activeIndex = navLinks.length - 1;
    }

    setActiveLink(activeIndex);
}

// Immediately underline a clicked navigation item
navLinks.forEach(function (link, index) {
    link.addEventListener("click", function () {
        setActiveLink(index);
    });
});

function handleScroll() {
    updateNavbarSize();
    updatePositionIndicator();
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", updatePositionIndicator);

handleScroll();

//modal
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");

document.querySelectorAll(".modal-trigger").forEach(trigger => {
    trigger.addEventListener("click", function () {
        const modalId = trigger.dataset.target;
        const modal = document.getElementById(modalId);

        modal.showModal();        
    });
});

document.querySelectorAll(".close-modal").forEach(closeButton => {
    closeButton.addEventListener("click", function () {
        const modal = closeButton.closest("dialog");
        modal.close();
    });
});

const slides = document.querySelectorAll(".slide");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

function showSlide() {
    slides.forEach((slide) => {
    // Remove active here
    slide.classList.remove("active");});

    // Add active to slides[currentIndex]
    slides[currentIndex].classList.add("active");
}

nextButton.addEventListener("click", function () {
    // Increase currentIndex
    // Return to 0 if it passes the last slide
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide();
});

previousButton.addEventListener("click", function () {
    // Decrease currentIndex
    // Move to the last slide if it becomes negative
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide();
});