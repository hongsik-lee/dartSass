document.addEventListener('DOMContentLoaded', function () {
  renderCommonHeader();
  renderCommonFooter();
});

function renderCommonHeader() {
  const headerSlots = document.querySelectorAll('[data-common-header]');

  headerSlots.forEach(function (slot) {
    const rightHref = slot.dataset.rightHref || '';
    const rightLabel = slot.dataset.rightLabel || '';
    const rightHref2 = slot.dataset.rightHref2 || '';
    const rightLabel2 = slot.dataset.rightLabel2 || '';

    const action1 = rightHref && rightLabel
      ? `<a href="${escapeHtml(rightHref)}" class="btn-login">${escapeHtml(rightLabel)}</a>` : '';

    const action2 = rightHref2 && rightLabel2
      ? `<a href="${escapeHtml(rightHref2)}" class="btn-login">${escapeHtml(rightLabel2)}</a>` : '';

    const rightActions = action1 + action2;

    const actionGroup = rightActions
      ? '<div class="header-actions">' + rightActions + '</div>'
      : '';

    slot.outerHTML =
      '<header class="header">' +
      '<h2 class="header-title"><a href="index.html">Dart Sass Project</a></h2>' +
      actionGroup +
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
