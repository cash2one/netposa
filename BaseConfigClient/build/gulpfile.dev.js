const path = require('path');
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const Config = require('./gulpfile.base');
// const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');

function dev() {
    gulp.task('image:dev', function () {
        return gulp.src(Config.img.src)
            .pipe(changed(Config.img.dist))
            .pipe(gulp.dest(Config.img.dist));
    });
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src)
            .pipe(changed(Config.js.dist))
            .pipe(gulp.dest(Config.js.dist));
    });
    gulp.task('json:dev', function () {
        return gulp.src(Config.json.src)
            .pipe(changed(Config.json.dist))
            .pipe(gulp.dest(Config.json.dist));
    });

    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src)
            .pipe(changed(Config.html.dist))
            .pipe(gulp.dest(Config.html.dist));
    });

    gulp.task('copy-resource', function () {
        return gulp.src(Config.resource.src)
            .pipe(gulp.dest(Config.resource.dist));
    });

    gulp.task('copy-libs', function () {
        return gulp.src(Config.libs.src)
            .pipe(gulp.dest(Config.libs.dist));
    });


    gulp.task('copy-core', function () {
        return gulp.src(Config.core.src)
            .pipe(gulp.dest(Config.core.dist));
    });


    gulp.task('compile:dev', function () {
        return gulp.src(Config.ts.src)
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(Config.ts.dist));

    });


    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src)
            .pipe(changed(Config.css.dist))
            .pipe(autoprefixer({
                bowsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
            }))
            .pipe(gulp.dest(Config.css.dist));
    });
    gulp.task('less:dev', function () {
        return gulp.src(Config.less.src)
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer({
                bowsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
            }))
            .pipe(changed(Config.less.dist))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(Config.less.dist));
    });
    gulp.task('compiconsts:dev', function (cb) {
        runSequence('compile:dev', cb);
    });

    gulp.task("start:dev", function (cb) {
        runSequence(['copy-core', 'image:dev', 'copy-resource', 'copy-libs'], ['compile:dev', 'js:dev', 'css:dev', 'less:dev', 'html:dev', 'json:dev'], 'watch-start:dev', cb);
    });


    gulp.task('watch-start:dev', function () {
        gulp.watch(Config.js.src, ['js:dev']);
        gulp.watch(Config.html.src, ['html:dev']);
        gulp.watch(Config.css.src, ['css:dev']);
        gulp.watch(Config.less.src, ['less:dev']);
        gulp.watch(Config.json.src, ['json:dev']);
        gulp.watch(Config.img.src, ['image:dev']);
        gulp.watch(Config.core.src).on('change', function (e) {
            console.log(e.path)
            console.log(path.dirname(e.path.replace('BaseConfigCommon','BaseConfigClient/src'),""))
            return gulp.src(e.path)
                .pipe(changed(Config.core.dist))
                .pipe(gulp.dest(path.dirname(e.path.replace('BaseConfigCommon','BaseConfigClient/src'),"")));
        });;


        gulp.watch(Config.ts.src).on('change', function (e) {
            console.log(e.path)
            console.log(path.dirname(path.join('dist/', e.path.replace(path.join(__dirname, '../src'), ''))))
            return gulp.src(e.path)
                .pipe(changed(Config.ts.dist))
                .pipe(sourcemaps.init())
                .pipe(ts({
                    module: "AMD",
                    noImplicitAny: true,
                    declaration: false,
                    target: "ES5",
                    sourceMap: false,
                    allowJs: false,
                    typeRoots: [
                        "/node_modules/@types",
                        "/src/@types"
                    ]
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(path.dirname(path.join('dist/', e.path.replace(path.join(__dirname, '../src'), '')))));
        });

    });

    gulp.task('dev', ['start:dev']);
}
module.exports = dev;