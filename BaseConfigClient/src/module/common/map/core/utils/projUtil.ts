export class coordHelper {
    static pi: number = 3.14159265358979324; // 圆周率
    static ee: number = 0.00669342162296594323; // WGS 偏心率的平方
    static x_pi: number = 3.14159265358979324 * 3000.0 / 180.0;
    static pole: number = 20037508.34;
    static a: number = 6378245.0 // WGS 长轴半径
    // 84->火星
    static transform = function(lon: number, lat: number) {
        var localHashMap = {

        } as {lon: number, lat: number};
        if (coordHelper.outofChina(lat, lon)) {
            localHashMap.lon = lon;
            localHashMap.lat = lat;
            return localHashMap;
        }
        var dLat = coordHelper.transformLat(lon - 105.0, lat - 35.0);
        var dLon = coordHelper.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * coordHelper.pi;
        var magic = Math.sin(radLat);
        magic = 1 - coordHelper.ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((coordHelper.a * (1 - coordHelper.ee)) / (magic * sqrtMagic) * coordHelper.pi);
        dLon = (dLon * 180.0) / (coordHelper.a / sqrtMagic * Math.cos(radLat) * coordHelper.pi);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        localHashMap.lon = mgLon;
        localHashMap.lat = mgLat;
        return localHashMap;
    };

    static outofChina = function(lat: number, lon: number) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    };

    static transformLat = function(x: number, y: number) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * coordHelper.pi) + 20.0 * Math.sin(2.0 * x * coordHelper.pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * coordHelper.pi) + 40.0 * Math.sin(y / 3.0 * coordHelper.pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * coordHelper.pi) + 320 * Math.sin(y * coordHelper.pi / 30.0)) * 2.0 / 3.0;
        return ret;
    };

    static transformLon = function(x: number, y: number) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * coordHelper.pi) + 20.0 * Math.sin(2.0 * x * coordHelper.pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * coordHelper.pi) + 40.0 * Math.sin(x / 3.0 * coordHelper.pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * coordHelper.pi) + 300.0 * Math.sin(x / 30.0 * coordHelper.pi)) * 2.0 / 3.0;
        return ret;
    };
    // 火星->84
    static gcj2wgs = function(lon: number, lat: number) {
        var p = {
            lon: 0,
            lat: 0
        };
        var lontitude = lon - (coordHelper.transform(lon, lat).lon - lon);
        var latitude = lat - (coordHelper.transform(lon, lat).lat - lat);
        p.lon = lontitude;
        p.lat = latitude;
        return p;
    };

    // 火星坐标转百度坐标
    static bd_encrypt = function(gg_lon: number, gg_lat: number) {
        var x = gg_lon,
            y = gg_lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * coordHelper.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * coordHelper.x_pi);
        var bd_lon = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return {
            lon: bd_lon,
            lat: bd_lat
        };
    };

    // 百度坐标转火星坐标
    static bd_decrypt = function(bd_lon: number, bd_lat: number) {
        var x = bd_lon - 0.0065,
            y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * coordHelper.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * coordHelper.x_pi);
        var gg_lon = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return {
            lon: gg_lon,
            lat: gg_lat
        };
    };

    // 经纬度-> 墨卡托投影转换
    static webMoctorJW2PM = function(lon: number, lat: number) {
        var c = {
            lon: 0,
            lat: 0
        };
        c.lon = (lon / 180.0) * 20037508.34;
        if (lat > 85.05112) {
            lat = 85.05112;
        }
        if (lat < -85.05112) {
            lat = -85.05112;
        }
        lat = (Math.PI / 180.0) * lat;
        var tmp = Math.PI / 4.0 + lat / 2.0;
        c.lat = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;
        return c;
    };
    // 墨卡托投影转换-》经纬度
    static inverseMercator = function(lon: number, lat: number) {
        lon = 180 * lon / coordHelper.pole;
        lat = 180 / Math.PI * (2 * Math.atan(Math.exp((lat / coordHelper.pole) * Math.PI)) - Math.PI / 2);
        return {
            lon: lon,
            lat: lat
        };
    }

};
