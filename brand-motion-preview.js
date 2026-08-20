(function () {
  var logoBox = document.getElementById('i23kl1dlu_0');
  var petalThresholds = [0.05, 0.28, 0.53, 0.78];

  function mountHeroSphereActivation() {
    var hero = document.getElementById('i2ctb6t7i_0');
    if (!hero || document.querySelector('.bv-hero-brand-activation')) return null;

    var activation = document.createElement('div');
    activation.className = 'bv-hero-brand-activation';
    activation.setAttribute('aria-hidden', 'true');
    activation.innerHTML =
      '<span class="bv-hero-brand-ring"></span>' +
      '<span class="bv-hero-brand-core">' +
        '<span class="bv-hero-brand-petal"></span>'.repeat(4) +
      '</span>' +
      '<span class="bv-hero-brand-node"></span>'.repeat(4);
    hero.appendChild(activation);

    window.setTimeout(function () {
      activation.classList.add('is-running');
    }, 320);

    window.setTimeout(function () {
      activation.classList.add('is-settled');
    }, 1660);

    return activation;
  }

  var heroActivation = mountHeroSphereActivation();

  function makePetals(className) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i += 1) {
      var petal = document.createElement('span');
      petal.className = className;
      petal.setAttribute('aria-hidden', 'true');
      fragment.appendChild(petal);
    }
    return fragment;
  }

  if (logoBox && !logoBox.querySelector('.bv-progress-petals')) {
    logoBox.classList.add('bv-progress-logo');
    var progressPetals = document.createElement('span');
    progressPetals.className = 'bv-progress-petals';
    progressPetals.setAttribute('aria-hidden', 'true');
    progressPetals.appendChild(makePetals('bv-progress-petal'));
    logoBox.appendChild(progressPetals);
  }

  var sectionSelectors = [
    '#i2796kgzu_0',
    '#i1ts5jdxa_0',
    '#i16lv2od1_0',
    '#i185tv3al_0',
    '#ivypdqi2q_0',
    '#logo-portfolio',
    '#i272d12s9_0',
    '#ixbk8xix1_0',
    '#i2pcyqk4m_0'
  ];

  var sections = sectionSelectors.map(function (selector) {
    return document.querySelector(selector);
  }).filter(Boolean);

  sections.forEach(function (section) {
    section.classList.add('bv-brand-section');
    if (section.querySelector(':scope > .bv-section-mark')) return;

    var mark = document.createElement('span');
    mark.className = 'bv-section-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.appendChild(makePetals('bv-section-mark__petal'));
    section.appendChild(mark);
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-brand-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.24 });

    sections.forEach(function (section) { observer.observe(section); });
  } else {
    sections.forEach(function (section) { section.classList.add('is-brand-visible'); });
  }

  var ticking = false;

  function updateProgress() {
    ticking = false;
    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    if (heroActivation) {
      var heroExit = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * .72)));
      heroActivation.style.setProperty('--bv-hero-scroll', heroExit.toFixed(3));
    }
    document.querySelectorAll('.bv-progress-petal').forEach(function (petal, index) {
      petal.classList.toggle('is-active', progress >= petalThresholds[index]);
    });
  }

  function requestProgressUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  }

  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate);
  updateProgress();
})();
