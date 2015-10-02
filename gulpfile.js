// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsonminify = require('gulp-jsonminify');
var cdnizer = require("gulp-cdnizer");
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');


// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Minify JSONS
gulp.task('jsons', function () {
    return gulp.src('refs/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/refs'));
});

//Replacing local links with CDNs
gulp.task('cdn', function () {
    return gulp.src("index.html")
        .pipe(cdnizer([
            {
                file: 'bower_components/angular/angular.js',
                package: 'angular',
                cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
            },
            {
                file: 'bower_components/angular-animate/angular-animate.js',
                package: 'angular-animate',
                cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-animate.min.js'
            },
            {
                file: 'bower_components/angular-route/angular-route.js',
                package: 'angular-route',
                cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-route.min.js'
            },
            {
                file: 'bower_components/angular-sanitize/angular-sanitize.js',
                package: 'angular-sanitize',
                cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-sanitize.min.js'
            },
            {
                file: 'bower_components/bootstrap/dist/css/bootstrap.css',
                package: 'bootstrap',
                cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/bootstrap.min.css'
            },
            {
                file: 'bower_components/bootstrap/dist/js/bootstrap.js',
                package: 'bootstrap',
                cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/js/bootstrap.min.js'
            },
            {
                file: 'bower_components/jquery/dist/jquery.js',
                package: 'jquery',
                cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/${ version }/jquery.min.js'
            },
            {
                file: 'js/app.js',
                cdn: 'js/app.min.js'
            }
        ]))
        .pipe(gulp.dest("dist"));
});

//Minify index HTML
gulp.task('minify-html', function () {
    return gulp.src('dist/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'));
});

//Minify  content HTML
gulp.task('minify-html2', function () {
    return gulp.src('content/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/content'));
});


// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('refs/*.json', ['jsons']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('index.html', ['cdn', 'minify-html']);
    gulp.watch('content/*.html', ['minify-html2']);

});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'jsons', 'cdn', 'minify-html', 'minify-html2',
    'watch']);
