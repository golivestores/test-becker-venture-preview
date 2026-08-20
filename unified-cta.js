(function () {
  var logoSrc = 'thumb/2/osNaWl5gqHqzKPHUJBImgA/640r480/d/logo.svg';

  function enhanceCtas() {
    document.querySelectorAll('.btn-black, .btn-white').forEach(function (cta) {
      if (cta.matches('.bv-portfolio-link')) return;

      var main = cta.querySelector(
        '.btn-black_main, .btn-black--docs_main, .btn-white_main, .btn-white_stroke'
      );
      var square = cta.querySelector(
        '.btn-black_sq, .btn-white_sq, .btn-white_sq-stroke'
      );
      if (!main || !square) return;

      cta.classList.add('bv-unified-cta');
      main.classList.add('bv-unified-cta__main');
      square.classList.add('bv-unified-cta__square');
      square.replaceChildren();

      var logo = document.createElement('img');
      logo.className = 'bv-unified-cta__logo';
      logo.src = logoSrc;
      logo.alt = '';
      logo.setAttribute('aria-hidden', 'true');
      square.appendChild(logo);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCtas, { once: true });
  } else {
    enhanceCtas();
  }
})();
