(function () {
  "use strict";

  var mobileQuery = window.matchMedia("(max-width: 600px)");
  var section;
  var cards;
  var ticking = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function smoothstep(from, to, value) {
    var t = clamp((value - from) / (to - from), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function setCard(card, opacity, layer) {
    card.style.setProperty("--mobile-pillar-opacity", opacity.toFixed(3));
    card.style.setProperty("visibility", opacity > 0.02 ? "visible" : "hidden", "important");
    card.style.setProperty("pointer-events", opacity > 0.6 ? "auto" : "none", "important");
    card.style.zIndex = String(layer);
  }

  function update() {
    ticking = false;
    if (!mobileQuery.matches || !section || !cards) return;

    var rect = section.getBoundingClientRect();
    var distance = Math.max(1, rect.height - window.innerHeight);
    var progress = clamp((-rect.top + window.innerHeight * 0.06) / distance, 0, 1);
    var toSecond = smoothstep(0.2, 0.34, progress);
    var toThird = smoothstep(0.55, 0.69, progress);

    setCard(cards[0], 1 - toSecond, 1);
    setCard(cards[1], toSecond * (1 - toThird), 2);
    setCard(cards[2], toThird, 3);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  function initialize() {
    section = document.getElementById("i1ts5jdxa_0");
    cards = section ? section.querySelectorAll(".program_list-item") : null;
    if (!section || !cards || cards.length < 3) return;

    cards.forEach(function (card) {
      card.getAnimations({ subtree: true }).forEach(function (animation) {
        animation.cancel();
      });
      card.style.setProperty("transform", "none", "important");
    });
    requestUpdate();
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  mobileQuery.addEventListener("change", initialize);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
