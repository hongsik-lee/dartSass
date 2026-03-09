document.addEventListener('DOMContentLoaded', function () {
  renderCommonHeader();
  renderCommonFooter();
});

function renderCommonHeader() {
  const headerSlots = document.querySelectorAll('[data-common-header]');

  headerSlots.forEach(function (slot) {
    const rightHref = slot.dataset.rightHref || '';
    const rightLabel = slot.dataset.rightLabel || '';

    const rightAction = rightHref && rightLabel
      ? '<a href="' + escapeHtml(rightHref) + '" class="btn-login">' + escapeHtml(rightLabel) + '</a>'
      : '';

    slot.outerHTML =
      '<header class="header">' +
      '<h2 class="header-title"><a href="index.html">Dart Sass Project</a></h2>' +
      rightAction +
      '</header>';
  });
}

function renderCommonFooter() {
  const footerSlots = document.querySelectorAll('[data-common-footer]');

  footerSlots.forEach(function (slot) {
    const footerHtml = slot.dataset.footerHtml;
    const footerText = slot.dataset.footerText || '&copy; 2026 Dart Sass Project';

    slot.outerHTML = footerHtml
      ? '<footer class="footer">' + footerHtml + '</footer>'
      : '<footer class="footer">' + footerText + '</footer>';
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return String(text).replace(/[&<>"']/g, function (char) {
    return map[char];
  });
}
