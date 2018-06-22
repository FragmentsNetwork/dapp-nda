const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const header  = require('gulp-header');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');

console.log("ASdf")
gulp.task('css', function () {
    console.log(__dirname + '/scss/gui.scss')
    return gulp.src(__dirname + '/scss/gui.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(__dirname + '/../../dist/'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(__dirname + '/../../dist/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass:watch', function() {
    browserSync.init({
        proxy: "localhost:8888/fragments/fragments-dapp/fragments-nda-dapp-styles",
        browser: 'google chrome'
    });

    gulp.watch(__dirname + '/scss/**/*.scss', ['css']);
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css'], function () {
console.log("ASdfasdf")
    gulp.watch(__dirname + "scss/*/*.scss", ['css']);
});
