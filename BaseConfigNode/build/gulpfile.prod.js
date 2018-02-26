
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const runSequence = require('run-sequence');
const Config = require('./gulpfile.base');

function prod(){
    gulp.task('copy-resource', function() {
        return gulp.src(Config.resource.src)
            .pipe(gulp.dest(Config.resource.dist));
    });
    
    gulp.task('copy-swagger', function() {
        return gulp.src(Config.swagger.src)
            .pipe(gulp.dest(Config.swagger.dist));
    });
    
    gulp.task('compact-js', function() {
        return tsProject.src()
            .pipe(tsProject()).js
            .pipe(gulp.dest(Config.dist));
    });
    gulp.task('json', function() {
        return gulp.src(Config.json.src)
            .pipe(gulp.dest(Config.json.dist));
    });

    gulp.task('copy-core', function(){
        return gulp.src(Config.core.src)
            .pipe(gulp.dest(Config.core.dist));
    });
    
    
    gulp.task('start', function(cb) {
        runSequence( ['copy-core','copy-resource', 'copy-swagger','json'], 'compact-js', cb);
    });
    
    gulp.task('build', ['start']);
}

module.exports = prod;