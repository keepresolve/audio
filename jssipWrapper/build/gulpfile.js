const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', function()
{
  return gulp
    .src([ 'lib/**/*.js' ])
    .pipe(babel())
    .pipe(gulp.dest('lib-cjs'));//with .babelrc setting it is es6 with require
});

gulp.task('es6', function()
{
  return gulp
    .src([ 'lib/**/*.js' ])
    .pipe(babel({
      "presets": [
        ["env", {
          "targets": {
            "browsers": ["last 3 Chrome versions","last 2 Firefox versions"]
          },
          "modules":false,
          "debug": true
        }]
      ]
    }))
    .pipe(gulp.dest('lib-es6'));//with .babelrc setting it is es6 with require
});