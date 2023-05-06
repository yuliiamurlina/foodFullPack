document.addEventListener("DOMContentLoaded", () => {
  //TABS
  const tabHeaders = document.querySelectorAll(".tabheader__item"),
    tabHeaderParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabcontent");

  function hideTabs() {
    tabs.forEach((element) => {
      element.classList.remove("show", "fade");
      element.classList.add("hide");
    });

    tabHeaders.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  hideTabs();

  function showTabs(i = 0) {
    tabs[i].classList.remove("hide");
    tabs[i].classList.add("show", "fade");
    tabHeaders[i].classList.add("tabheader__item_active");
  }

  showTabs();

  tabHeaderParent.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      tabHeaders.forEach((item, i) => {
        if (item == event.target) {
          hideTabs();
          showTabs(i);
        }
      });
    }
  });

  //Timer

  const deadLine = new Date("2023-05-20");

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t > 0) {
      days = Math.floor(t / (24 * 60 * 60 * 1000));
      hours = Math.floor((t / (60 * 60 * 1000)) % 24);
      minutes = Math.floor((t / 60 / 1000) % 60);
      seconds = Math.floor((t / 1000) % 60);
    } else {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadLine);

  //modal

  const modalButtons = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalTimer = setInterval(openModal, 10000);

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (event) => {
    if (
      event.target == modal ||
      event.target.getAttribute("data-close") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
    window.removeEventListener("scroll", openModalByScroll);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show", "fade");
    document.body.style.overflow = "";
  }

  function openModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 20
    ) {
      openModal();
      window.removeEventListener("scroll", openModalByScroll);
    }
  }

  window.addEventListener("scroll", openModalByScroll);

  //cards

  const menuItems = document.querySelectorAll(".menu__item");
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 27;
      this.parent = document.querySelector(parentSelector);
      this.changeToUAN();
    }

    changeToUAN() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length < 1) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => {
          element.classList.add(className);
        });
      }

      element.innerHTML = `
          <img src="${this.src}" alt="${this.alt}">
          <h3 class="menu__item-subtitle">${this.title}"</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;
      this.parent.append(element);
    }
  }

  const getResourse = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Получение данные не произошло. Could not fetch ${url}, status: ${res.status}`
      );
    }

    return await res.json();
  };

  // getResourse("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) =>
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    })
  );

  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   ".menu .container",
  //   "menu__item"
  // ).render();

  //forms

  const forms = document.querySelectorAll("form"),
    message = {
      success: "Спасибо, мы скоро с вами свяжемся",
      loading: "img/spinner.svg",
      fail: "Произошла ошибка",
    };

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      //настройка сообщения об успешной отправке данных формы

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      form.insertAdjacentElement("afterend", statusMessage);

      const allMessages = form.querySelectorAll(".status");

      if (allMessages.length > 1) {
        allMessages.forEach((i) => {
          if (i == allMessages[allMessages.length - 1]) {
          } else {
            i.remove();
          }
        });
      }

      //Создание запроса на сервер

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.fail);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.remove("show");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close="" class="modal__close">×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      // prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 2000);
  }

  fetch(" http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));

  //slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current");

  let slideIndex = 1;
  showSlide(slideIndex);

  if (slides.length > 9) {
    total.textContent = slides.length;
  } else {
    total.textContent = "0" + slides.length;
  }

  prev.addEventListener("click", () => {
    plusSlides(-1);
  });

  next.addEventListener("click", () => {
    plusSlides(1);
  });

  function showSlide(index) {
    if (index > slides.length) {
      slideIndex = 1;
    }

    if (index < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((slide) => {
      slide.classList.add("hide");
      slide.classList.remove("show");
    });

    slides[slideIndex - 1].classList.add("show");
    slides[slideIndex - 1].classList.remove("hide");

    if (slides.length > 9) {
      current.textContent = slideIndex;
    } else {
      current.textContent = "0" + slideIndex;
    }
  }

  function plusSlides(n) {
    showSlide((slideIndex += n));
  }
  // function slideCount(func) {
  //   totalSlideCounter.textContent = `${
  //     slideTotal > 9 ? slideTotal : "0" + slideTotal
  //   }`;
  //   currentSlideCounter.textContent = `${func > 9 ? func : "0" + func}`;
  // }
});
