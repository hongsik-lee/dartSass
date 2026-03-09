# Dart Sass Project

간단한 정적 웹 페이지를 Gulp 기반 빌드 파이프라인으로 운영하는 프로젝트입니다.  
SCSS 모듈(`@use`) 구조를 사용하며, 컴포넌트/레이아웃/페이지 단위로 스타일을 분리해 관리합니다.

## 페이지 구성

- `index.html` : 홈 화면(프로젝트 소개)
- `sub.html` : 컴포넌트 갤러리(게시판/버튼/타이포 등)
- `sass-guide.html` : Sass 함수/믹스인 사용 예시 페이지
- `login.html` : 로그인 폼 예시
- `board.html` : 게시판 레이아웃 예시

## 폴더 개요

- `src/` : 원본 소스(HTML, SCSS, JS, assets)
- `dist/` : 빌드 결과물(배포/미리보기용)
- `gulpfile.js` : 빌드/워치/로컬 서버 작업 정의

## Gulp 작동 방식

기본 실행(`gulp`)은 아래 순서로 동작합니다.

1. `clean` : `dist/` 폴더 삭제
2. 병렬 실행
   - `styles` : SCSS 컴파일 + autoprefixer + minify + sourcemap
   - `scripts` : JS 병합(`app.js`) + minify
   - `html` : HTML 복사 (`src/*.html` → `dist/`)
   - `assets` : 정적 파일 복사 (scss/js 제외)
3. `serve` : BrowserSync 서버 실행 + 파일 변경 감시(watch)

파일을 수정하면 watch가 자동으로 다시 빌드하고 브라우저를 갱신합니다.

## 설치 및 실행

### 1) 의존성 설치

```bash
npm install
```

### 2) 개발 서버 실행(빌드 + watch)

```bash
npm run gulp
```

실행 후 BrowserSync가 `dist/`를 기준으로 로컬 서버를 띄웁니다.

## 자주 쓰는 개별 명령

```bash
npx gulp clean
npx gulp styles
npx gulp scripts
npx gulp html
npx gulp assets
```

필요할 때 개별 태스크만 실행해 빠르게 확인할 수 있습니다.

## 참고

- 현재 `package.json`에는 `dev` 스크립트가 없으므로 `npm run dev` 대신 `npm run gulp`를 사용하세요.
- `node_modules/`, `dist/`는 `.gitignore`에 포함되어 커밋에서 제외됩니다.
