/*global -$ */
'use strict';
// generated on 2015-05-22 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*----------------------GOM Frame Build BEGIN-------------------------*/
/*------------- Compiler template ------------*/
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var GOM_PATH = __dirname + '/app/gom/';

/*------------- Compiler CSS ------------*/
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('gom-scss', function () {
    return sass(GOM_PATH + 'src/styles/gom.scss')
        .pipe(minifyCss())
        .pipe(gulp.dest('./.tmp/css/'));
});

/*------------- Denpency Lib ------------*/
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/*gulp.task('gom-lib', function () {
    return gulp.src([GOM_PATH + 'src/3rd/zepto.js', GOM_PATH + 'src/3rd/!(zepto.js)*.js'])
        .pipe(uglify())
        .pipe(concat('base.js'))
        .pipe(gulp.dest('./.tmp/scripts/'))
        .pipe(gulp.dest('./dist/scripts/'));
});*/

/*------------- RequireJs  ES6 see next p------------*/
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

function browserifyFile(opts){
    browserify({
        entries:[opts.entries],   //'./app/gom/src/gom.js',
        standalone: opts.standalone?opts.standalone:false,
        debug:true
    })
    .external(opts.external?opts.external:'')
    .transform(babelify)
    .bundle()
    .pipe(source(opts.filename))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(gulp.dest('./.tmp/scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'));
}

gulp.task('es6', function () {
    browserifyFile({
        entries: './app/gom/src/gom.js',
        filename: 'gom.js',
        standalone: 'Gom'
    });

    browserifyFile({
        entries: './app/scripts/app.js',
        filename: 'app.js',
        //external: './app/gom/src/gom.js'
    });
});
/*----------------------GOM Frame Build END-------------------------*/

/*--------------------APP EXAMPLE DEV AND BUILD BEGIN-----------------------*/
/*--------------------- SASS ----------------*/
gulp.task('app-styles', function () {
    return sass('app/styles/main.scss')
        .pipe(minifyCss())
        .pipe(gulp.dest('./.tmp/css/'));
});

/*--------------------- HTML ----------------*/
gulp.task('html', function () {
    var assets = $.useref.assets({searchPath: ['.tmp']});
    return gulp.src('app/**/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    //gulp.start('gom-lib');
    gulp.start('es6');
});

gulp.task('styles', function () {
    gulp.start('gom-scss');
    gulp.start('app-styles');
});

/*-------------------- FONTS -----------------*/
gulp.task('fonts', function () {
    return gulp.src('app/gom/src/fonts/**/*.{eot,svg,ttf,woff,woff2}')//.concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'));
});

/*-------------------- IMAGES ----------------*/
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest('dist/images'));
});

/*-------------------- EXTRAS -----------------*/
gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

/*------------- Documents  ------------*/
var docs_exec = require('child_process').exec;
gulp.task('gom-docs', function(){
    docs_exec('jsdoc -t ../minami -c "./docs-conf.json" -r ./app/gom/src/ --readme ./app/gom/readme.md -d ./app/gom/docs', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    })
});

gulp.task('gom',  function(){
    gulp.start('gom-docs');
});

/*--------------------- SERVER ----------------*/
gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));
gulp.task('serve', ['fonts', 'styles', 'scripts'], function () {
    browserSync({
        //notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        browser: ['chrome']
    });

    //监听变化
    gulp.watch([
        'app/**/*',
        '!app/gom/build/**/*',
        '!app/gom/docs/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);
    //监听框架变化并作相应处理
    gulp.watch('app/gom/src/styles/**/*.scss', ['gom-scss']);
    gulp.watch('app/gom/src/**/*.js', ['es6']);
    gulp.watch('app/scripts/**/*.js', ['es6']);
    //监听APP变化并作相应处理
    gulp.watch('app/styles/*.scss', ['styles']);
    //监听依赖变化并自动插入依赖
    //gulp.watch('bower.json', ['wiredep', 'fonts']);
});

/*--------------------- BUILD ----------------*/
//'jshint',
gulp.task('build', ['styles', 'scripts', 'fonts',  'html', 'images', 'extras'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*------------------ DEFAULT ------------------*/
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
