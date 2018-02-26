/**
 * Create by xupengtao on 2017/4/19
 */
import * as cache from "memory-cache";

export default class CacheProxy {

    /**
     * 添加缓存(超时)
     * @param key 缓存名 
     * @param value  缓存值
     * @param timeout 超时时间（毫秒）
     */
    public static putWithTimeout(key: string, value: Object,timeout: number) {
        // Time in ms
        cache.put(key, value, timeout); 
    }

    /**
     * 添加缓存
     * @param key 缓存名
     * @param value 缓存值
     */
    public static put(key: string, value: Object) {
        cache.put(key, value); 
    }

    /**
     * 获取缓存
     * @param key 缓存名
     */
    public static get(key: string) {
        return cache.get(key);
    }

}