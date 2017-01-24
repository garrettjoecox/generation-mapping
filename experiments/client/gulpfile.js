
const gulp = require('gulp');
const pl = require('gulp-load-plugins')();

gulp.task('watch', ['src'], () => {
  pl.livereload.listen();
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['src:js']);
  gulp.watch(['src/**/*.scss'], ['src:css']);
});

gulp.task('src', ['src:js', 'src:css']);

gulp.task('src:js', () => {
  const stream = require('add-stream');

  return gulp.src(['src/index.js', 'src/**/*.js'])
    .pipe(pl.plumber())
    .pipe(pl.sourcemaps.init())
    .pipe(pl.babel())
    .pipe(stream.obj(gulp.src('src/**/*.html')
      .pipe(pl.angularTemplatecache({ module: 'skeleton' }))))
    .pipe(pl.concat('index.js'))
    .pipe(pl.ngAnnotate())
    .pipe(pl.uglify())
    .pipe(pl.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(pl.livereload());
});

gulp.task('src:css', () => {

  return gulp.src(['src/**/*.scss'])
    .pipe(pl.plumber())
    .pipe(pl.sourcemaps.init())
    .pipe(pl.concat('index.css'))
    .pipe(pl.sass().on('error', pl.sass.logError))
    .pipe(pl.autoprefixer())
    .pipe(pl.cleanCss())
    .pipe(pl.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(pl.livereload());
});

gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:fonts']);

const vendor = {
  js: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  ],
  css: [
    'node_modules/normalize.css/normalize.css',
  ],
  fonts: [
  ]
}

gulp.task('vendor:js', () => {

  return gulp.src(vendor.js)
    .pipe(pl.plumber())
    .pipe(pl.concat('vendor.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor:css', () => {

  return gulp.src(vendor.css)
    .pipe(pl.plumber())
    .pipe(pl.concat('vendor.css'))
    .pipe(pl.cleanCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor:fonts', () => {

  return gulp.src(vendor.fonts)
    .pipe(pl.plumber())
    .pipe(gulp.dest('fonts'));
});
