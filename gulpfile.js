/*global -$ */
'use strict';
// generated on 2015-05-22 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*------------- Compiler template ------------*/
var fs = require('fs');
var path = require('path');
var GOM_PATH = __dirname + '/app/gom/';

/*------------- RequireJs  ES6 see next p------------*/
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
function browserifyFile(opts){
    return browserify({
        entries:[opts.entries],   //'app/gom/src/gom.js',
        standalone: opts.standalone?opts.standalone:false,
        debug:true
    }).external(opts.external?opts.external:'')
        .transform(babelify)
        .bundle()
        .pipe(source(opts.filename))
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(gulp.dest('.tmp/scripts')).pipe(uglify())
}

gulp.task('es6:gom', function () {
    browserifyFile({
        entries: 'app/gom/src/gom.js',
        filename: 'gom.js',
        standalone: 'Gom'
    }).pipe(gulp.dest('app/gom/build/scripts'));
});

gulp.task('es6:app', function () {
    browserifyFile({
        entries: 'app/scripts/app.js',
        filename: 'app.js'
        //external: 'app/gom/src/gom.js'
    });
});

gulp.task('scripts', function () {
    gulp.start('es6:gom', 'es6:app');
});


/*--------------------- SASS ----------------*/
/*------------- Compiler CSS ------------*/
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('styles:gom', function () {
    return sass('app/gom/src/styles/gom.scss')
        .pipe(minifyCss())
        .pipe(gulp.dest('app/gom/build/css/'))
        .pipe(gulp.dest('.tmp/css/'));
});

gulp.task('styles:app', function () {
    return sass('app/styles/main.scss')
        .pipe(minifyCss())
        .pipe(gulp.dest('.tmp/css/'))
    //.pipe(gulp.dest('./dist/css/'))
});

gulp.task('styles', function () {
    gulp.start(['styles:gom', 'styles:app']);
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

/*-------------------- FONTS -----------------*/
gulp.task('fonts', function () {
    return gulp.src('app/gom/src/fonts/**/*.{eot,svg,ttf,woff,woff2}')//.concat('app/fonts/**/*'))
        .pipe(gulp.dest('app/gom/build/fonts'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('./dist/fonts'));
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

/*---------------------DATA--------------------*/
gulp.task('data', function () {
    return gulp.src('app/data/**/*')
        .pipe(gulp.dest('dist/data'));
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
gulp.task('docs:gom', function(){
    docs_exec('jsdoc -t ../minami -c "./docs-conf.json" -r app/gom/src/ --readme app/gom/readme.md -d ./dist/docs', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    })
});

/*--------------------- SERVER ----------------*/
gulp.task('clean', require('del').bind(null, ['.tmp', '.sass-cache', 'dist', 'app/gom/build']));
gulp.task('serve', ['styles', 'scripts', 'fonts'], function () {
    browserSync({
        port: 9000,  //notify: false,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {'/bower_components': 'bower_components'}
        }, //browser: ['chrome']
    });

    //监听变化
    gulp.watch([
        'app/**/*',
        '!app/gom/build/**/*',
        '!app/gom/docs/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);
    gulp.watch('app/gom/src/styles/**/*.scss', ['styles:gom']); //监听框架变化并作相应处理
    gulp.watch('app/gom/src/**/*.js', ['es6:gom']);
    gulp.watch('app/scripts/**/*.js', ['es6:app']); //监听APP变化并作相应处理
    gulp.watch('app/styles/*.scss', ['styles']);
    //监听依赖变化并自动插入依赖
    //gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', ['build'], function(){
    browserSync({
        notify: false,
        port: 9001,
        server: {
            baseDir: ['dist']
        }
    });
});
/*--------------------- BUILD APP----------------*/
gulp.task('build', ['styles', 'scripts', 'fonts', 'images', 'extras', 'data', 'html'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*------------------ DEFAULT ------------------*/
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

/*--------------------- BUILD GOM----------------*/
gulp.task('build:gom', ['styles:gom', 'es6:gom', 'fonts'], function(){
    gulp.start('docs:gom');
});
