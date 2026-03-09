// Sass 가이드 카드 뒤집기
// 한글 설명: 각 예시 카드를 클릭하면 뒷면에서 해당 Sass 문법을 볼 수 있게 만듭니다.
document.addEventListener('DOMContentLoaded', function () {
  const guidePage = document.querySelector('.sass-guide-page');
  if (!guidePage) return;

  const syntaxMap = {
    'rem()': 'font-size: func.rem(24px);',
    'em()': 'font-size: func.em(24px, 20px);',
    'strip-unit()': 'width: func.strip-unit(180px) * 1px;',
    'lighten()': 'background: func.lighten(vars.$primary, 12%);',
    'darken()': 'background: func.darken(vars.$primary, 12%);',
    'rgba-color()': 'background: func.rgba-color(vars.$primary, 0.2);',
    'fluid()': 'width: func.fluid(160px, 35vw, 360px);',
    'fluid-font()': 'font-size: func.fluid-font(16px, 32px);',
    'container()': '@include mix.container(680px);',
    'flex-center()': '@include mix.flex-center;',
    'flex-between()': '@include mix.flex-between;',
    'flex-column()': '@include mix.flex-column(vars.$space-sm);',
    'grid-center()': '@include mix.grid-center;',
    'grid-auto()': '@include mix.grid-auto(70px, vars.$space-xs);',
    'absolute-center()': '@include mix.absolute-center;',
    'media() + media-down()': '@include mix.media(md) { ... }\n@include mix.media-down(vars.$breakpoint-sm) { ... }',
    'font()': '@include mix.font($size: vars.$font-size-lg, $weight: vars.$font-weight-medium);',
    'heading()': '@include mix.heading(vars.$font-size-2xl, vars.$font-weight-bold);',
    'text-size-adjust()': '@include mix.text-size-adjust;',
    'truncate()': '@include mix.truncate;',
    'line-clamp()': '@include mix.line-clamp(3);',
    'letter-space()': '@include mix.letter-space(0.12em);',
    'button-reset()': '@include mix.button-reset;',
    'link-reset()': '@include mix.link-reset;',
    'input-reset()': '@include mix.input-reset;',
    'shadow()': '@include mix.shadow(xs | sm | md | lg | xl | 2xl | inner);',
    'hover-light()': '@include mix.hover-light(8%);',
    'transition()': '@include mix.transition(transform);',
    'smooth-transition()': '@include mix.smooth-transition;',
    'rounded()': '@include mix.rounded(vars.$radius-xl);',
    'sr-only()': '@include mix.sr-only;',
    'not-sr-only()': '@include mix.not-sr-only;',
    'appearance()': '@include mix.appearance;',
    'user-select()': '@include mix.user-select(none);',
    'pointer-events()': '@include mix.pointer-events(none);',
    'aspect-ratio()': '@include mix.aspect-ratio(16, 9);',
    'hide-visually()': '@include mix.hide-visually;',
    'smooth-scroll()': '@include mix.smooth-scroll;'
  };

  const cards = guidePage.querySelectorAll('.sass-example-card');

  cards.forEach(function (card, index) {
    const titleEl = card.querySelector('h3');
    if (!titleEl) return;

    const title = titleEl.textContent.trim();
    const existingCodeEl = card.querySelector('.sass-example-code');
    const syntax = (existingCodeEl && existingCodeEl.textContent.trim())
      ? existingCodeEl.textContent.trim()
      : (syntaxMap[title] || '// src/assets/scss/pages/_mixins-all-example.scss 참고');

    if (existingCodeEl) existingCodeEl.remove();

    const oldNodes = Array.from(card.childNodes);

    const inner = document.createElement('div');
    inner.className = 'sass-example-card-inner';

    const frontFace = document.createElement('div');
    frontFace.className = 'sass-example-face sass-example-face--front';

    oldNodes.forEach(function (node) {
      frontFace.appendChild(node);
    });

    const frontHint = document.createElement('p');
    frontHint.className = 'sass-flip-hint';
    frontHint.textContent = '카드를 클릭하면 Sass 문법을 볼 수 있습니다.';
    frontFace.appendChild(frontHint);

    const backFace = document.createElement('div');
    backFace.className = 'sass-example-face sass-example-face--back';
    backFace.innerHTML =
      '<p class="sass-flip-title">' + escapeHtml(title) + ' 문법</p>' +
      '<pre class="sass-example-syntax"><code>' + escapeHtml(syntax) + '</code></pre>' +
      '<p class="sass-flip-hint sass-flip-hint--back">다시 클릭하면 예시 화면으로 돌아갑니다.</p>';

    inner.appendChild(frontFace);
    inner.appendChild(backFace);

    card.innerHTML = '';
    card.appendChild(inner);

    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', title + ' 카드 뒤집기');

    card.addEventListener('click', function (event) {
      if (event.target.closest('a, button, input, select, textarea, label')) {
        return;
      }
      toggleCard(card);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard(card);
      }
    });

    card.style.transitionDelay = (index % 6) * 0.01 + 's';
  });

  function toggleCard(card) {
    const isFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(isFlipped));
  }

  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (char) {
      return map[char];
    });
  }
});
