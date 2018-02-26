import Config from "../Config";
import * as log4js from "log4js";
import * as util from "util";

let redis = require('redis');
let wrapper = require('co-redis');

interface IRedisClient {
    init(): void

    set(key: string, value: { [key: string]: any } & any): any;

    get(key: string): any
}

export class RedisClient implements IRedisClient {
    private static LOGGER = log4js.getLogger("RedisClient");
    private client: any;
    private static isInstance: boolean = false;
    private static sInstance: RedisClient;

    constructor() {

    }

    static instance() {
        if (!RedisClient.isInstance) {
            RedisClient.sInstance = new RedisClient()
        }
        return RedisClient.sInstance;
    }

    init() {
        RedisClient.isInstance = true;
        let client = redis.createClient(Config.RDS_PORT, Config.RDS_HOST, {
            return_buffers: true,
            retry_strategy: (options: any) => {
                if (options.error.code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with a individual error
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
            RedisClient.LOGGER.info('Redis is Ready 初始化完成')
        });
        this.client.on("error", function (error: Error) {
            RedisClient.LOGGER.error(util.format('Redis 连接错误 %s', error))
        });
    }

    async set(key: string, value: { [key: string]: any } & any) {
        if(value){
            let res = await this.client.set(key, JSON.stringify(value));
            RedisClient.LOGGER.debug(util.format('Redis 设置 %s => %s', key, res));
        }else{
            RedisClient.LOGGER.error(util.format('设置 %s is => %s', key, value));
        }

    }

    async get(key: string) {
        let val = await this.client.get(key);
        let result = null;
        try {
            result = JSON.parse(val.toString());
        } catch (e) {
            RedisClient.LOGGER.error(util.format('Redis 获取 %s 失败 => %s',key, e))
        }
        return result;
    }
}