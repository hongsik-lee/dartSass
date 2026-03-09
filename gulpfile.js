const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer').default || require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

//path
const paths = {
  scss: 'src/assets/scss/style.scss',
  scssAll: 'src/assets/scss/**/*.scss',
  js: 'src/assets/js/**/*.js',
  assets: 'src/assets/**/*',
  html: 'src/*.html',
  dist: 'dist'
};

// delete dist
async function clean(){
  const delModule = await import('del');
  return delModule.deleteAsync([paths.dist]);
};

//scss 처리
function styles(){
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

//js
function scripts(){
  return gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

//browser
function serve(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(paths.scssAll, styles);
  gulp.watch(paths.js, scripts).on('change', browserSync.reload);
  gulp.watch(paths.html, html).on('change', browserSync.reload);
}

//HTML
function html(){
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
}

//assets 복사(이미지, 폰트 등)
function assets(){
  // scss/js는 처리하므로 제외
  return gulp.src([paths.assets, '!src/assets/scss/**', '!src/assets/js/**'])
    .pipe(gulp.dest(paths.dist + '/assets'))
    .pipe(browserSync.stream());
}

// 각 작업을 공개(export)하여 CLI나 npm 스크립트에서 직접 실행할 수 있게 한다.
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.assets = assets;
exports.serve = serve;

exports.default = gulp.series(
  clean,
  gulp.parallel(styles, scripts, html, assets),
  serve
);
