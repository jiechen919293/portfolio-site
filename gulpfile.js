const { src, dest, series, parallel, watch } = require('gulp');
const browsersync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify');

function browserSync() {
    return browsersync.init({
        server: {
            baseDir: './dist',
        },
        port: 3000,
    })
}

function htmlTask() {
    return src('src/*.html')
        .pipe(
            htmlReplace({
                css: 'css/all-styles.css',
            })
        )
        .pipe(dest('dist'))
}

function stylesTask() {
    return src('src/styles/*.css')
        .pipe(concat('all-styles.css'))
        .pipe(cleanCSS())
        .pipe(dest('dist/css'));
}

function scriptsTask() {
    return src('src/scripts/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function imagesTask() {
    return src('src/images/*').pipe(dest('dist/images'));
}

function watchFiles() {
    watch('src/*.html', htmlTask);
    watch('src/css/*.css', stylesTask);
    watch('src/js/*.js', scriptsTask);
    watch('src/images/*', imagesTask);
}
exports.html = htmlTask;
exports.styles = scriptsTask;
exports.scripts = scriptsTask;
exports.images = imagesTask;
exports.watch = parallel(watchFiles, browserSync);
exports.dev = series(
    parallel(htmlTask, scriptsTask, stylesTask, imagesTask),
    parallel(watchFiles, browserSync)
)
exports.default = parallel(htmlTask, scriptsTask, stylesTask, imagesTask);