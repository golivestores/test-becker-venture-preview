(function () {
  var lastFocus = null;

  function elements() {
    return {
      modal: document.getElementById('service-scope-modal'),
      dialog: document.getElementById('service-scope-dialog')
    };
  }

  function openScope(trigger) {
    var refs = elements();
    if (!refs.modal || !refs.dialog) return;
    lastFocus = trigger || document.activeElement;
    refs.modal.classList.add('is-open');
    refs.modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('scope-lock');
    document.body.classList.add('scope-lock');
    requestAnimationFrame(function () { refs.dialog.focus(); });
  }

  function closeScope() {
    var refs = elements();
    if (!refs.modal) return;
    refs.modal.classList.remove('is-open');
    refs.modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('scope-lock');
    document.body.classList.remove('scope-lock');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('#scope-trigger');
    if (trigger) { event.preventDefault(); openScope(trigger); return; }
    if (event.target.closest('[data-scope-close]')) closeScope();
  });

  // Keep wheel and touch scrolling inside the modal instead of letting the
  // page-level Lenis instance consume it.
  ['wheel', 'touchmove'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      var refs = elements();
      if (!refs.modal || !refs.modal.classList.contains('is-open')) return;
      var panel = event.target.closest && event.target.closest('.scope-modal__panel');
      if (panel) event.stopPropagation();
      else event.preventDefault();
    }, { passive: false });
  });

  document.addEventListener('keydown', function (event) {
    var refs = elements();
    if (!refs.modal || !refs.modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') { closeScope(); return; }
    if (event.key !== 'Tab' || !refs.dialog) return;
    var items = refs.dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
