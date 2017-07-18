let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('minify-css', () => {
  return gulp.src('src/**/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

var minify = require('gulp-minify');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

gulp.task('compress', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish')) 
    .pipe(jshint.reporter('fail')) 
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist')) 
});

gulp.task('copy-html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-img', function () {
    gulp.src('src/img/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['minify-css', 'compress', 'copy-img', 'copy-html'],);