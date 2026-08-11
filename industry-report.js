(function () {
  var section = document.getElementById('i272d12s9_0');
  if (!section) return;

  var rows = Array.prototype.slice.call(section.querySelectorAll('.industry-report-row'));
  var number = section.querySelector('[data-report-focus-number]');
  var title = section.querySelector('[data-report-focus-title]');
  var index = section.querySelector('[data-report-visual-index]');
  var word = section.querySelector('.industry-report-visual-word');

  function select(row, rowIndex) {
    rows.forEach(function (item) { item.classList.toggle('is-active', item === row); });
    word.animate([
      { opacity: .18, transform: 'translateY(14px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 360, easing: 'cubic-bezier(.2,.7,.2,1)' });
    number.textContent = row.dataset.reportNumber;
    title.textContent = row.dataset.reportTitle;
    index.textContent = String(rowIndex + 1).padStart(2, '0') + ' / 05';
  }

  rows.forEach(function (row, rowIndex) {
    row.addEventListener('mouseenter', function () { select(row, rowIndex); });
    row.addEventListener('focus', function () { select(row, rowIndex); });
    row.addEventListener('click', function () { select(row, rowIndex); });
  });
})();
