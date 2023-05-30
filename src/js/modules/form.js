import { closeModal, openModal } from "./modale";
import { postData } from "../services/services";

function form(formSelector, modalTimerId) {
  //forms

  const forms = document.querySelectorAll(formSelector),
    message = {
      success: "Спасибо, мы скоро с вами свяжемся",
      loading: "img/spinner.svg",
      fail: "Произошла ошибка",
      error: "Проверьте введенные данные",
    };

  forms.forEach((form) => {
    bindPostData(form);
  });

  //Валидация номера телефона

  function validation() {
    const phone = document.querySelector(`.phone`);
    phone.addEventListener("keyup", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });

    const input = document.querySelector(".modal__input");
    input.addEventListener("input", () => {
      console.log(input);
      console.log(input.value);
      if (input.value.trim().length < 2) {
        // statusMessage.style.display = "none";
        input.style.border = `solid 2px red`;
      } else {
        input.style.border = "none";
      }
    });

    return input.style.border === "none" ? true : false;
  }

  validation();

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

      let errors = document.querySelectorAll(".error");
      if (errors.length >= 1) {
        errors.forEach((i) => {
          i.remove();
        });
      }

      //Валидация формы

      if (validation()) {
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
      } else {
        statusMessage.remove();

        const error = document.createElement("div");
        error.classList.add("error");
        error.textContent = "Введите имя не менее 2 символов в длину";
        error.style.color = "red";
        document.querySelector(".modal__content").append(error);
      }
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.remove("show");
    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

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
      closeModal(".modal");
    }, 2000);
  }

  fetch(" http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
}

export default form;
