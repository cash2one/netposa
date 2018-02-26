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
    swagger: {
        src: SRC_DIR + '/swagger-ui/*',
        dist: DIST_DIR + '/swagger-ui'
    },
    json: {
        src: SRC_DIR + '/**/*.json',
        dist: DIST_DIR
    },
    js: {
        src: [SRC_DIR + '/**/*.js','!src/lib/**/*.js'],
        dist: DIST_DIR
    },
    core: {
        src: '../BaseConfigCommon/core/**/*.ts',
        dist: SRC_DIR + 'core'
    },
    resource:{
        src: [SRC_DIR + '/**/*.ico'],
        dist: DIST_DIR
    }
};

module.exports = Config;