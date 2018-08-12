let gulp = require('gulp');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let cssUglify = require('gulp-minify-css');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();
let rename = require('gulp-rename');
// gulp-uglify-es
// gulp stream to uglify with 'terser' (es6 supported).
// terser is the new 'uglify-es'. uglify-es is no longer maintained.
let uglifyes6 = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');
let cache = require('gulp-cache');

gulp.task('build', function () {
  // app.js is your main JS file with all your module inclusions
  var entryFiles = ['src/ui/script.js']
  var tasks = entryFiles.map(function (entry) {
    return browserify({ entries: [entry], debug: true })
    //browserify针对webpack对css处理引入的模块
      .transform(require("browserify-css"))
      .transform("babelify")
      .bundle()
      .pipe(source(entry))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglifyes6(/* options */))
      .pipe(sourcemaps.write('./maps'))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.reload({ stream: true }))
  });
})

gulp.task('images', function(){
  return gulp.src('resources/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('css', function () {
  gulp.src('resources/css/*.css')
    .pipe(cssUglify())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }))
})
gulp.task('watch', ['css', 'images','build'], function () {
  browserSync.init({
    server: {
      baseDir: "dist/"
    },
    https: true,
    debug: false,
    port:3002
  })
  gulp.watch('./src/**/*.js', ['build']);
  gulp.watch("./resources/css/*.css", ['css', 'build'])
  gulp.watch("./resources/images/*.+(png|jpg|jpeg|gif|svg)", ['images'])
});
gulp.task('default', ['watch']);