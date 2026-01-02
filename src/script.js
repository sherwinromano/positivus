document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const sidebar = document.querySelector("aside");
  const overlay = document.querySelector("#overlay");
  const openBtn = document.querySelector("#open-sidebar-btn");
  const closeBtn = document.querySelector("#close-sidebar-btn");

  function openSidebar() {
    sidebar.classList.replace("-right-full", "right-0");
    overlay.classList.replace("invisible", "visible");
    overlay.classList.replace("opacity-0", "opacity-90");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.replace("right-0", "-right-full");
    overlay.classList.replace("visible", "invisible");
    overlay.classList.replace("opacity-90", "opacity-0");
    document.body.style.overflow = "";
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  openBtn.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});

document.querySelectorAll("details.accordion").forEach((details) => {
  const icon = details.querySelector("img");
  details.addEventListener("toggle", function () {
    if (details.open) {
      // ?? Close other accordions and reset their icons
      document.querySelectorAll("details.accordion").forEach((other) => {
        if (other !== details) {
          other.open = false;
          const otherIcon = other.querySelector("img");
          if (otherIcon) otherIcon.setAttribute("src", "./assets/plus.svg");
          // Remove background color from other accordions
          other.classList.remove("accordion-open");
        }
      });
      // ?? Set current icon to minus
      if (icon) icon.setAttribute("src", "./assets/minus.svg");
      // Add background color to the open accordion
      details.classList.add("accordion-open");
    } else {
      // ?? Set current icon to plus when closed
      if (icon) icon.setAttribute("src", "./assets/plus.svg");
      // Remove background color when closed
      details.classList.remove("accordion-open");
    }
  });
});

let slideIndex = 0;

const slider = document.getElementById("slider");
const slides = document.getElementsByClassName("mySlides");
const indicators = document.getElementById("indicators");

function slidesPerView() {
  return window.innerWidth >= 1024 ? 2 : 1;
}

function totalPages() {
  return Math.ceil(slides.length / slidesPerView());
}

function buildIndicators() {
  indicators.innerHTML = "";

  for (let i = 0; i < totalPages(); i++) {
    const img = document.createElement("img");
    img.className = "icon cursor-pointer";
    img.width = 14;
    img.height = 14;
    img.src =
      i === 0 ? "./assets/slide-active.svg" : "./assets/slide-inactive.svg";

    img.onclick = () => goToPage(i);
    indicators.appendChild(img);
  }
}

function updateIndicators(activePage) {
  [...indicators.children].forEach((icon, i) => {
    icon.src =
      i === activePage
        ? "./assets/slide-active.svg"
        : "./assets/slide-inactive.svg";
  });
}

function updateSlider() {
  const slideWidth = slides[0].offsetWidth;
  slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

  const activePage = Math.floor(slideIndex / slidesPerView());
  updateIndicators(activePage);
}

function plusSlides(n) {
  slideIndex += n;

  const maxIndex = slides.length - slidesPerView();
  if (slideIndex < 0) slideIndex = maxIndex;
  if (slideIndex > maxIndex) slideIndex = 0;

  updateSlider();
}

function goToPage(pageIndex) {
  slideIndex = pageIndex * slidesPerView();
  updateSlider();
}

window.addEventListener("resize", () => {
  slideIndex = Math.min(slideIndex, slides.length - slidesPerView());
  buildIndicators();
  updateSlider();
});

// Init
buildIndicators();
updateSlider();
