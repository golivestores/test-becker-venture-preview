(function () {
  "use strict";

  var partners = [
    ["Animoca Brands", "animocabrands", "https://x.com/animocabrands"],
    ["CGV", "CGVFOF", "https://x.com/CGVFOF"],
    ["CoinDesk", "CoinDesk", "https://x.com/CoinDesk"],
    ["Binance", "binance", "https://x.com/binance"],
    ["OKX", "okx", "https://x.com/okx"],
    ["Bitget", "bitget", "https://x.com/bitget"]
  ];

  var section = document.getElementById("ivypdqi2q_0");
  var target = document.getElementById("i2gi3nrun_0");
  if (!section || !target) return;

  function cards(items) {
    return items.map(function (partner) {
      return '<a class="ecosystem-logo-card" href="' + partner[2] + '" target="_blank" rel="noopener">' +
        '<span class="ecosystem-logo-image-wrap">' +
          '<img class="ecosystem-logo-image" src="https://unavatar.io/x/' + partner[1] + '" alt="' + partner[0] + ' logo" loading="eager">' +
        '</span>' +
        '<span><span class="ecosystem-logo-name">' + partner[0] + '</span>' +
          '<span class="ecosystem-logo-handle">@' + partner[1] + '</span></span>' +
        '<span class="ecosystem-logo-arrow" aria-hidden="true">↗</span>' +
      '</a>';
    }).join("");
  }

  section.classList.add("ecosystem-logo-ready");
  target.innerHTML = '<div class="ecosystem-logo-carousel" aria-label="Ecosystem partners">' +
    '<div class="ecosystem-logo-track">' + cards(partners) + cards(partners) + cards(partners) + '</div>' +
    '<span class="ecosystem-logo-status" aria-hidden="true">01 / ' + String(partners.length).padStart(2, "0") + '</span>' +
  '</div>';

  var mobileQuery = window.matchMedia("(max-width: 479px)");
  var carousel = target.querySelector(".ecosystem-logo-carousel");
  var status = target.querySelector(".ecosystem-logo-status");
  var mobileCards = Array.prototype.slice.call(target.querySelectorAll(".ecosystem-logo-card"));
  var activeIndex = partners.length;
  var autoTimer = null;
  var resumeTimer = null;
  var scrollFrame = null;

  function cardLeft(card) {
    return card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2;
  }

  function setActive(index) {
    activeIndex = (index + mobileCards.length) % mobileCards.length;
    mobileCards.forEach(function (card, cardIndex) {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });
    status.textContent = String((activeIndex % partners.length) + 1).padStart(2, "0") + " / " + String(partners.length).padStart(2, "0");
  }

  function goTo(index, smooth) {
    if (!mobileQuery.matches) return;
    setActive(index);
    carousel.scrollTo({ left: cardLeft(mobileCards[activeIndex]), behavior: smooth ? "smooth" : "auto" });
  }

  function nearestCard() {
    if (!mobileQuery.matches) return;
    var center = carousel.scrollLeft + carousel.clientWidth / 2;
    var nearest = 0;
    var distance = Infinity;
    mobileCards.forEach(function (card, index) {
      var currentDistance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (currentDistance < distance) {
        distance = currentDistance;
        nearest = index;
      }
    });
    setActive(nearest);
    if (nearest < partners.length / 2 || nearest >= mobileCards.length - partners.length / 2) {
      var centeredIndex = partners.length + (nearest % partners.length);
      window.requestAnimationFrame(function () {
        setActive(centeredIndex);
        carousel.scrollTo({ left: cardLeft(mobileCards[centeredIndex]), behavior: "auto" });
      });
    }
  }

  function stopAuto() {
    window.clearInterval(autoTimer);
    autoTimer = null;
  }

  function startAuto() {
    stopAuto();
    if (!mobileQuery.matches || document.hidden) return;
    autoTimer = window.setInterval(function () {
      goTo(activeIndex + 1, true);
    }, 3400);
  }

  function pauseForInteraction() {
    stopAuto();
    window.clearTimeout(resumeTimer);
  }

  function resumeAfterInteraction() {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(startAuto, 3000);
  }

  carousel.addEventListener("scroll", function () {
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(nearestCard);
  }, { passive: true });
  carousel.addEventListener("touchstart", pauseForInteraction, { passive: true });
  carousel.addEventListener("touchend", resumeAfterInteraction, { passive: true });
  carousel.addEventListener("pointerdown", pauseForInteraction, { passive: true });
  carousel.addEventListener("pointerup", resumeAfterInteraction, { passive: true });

  function configureMobile() {
    stopAuto();
    window.clearTimeout(resumeTimer);
    if (mobileQuery.matches) {
      window.requestAnimationFrame(function () {
        goTo(activeIndex, false);
        startAuto();
      });
    } else {
      mobileCards.forEach(function (card) { card.classList.remove("is-active"); });
    }
  }

  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", configureMobile);
  else mobileQuery.addListener(configureMobile);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  function syncEcosystemCanvas() {
    if (!mobileQuery.matches) return;
    var particleCanvas = document.getElementById("canvas");
    if (!particleCanvas) return;

    var sectionRect = section.getBoundingClientRect();
    var nextSection = section.nextElementSibling;
    var nextRect = nextSection ? nextSection.getBoundingClientRect() : null;
    var visualBottom = nextRect ? Math.min(sectionRect.bottom, nextRect.top) : sectionRect.bottom;
    var isActive = sectionRect.top < window.innerHeight * 0.72 && visualBottom > window.innerHeight * 0.34;

    if (isActive) {
      if (particleCanvas.parentElement !== document.body) document.body.appendChild(particleCanvas);
      particleCanvas.style.position = "fixed";
      particleCanvas.style.top = "0";
      particleCanvas.style.left = "0";
      particleCanvas.style.zIndex = "3";
      particleCanvas.style.pointerEvents = "none";
      var heading = document.getElementById("i3dzatwuv_0");
      var carousel = document.getElementById("i2gi3nrun_0");
      var headingRect = heading ? heading.getBoundingClientRect() : null;
      var carouselRect = carousel ? carousel.getBoundingClientRect() : null;
      var clipTop = Math.max(0, sectionRect.top, headingRect ? headingRect.bottom + 8 : 0);
      var canvasVisualBottom = Math.min(
        visualBottom,
        carouselRect ? carouselRect.top - 8 : visualBottom
      );
      var clipBottom = Math.max(0, window.innerHeight - canvasVisualBottom);
      var ecosystemClip = "inset(" + clipTop + "px 0 " + clipBottom + "px 0)";
      particleCanvas.style.clipPath = ecosystemClip;
      particleCanvas.style.webkitClipPath = ecosystemClip;
      particleCanvas.style.display = "block";
      particleCanvas.style.opacity = "1";
    } else if (visualBottom <= window.innerHeight * 0.34) {
      particleCanvas.style.opacity = "0";
      particleCanvas.style.display = "none";
      particleCanvas.style.clipPath = "none";
      particleCanvas.style.webkitClipPath = "none";
    }
  }

  window.addEventListener("scroll", syncEcosystemCanvas, { passive: true });
  window.addEventListener("resize", syncEcosystemCanvas);
  window.addEventListener("pageshow", syncEcosystemCanvas);
  configureMobile();
  window.requestAnimationFrame(syncEcosystemCanvas);
  window.setTimeout(syncEcosystemCanvas, 320);
  window.setTimeout(syncEcosystemCanvas, 1400);
})();
