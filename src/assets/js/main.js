// 기능 설명 모달 데이터
const featureData = {
  'module-system': {
    title: '📦 모듈 시스템',
    description: 'Dart Sass의 @use와 @forward로 구성된 스케일러블한 아키텍처',
    code: `/* style.scss - 메인 진입점 */
@use 'base' as base;
@use 'layout/header';
@use 'layout/footer';
@use 'components/button';

/* _variables.scss - 변수 중앙 관리 */
$primary: #3498db !default;
$font-family-base: 'Spoqa Han Sans Neo', system-ui, sans-serif !default;

/* 다른 파일에서 사용 */
@use '../base/variables' as vars;
color: vars.$primary;`
  },
  'design-tokens': {
    title: '🎨 디자인 토큰',
    description: '색상, 타이포그래피, 스페이싱 등 모든 설정이 변수로 관리',
    code: `/* 색상 토큰 사용 */
.card {
  background: base.$white;
  color: base.$text;
  border: 1px solid base.$border-color;
}

/* 스페이싱 토큰 사용 */
.container {
  padding: base.$space-md base.$space-lg;
  margin-bottom: base.$space-2xl;
}

/* 타이포그래피 토큰 사용 */
.heading {
  font-family: vars.$font-family-heading;
  font-size: vars.$font-size-2xl;
  font-weight: vars.$font-weight-bold;
}`
  },
  'responsive-design': {
    title: '📱 반응형 디자인',
    description: 'xs부터 2xl까지 6단계 브레이크포인트로 모든 화면 대응',
    code: `/* media() 믹신으로 반응형 처리 */
.feature-grid {
  @include mix.grid-auto(280px, base.$space-lg);

  @include mix.media(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mix.media(sm) {
    grid-template-columns: 1fr;
  }
}

/* 브레이크포인트 목록 */
$breakpoint-sm: 576px;   // 태블릿 세로
$breakpoint-md: 768px;   // 태블릿
$breakpoint-lg: 992px;   // 데스크톱
$breakpoint-xl: 1200px;  // 큰 데스크톱`
  },
  'mixins': {
    title: '⚡ 유용한 믹신',
    description: '자주 쓰이는 패턴들을 재사용 가능한 믹신으로 제공',
    code: `/* 레이아웃 믹신 */
.header {
  @include mix.flex-between;  // flex + space-between
  padding: base.$space-md;
}

.modal-center {
  @include mix.flex-center;   // flex + center alignment
  min-height: 100vh;
}

.dashboard {
  @include mix.grid-auto(300px, 24px);  // auto-fit grid
}

/* 시각 효과 믹신 */
.card {
  @include mix.shadow(md);          // 그림자
  @include mix.transition;          // 트랜지션
  border-radius: base.$radius-lg;

  &:hover {
    @include mix.shadow(lg);
    transform: translateY(-4px);
  }
}`
  },
  'developer-friendly': {
    title: '🔧 개발자 친화',
    description: 'Gulp 자동화 빌드, BrowserSync 라이브 리로드 지원',
    code: `/* 빌드 명령어 */
npm run gulp           // Gulp 빌드 실행
npm run dev            // 개발 모드 (watch + live reload)
npm run build          // 프로덕션 빌드

/* gulpfile.js 구조 */
gulp.task('sass', () => {
  return gulp.src('src/assets/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('sass'));
  browserSync.init({ server: 'src' });
});`
  },
  'extensibility': {
    title: '🚀 확장성',
    description: '기본 컴포넌트로 즉시 프로젝트 시작 가능',
    code: `/* 컴포넌트 임포트 및 사용 */
@use 'components/button' as compbtn;
@use 'components/card' as compcard;

/* 버튼 컴포넌트 사용 */
.my-button {
  @include compbtn.btn-base;
  background: base.$primary;
  color: base.$white;
}

/* 카드 컴포넌트 사용 */
.my-card {
  @include compcard.card-base;
  padding: base.$space-2xl;
  margin-bottom: base.$space-xl;
}

/* 새로운 컴포넌트 추가 */
// pages/_new-feature.scss 생성
@use $'new-feature';  // style.scss에서 임포트`
  }
};

// 모달 열기
function openFeatureModal(featureId) {
  const modal = document.getElementById('featureModal');
  const modalBody = document.getElementById('modalBody');
  const feature = featureData[featureId];

  if (!feature) return;

  // 모달 내용 생성
  const content = `
    <div class="modal-feature">
      <h2 class="modal-title">${feature.title}</h2>
      <p class="modal-description">${feature.description}</p>
      
      <div class="modal-code-section">
        <h3 class="modal-code-title">코드 예시</h3>
        <pre class="modal-code"><code>${escapeHtml(feature.code)}</code></pre>
      </div>
    </div>
  `;

  modalBody.innerHTML = content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeFeatureModal() {
  const modal = document.getElementById('featureModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// HTML 특수문자 이스케이프
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeFeatureModal();
  }
});
