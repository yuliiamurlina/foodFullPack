import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modale, { openModal } from "./modules/modale";
import card from "./modules/card";
import form from "./modules/form";
import slider from "./modules/slider";
import calculator from "./modules/calculator";

document.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    8000
  );
  tabs(
    ".tabheader__item",
    ".tabheader__items",
    ".tabcontent",
    "tabheader__item_active"
  );

  timer(".timer", "2023-05-29");

  modale("[data-modal]", ".modal", modalTimerId);

  card();

  form("form", modalTimerId);

  calculator();

  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
});
