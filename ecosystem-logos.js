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
    '<div class="ecosystem-logo-track">' + cards(partners) + cards(partners) + '</div>' +
  '</div>';
})();
