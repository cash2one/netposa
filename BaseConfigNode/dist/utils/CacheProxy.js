"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache = require("memory-cache");
class CacheProxy {
    static putWithTimeout(key, value, timeout) {
        cache.put(key, value, timeout);
    }
    static put(key, value) {
        cache.put(key, value);
    }
    static get(key) {
        return cache.get(key);
    }
}
exports.default = CacheProxy;
