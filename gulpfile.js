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
var TEMPLATE_EXT_REGEX = /\.(html|tmpl)$/;
var TEMPLATE_BASE_PATH = GOM_PATH + 'src/ui/ui.tmpl';
var TEMPLATE_OUT_PATH = GOM_PATH + 'src/ui';


/*------------- Compiler CSS ------------*/
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
gulp.task('gom-scss', function () {
    return sass(GOM_PATH + 'src/styles/gom.scss')
        .pipe(minifyCss())
        .pipe(gulp.dest(GOM_PATH + 'build/css/'));
});

/*------------- Denpency Lib ------------*/
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('gom-lib', function () {
    return gulp.src([GOM_PATH + 'src/3rd/zepto.js', GOM_PATH + 'src/3rd/!(zepto.js)*.js'])
        .pipe(uglify())
        .pipe(concat('base.js'))
        .pipe(gulp.dest(GOM_PATH + 'build/'));
});

/*------------- RequireJs  ES6 see next p------------*/
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
gulp.task('es6', function () {
    browserify({
        entries:['./app/scripts/app.js'],   //'./app/gom/src/gom.js',
        debug:true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
});

/*------------- Documents  ------------*/
var docs_exec = require('child_process').exec;
gulp.task('gom-docs', function(){
    docs_exec('jsdoc -t ../minami -c "./docs-conf.json" -r ./app/gom/src/ --readme ./app/gom/readme.md -d ./app/gom/docs')
});

gulp.task('gom', ['gom-preCompiler', 'gom-scripts'], function () {
    gulp.start('gom-scss');
    gulp.start('gom-docs');
});

/*----------------------GOM Frame Build END-------------------------*/

/*--------------------APP EXAMPLE DEV AND BUILD BEGIN-----------------------*/
/*--------------------- SASS ----------------*/
gulp.task('styles', function () {
    return sass('app/styles/main.scss')
        .pipe(minifyCss())
        .pipe(gulp.dest('app/css/'));
});

/*--------------------- JS ----------------*/


/*--------------------- HTML ----------------*/
gulp.task('html', function () {
    var assets = $.useref.assets({searchPath: ['.tmp']});

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('dist'));
});

/*//remove useref;
gulp.task('html', ['styles'], function () {
    var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

    return gulp.src(['app/!**!/!*.html', '!app/gom/!**!/!*.html'])
        .pipe(assets)
        //.pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('dist/'));
});*/

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

/*-------------------- FONTS -----------------*/
gulp.task('fonts', function () {
    return gulp.src('app/gom/src/fonts/**/*.{eot,svg,ttf,woff,woff2}')//.concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
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


/*--------------------- SERVER ----------------*/
gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));
gulp.task('serve', ['styles', 'es6'], function () {
    browserSync({
        //notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components',
                //'/gom': 'gom' 不再提供此二个目录的路由
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
    //gulp.watch('app/fonts/**/*', ['fonts']);
    //监听依赖变化并自动插入依赖
    //gulp.watch('bower.json', ['wiredep', 'fonts']);
});

/*--------------------- BUILD ----------------*/
//'jshint',
gulp.task('build', ['scripts', 'html', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*------------------ DEFAULT ------------------*/
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
