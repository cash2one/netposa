define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getTime(timestamp) {
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        var minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        var currentTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        return currentTime;
    }
    var AttributeFactory = (function () {
        function AttributeFactory() {
            this.getAttributeSex = function (Status) {
                var sex = "";
                switch (Status) {
                    case "0":
                        sex = "未知";
                        break;
                    case "1":
                        sex = "男";
                        break;
                    case "2":
                        sex = "女";
                        break;
                }
                return sex;
            };
            this.getAttributeFeature = function (Glass, IsPants, IsSleeve, Mask, Smile) {
                var feature = "";
                switch (Glass) {
                    case 0:
                        feature += "太阳镜 ";
                        break;
                    case 1:
                        feature += "普通眼镜 ";
                        break;
                    default:
                        break;
                }
                switch (IsPants) {
                    case 1:
                        feature += "穿短裤 ";
                        break;
                    default:
                        break;
                }
                switch (IsSleeve) {
                    case 1:
                        feature += "穿短袖 ";
                        break;
                    default:
                        break;
                }
                switch (Mask) {
                    case 1:
                        feature += "戴面具 ";
                        break;
                    default:
                        break;
                }
                switch (Smile) {
                    case 1:
                        feature += "微笑 ";
                        break;
                    default:
                        break;
                }
                return feature;
            };
            this.getAttributeAge = function (num) {
                var ageName = "";
                if ((num <= 20) && (num >= 1)) {
                    ageName = "少年";
                }
                else if ((num <= 40) && (num >= 21)) {
                    ageName = "青年";
                }
                else if ((num <= 60) && (num >= 41)) {
                    ageName = "壮年";
                }
                else if (num > 60) {
                    ageName = "老年";
                }
                return ageName;
            };
            this.getAttributeHairStyle = function () {
                return "未知";
            };
            this.getAttributeGlasses = function (num) {
                var name = "";
                switch (num) {
                    case 0:
                        name = "太阳镜";
                        break;
                    case 1:
                        name = "普通眼镜";
                        break;
                    default:
                        break;
                }
                return name;
            };
            this.getAttributeEquipment = function (num) {
                var name = "";
                return name;
            };
            this.getAttributeClothing = function (param) {
                var name = "";
                switch (param.IsSleeve) {
                    case 0:
                        name += "穿长袖 ";
                        break;
                    case 1:
                        name += "穿短袖 ";
                        break;
                    default:
                        break;
                }
                switch (param.IsPants) {
                    case 0:
                        name += "穿长袖 ";
                        break;
                    case 1:
                        name += "穿短裤 ";
                        break;
                    default:
                        break;
                }
                return name;
            };
            this.getAttributeCap = function () {
                var name = "";
                return name;
            };
            this.getAttributeMask = function (num) {
                var name = "";
                switch (num) {
                    case 0:
                        name = "没戴口罩";
                        break;
                    case 1:
                        name = "戴口罩";
                        break;
                    default:
                        name = "未知";
                        break;
                }
                return name;
            };
            this.getAttributeBelongings = function () {
                var name = "";
                return name;
            };
            this.getAttributeShoe = function () {
                var name = "";
                return name;
            };
            this.getCrossTrainTime = function (num) {
                var timestamp = (new Date()).valueOf();
                var time = {
                    startTime: "",
                    endTime: ""
                };
                time.endTime = getTime(timestamp);
                if (num === 1) {
                    timestamp = timestamp - 1 * 24 * 60 * 60 * 1000;
                }
                else if (num === 2) {
                    timestamp = timestamp - 7 * 24 * 60 * 60 * 1000;
                }
                else if (num === 3) {
                    timestamp = timestamp - 30 * 24 * 60 * 60 * 1000;
                }
                else if (num === 0) {
                    timestamp = timestamp - 365 * 24 * 60 * 60 * 1000;
                }
                time.startTime = getTime(timestamp);
                return time;
            };
            this.numTransform = function (num) {
                if (num > 0) {
                    var reg = /(?=(?!\b)(\d{3})+$)/g;
                    return String(num).replace(reg, ',');
                }
                else {
                    return "0";
                }
            };
        }
        return AttributeFactory;
    }());
    exports.AttributeFactory = AttributeFactory;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvYXR0cmlidXRlLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0JBLGlCQUFpQixTQUFpQjtRQUM5QixJQUFJLElBQUksR0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksR0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNaLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLElBQUksR0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFM0UsSUFBSSxJQUFJLEdBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlFLElBQUksTUFBTSxHQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0RixJQUFJLE1BQU0sR0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFB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R0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNOLElBQUksR0FBRyxHQUFDLHNCQUFzQixDQUFDO29CQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDZixDQUFDO1lBQ0wsQ0FBQyxDQUFBO1FBQ0wsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FqTUEsQUFpTUMsSUFBQTtJQWpNWSw0Q0FBZ0IiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWN0b3J5L2F0dHJpYnV0ZS5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIGNyZWF0ZSBieSBjZG1cclxuICog5bGe5oCn6L2s5o2iXHJcbiAqIEB0aW1lOiAyMDE3LTA5LTI3XHJcbiAqL1xyXG5pbnRlcmZhY2UgSUF0dHJpYnV0ZUZhY3Rvcnkge1xyXG4gICAgZ2V0QXR0cmlidXRlU2V4OiAoU3RhdHVzOiBzdHJpbmcpID0+IHN0cmluZztcclxuICAgIGdldEF0dHJpYnV0ZUZlYXR1cmU6IChHbGFzczogbnVtYmVyLCBJc1BhbnRzOiBudW1iZXIsIElzU2xlZXZlOiBudW1iZXIsIE1hc2s6IG51bWJlciwgU21pbGU6IG51bWJlcikgPT4gc3RyaW5nO1xyXG4gICAgZ2V0QXR0cmlidXRlQWdlOiAobnVtOiBudW1iZXIpID0+IHN0cmluZztcclxuICAgIGdldEF0dHJpYnV0ZUhhaXJTdHlsZTogKCkgPT4gc3RyaW5nO1xyXG4gICAgZ2V0QXR0cmlidXRlR2xhc3NlczogKG51bTogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgICBnZXRBdHRyaWJ1dGVFcXVpcG1lbnQ6IChudW06IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gICAgZ2V0QXR0cmlidXRlQ2xvdGhpbmc6IChwYXJhbTogYW55KSA9PiBzdHJpbmc7XHJcbiAgICBnZXRBdHRyaWJ1dGVDYXA6IChwYXJhbTogYW55KSA9PiBzdHJpbmc7XHJcbiAgICBnZXRBdHRyaWJ1dGVNYXNrOiAocGFyYW06IGFueSkgPT4gc3RyaW5nO1xyXG4gICAgZ2V0QXR0cmlidXRlQmVsb25naW5nczogKHBhcmFtOiBhbnkpID0+IHN0cmluZztcclxuICAgIGdldEF0dHJpYnV0ZVNob2U6IChwYXJhbTogYW55KSA9PiBzdHJpbmc7IC8vIOiOt+WPlumei+WtkOWxnuaAp1xyXG4gICAgZ2V0Q3Jvc3NUcmFpblRpbWU6IChudW06IG51bWJlcikgPT4gc3RyaW5nOyAvLyDojrflj5bml7bmrrVcclxuICAgIG51bVRyYW5zZm9ybTogKG51bTogbnVtYmVyKSA9PiBzdHJpbmc7IC8vIOaVsOWtl+agvOW8j+i9rOaNouaIkOWNg+WIhuS9jVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lKHRpbWVzdGFtcDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCB0aW1lOmFueSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XHJcbiAgICBsZXQgeWVhcjphbnkgPSB0aW1lLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW9udGg6YW55ID0gdGltZS5nZXRNb250aCgpICsgMTtcclxuICAgIGlmKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xyXG4gICAgfVxyXG4gICAgbGV0IGRhdGU6YW55ID0gdGltZS5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgdGltZS5nZXREYXRlKCkgOiB0aW1lLmdldERhdGUoKTtcclxuXHJcbiAgICBsZXQgaG91cjphbnkgPSB0aW1lLmdldEhvdXJzKCkgPCAxMCA/IFwiMFwiICsgdGltZS5nZXRIb3VycygpIDogdGltZS5nZXRIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZTphbnkgPSB0aW1lLmdldE1pbnV0ZXMoKSA8IDEwID8gXCIwXCIgKyB0aW1lLmdldE1pbnV0ZXMoKSA6IHRpbWUuZ2V0TWludXRlcygpO1xyXG4gICAgbGV0IHNlY29uZDphbnkgPSB0aW1lLmdldFNlY29uZHMoKSA8IDEwID8gXCIwXCIgKyB0aW1lLmdldFNlY29uZHMoKSA6IHRpbWUuZ2V0U2Vjb25kcygpO1xyXG5cclxuICAgIGxldCBjdXJyZW50VGltZSA9IHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBkYXRlICsgXCIgXCIgKyBob3VyICsgXCI6XCIgKyBtaW51dGUgKyBcIjpcIiArIHNlY29uZDtcclxuXHJcbiAgICByZXR1cm4gY3VycmVudFRpbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVGYWN0b3J5IGltcGxlbWVudHMgSUF0dHJpYnV0ZUZhY3Rvcnkge1xyXG4gICAgZ2V0QXR0cmlidXRlU2V4ID0gKFN0YXR1czogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IHNleDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKFN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICAgICAgc2V4ID0gXCLmnKrnn6VcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICAgICAgc2V4ID0gXCLnlLdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgICAgc2V4ID0gXCLlpbNcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2V4O1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBdHRyaWJ1dGVGZWF0dXJlID0gKEdsYXNzOiBudW1iZXIsIElzUGFudHM6IG51bWJlciwgSXNTbGVldmU6IG51bWJlciwgTWFzazogbnVtYmVyLCBTbWlsZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IGZlYXR1cmU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChHbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlICs9IFwi5aSq6Ziz6ZWcIFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGZlYXR1cmUgKz0gXCLmma7pgJrnnLzplZwgXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKElzUGFudHMpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZSArPSBcIuepv+efreijpCBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoSXNTbGVldmUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZSArPSBcIuepv+efreiiliBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoTWFzaykge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlICs9IFwi5oi06Z2i5YW3IFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChTbWlsZSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlICs9IFwi5b6u56yRIFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZlYXR1cmU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEF0dHJpYnV0ZUFnZSA9IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBhZ2VOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmICgobnVtIDw9IDIwKSAmJiAobnVtID49IDEpKSB7XHJcbiAgICAgICAgICAgIGFnZU5hbWUgPSBcIuWwkeW5tFwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKG51bSA8PSA0MCkgJiYgKG51bSA+PSAyMSkpIHtcclxuICAgICAgICAgICAgYWdlTmFtZSA9IFwi6Z2S5bm0XCI7XHJcbiAgICAgICAgfSBlbHNlIGlmICgobnVtIDw9IDYwKSAmJiAobnVtID49IDQxKSkge1xyXG4gICAgICAgICAgICBhZ2VOYW1lID0gXCLlo67lubRcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bSA+IDYwKSB7XHJcbiAgICAgICAgICAgIGFnZU5hbWUgPSBcIuiAgeW5tFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFnZU5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEF0dHJpYnV0ZUhhaXJTdHlsZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gXCLmnKrnn6VcIjtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0QXR0cmlidXRlR2xhc3NlcyA9IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAobnVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBcIuWkqumYs+mVnFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBcIuaZrumAmuecvOmVnFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBdHRyaWJ1dGVFcXVpcG1lbnQgPSAobnVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEF0dHJpYnV0ZUNsb3RoaW5nID0gKHBhcmFtOiBhbnkpID0+IHtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyDliKTmlq3kuIrooaNcclxuICAgICAgICBzd2l0Y2ggKHBhcmFtLklzU2xlZXZlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIG5hbWUgKz0gXCLnqb/plb/oopYgXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgbmFtZSArPSBcIuepv+efreiiliBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWIpOaWreS4i+iho1xyXG4gICAgICAgIHN3aXRjaCAocGFyYW0uSXNQYW50cykge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBuYW1lICs9IFwi56m/6ZW/6KKWIFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIG5hbWUgKz0gXCLnqb/nn63oo6QgXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEF0dHJpYnV0ZUNhcCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEF0dHJpYnV0ZU1hc2sgPSAobnVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKG51bSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gXCLmsqHmiLTlj6PnvalcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gXCLmiLTlj6PnvalcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbmFtZSA9IFwi5pyq55+lXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBdHRyaWJ1dGVCZWxvbmdpbmdzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0QXR0cmlidXRlU2hvZSA9ICgpID0+IHtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldENyb3NzVHJhaW5UaW1lID0gKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcDogbnVtYmVyID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgdGltZTphbnkgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0VGltZTogXCJcIixcclxuICAgICAgICAgICAgZW5kVGltZTogXCJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGltZS5lbmRUaW1lID0gZ2V0VGltZSh0aW1lc3RhbXApO1xyXG4gICAgICAgIGlmIChudW0gPT09IDEpIHtcclxuICAgICAgICAgICAgdGltZXN0YW1wID0gdGltZXN0YW1wIC0gMSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09IDIpIHtcclxuICAgICAgICAgICAgdGltZXN0YW1wID0gdGltZXN0YW1wIC0gNyAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09IDMpIHtcclxuICAgICAgICAgICAgdGltZXN0YW1wID0gdGltZXN0YW1wIC0gMzAgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IHRpbWVzdGFtcCAtIDM2NSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRpbWUuc3RhcnRUaW1lID0gZ2V0VGltZSh0aW1lc3RhbXApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH07XHJcblxyXG4gICAgbnVtVHJhbnNmb3JtID0gKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICBsZXQgcmVnPS8oPz0oPyFcXGIpKFxcZHszfSkrJCkvZztcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhudW0pLnJlcGxhY2UocmVnLCAnLCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
