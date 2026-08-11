(function () {
  "use strict";

  function toggleQuestion(button) {
    var item = button.closest(".faq-hover-item");
    if (!item) return;
    var shouldOpen = !item.classList.contains("is-pinned");
    var wall = item.closest(".faq-hover-list");
    wall.querySelectorAll(".faq-hover-item.is-pinned").forEach(function (openItem) {
      openItem.classList.remove("is-pinned");
      var openButton = openItem.querySelector(".faq-hover-question");
      if (openButton) openButton.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("is-pinned", shouldOpen);
    button.setAttribute("aria-expanded", String(shouldOpen));
  }

  /* Registered before the legacy template listeners so the new controls are
     not swallowed by the site's global click handling. */
  ["pointerdown", "click"].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      var button = event.target.closest && event.target.closest(".faq-hover-question");
      if (!button) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (eventName === "pointerdown" || (eventName === "click" && event.detail === 0)) {
        toggleQuestion(button);
      }
    }, true);
  });
})();
