const path = require('path');
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const nodemon = require('gulp-nodemon');
const changed = require('gulp-changed');
const runSequence = require('run-sequence');
const Config = require('./gulpfile.base');

function dev(){
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
    
    gulp.task('watch-ts-single',function () {
        gulp.watch(Config.ts.src).on('change',function (e) {
            console.log(e.path)
            console.log(path.dirname(path.join('dist/', e.path.replace(path.join(__dirname,'../src'),''))))
            return gulp.src(e.path)
                .pipe(changed(Config.ts.dist))
                .pipe(ts({
                    module: "commonjs",
                    noImplicitAny: true,
                    moduleResolution: "node",
                    target: "es2015",
                    sourceMap: false,
                    allowJs: false,
                    lib: ["es6", "es5", "es2016","dom"]
                }))
                .pipe(gulp.dest(path.dirname(path.join('dist/', e.path.replace(path.join(__dirname,'../src'),'')))));
        });
        
    });
	
	gulp.task('watch-core',function(){
		
		gulp.watch(Config.core.src).on('change', function (e) {
            console.log(e.path)
            console.log(path.dirname(e.path.replace('BaseConfigCommon','BaseConfigNode/src'),""))
            return gulp.src(e.path)
                .pipe(changed(Config.core.dist))
                .pipe(gulp.dest(path.dirname(e.path.replace('BaseConfigCommon','BaseConfigNode/src'),"")));
        });
		
	})
    
    gulp.task('start-node', function() {
        return nodemon({
            script: 'dist/index.js',
            watch: ['src'],
            ext: 'ts json',
            env: {
                'NODE_ENV': 'development'
            }
        });
    });
    
    gulp.task('copy-core', function(){
        return gulp.src(Config.core.src)
            .pipe(gulp.dest(Config.core.dist));
    });
    
    
    gulp.task('start:dev', function(cb) {
        runSequence( ['copy-core','copy-resource', 'copy-swagger','json'], 'compact-js', 'watch-ts-single','watch-core','start-node', cb);
    });
    
    gulp.task('dev', ['start:dev']);
}

module.exports = dev;