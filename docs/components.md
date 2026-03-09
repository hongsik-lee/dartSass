                       # Components Usage

이 문서는 프로젝트의 재사용 가능한 컴포넌트 사용법을 간단히 정리합니다.

## 공통 전제
- SCSS에서는 `@use` 방식으로 모듈을 불러옵니다.
- 디자인 토큰과 믹스인은 `src/assets/scss/base`에 정의되어 있습니다.

### 예: 공통 불러오기
```scss
@use '../base' as base;
@use '../base/variables' as vars;
@use '../base/mixins' as mix;
@use '../components/button' as compbtn;
@use '../components/card' as compcard;
@use '../components/board' as compboard;
```

## 1) 버튼 (`button`)
- 제공: `compbtn` 네임스페이스의 `@mixin btn-base` 및 `.btn_blue`, `.btn_green`, `.btn_yellow` 클래스

SCSS 사용 예:
```scss
.button-row {
  // 기본 버튼 스타일 포함
  .btn { @include compbtn.btn-base; }

  // 컬러 변형은 기존 클래스 사용
  .primary { @extend .btn_blue; }
}
```

HTML 예:
```html
<button class="btn btn_blue">Primary</button>
<button class="btn btn_green">Success</button>
```

## 2) 카드 (`card`)
- 제공: `compcard.card-base` 믹스인과 `.card` 클래스

SCSS 사용 예:
```scss
.feature-card { @include compcard.card-base; }
```

HTML 예:
```html
<article class="card">
  <h2>카드 제목</h2>
  <p>간단한 설명</p>
</article>
```

## 3) 게시판 (`board`)
- 제공: `.board`, `.board.notice`, `.table-board`, `.qna` 등 클래스 그룹

HTML 예:
```html
<ul class="board notice">
  <li><span class="num">1</span> 공지 제목</li>
</ul>

<table class="table-board">
  <thead><tr><th>제목</th><th>작성자</th></tr></thead>
  <tbody>
    <tr><td>게시글</td><td>관리자</td></tr>
  </tbody>
</table>
```

## Tips
- 스타일을 커스터마이즈할 때는 `base`의 변수(`$primary`, `$space-md` 등)를 사용하세요.
- mixin을 통해 일관된 레이아웃/타이포그래피를 유지하면 유지보수가 쉬워집니다.

---
문서에 추가할 예시나 다른 컴포넌트가 있으면 알려주세요.

## 4) 폼 (inputs, textarea)
- `base`의 `input-reset` 믹스인을 사용하면 일관된 입력 스타일을 적용할 수 있습니다.

SCSS 예:
```scss
.form-inline input { @include mix.input-reset; }
```

HTML 예:
```html
<div class="form-group">
  <label>제목</label>
  <input type="text" />
</div>
```

## 5) 유틸 컴포넌트
- `mix.grid-auto()`, `mix.flex-center()`, `mix.rounded()` 등의 믹스인을 적극 활용하세요.

---

빠른 데모 페이지: `src/sass-guide.html`(빌드 후 `dist/sass-guide.html`)를 확인하세요.
