const gulp = require('gulp');
const runSequence = require('run-sequence');
const debug = require('gulp-debug');
const changed = require('gulp-changed');
const nunjucksRender = require('gulp-nunjucks-render');
const htmlhint = require("gulp-htmlhint");
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const del = require('del');
const touch = require('gulp-touch');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

// Staging directory during assembly, before going to dist.
const STAGE = 'stage';

// Final distribution directory after everything is built
const DIST = 'dist';

var lintrcFile = '.eslintrc-error';

gulp.task('default', function(done) {
  lintrcFile = '.eslintrc-warn'
  runSequence(
   'build',
   ['browserSync', 'watch'],
   done);
});

gulp.task('pages:stage', function() {
  const dest = STAGE;
  return gulp.src('app/pages/**/*.html')
//  .pipe(debug({title: 'stage:before:'}))
  .pipe(changed(dest))
//  .pipe(debug({title: 'stage:after:'}))
  .pipe(nunjucksRender({
    path: 'app/templates/',
  }))
  .pipe(gulp.dest(dest));
});

gulp.task('pages:validate-html', function() {
  return gulp.src(STAGE+'/**/*.html')
  .pipe(changed(DIST))
  .pipe(htmlhint('.htmlhintrc'))
  .pipe(htmlhint.failReporter())
});

// Validate JavaScript contained in HTML files.
gulp.task('pages:validate-js', function() {
  return gulp.src(STAGE+'/**/*.html')
  .pipe(changed(DIST))
  .pipe(jshint.extract('auto'))
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'))
});

gulp.task('pages:minify', function() {
  const dest = DIST;
  return gulp.src(STAGE+'/**/*.html')
  .pipe(changed(dest))
  .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
  .pipe(gulp.dest(dest));
});

gulp.task('pages', function(done) {
  runSequence(
    'pages:stage',
    'pages:validate-html',
    'pages:validate-js',
    'pages:minify',
    done
  );
});

gulp.task('images:stage', function() {
  const dest = STAGE+'/static/images';
  return gulp.src('app/static/images/**/*')
  .pipe(changed(dest))
  .pipe(gulp.dest(dest));
});

gulp.task('images', ['images:stage'], function() {
  const dest = DIST+'/static/images';
  return gulp.src(STAGE+'/static/images/**/*')
  .pipe(changed(dest))
  .pipe(gulp.dest(dest));
});

gulp.task('sass:stage', function() {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(STAGE+'/css'));
});

gulp.task('sass:minify', function() {
  return gulp.src(STAGE+'/css/**/*.css')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest(DIST+'/css'));
});

gulp.task('sass', function(done) {
  runSequence(
    'sass:stage',
    'sass:minify',
    done
  );
});

gulp.task('lib:js-min', function() {
  return gulp.src('app/static/lib/**/*.min.js')
    .pipe(gulp.dest(STAGE+'/static/lib'));
});

gulp.task('lib:js-non-min', function() {
  return gulp.src(['app/static/lib/**/*.js', '!app/static/lib/**/*.min.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(STAGE+'/static/lib'));
});

gulp.task('lib:css-min', function() {
  return gulp.src('app/static/lib/**/*.min.css')
    .pipe(gulp.dest(STAGE+'/static/lib'));
});

gulp.task('lib:css-non-min', function() {
  return gulp.src(['app/static/lib/**/*.css', '!app/static/lib/**/*.min.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(STAGE+'/static/lib'));
});

gulp.task('lib:others', function() {
  return gulp.src(['app/static/lib/**/*', '!app/static/lib/**/*.js', '!app/static/lib/**/*.css'])
    .pipe(gulp.dest(STAGE+'/static/lib'));
});

gulp.task('lib:stage', ['lib:js-min', 'lib:js-non-min', 'lib:css-min', 'lib:css-non-min', 'lib:others']);

gulp.task('lib', ['lib:stage'], function(done) {
  return gulp.src(STAGE+'/static/lib/**/*')
    .pipe(gulp.dest(DIST+'/static/lib'));
});

gulp.task('scripts:stage', function() {
  const dest = STAGE+'/static/js';
  return gulp.src('app/static/js/**/*.js')
  .pipe(changed(dest))
  .pipe(eslint(lintrcFile))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(gulp.dest(dest));
});

gulp.task('scripts', ['scripts:stage'], function() {
  const dest = DIST+'/static/js';
  return gulp.src(STAGE+'/static/js/**/*.js')
  .pipe(changed(dest))
  // .pipe(uglify()) // Commented out because it can't uglify JavaScript ES6
  .pipe(gulp.dest(dest));
});

// The 'pages' task only executes for source files that
// have been modified. But if a template is modified, and the source
// is not, the 'pages' task doesn't do anything. By touching
// every source file, it forces the 'pages' task to run over
// all the source files and reapply the templates.
gulp.task('touch', function() {
  return gulp.src('app/pages/**/*.html')
  .pipe(touch());
});

gulp.task('watch', function(){
  gulp.watch('app/pages/**/*', ['pages', browserSync.reload]);
  gulp.watch('app/static/images/**/*', ['images', browserSync.reload]);
  gulp.watch('app/scss/**/*', ['sass', browserSync.reload]);
  gulp.watch('app/static/js/**/*', ['scripts', browserSync.reload]);
  gulp.watch('app/static/lib/**/*', ['lib', browserSync.reload]);
  gulp.watch('app/templates/**/*').on('change', function(file) {
    runSequence(
      'touch',
      'pages',
      browserSync.reload);
  });
})

gulp.task('browserSync', function() {
  browserSync.init({
    port: 6400,
    server: {
      baseDir: DIST
      // directory: true
    },
    online: true,
    open: false
  });
})

gulp.task('clean', function() {
  return del([STAGE, DIST]);
});

gulp.task('build', function(done) {
  runSequence(
    'clean',
    ['pages', 'images', 'sass', 'lib', 'scripts']
    , done
  );
});

gulp.task('publish', ['build'], function() {
  console.log('Woot!');
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

