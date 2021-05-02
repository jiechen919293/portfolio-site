const { src, dest, parallel } = require('gulp');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

function htmlTask() {
    return src('src/*.html')
        .pipe(
            htmlReplace({
                css: 'css/all-styles.css',
            })
        )
        .pipe(dest('dist'))
}

function styles() {
    return src('src/styles/*.css')
        .pipe(concat('all-styles.css'))
        .pipe(cleanCSS())
        .pipe(dest('dist/css'));
}

function scripts() {
    return src('src/scripts/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function images() {
    return src('src/images/*').pipe(dest('dist/images'));
}
exports.default = parallel(htmlTask, styles, scripts, images);