
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const del = require('del');
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const minifyHtml = require("gulp-minify-html");
const minifyCss = require("gulp-minify-css");
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const Config = require('./gulpfile.base');
const uglify = require("gulp-uglify");
function prod() {
    gulp.task('image', function() {
        return gulp.src(Config.img.src)
            .pipe(gulp.dest(Config.img.dist));
    });
    gulp.task('js', function() {
        return gulp.src(Config.js.src)
            .pipe(gulp.dest(Config.js.dist));
    });
    gulp.task('json', function() {
        return gulp.src(Config.json.src)
            .pipe(gulp.dest(Config.json.dist)); //输出
    });

    gulp.task('html', function() {
        return gulp.src(Config.html.src)
            .pipe(minifyHtml())
            .pipe(gulp.dest(Config.html.dist)); //输出
    });

    gulp.task('copy-resource', function() {
        return gulp.src(Config.resource.src)
            .pipe(gulp.dest(Config.resource.dist));
    });

    gulp.task('copy-libs', function() {
        return gulp.src(Config.libs.src)
            .pipe(gulp.dest(Config.libs.dist));
    });


    gulp.task('copy-core', function() {
        return gulp.src(Config.core.src)
            .pipe(gulp.dest(Config.core.dist));
    });

    // gulp.task('clean:core', function(cb) {
    //     return del(['src/core'], cb);
    // });
    // gulp.task('clean:dest', function() {
    //     return del(['dist']);
    // });


    gulp.task('compile', function() {
        return tsProject.src()
            .pipe(tsProject()).js
            .pipe(uglify({ mangle: false }))
            .pipe(gulp.dest("dist"));
    });



    gulp.task('css', function() {
        return gulp.src(Config.css.src)
            .pipe(autoprefixer({
                bowsers:['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
            }))
            .pipe(gulp.dest(Config.css.dist))
    });
    gulp.task('less', function() {
        return gulp.src(Config.less.src)
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer({
                bowsers:['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
            }))
            .pipe(minifyCss())
            .pipe(gulp.dest(Config.less.dist))
    });
    gulp.task("start", function(cb) {
        runSequence(['copy-core','copy-resource','copy-libs'], ['compile','js', 'css','less', 'html', 'json', 'image'], cb);
    });


    gulp.task('build', ['start']);
}
module.exports = prod;