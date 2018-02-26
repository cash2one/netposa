let prod = require('./build/gulpfile.prod.js');
let dev = require('./build/gulpfile.dev.js');
let watch = require('./build/gulpfile.watch.js');
prod();
dev();
watch();