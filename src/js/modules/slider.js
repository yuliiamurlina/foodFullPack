function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slider = document.querySelector(container),
    slidesWrapper = slider.querySelector(wrapper),
    slidesField = slidesWrapper.querySelector(field),
    slides = slidesField.querySelectorAll(slide),
    prev = slider.querySelector(prevArrow),
    next = slider.querySelector(nextArrow),
    total = slider.querySelector(totalCounter),
    current = slider.querySelector(currentCounter),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length > 9) {
    total.textContent = slides.length;
  } else {
    total.textContent = "0" + slides.length;
  }
  setCurrent();

  slidesField.style.cssText = `width: ${100 * slides.length}%;
    display: flex;
    transition: .5s all;`;

  slidesWrapper.style.overflow = "hidden";

  slider.style.position = "relative";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  //dots under slider

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset == countWithoutLetter(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += countWithoutLetter(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setCurrent();

    lightDot();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = countWithoutLetter(width) * (slides.length - 1);
    } else {
      offset -= countWithoutLetter(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    setCurrent();
    lightDot();
  });

  dots.forEach((dot) =>
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = countWithoutLetter(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      lightDot();
      setCurrent();
    })
  );

  function setCurrent() {
    if (slideIndex > 9) {
      current.textContent = slideIndex;
    } else {
      current.textContent = "0" + slideIndex;
    }
  }

  function lightDot() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function countWithoutLetter(str) {
    return +str.replace(/\D/g, "");
  }
}

export default slider;
