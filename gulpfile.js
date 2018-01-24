require('es6-promise').polyfill();

var gulp         = require('gulp'),
sass             = require('gulp-sass'),
sourcemaps       = require('gulp-sourcemaps');
//rtlcss         = require('gulp-rtlcss'),
autoprefixer     = require('gulp-autoprefixer'),
plumber          = require('gulp-plumber'),
gutil            = require('gulp-util'),
rename           = require('gulp-rename'),
concat           = require('gulp-concat'),
jshint           = require('gulp-jshint'),
uglify           = require('gulp-uglify'),
imagemin         = require('gulp-imagemin'),
smushit          = require('gulp-smushit'),
merge            = require('merge-stream'),
cssnano          = require('gulp-cssnano'),
newer            = require('gulp-newer');
cached           = require('gulp-cached');
stripcsscomments = require('gulp-strip-css-comments');


var onError  = function(err) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
};

// Sass
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(stripcsscomments())
        .pipe(gulp.dest('./assets/css'))
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'));
    //  .pipe(rtlcss())                     // Convert to RTL
    //  .pipe(rename({ basename: 'rtl' }))  // Rename to rtl.css
    //  .pipe(gulp.dest('./'));             // Output RTL stylesheets (rtl.css)
});

// JavaScript
gulp.task('js', function() {
    return gulp.src(['./src/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./assets/js'))
        //.pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'));
});

// Images
gulp.task('images', function() {
     var svggif = gulp.src('./src/img/**/*.{svg,gif}')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(newer('./assets/img'))
        //  .pipe(cached('images'))
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('./assets/img'));

     var pngjpg = gulp.src('./src/img/**/*.{png,jpg,jpeg}')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(newer('./assets/img'))
        .pipe(smushit())
        .pipe(gulp.dest('./assets/img'));

    return merge(svggif, pngjpg);

});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/img/**/*', ['images']);
});

gulp.task('default', ['sass', 'js', 'images', 'watch']);
gulp.task('build', ['sass', 'js', 'images']);