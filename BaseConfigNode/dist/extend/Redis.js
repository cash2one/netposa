"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const log4js = require("log4js");
const util = require("util");
let redis = require('redis');
let wrapper = require('co-redis');
class RedisClient {
    constructor() {
    }
    static instance() {
        if (!RedisClient.isInstance) {
            RedisClient.sInstance = new RedisClient();
        }
        return RedisClient.sInstance;
    }
    init() {
        RedisClient.isInstance = true;
        let client = redis.createClient(Config_1.default.RDS_PORT, Config_1.default.RDS_HOST, {
            return_buffers: true,
            retry_strategy: (options) => {
                if (options.error.code === 'ECONNREFUSED') {
                    RedisClient.LOGGER.info(util.format('Redis 连接被拒绝'));
                }
                if (options.times_connected) {
                    RedisClient.LOGGER.info(util.format('Redis 重试连接 %s 次', options.times_connected));
                }
                return Math.max(options.attempt * 100, 3000);
            }
        });
        this.client = wrapper(client);
        this.client.on('ready', () => {
            RedisClient.LOGGER.info('Redis is Ready 初始化完成');
        });
        this.client.on("error", function (error) {
            RedisClient.LOGGER.error(util.format('Redis 连接错误 %s', error));
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value) {
                let res = yield this.client.set(key, JSON.stringify(value));
                RedisClient.LOGGER.debug(util.format('Redis 设置 %s => %s', key, res));
            }
            else {
                RedisClient.LOGGER.error(util.format('设置 %s is => %s', key, value));
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let val = yield this.client.get(key);
            let result = null;
            try {
                result = JSON.parse(val.toString());
            }
            catch (e) {
                RedisClient.LOGGER.error(util.format('Redis 获取 %s 失败 => %s', key, e));
            }
            return result;
        });
    }
}
RedisClient.LOGGER = log4js.getLogger("RedisClient");
RedisClient.isInstance = false;
exports.RedisClient = RedisClient;
