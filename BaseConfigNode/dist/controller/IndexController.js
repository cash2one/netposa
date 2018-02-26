"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    static read(req, res, next) {
        res.send('Weclome to Base Config NodeJS Server!');
    }
}
exports.default = IndexController;
