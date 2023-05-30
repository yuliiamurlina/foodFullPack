function tabs(tabsSelector, tabParent, tabContent, activeClass) {
  const tabHeaders = document.querySelectorAll(tabsSelector),
    tabHeaderParent = document.querySelector(tabParent),
    tabs = document.querySelectorAll(tabContent);

  function hideTabs() {
    tabs.forEach((element) => {
      element.classList.remove("show", "fade");
      element.classList.add("hide");
    });

    tabHeaders.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  hideTabs();

  function showTabs(i = 0) {
    tabs[i].classList.remove("hide");
    tabs[i].classList.add("show", "fade");
    tabHeaders[i].classList.add(activeClass);
  }

  showTabs();

  tabHeaderParent.addEventListener("click", (event) => {
    if (
      event.target &&
      event.target.classList.contains(tabsSelector.slice(1))
    ) {
      tabHeaders.forEach((item, i) => {
        if (item == event.target) {
          hideTabs();
          showTabs(i);
        }
      });
    }
  });
}

export default tabs;
