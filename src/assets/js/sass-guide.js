// Sass 가이드 카드 코드 패널
// 한글 설명: 모든 카드에 Sass 문법과 복사 버튼을 항상 표시합니다.
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

  cards.forEach(function (card) {
    if (card.dataset.enhanced === 'true') return;

    const titleEl = card.querySelector('h3');
    if (!titleEl) return;

    const title = titleEl.textContent.trim();
    const existingCodeEl = card.querySelector('.sass-example-code');
    const syntax = (existingCodeEl && existingCodeEl.textContent.trim())
      ? existingCodeEl.textContent.trim()
      : (syntaxMap[title] || '// src/assets/scss/pages/_mixins-all-example.scss 참고');

    if (existingCodeEl) existingCodeEl.remove();

    const oldNodes = Array.from(card.childNodes);
    const front = document.createElement('div');
    front.className = 'sass-card-front';

    oldNodes.forEach(function (node) {
      front.appendChild(node);
    });

    const hint = document.createElement('p');
    hint.className = 'sass-card-hint';
    hint.textContent = '';
    front.appendChild(hint);

    const panel = document.createElement('div');
    panel.className = 'sass-code-panel';
    panel.innerHTML =
      '<div class="sass-code-head">' +
      '<p class="sass-code-title">' + escapeHtml(title) + ' 문법</p>' +
      '<button type="button" class="sass-copy-button">복사</button>' +
      '</div>' +
      '<pre class="sass-example-syntax"><code>' + escapeHtml(syntax) + '</code></pre>';

    card.innerHTML = '';
    card.appendChild(front);
    card.appendChild(panel);

    card.dataset.enhanced = 'true';
    setupCopyButton(panel, syntax);
  });

  function setupCopyButton(panel, syntax) {
    const button = panel.querySelector('.sass-copy-button');
    if (!button) return;

    button.addEventListener('click', function () {
      copyToClipboard(syntax).then(function () {
        button.classList.add('is-copied');
        button.textContent = '복사됨';

        window.setTimeout(function () {
          button.classList.remove('is-copied');
          button.textContent = '복사';
        }, 1200);
      }).catch(function () {
        button.textContent = '복사 실패';
        window.setTimeout(function () {
          button.textContent = '복사';
        }, 1200);
      });
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          resolve();
        } else {
          reject(new Error('copy failed'));
        }
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
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

    return text.replace(/[&<>"']/g, function (char) {
      return map[char];
    });
  }
});
