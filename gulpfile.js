'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var hint = require('gulp-htmlhint');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
// var imageop = require('gulp-image-optimization');

gulp.task('hint', function () {
    return gulp.src('*.html')
        .pipe(hint())
        .pipe(hint.reporter())
        .pipe(gulp.dest('build/'))
});

gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});


gulp.task('watch', function () {
    // gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/*.scss', ['sass']);
    // gulp.watch('*.html', ['hint']);
});
gulp.task('watchcss', function () {
    gulp.watch('sass/**/*.scss', ['css']);
});
gulp.task('clean', function () {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});

//copy all external files to build

gulp.task('move', ['clean'], function () {
    var filesToMove = [
        './images/**/*.*',
        './fonts/**/*.*',
        './css/**/*.*',
        './js/libs/*.*',
        './js/*.js',
        '*.pdf',
        './views/*.html',
        '!./css/style.css'
        // '!./css/*.css.map',
    ];
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(filesToMove, {base: './'})
        .pipe(gulp.dest('build'));
});

gulp.task('autoprefixer', function () {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./css/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

// compile sass for development
gulp.task('css', function () {
    return sass('sass/style.scss')
        .pipe(gulp.dest('css/'));
});


//compile saas to css, compress and add prefixes
gulp.task('sass', function () {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return sass('sass/style.scss', {style: 'compressed'}
    ).pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

//replace html path

gulp.task('replaceHtml', function () {
    gulp.src('*.html')
        .pipe(htmlreplace({
            'css': 'css/style.min.css',
            'js': 'js/main.js'
        }))
        .pipe(gulp.dest('build/'));
});
//
// gulp.task('images', function (cb) {
//     gulp.src(['img/**/*.png']).pipe(imageop({
//         optimizationLevel: 5,
//         progressive: true,
//         interlaced: true
//     })).pipe(gulp.dest('images')).on('end', cb).on('error', cb);
// });

//gulp.task('default', ['scripts', 'sass', 'hint', 'watch']);
gulp.task('default', ['css', 'watchcss']);
gulp.task('release', ['move', 'sass', 'replaceHtml']);
