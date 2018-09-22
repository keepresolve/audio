let gulp = require('gulp')
let browserify = require('browserify')
let babelify = require('babelify')
let source = require('vinyl-source-stream')
let buffer = require('vinyl-buffer')
let cssUglify = require('gulp-minify-css')
let sourcemaps = require('gulp-sourcemaps')
let browserSync = require('browser-sync').create()
let rename = require('gulp-rename')
let htmlmin = require('gulp-htmlmin')
let del = require('del')
let sass = require('gulp-sass')
let autoprefix = require('gulp-autoprefixer')
// gulp-uglify-es
// gulp stream to uglify with 'terser' (es6 supported).
// terser is the new 'uglify-es'. uglify-es is no longer maintained.
let uglifyes6 = require('gulp-uglify-es').default
let imagemin = require('gulp-imagemin')
let cache = require('gulp-cache')
// gulp-html-replace
// Replace build blocks in HTML
// https://github.com/VFK/gulp-html-replace#readme
let htmlreplace = require('gulp-html-replace')

let output = 'dist-gulp'

gulp.task('build', function() {
    // webpack找到不需要import css 也能打包的方法，所以下面的处理就不需要

    //webpack需要在js代码里import css，但browserify不能处理，所以引入browserify-css
    //我们现在改用sass，没有相应的browserify插件，但直接把那行删了就是
    // .transform(require("browserify-css"))
    // .transform(require('browserify-replace'),{
    //   replace:[{from:/.*phone.scss.*/,to:''}]
    // })
    return browserify({ entries: 'src/ui/index.js', debug: true })
        .transform('babelify')
        .bundle()
        .pipe(source('src/ui/index.js'))
        .pipe(buffer())
        .pipe(rename('index.js'))
        .pipe(sourcemaps.init()) //必须放在rename之后 sourcemaps 才能正确生成
        .pipe(uglifyes6(/* options */)) //it will also remove comments
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(output))
    //4.0 change, return or done()
    //https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
})

// no images so far but keep task here
// gulp.task('images', function(){
//   return gulp.src('resources/images/**/*.+(png|jpg|jpeg|gif|svg)')
//   // Caching images that ran through imagemin
//   .pipe(cache(imagemin({
//       interlaced: true
//     })))
//   .pipe(gulp.dest('dist/images'))
// });

gulp.task('html', function(done) {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    }
    gulp.src('resources/*.html')
        .pipe(
            htmlreplace({
                css: 'index.css', //自动解析link
                js: 'index.js' //自定解析script
            })
        )
        .pipe(htmlmin(options))
        .pipe(gulp.dest(output))
    gulp.src('favicon.ico').pipe(gulp.dest(output))
    gulp.src('resources/css/font/*.woff').pipe(gulp.dest(`${output}/font`))
    done()
})

// gulp.task('css', function (done) {
//   gulp.src('resources/css/*.css')
//     .pipe(cssUglify())
//     .pipe(rename('main.css'))
//     .pipe(gulp.dest('dist'))
//   done();
// })

gulp.task('sass', function(done) {
    return (
        gulp
            .src('./resources/css/phone.scss')
            //"gulp-base64" 版本 0.13, github星值太低。决定不考虑
            // .pipe(base64({
            //   baseDir: 'resources/css',
            //   extensions: ['svg', 'png', 'eot', 'woff', 'ttf', /\.jpg#datauri$/i],
            //   maxImageSize: 10*1024, // bytes
            //   debug: true
            // }))
            // 压缩打包
            .pipe(
                sass({ outputStyle: 'compressed' }).on('error', sass.logError)
            )
            .pipe(autoprefix())
            .pipe(rename('index.css'))
            .pipe(gulp.dest(output))
    )
    done()
})

//参照 https://github.com/gulpjs/gulp/blob/4.0/docs/recipes/minimal-browsersync-setup-with-gulp4.md
function reload(done) {
    browserSync.reload()
    done()
}

const clean = () => del(['dist'])

// use default task to launch Browsersync and watch files
gulp.task(
    'default',
    gulp.series(gulp.parallel('html', 'sass', 'build'), function watch(done) {
        browserSync.init({
            server: {
                baseDir: output
            },
            debug: false,
            port: 3002
        })
        gulp.watch('./src/**/*.js', gulp.series('build', reload))
        gulp.watch('resources/*.html', gulp.series('html', reload))
        // gulp.watch("./resources/css/*.css", gulp.series('css',reload))
        gulp.watch('./resources/css/*.scss', gulp.series('sass', reload))
        done()
    })
)

gulp.task('bundle', gulp.series(clean, gulp.parallel('html', 'sass', 'build')))
//can't find an easy way to start http-server in gulp, run in npm script seems easier
gulp.task('demo', gulp.parallel('build', 'sass', 'html'))
