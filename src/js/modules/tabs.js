function tabs() {
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
}

module.exports = tabs;
