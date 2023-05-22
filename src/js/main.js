document.addEventListener("DOMContentLoaded", () => {
  const tabs = require("./modules/tabs"),
    timer = require("./modules/timer"),
    modale = require("./modules/modale"),
    card = require("./modules/card"),
    form = require("./modules/form"),
    slider = require("./modules/slider"),
    calculator = require("./modules/calculator");
  console.log("slider");
  tabs();

  timer();

  modale();

  card();

  form();

  calculator();
  slider();
});
