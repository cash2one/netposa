define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var coordHelper = (function () {
        function coordHelper() {
        }
        coordHelper.pi = 3.14159265358979324;
        coordHelper.ee = 0.00669342162296594323;
        coordHelper.x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        coordHelper.pole = 20037508.34;
        coordHelper.a = 6378245.0;
        coordHelper.transform = function (lon, lat) {
            var localHashMap = {};
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
        coordHelper.outofChina = function (lat, lon) {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        };
        coordHelper.transformLat = function (x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * coordHelper.pi) + 20.0 * Math.sin(2.0 * x * coordHelper.pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * coordHelper.pi) + 40.0 * Math.sin(y / 3.0 * coordHelper.pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * coordHelper.pi) + 320 * Math.sin(y * coordHelper.pi / 30.0)) * 2.0 / 3.0;
            return ret;
        };
        coordHelper.transformLon = function (x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * coordHelper.pi) + 20.0 * Math.sin(2.0 * x * coordHelper.pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * coordHelper.pi) + 40.0 * Math.sin(x / 3.0 * coordHelper.pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * coordHelper.pi) + 300.0 * Math.sin(x / 30.0 * coordHelper.pi)) * 2.0 / 3.0;
            return ret;
        };
        coordHelper.gcj2wgs = function (lon, lat) {
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
        coordHelper.bd_encrypt = function (gg_lon, gg_lat) {
            var x = gg_lon, y = gg_lat;
            var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * coordHelper.x_pi);
            var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * coordHelper.x_pi);
            var bd_lon = z * Math.cos(theta) + 0.0065;
            var bd_lat = z * Math.sin(theta) + 0.006;
            return {
                lon: bd_lon,
                lat: bd_lat
            };
        };
        coordHelper.bd_decrypt = function (bd_lon, bd_lat) {
            var x = bd_lon - 0.0065, y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * coordHelper.x_pi);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * coordHelper.x_pi);
            var gg_lon = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return {
                lon: gg_lon,
                lat: gg_lat
            };
        };
        coordHelper.webMoctorJW2PM = function (lon, lat) {
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
        coordHelper.inverseMercator = function (lon, lat) {
            lon = 180 * lon / coordHelper.pole;
            lat = 180 / Math.PI * (2 * Math.atan(Math.exp((lat / coordHelper.pole) * Math.PI)) - Math.PI / 2);
            return {
                lon: lon,
                lat: lat
            };
        };
        return coordHelper;
    }());
    exports.coordHelper = coordHelper;
    ;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9jb3JlL3V0aWxzL3Byb2pVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUEySEEsQ0FBQztRQTFIVSxjQUFFLEdBQVcsbUJBQW1CLENBQUM7UUFDakMsY0FBRSxHQUFXLHNCQUFzQixDQUFDO1FBQ3BDLGdCQUFJLEdBQVcsbUJBQW1CLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwRCxnQkFBSSxHQUFXLFdBQVcsQ0FBQztRQUMzQixhQUFDLEdBQVcsU0FBUyxDQUFBO1FBRXJCLHFCQUFTLEdBQUcsVUFBUyxHQUFXLEVBQUUsR0FBVztZQUNoRCxJQUFJLFlBQVksR0FBRyxFQUVZLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDdkIsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDeEIsQ0FBQztZQUNELElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixLQUFLLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMzQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEcsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEYsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLFlBQVksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLFlBQVksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDeEIsQ0FBQyxDQUFDO1FBRUssc0JBQVUsR0FBRyxVQUFTLEdBQVcsRUFBRSxHQUFXO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUM7UUFFSyx3QkFBWSxHQUFHLFVBQVMsQ0FBUyxFQUFFLENBQVM7WUFDL0MsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDM0csR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDckcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzdHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUM7UUFFSyx3QkFBWSxHQUFHLFVBQVMsQ0FBUyxFQUFFLENBQVM7WUFDL0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RixHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDM0csR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDckcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9HLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUM7UUFFSyxtQkFBTyxHQUFHLFVBQVMsR0FBVyxFQUFFLEdBQVc7WUFDOUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ0osR0FBRyxFQUFFLENBQUM7Z0JBQ04sR0FBRyxFQUFFLENBQUM7YUFDVCxDQUFDO1lBQ0YsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFD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QVEsQ0FBQztZQUNwQixDQUFDO1lBQ0QsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNwQyxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUM7UUFFSywyQkFBZSxHQUFHLFVBQVMsR0FBVyxFQUFFLEdBQVc7WUFDdEQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNuQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLE1BQU0sQ0FBQztnQkFDSCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRzthQUNYLENBQUM7UUFDTixDQUFDLENBQUE7UUFFTCxrQkFBQztLQTNIRCxBQTJIQyxJQUFBO0lBM0hZLGtDQUFXO0lBMkh2QixDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vbWFwL2NvcmUvdXRpbHMvcHJvalV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgY29vcmRIZWxwZXIge1xyXG4gICAgc3RhdGljIHBpOiBudW1iZXIgPSAzLjE0MTU5MjY1MzU4OTc5MzI0OyAvLyDlnIblkajnjodcclxuICAgIHN0YXRpYyBlZTogbnVtYmVyID0gMC4wMDY2OTM0MjE2MjI5NjU5NDMyMzsgLy8gV0dTIOWBj+W/g+eOh+eahOW5s+aWuVxyXG4gICAgc3RhdGljIHhfcGk6IG51bWJlciA9IDMuMTQxNTkyNjUzNTg5NzkzMjQgKiAzMDAwLjAgLyAxODAuMDtcclxuICAgIHN0YXRpYyBwb2xlOiBudW1iZXIgPSAyMDAzNzUwOC4zNDtcclxuICAgIHN0YXRpYyBhOiBudW1iZXIgPSA2Mzc4MjQ1LjAgLy8gV0dTIOmVv+i9tOWNiuW+hFxyXG4gICAgLy8gODQtPueBq+aYn1xyXG4gICAgc3RhdGljIHRyYW5zZm9ybSA9IGZ1bmN0aW9uKGxvbjogbnVtYmVyLCBsYXQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBsb2NhbEhhc2hNYXAgPSB7XHJcblxyXG4gICAgICAgIH0gYXMge2xvbjogbnVtYmVyLCBsYXQ6IG51bWJlcn07XHJcbiAgICAgICAgaWYgKGNvb3JkSGVscGVyLm91dG9mQ2hpbmEobGF0LCBsb24pKSB7XHJcbiAgICAgICAgICAgIGxvY2FsSGFzaE1hcC5sb24gPSBsb247XHJcbiAgICAgICAgICAgIGxvY2FsSGFzaE1hcC5sYXQgPSBsYXQ7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbEhhc2hNYXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkTGF0ID0gY29vcmRIZWxwZXIudHJhbnNmb3JtTGF0KGxvbiAtIDEwNS4wLCBsYXQgLSAzNS4wKTtcclxuICAgICAgICB2YXIgZExvbiA9IGNvb3JkSGVscGVyLnRyYW5zZm9ybUxvbihsb24gLSAxMDUuMCwgbGF0IC0gMzUuMCk7XHJcbiAgICAgICAgdmFyIHJhZExhdCA9IGxhdCAvIDE4MC4wICogY29vcmRIZWxwZXIucGk7XHJcbiAgICAgICAgdmFyIG1hZ2ljID0gTWF0aC5zaW4ocmFkTGF0KTtcclxuICAgICAgICBtYWdpYyA9IDEgLSBjb29yZEhlbHBlci5lZSAqIG1hZ2ljICogbWFnaWM7XHJcbiAgICAgICAgdmFyIHNxcnRNYWdpYyA9IE1hdGguc3FydChtYWdpYyk7XHJcbiAgICAgICAgZExhdCA9IChkTGF0ICogMTgwLjApIC8gKChjb29yZEhlbHBlci5hICogKDEgLSBjb29yZEhlbHBlci5lZSkpIC8gKG1hZ2ljICogc3FydE1hZ2ljKSAqIGNvb3JkSGVscGVyLnBpKTtcclxuICAgICAgICBkTG9uID0gKGRMb24gKiAxODAuMCkgLyAoY29vcmRIZWxwZXIuYSAvIHNxcnRNYWdpYyAqIE1hdGguY29zKHJhZExhdCkgKiBjb29yZEhlbHBlci5waSk7XHJcbiAgICAgICAgdmFyIG1nTGF0ID0gbGF0ICsgZExhdDtcclxuICAgICAgICB2YXIgbWdMb24gPSBsb24gKyBkTG9uO1xyXG4gICAgICAgIGxvY2FsSGFzaE1hcC5sb24gPSBtZ0xvbjtcclxuICAgICAgICBsb2NhbEhhc2hNYXAubGF0ID0gbWdMYXQ7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsSGFzaE1hcDtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIG91dG9mQ2hpbmEgPSBmdW5jdGlvbihsYXQ6IG51bWJlciwgbG9uOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobG9uIDwgNzIuMDA0IHx8IGxvbiA+IDEzNy44MzQ3KVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAobGF0IDwgMC44MjkzIHx8IGxhdCA+IDU1LjgyNzEpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHRyYW5zZm9ybUxhdCA9IGZ1bmN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHJldCA9IC0xMDAuMCArIDIuMCAqIHggKyAzLjAgKiB5ICsgMC4yICogeSAqIHkgKyAwLjEgKiB4ICogeSArIDAuMiAqIE1hdGguc3FydChNYXRoLmFicyh4KSk7XHJcbiAgICAgICAgcmV0ICs9ICgyMC4wICogTWF0aC5zaW4oNi4wICogeCAqIGNvb3JkSGVscGVyLnBpKSArIDIwLjAgKiBNYXRoLnNpbigyLjAgKiB4ICogY29vcmRIZWxwZXIucGkpKSAqIDIuMCAvIDMuMDtcclxuICAgICAgICByZXQgKz0gKDIwLjAgKiBNYXRoLnNpbih5ICogY29vcmRIZWxwZXIucGkpICsgNDAuMCAqIE1hdGguc2luKHkgLyAzLjAgKiBjb29yZEhlbHBlci5waSkpICogMi4wIC8gMy4wO1xyXG4gICAgICAgIHJldCArPSAoMTYwLjAgKiBNYXRoLnNpbih5IC8gMTIuMCAqIGNvb3JkSGVscGVyLnBpKSArIDMyMCAqIE1hdGguc2luKHkgKiBjb29yZEhlbHBlci5waSAvIDMwLjApKSAqIDIuMCAvIDMuMDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTG9uID0gZnVuY3Rpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgcmV0ID0gMzAwLjAgKyB4ICsgMi4wICogeSArIDAuMSAqIHggKiB4ICsgMC4xICogeCAqIHkgKyAwLjEgKiBNYXRoLnNxcnQoTWF0aC5hYnMoeCkpO1xyXG4gICAgICAgIHJldCArPSAoMjAuMCAqIE1hdGguc2luKDYuMCAqIHggKiBjb29yZEhlbHBlci5waSkgKyAyMC4wICogTWF0aC5zaW4oMi4wICogeCAqIGNvb3JkSGVscGVyLnBpKSkgKiAyLjAgLyAzLjA7XHJcbiAgICAgICAgcmV0ICs9ICgyMC4wICogTWF0aC5zaW4oeCAqIGNvb3JkSGVscGVyLnBpKSArIDQwLjAgKiBNYXRoLnNpbih4IC8gMy4wICogY29vcmRIZWxwZXIucGkpKSAqIDIuMCAvIDMuMDtcclxuICAgICAgICByZXQgKz0gKDE1MC4wICogTWF0aC5zaW4oeCAvIDEyLjAgKiBjb29yZEhlbHBlci5waSkgKyAzMDAuMCAqIE1hdGguc2luKHggLyAzMC4wICogY29vcmRIZWxwZXIucGkpKSAqIDIuMCAvIDMuMDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuICAgIC8vIOeBq+aYny0+ODRcclxuICAgIHN0YXRpYyBnY2oyd2dzID0gZnVuY3Rpb24obG9uOiBudW1iZXIsIGxhdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHAgPSB7XHJcbiAgICAgICAgICAgIGxvbjogMCxcclxuICAgICAgICAgICAgbGF0OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbG9udGl0dWRlID0gbG9uIC0gKGNvb3JkSGVscGVyLnRyYW5zZm9ybShsb24sIGxhdCkubG9uIC0gbG9uKTtcclxuICAgICAgICB2YXIgbGF0aXR1ZGUgPSBsYXQgLSAoY29vcmRIZWxwZXIudHJhbnNmb3JtKGxvbiwgbGF0KS5sYXQgLSBsYXQpO1xyXG4gICAgICAgIHAubG9uID0gbG9udGl0dWRlO1xyXG4gICAgICAgIHAubGF0ID0gbGF0aXR1ZGU7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOeBq+aYn+WdkOagh+i9rOeZvuW6puWdkOagh1xyXG4gICAgc3RhdGljIGJkX2VuY3J5cHQgPSBmdW5jdGlvbihnZ19sb246IG51bWJlciwgZ2dfbGF0OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgeCA9IGdnX2xvbixcclxuICAgICAgICAgICAgeSA9IGdnX2xhdDtcclxuICAgICAgICB2YXIgeiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KSArIDAuMDAwMDIgKiBNYXRoLnNpbih5ICogY29vcmRIZWxwZXIueF9waSk7XHJcbiAgICAgICAgdmFyIHRoZXRhID0gTWF0aC5hdGFuMih5LCB4KSArIDAuMDAwMDAzICogTWF0aC5jb3MoeCAqIGNvb3JkSGVscGVyLnhfcGkpO1xyXG4gICAgICAgIHZhciBiZF9sb24gPSB6ICogTWF0aC5jb3ModGhldGEpICsgMC4wMDY1O1xyXG4gICAgICAgIHZhciBiZF9sYXQgPSB6ICogTWF0aC5zaW4odGhldGEpICsgMC4wMDY7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9uOiBiZF9sb24sXHJcbiAgICAgICAgICAgIGxhdDogYmRfbGF0XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g55m+5bqm5Z2Q5qCH6L2s54Gr5pif5Z2Q5qCHXHJcbiAgICBzdGF0aWMgYmRfZGVjcnlwdCA9IGZ1bmN0aW9uKGJkX2xvbjogbnVtYmVyLCBiZF9sYXQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciB4ID0gYmRfbG9uIC0gMC4wMDY1LFxyXG4gICAgICAgICAgICB5ID0gYmRfbGF0IC0gMC4wMDY7XHJcbiAgICAgICAgdmFyIHogPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkgLSAwLjAwMDAyICogTWF0aC5zaW4oeSAqIGNvb3JkSGVscGVyLnhfcGkpO1xyXG4gICAgICAgIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoeSwgeCkgLSAwLjAwMDAwMyAqIE1hdGguY29zKHggKiBjb29yZEhlbHBlci54X3BpKTtcclxuICAgICAgICB2YXIgZ2dfbG9uID0geiAqIE1hdGguY29zKHRoZXRhKTtcclxuICAgICAgICB2YXIgZ2dfbGF0ID0geiAqIE1hdGguc2luKHRoZXRhKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb246IGdnX2xvbixcclxuICAgICAgICAgICAgbGF0OiBnZ19sYXRcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDnu4/nuqzluqYtPiDloqjljaHmiZjmipXlvbHovazmjaJcclxuICAgIHN0YXRpYyB3ZWJNb2N0b3JKVzJQTSA9IGZ1bmN0aW9uKGxvbjogbnVtYmVyLCBsYXQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBjID0ge1xyXG4gICAgICAgICAgICBsb246IDAsXHJcbiAgICAgICAgICAgIGxhdDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYy5sb24gPSAobG9uIC8gMTgwLjApICogMjAwMzc1MDguMzQ7XHJcbiAgICAgICAgaWYgKGxhdCA+IDg1LjA1MTEyKSB7XHJcbiAgICAgICAgICAgIGxhdCA9IDg1LjA1MTEyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGF0IDwgLTg1LjA1MTEyKSB7XHJcbiAgICAgICAgICAgIGxhdCA9IC04NS4wNTExMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGF0ID0gKE1hdGguUEkgLyAxODAuMCkgKiBsYXQ7XHJcbiAgICAgICAgdmFyIHRtcCA9IE1hdGguUEkgLyA0LjAgKyBsYXQgLyAyLjA7XHJcbiAgICAgICAgYy5sYXQgPSAyMDAzNzUwOC4zNCAqIE1hdGgubG9nKE1hdGgudGFuKHRtcCkpIC8gTWF0aC5QSTtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH07XHJcbiAgICAvLyDloqjljaHmiZjmipXlvbHovazmjaIt44CL57uP57qs5bqmXHJcbiAgICBzdGF0aWMgaW52ZXJzZU1lcmNhdG9yID0gZnVuY3Rpb24obG9uOiBudW1iZXIsIGxhdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbG9uID0gMTgwICogbG9uIC8gY29vcmRIZWxwZXIucG9sZTtcclxuICAgICAgICBsYXQgPSAxODAgLyBNYXRoLlBJICogKDIgKiBNYXRoLmF0YW4oTWF0aC5leHAoKGxhdCAvIGNvb3JkSGVscGVyLnBvbGUpICogTWF0aC5QSSkpIC0gTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvbjogbG9uLFxyXG4gICAgICAgICAgICBsYXQ6IGxhdFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG59O1xyXG4iXX0=
