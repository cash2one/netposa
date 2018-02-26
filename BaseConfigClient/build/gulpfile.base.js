let SRC_DIR = 'src/';     // 源文件目录
let DIST_DIR = './dist/';   // 文件处理后存放的目录
let DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件

let Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    ts:{
        src: SRC_DIR + '/**/*.ts',
        dist: DIST_DIR
    },
    html: {
        src: SRC_DIR + '/**/*.html',
        dist: DIST_DIR
    },
    json: {
        src: SRC_DIR + '/**/*.json',
        dist: DIST_DIR
    },
    css: {
        src: [SRC_DIR + '/**/*.css','!src/libs/**/*.css'],
        dist: DIST_DIR
    },
    less: {
        src: [SRC_DIR + '/**/*.less','!src/libs/**/*.less'],
        dist: DIST_DIR
    },
    js: {
        src: [SRC_DIR + '/**/*.js','!src/lib/**/*.js'],
        dist: DIST_DIR
    },
    img: {
        src: [SRC_DIR + '/**/*.gif', SRC_DIR + '/**/*.png',SRC_DIR + '/**/*.PNG', SRC_DIR + '/**/*.jpg',SRC_DIR + '/**/*.mp4'],
        dist: DIST_DIR
    },
    core: {
        src: '../BaseConfigCommon/core/**/*.ts',
        dist: SRC_DIR + 'core'
    },
    resource:{
        src: [SRC_DIR + '/**/*.cur', SRC_DIR + '/**/*.exe', SRC_DIR + '/**/*.cvs', SRC_DIR + '/**/*.woff', SRC_DIR + '/**/*.ttf'],
        dist: DIST_DIR
    },
    libs:{
        src:[SRC_DIR + '/libs/**/*.js',SRC_DIR + '/libs/**/*.css'],
        dist:DIST_DIR + 'libs'
    }
};

module.exports = Config;