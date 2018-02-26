define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dt = new Date();
    var y = (dt.getFullYear()).toString();
    var m = (dt.getMonth() + 1).toString();
    var d = (dt.getDate()).toString();
    var hh = (dt.getHours()).toString();
    var mm = (dt.getMinutes()).toString();
    var ss = (dt.getSeconds()).toString();
    parseInt(m) < 10 ? m = "0" + m : m;
    parseInt(d) < 10 ? d = "0" + d : d;
    parseInt(hh) < 10 ? hh = "0" + hh : hh;
    parseInt(mm) < 10 ? mm = "0" + mm : mm;
    parseInt(ss) < 10 ? ss = "0" + ss : ss;
    function GetNDayTime(n) {
        var time = {};
        var dd = new Date();
        dd.setDate(dd.getDate() + n);
        var year = dd.getFullYear();
        var month = (dd.getMonth() + 1).toString();
        var day = (dd.getDate()).toString();
        parseInt(month) < 10 ? month = "0" + month : month;
        parseInt(day) < 10 ? day = "0" + day : day;
        time.startTime = year + "-" + month + "-" + day + " 00:00:00";
        time.endTime = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
        return time;
    }
    exports.GetNDayTime = GetNDayTime;
    exports.FastData = {
        all: { key: 'all', value: 'all', text: '全部' },
        oneDay: { key: 'oneDay', value: GetNDayTime(-1), text: '近一天' },
        threeDay: { key: 'threeDay', value: GetNDayTime(-3), text: '近三天' },
        weekDay: { key: 'weekDay', value: GetNDayTime(-7), text: '近一周' },
        selectDay: { key: 'selectDay', value: 'select', text: '自定义' }
    };
    function getFastDataList() {
        var arr = [];
        for (var k in exports.FastData) {
            arr.push({ key: exports.FastData[k].key, value: exports.FastData[k].value, text: exports.FastData[k].text });
        }
        return arr;
    }
    exports.getFastDataList = getFastDataList;
    exports.ModelData = {
        all: { key: 'all', value: 'all', text: '全部' },
        face: { key: 'face', value: 'face', text: '人脸' },
        body: { key: 'body', value: 'body', text: '人体' },
        portrait: { key: 'portrait', value: 'portrait', text: '人像检索' }
    };
    function getModelDataList() {
        var arr = [];
        for (var k in exports.ModelData) {
            arr.push({ key: exports.ModelData[k].key, value: exports.ModelData[k].value, text: exports.ModelData[k].text });
        }
        return arr;
    }
    exports.getModelDataList = getModelDataList;
    exports.SexData = {
        all: { key: 'all', value: 'all', text: '全部' },
        man: { key: 'man', value: 'man', text: '男' },
        women: { key: 'women', value: 'women', text: '女' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getSexDataList() {
        var arr = [];
        for (var k in exports.SexData) {
            arr.push({ key: exports.SexData[k].key, value: exports.SexData[k].value, text: exports.SexData[k].text });
        }
        return arr;
    }
    exports.getSexDataList = getSexDataList;
    exports.GlassesData = {
        all: { key: 'all', value: 'all', text: '全部' },
        yes: { key: 'yes', value: 'yes', text: '戴眼镜' },
        no: { key: 'no', value: 'no', text: '不戴眼镜' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getGlassesDataList() {
        var arr = [];
        for (var k in exports.GlassesData) {
            arr.push({ key: exports.GlassesData[k].key, value: exports.GlassesData[k].value, text: exports.GlassesData[k].text });
        }
        return arr;
    }
    exports.getGlassesDataList = getGlassesDataList;
    exports.CapData = {
        all: { key: 'all', value: 'all', text: '全部' },
        yes: { key: 'yes', value: 'yes', text: '戴帽子' },
        no: { key: 'no', value: 'no', text: '不戴帽子' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getCapDataList() {
        var arr = [];
        for (var k in exports.CapData) {
            arr.push({ key: exports.CapData[k].key, value: exports.CapData[k].value, text: exports.CapData[k].text });
        }
        return arr;
    }
    exports.getCapDataList = getCapDataList;
    exports.MaskData = {
        all: { key: 'all', value: 'all', text: '全部' },
        yes: { key: 'yes', value: 'yes', text: '戴口罩' },
        no: { key: 'no', value: 'no', text: '不戴口罩' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getMaskDataList() {
        var arr = [];
        for (var k in exports.MaskData) {
            arr.push({ key: exports.MaskData[k].key, value: exports.MaskData[k].value, text: exports.MaskData[k].text });
        }
        return arr;
    }
    exports.getMaskDataList = getMaskDataList;
    exports.ToteData = {
        all: { key: 'all', value: 'all', text: '全部' },
        bag: { key: 'bag', value: 'bag', text: '包' },
        box: { key: 'box', value: 'box', text: '拉杆箱' },
        cart: { key: 'cart', value: 'cart', text: '推车' },
        child: { key: 'child', value: 'child', text: '抱小孩' },
        umbrella: { key: 'umbrella', value: 'umbrella', text: '打伞' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getToteDataList() {
        var arr = [];
        for (var k in exports.ToteData) {
            arr.push({ key: exports.ToteData[k].key, value: exports.ToteData[k].value, text: exports.ToteData[k].text });
        }
        return arr;
    }
    exports.getToteDataList = getToteDataList;
    exports.AgeData = {
        all: { key: 'all', value: 'all', text: '全部' },
        teenager: { key: 'teenager', value: 'teenager', text: '少年' },
        young: { key: 'young', value: 'young', text: '青年' },
        old: { key: 'old', value: 'old', text: '老年' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getAgeDataList() {
        var arr = [];
        for (var k in exports.AgeData) {
            arr.push({ key: exports.AgeData[k].key, value: exports.AgeData[k].value, text: exports.AgeData[k].text });
        }
        return arr;
    }
    exports.getAgeDataList = getAgeDataList;
    exports.ClothesData = {
        all: { key: 'all', value: 'all', text: '全部' },
        longsleeve: { key: 'longsleeve', value: 'longsleeve', text: '长袖' },
        shortsleeve: { key: 'shortsleeve', value: 'shortsleeve', text: '短袖' },
        vest: { key: 'vest', value: 'vest', text: '背心' },
        longs: { key: 'longs', value: 'longs', text: '长裤' },
        shorts: { key: 'shorts', value: 'shorts', text: '短裤' },
        skirt: { key: 'skirt', value: 'skirt', text: '裙子' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getClothesDataList() {
        var arr = [];
        for (var k in exports.ClothesData) {
            arr.push({ key: exports.ClothesData[k].key, value: exports.ClothesData[k].value, text: exports.ClothesData[k].text });
        }
        return arr;
    }
    exports.getClothesDataList = getClothesDataList;
    exports.HairData = {
        all: { key: 'all', value: 'all', text: '全部' },
        long: { key: 'long', value: 'long', text: '长发' },
        mid: { key: 'mid', value: 'mid', text: '中长发' },
        short: { key: 'short', value: 'short', text: '短发' },
        bald: { key: 'bald', value: 'bald', text: '秃头' },
        haido: { key: 'haido', value: 'haido', text: '束发' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getHairDataList() {
        var arr = [];
        for (var k in exports.HairData) {
            arr.push({ key: exports.HairData[k].key, value: exports.HairData[k].value, text: exports.HairData[k].text });
        }
        return arr;
    }
    exports.getHairDataList = getHairDataList;
    exports.ShoesData = {
        all: { key: 'all', value: 'all', text: '全部' },
        sneaker: { key: 'sneaker', value: 'sneaker', text: '运动鞋' },
        leather: { key: 'leather', value: 'leather', text: '皮鞋' },
        slippers: { key: 'slippers', value: 'slippers', text: '拖鞋' },
        sandal: { key: 'sandal', value: 'sandal', text: '凉鞋' },
        boot: { key: 'boot', value: 'boot', text: '靴子' },
        unknown: { key: 'unknown', value: 'unknown', text: '未知' }
    };
    function getShoesDataList() {
        var arr = [];
        for (var k in exports.ShoesData) {
            arr.push({ key: exports.ShoesData[k].key, value: exports.ShoesData[k].value, text: exports.ShoesData[k].text });
        }
        return arr;
    }
    exports.getShoesDataList = getShoesDataList;
    exports.VehicleTypeData = {
        all: { key: 'all', value: 'all', text: '全部' },
        car: { key: 'car', value: 'car', text: '轿车' },
        SUV: { key: 'SUV', value: 'SUV', text: 'SUV' },
        MPV: { key: 'MPV', value: 'MPV', text: 'MPV' },
        roadster: { key: 'roadster', value: 'roadster', text: '跑车' },
        minivan: { key: 'minivan', value: 'minivan', text: '微面' },
        microcalorie: { key: 'microcalorie', value: 'microcalorie', text: '微卡' },
        light: { key: 'light', value: 'light', text: '轻客' },
        pickup: { key: 'pickup', value: 'pickup', text: '皮卡' }
    };
    function getVehicleTypeDataList() {
        var arr = [];
        for (var k in exports.VehicleTypeData) {
            arr.push({ key: exports.VehicleTypeData[k].key, value: exports.VehicleTypeData[k].value, text: exports.VehicleTypeData[k].text });
        }
        return arr;
    }
    exports.getVehicleTypeDataList = getVehicleTypeDataList;
    exports.BrandData = {
        all: { key: 'all', value: 'all', text: '全部' },
        hot: { key: 'hot', value: 'hot', text: '热门' },
        A: { key: 'A', value: 'A', text: 'A' },
        B: { key: 'B', value: 'B', text: 'B' },
        C: { key: 'C', value: 'C', text: 'C' },
        D: { key: 'D', value: 'D', text: 'D' },
        E: { key: 'E', value: 'E', text: 'E' },
        F: { key: 'F', value: 'F', text: 'F' },
        G: { key: 'G', value: 'G', text: 'G' },
        H: { key: 'H', value: 'H', text: 'H' },
        I: { key: 'I', value: 'I', text: 'I' },
        J: { key: 'J', value: 'J', text: 'J' },
        K: { key: 'K', value: 'K', text: 'K' },
        L: { key: 'L', value: 'L', text: 'L' },
        M: { key: 'M', value: 'M', text: 'M' },
        N: { key: 'N', value: 'N', text: 'N' },
        O: { key: 'O', value: 'O', text: 'O' },
        P: { key: 'P', value: 'P', text: 'P' },
        Q: { key: 'Q', value: 'Q', text: 'Q' },
        R: { key: 'R', value: 'R', text: 'R' },
        S: { key: 'S', value: 'S', text: 'S' },
        T: { key: 'T', value: 'T', text: 'T' },
        U: { key: 'U', value: 'U', text: 'U' },
        V: { key: 'V', value: 'V', text: 'V' },
        W: { key: 'W', value: 'W', text: 'W' },
        X: { key: 'X', value: 'X', text: 'X' },
        Y: { key: 'Y', value: 'Y', text: 'Y' },
        Z: { key: 'Z', value: 'Z', text: 'Z' },
    };
    function getBrandDataList() {
        var arr = [];
        for (var k in exports.BrandData) {
            arr.push({ key: exports.BrandData[k].key, value: exports.BrandData[k].value, text: exports.BrandData[k].text });
        }
        return arr;
    }
    exports.getBrandDataList = getBrandDataList;
    exports.ColorData = {
        all: { key: 'all', value: 'all', text: '全部' },
        blue: { key: 'blue', value: 'blue', text: 'blue' },
        yellow: { key: 'yellow', value: 'yellow', text: 'yellow' },
        black: { key: 'black', value: 'black', text: 'black' },
        green: { key: 'green', value: 'green', text: 'green' },
        pink: { key: 'pink', value: 'pink', text: 'pink' },
        red: { key: 'red', value: 'red', text: 'red' },
        gray: { key: 'gray', value: 'liggrayht', text: 'gray' },
        purple: { key: 'purple', value: 'purple', text: 'purple' }
    };
    function getColorDataList() {
        var arr = [];
        for (var k in exports.ColorData) {
            arr.push({ key: exports.ColorData[k].key, value: exports.ColorData[k].value, text: exports.ColorData[k].text });
        }
        return arr;
    }
    exports.getColorDataList = getColorDataList;
    function SexList() {
        var data = [
            {
                status: false,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '男',
                val: 'Men'
            }, {
                status: false,
                name: '女',
                val: 'Women'
            }, {
                status: false,
                name: '未知',
                val: 'unknown'
            }
        ];
        return data;
    }
    exports.SexList = SexList;
    function CrossTrainTimeList() {
        var data = [
            {
                status: false,
                name: '全部',
                val: 0
            }, {
                status: false,
                name: '近一天',
                val: 1
            }, {
                status: false,
                name: '近一周',
                val: 2
            }, {
                status: true,
                name: '近一月',
                val: 3
            }, {
                status: false,
                name: '自定义',
                val: 4
            }
        ];
        return data;
    }
    exports.CrossTrainTimeList = CrossTrainTimeList;
    function PatternList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: ' 人脸',
                val: '1'
            }, {
                status: false,
                name: '人体',
                val: '2'
            }, {
                status: false,
                name: '人像检索',
                val: '3'
            }
        ];
        return data;
    }
    exports.PatternList = PatternList;
    function EquipmentList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '包',
                val: 1
            }, {
                status: false,
                name: '拉杆箱',
                val: 2
            }, {
                status: false,
                name: '推车',
                val: 3
            }, {
                status: false,
                name: '抱小孩',
                val: 4
            }, {
                status: false,
                name: '打伞',
                val: 5
            }, {
                status: false,
                name: '未知',
                val: 6
            }
        ];
        return data;
    }
    exports.EquipmentList = EquipmentList;
    function AgeList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '少年',
                val: 1
            }, {
                status: false,
                name: '青年',
                val: 2
            }, {
                status: false,
                name: '中年',
                val: 3
            }, {
                status: false,
                name: '老年',
                val: 3
            }
        ];
        return data;
    }
    exports.AgeList = AgeList;
    function ClothesList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '长袖',
                val: 1
            }, {
                status: false,
                name: '短袖',
                val: 2
            }, {
                status: false,
                name: '背心',
                val: 3
            }, {
                status: false,
                name: '长裤',
                val: 4
            }, {
                status: false,
                name: '短裤',
                val: 5
            }, {
                status: false,
                name: '裙子',
                val: 6
            }, {
                status: false,
                name: '未知',
                val: 7
            }
        ];
        return data;
    }
    exports.ClothesList = ClothesList;
    function HairList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '长发',
                val: 1
            }, {
                status: false,
                name: '中长发',
                val: 2
            }, {
                status: false,
                name: '短发',
                val: 3
            }, {
                status: false,
                name: '秃头',
                val: 4
            }, {
                status: false,
                name: '束发',
                val: 5
            }, {
                status: false,
                name: '未知',
                val: 6
            }
        ];
        return data;
    }
    exports.HairList = HairList;
    function ShoeList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '运动鞋',
                val: 1
            }, {
                status: false,
                name: '皮鞋',
                val: 2
            }, {
                status: false,
                name: '拖鞋',
                val: 3
            }, {
                status: false,
                name: '凉鞋',
                val: 4
            }, {
                status: false,
                name: '靴子',
                val: 5
            }, {
                status: false,
                name: '未知',
                val: 6
            }
        ];
        return data;
    }
    exports.ShoeList = ShoeList;
    function GlassesList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '普通眼镜',
                val: 1
            }, {
                status: false,
                name: '太阳眼镜',
                val: 0
            }, {
                status: false,
                name: '未知',
                val: -1
            }
        ];
        return data;
    }
    exports.GlassesList = GlassesList;
    function MaskList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '戴口罩',
                val: 1
            }, {
                status: false,
                name: '不戴口罩',
                val: 0
            }, {
                status: false,
                name: '未知',
                val: -1
            }
        ];
        return data;
    }
    exports.MaskList = MaskList;
    function CapList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: 'all'
            }, {
                status: false,
                name: '戴帽子',
                val: 1
            }, {
                status: false,
                name: '不戴帽子',
                val: 0
            }, {
                status: false,
                name: '未知',
                val: -1
            }
        ];
        return data;
    }
    exports.CapList = CapList;
    function CarTypeList() {
        var data = [
            {
                status: false,
                name: '全部',
                val: 0
            }, {
                status: false,
                name: '轿车',
                val: 1
            }, {
                status: false,
                name: 'SUV',
                val: 2
            }, {
                status: false,
                name: 'MPV',
                val: 3
            }, {
                status: false,
                name: '跑车',
                val: 4
            }, {
                status: false,
                name: '微面',
                val: 5
            }, {
                status: false,
                name: '微卡',
                val: 6
            }, {
                status: false,
                name: '轻客',
                val: 7
            }, {
                status: false,
                name: '皮卡',
                val: 8
            }
        ];
        return data;
    }
    exports.CarTypeList = CarTypeList;
    function LicencePlateList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: -1,
                other: "transparent"
            },
            {
                status: false,
                name: '白色',
                val: 0,
                other: "#ffffff"
            }, {
                status: false,
                name: '黄色',
                val: 1,
                other: "#ffff00"
            }, {
                status: false,
                name: '蓝色',
                val: 2,
                other: "#0000ff"
            }, {
                status: false,
                name: '黑色',
                val: 3,
                other: "#000000"
            }, {
                status: false,
                name: '绿色',
                val: 101,
                other: "#008000"
            }, {
                status: false,
                name: '其它',
                val: 4,
                other: "transparent"
            }
        ];
        return data;
    }
    exports.LicencePlateList = LicencePlateList;
    function VehicleBrandList() {
        var data = [
            {
                status: false,
                name: '全部',
                val: 0
            },
            {
                status: false,
                name: '热门',
                val: 1
            }, {
                status: false,
                name: 'A',
                val: 2
            }, {
                status: false,
                name: 'B',
                val: 3
            }, {
                status: false,
                name: 'C',
                val: 4
            }, {
                status: false,
                name: 'D',
                val: 5
            }, {
                status: false,
                name: 'E',
                val: 6
            }, {
                status: false,
                name: 'F',
                val: 7
            }, {
                status: false,
                name: 'G',
                val: 8
            }, {
                status: false,
                name: 'H',
                val: 9
            }, {
                status: false,
                name: 'I',
                val: 10
            }, {
                status: false,
                name: 'J',
                val: 11
            }, {
                status: false,
                name: 'K',
                val: 12
            }, {
                status: false,
                name: 'L',
                val: 13
            }, {
                status: false,
                name: 'M',
                val: 14
            }, {
                status: false,
                name: 'N',
                val: 15
            }, {
                status: false,
                name: 'O',
                val: 16
            }, {
                status: false,
                name: 'P',
                val: 17
            }, {
                status: false,
                name: 'Q',
                val: 18
            }, {
                status: false,
                name: 'R',
                val: 19
            }, {
                status: false,
                name: 'S',
                val: 20
            }, {
                status: false,
                name: 'T',
                val: 21
            }, {
                status: false,
                name: 'U',
                val: 22
            }, {
                status: false,
                name: 'V',
                val: 23
            }, {
                status: false,
                name: 'W',
                val: 24
            }, {
                status: false,
                name: 'X',
                val: 25
            }, {
                status: false,
                name: 'Y',
                val: 26
            }, {
                status: false,
                name: 'Z',
                val: 27
            }
        ];
        return data;
    }
    exports.VehicleBrandList = VehicleBrandList;
    function CarColorList() {
        var data = [
            {
                status: true,
                name: '全部',
                val: "",
                other: "transparent"
            },
            {
                status: false,
                name: '白色',
                val: "A",
                other: "#ffffff"
            }, {
                status: false,
                name: '灰色',
                val: "B",
                other: "#d9d9d9"
            }, {
                status: false,
                name: '黄色',
                val: "C",
                other: "#ffff00"
            }, {
                status: false,
                name: '粉色',
                val: "D",
                other: "#e8a1b7"
            }, {
                status: false,
                name: '红色',
                val: "E",
                other: "#ff0000"
            }, {
                status: false,
                name: '紫色',
                val: "F",
                other: "#942092"
            }, {
                status: false,
                name: '绿色',
                val: "G",
                other: "#008000"
            }, {
                status: false,
                name: '蓝色',
                val: "H",
                other: "#0000ff"
            }, {
                status: false,
                name: '棕色',
                val: "I",
                other: "#bf9000"
            }, {
                status: false,
                name: '黑色',
                val: "J",
                other: "#000000"
            }, {
                status: false,
                name: '其它',
                val: "Z",
                other: "transparent"
            }
        ];
        return data;
    }
    exports.CarColorList = CarColorList;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkVmFuY2VTZWFyY2hFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFJLENBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFJLENBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFJLEVBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLFFBQVEs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SUFORCx3REFNQztJQWdDWSxRQUFBLFNBQVMsR0FBaUQ7UUFDbkUsR0FBRyxFQUFDLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDckMsR0FBRyxFQUFDLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDckMsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUM7UUFDOUIsQ0FBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUks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O2FBQ1QsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsQ0FBQzthQUNULEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVCxFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxDQUFDO2FBQ1QsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsQ0FBQzthQUNULEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVCxFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxDQUFDO2FBQ1QsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEVBQUU7YUFDVixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1YsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEVBQUU7YUFDVixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1YsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEVBQUU7YUFDVixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1YsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEVBQUU7YUFDVixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1YsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEVBQUU7YUFDVixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1YsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEVBQUU7YUFDVixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1Y7U0FBQyxDQUFDO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNmLENBQUM7SUFySEQsNENBcUhDO0lBR0Q7UUFDSSxJQUFJLElBQUksR0FBeUI7WUFDN0I7Z0JBQ0ksTUFBTSxFQUFFLElBQUk7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLGFBQWE7YUFDdkI7WUFDRDtnQkFDSSxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsU0FBUzthQUNuQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEtBQUssRUFBRSxTQUFTO2FBQ25CLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLFNBQVM7YUFDbkIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsU0FBUzthQUNuQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEtBQUssRUFBRSxTQUFTO2FBQ25CLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLFNBQVM7YUFDbkIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsU0FBUzthQUNuQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEtBQUssRUFBRSxTQUFTO2FBQ25CLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLFNBQVM7YUFDbkIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsU0FBUzthQUNuQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1NBQUMsQ0FBQztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDZixDQUFDO0lBakVELG9DQWlFQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkVmFuY2VTZWFyY2hFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvcnRyYWl0VG9vbCBmcm9tICcuLi8uLi8uLi9jb21tb24vcG9ydHJhaXQtdG9vbCc7XHJcbmxldCBkdCA9IG5ldyBEYXRlKCk7XHJcbmxldCB5ID0gKGR0LmdldEZ1bGxZZWFyKCkpLnRvU3RyaW5nKCk7XHJcbmxldCBtID0gKGR0LmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpO1xyXG5sZXQgZCA9IChkdC5nZXREYXRlKCkpLnRvU3RyaW5nKCk7XHJcbmxldCBoaCA9IChkdC5nZXRIb3VycygpKS50b1N0cmluZygpO1xyXG5sZXQgbW0gPSAoZHQuZ2V0TWludXRlcygpKS50b1N0cmluZygpO1xyXG5sZXQgc3MgPSAoZHQuZ2V0U2Vjb25kcygpKS50b1N0cmluZygpO1xyXG5wYXJzZUludChtKSA8IDEwID8gbSA9IGAwJHttfWAgOiBtO1xyXG5wYXJzZUludChkKSA8IDEwID8gZCA9IGAwJHtkfWAgOiBkO1xyXG5wYXJzZUludChoaCkgPCAxMCA/IGhoID0gYDAke2hofWAgOiBoaDtcclxucGFyc2VJbnQobW0pIDwgMTAgPyBtbSA9IGAwJHttbX1gIDogbW07XHJcbnBhcnNlSW50KHNzKSA8IDEwID8gc3MgPSBgMCR7c3N9YCA6IHNzO1xyXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVMZW5ndGgge1xyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIEdldE5EYXlUaW1lKG46IG51bWJlcik6IFRpbWVMZW5ndGgge1xyXG4gICAgbGV0IHRpbWUgPSB7fSBhcyBUaW1lTGVuZ3RoO1xyXG4gICAgbGV0IGRkID0gbmV3IERhdGUoKTtcclxuICAgIGRkLnNldERhdGUoZGQuZ2V0RGF0ZSgpICsgbik7XHJcbiAgICBsZXQgeWVhciA9IGRkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW9udGggPSAoZGQuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgZGF5ID0gKGRkLmdldERhdGUoKSkudG9TdHJpbmcoKTtcclxuICAgIHBhcnNlSW50KG1vbnRoKSA8IDEwID8gbW9udGggPSBgMCR7bW9udGh9YCA6IG1vbnRoO1xyXG4gICAgcGFyc2VJbnQoZGF5KSA8IDEwID8gZGF5ID0gYDAke2RheX1gIDogZGF5O1xyXG4gICAgdGltZS5zdGFydFRpbWUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX0gMDA6MDA6MDBgO1xyXG4gICAgdGltZS5lbmRUaW1lID0gYCR7eX0tJHttfS0ke2R9ICR7aGh9OiR7bW19OiR7c3N9YDtcclxuICAgIHJldHVybiB0aW1lXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW51bSA8VD57XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIHZhbHVlOiBUO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRW51bUV4IHtcclxuICAgIGFsbDogRW51bTxzdHJpbmc+O1xyXG4gICAgb25lRGF5OiBFbnVtPFRpbWVMZW5ndGg+O1xyXG4gICAgdGhyZWVEYXk6IEVudW08VGltZUxlbmd0aD47XHJcbiAgICB3ZWVrRGF5OiBFbnVtPFRpbWVMZW5ndGg+O1xyXG4gICAgc2VsZWN0RGF5OiBFbnVtPHN0cmluZz47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBGYXN0RGF0YTogeyBba2V5OiBzdHJpbmddOiBFbnVtPFRpbWVMZW5ndGggfCBzdHJpbmc+IH0gJiBFbnVtRXggPSB7XHJcbiAgICBhbGw6IHtrZXk6ICdhbGwnLCB2YWx1ZTogJ2FsbCcsIHRleHQ6ICflhajpg6gnfSxcclxuICAgIG9uZURheToge2tleTogJ29uZURheScsIHZhbHVlOiBHZXRORGF5VGltZSgtMSksIHRleHQ6ICfov5HkuIDlpKknfSxcclxuICAgIHRocmVlRGF5OiB7a2V5OiAndGhyZWVEYXknLCB2YWx1ZTogR2V0TkRheVRpbWUoLTMpLCB0ZXh0OiAn6L+R5LiJ5aSpJ30sXHJcbiAgICB3ZWVrRGF5OiB7a2V5OiAnd2Vla0RheScsIHZhbHVlOiBHZXRORGF5VGltZSgtNyksIHRleHQ6ICfov5HkuIDlkagnfSxcclxuICAgIHNlbGVjdERheToge2tleTogJ3NlbGVjdERheScsIHZhbHVlOiAnc2VsZWN0JywgdGV4dDogJ+iHquWumuS5iSd9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFzdERhdGFMaXN0KCk6IEFycmF5PEVudW08VGltZUxlbmd0aCB8IHN0cmluZz4+IHtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbnVtPFRpbWVMZW5ndGggfCBzdHJpbmc+PjtcclxuICAgIGZvciAobGV0IGsgaW4gRmFzdERhdGEpIHtcclxuICAgICAgICBhcnIucHVzaCh7a2V5OiBGYXN0RGF0YVtrXS5rZXksIHZhbHVlOiBGYXN0RGF0YVtrXS52YWx1ZSwgdGV4dDogRmFzdERhdGFba10udGV4dH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmludGVyZmFjZSBNb2RlbERhdGFFbnVtRXh7XHJcbiAgICBhbGw6RW51bTxzdHJpbmc+O1xyXG4gICAgZmFjZTpFbnVtPHN0cmluZz47XHJcbiAgICBib2R5OkVudW08c3RyaW5nPjtcclxuICAgIHBvcnRyYWl0OkVudW08c3RyaW5nPjtcclxufVxyXG5leHBvcnQgY29uc3QgTW9kZWxEYXRhOiB7W2tleTogc3RyaW5nXTogRW51bTxzdHJpbmc+fSAmIE1vZGVsRGF0YUVudW1FeCA9IHtcclxuICAgIGFsbDp7a2V5OidhbGwnLHZhbHVlOidhbGwnLHRleHQ6J+WFqOmDqCd9LFxyXG4gICAgZmFjZTp7a2V5OidmYWNlJyx2YWx1ZTonZmFjZScsdGV4dDon5Lq66IS4J30sXHJcbiAgICBib2R5OntrZXk6J2JvZHknLHZhbHVlOidib2R5Jyx0ZXh0OifkurrkvZMnfSxcclxuICAgIHBvcnRyYWl0OntrZXk6J3BvcnRyYWl0Jyx2YWx1ZToncG9ydHJhaXQnLHRleHQ6J+S6uuWDj+ajgOe0oid9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZGVsRGF0YUxpc3QoKTogQXJyYXk8RW51bTxzdHJpbmc+PntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbnVtPHN0cmluZz4+O1xyXG4gICAgZm9yIChsZXQgayBpbiBNb2RlbERhdGEpIHtcclxuICAgICAgICBhcnIucHVzaCh7a2V5OiBNb2RlbERhdGFba10ua2V5LCB2YWx1ZTogTW9kZWxEYXRhW2tdLnZhbHVlLCB0ZXh0OiBNb2RlbERhdGFba10udGV4dH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmludGVyZmFjZSBTZXhEYXRhRW51bUV4e1xyXG4gICAgYWxsOkVudW08c3RyaW5nPjtcclxuICAgIG1hbjpFbnVtPHN0cmluZz47XHJcbiAgICB3b21lbjpFbnVtPHN0cmluZz47XHJcbiAgICB1bmtub3duOkVudW08c3RyaW5nPjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNleERhdGE6IHsgW2tleTogc3RyaW5nXTogRW51bTxzdHJpbmc+IH0gJiBTZXhEYXRhRW51bUV4PSB7XHJcbiAgICBhbGw6e2tleTonYWxsJyx2YWx1ZTonYWxsJyx0ZXh0Oiflhajpg6gnfSxcclxuICAgIG1hbjp7a2V5OidtYW4nLHZhbHVlOidtYW4nLHRleHQ6J+eUtyd9LFxyXG4gICAgd29tZW46e2tleTond29tZW4nLHZhbHVlOid3b21lbicsdGV4dDon5aWzJ30sXHJcbiAgICB1bmtub3duOntrZXk6J3Vua25vd24nLHZhbHVlOid1bmtub3duJyx0ZXh0OifmnKrnn6UnfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNleERhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIFNleERhdGEpIHtcclxuICAgICAgICBhcnIucHVzaCh7a2V5OiBTZXhEYXRhW2tdLmtleSwgdmFsdWU6IFNleERhdGFba10udmFsdWUsIHRleHQ6IFNleERhdGFba10udGV4dH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmludGVyZmFjZSBHbGFzc2VzRGF0YUVudW1FeHtcclxuICAgIGFsbDpFbnVtPHN0cmluZz47XHJcbiAgICB5ZXM6RW51bTxzdHJpbmc+O1xyXG4gICAgbm86RW51bTxzdHJpbmc+O1xyXG4gICAgdW5rbm93bjpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IEdsYXNzZXNEYXRhOiB7IFtrZXk6IHN0cmluZ106IEVudW08c3RyaW5nPiB9ICYgR2xhc3Nlc0RhdGFFbnVtRXg9IHtcclxuICAgIGFsbDp7a2V5OidhbGwnLHZhbHVlOidhbGwnLHRleHQ6J+WFqOmDqCd9LFxyXG4gICAgeWVzOntrZXk6J3llcycsdmFsdWU6J3llcycsdGV4dDon5oi055y86ZWcJ30sXHJcbiAgICBubzp7a2V5OidubycsdmFsdWU6J25vJyx0ZXh0OifkuI3miLTnnLzplZwnfSxcclxuICAgIHVua25vd246e2tleTondW5rbm93bicsdmFsdWU6J3Vua25vd24nLHRleHQ6J+acquefpSd9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xhc3Nlc0RhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIEdsYXNzZXNEYXRhKSB7XHJcbiAgICAgICAgYXJyLnB1c2goe2tleTogR2xhc3Nlc0RhdGFba10ua2V5LCB2YWx1ZTogR2xhc3Nlc0RhdGFba10udmFsdWUsIHRleHQ6IEdsYXNzZXNEYXRhW2tdLnRleHR9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5pbnRlcmZhY2UgQ2FwRGF0YUVudW1FeHtcclxuICAgIGFsbDpFbnVtPHN0cmluZz47XHJcbiAgICB5ZXM6RW51bTxzdHJpbmc+O1xyXG4gICAgbm86RW51bTxzdHJpbmc+O1xyXG4gICAgdW5rbm93bjpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IENhcERhdGE6IHsgW2tleTogc3RyaW5nXTogRW51bTxzdHJpbmc+IH0gJiBDYXBEYXRhRW51bUV4PSB7XHJcbiAgICBhbGw6e2tleTonYWxsJyx2YWx1ZTonYWxsJyx0ZXh0Oiflhajpg6gnfSxcclxuICAgIHllczp7a2V5Oid5ZXMnLHZhbHVlOid5ZXMnLHRleHQ6J+aItOW4veWtkCd9LFxyXG4gICAgbm86e2tleTonbm8nLHZhbHVlOidubycsdGV4dDon5LiN5oi05bi95a2QJ30sXHJcbiAgICB1bmtub3duOntrZXk6J3Vua25vd24nLHZhbHVlOid1bmtub3duJyx0ZXh0OifmnKrnn6UnfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcERhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIENhcERhdGEpIHtcclxuICAgICAgICBhcnIucHVzaCh7a2V5OiBDYXBEYXRhW2tdLmtleSwgdmFsdWU6IENhcERhdGFba10udmFsdWUsIHRleHQ6IENhcERhdGFba10udGV4dH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmludGVyZmFjZSBNYXNrRGF0YUVudW1FeHtcclxuICAgIGFsbDpFbnVtPHN0cmluZz47XHJcbiAgICB5ZXM6RW51bTxzdHJpbmc+O1xyXG4gICAgbm86RW51bTxzdHJpbmc+O1xyXG4gICAgdW5rbm93bjpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IE1hc2tEYXRhOiB7IFtrZXk6IHN0cmluZ106IEVudW08c3RyaW5nPiB9ICYgTWFza0RhdGFFbnVtRXg9IHtcclxuICAgIGFsbDp7a2V5OidhbGwnLHZhbHVlOidhbGwnLHRleHQ6J+WFqOmDqCd9LFxyXG4gICAgeWVzOntrZXk6J3llcycsdmFsdWU6J3llcycsdGV4dDon5oi05Y+j572pJ30sXHJcbiAgICBubzp7a2V5OidubycsdmFsdWU6J25vJyx0ZXh0OifkuI3miLTlj6PnvaknfSxcclxuICAgIHVua25vd246e2tleTondW5rbm93bicsdmFsdWU6J3Vua25vd24nLHRleHQ6J+acquefpSd9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFza0RhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIE1hc2tEYXRhKSB7XHJcbiAgICAgICAgYXJyLnB1c2goe2tleTogTWFza0RhdGFba10ua2V5LCB2YWx1ZTogTWFza0RhdGFba10udmFsdWUsIHRleHQ6IE1hc2tEYXRhW2tdLnRleHR9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5pbnRlcmZhY2UgVG90ZURhdGFFbnVtRXh7XHJcbiAgICBhbGw6RW51bTxzdHJpbmc+O1xyXG4gICAgYmFnOkVudW08c3RyaW5nPjtcclxuICAgIGJveDpFbnVtPHN0cmluZz47XHJcbiAgICBjYXJ0OkVudW08c3RyaW5nPjtcclxuICAgIGNoaWxkOkVudW08c3RyaW5nPjtcclxuICAgIHVtYnJlbGxhOkVudW08c3RyaW5nPjtcclxuICAgIHVua25vd246RW51bTxzdHJpbmc+XHJcbn1cclxuZXhwb3J0IGNvbnN0IFRvdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IEVudW08c3RyaW5nPiB9ICYgVG90ZURhdGFFbnVtRXg9IHtcclxuICAgIGFsbDp7a2V5OidhbGwnLHZhbHVlOidhbGwnLHRleHQ6J+WFqOmDqCd9LFxyXG4gICAgYmFnOntrZXk6J2JhZycsdmFsdWU6J2JhZycsdGV4dDon5YyFJ30sXHJcbiAgICBib3g6e2tleTonYm94Jyx2YWx1ZTonYm94Jyx0ZXh0Oifmi4nmnYbnrrEnfSxcclxuICAgIGNhcnQ6e2tleTonY2FydCcsdmFsdWU6J2NhcnQnLHRleHQ6J+aOqOi9pid9LFxyXG4gICAgY2hpbGQ6e2tleTonY2hpbGQnLHZhbHVlOidjaGlsZCcsdGV4dDon5oqx5bCP5a2pJ30sXHJcbiAgICB1bWJyZWxsYTp7a2V5Oid1bWJyZWxsYScsdmFsdWU6J3VtYnJlbGxhJyx0ZXh0OifmiZPkvJ4nfSxcclxuICAgIHVua25vd246e2tleTondW5rbm93bicsdmFsdWU6J3Vua25vd24nLHRleHQ6J+acquefpSd9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG90ZURhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIFRvdGVEYXRhKSB7XHJcbiAgICAgICAgYXJyLnB1c2goe2tleTogVG90ZURhdGFba10ua2V5LCB2YWx1ZTogVG90ZURhdGFba10udmFsdWUsIHRleHQ6IFRvdGVEYXRhW2tdLnRleHR9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5pbnRlcmZhY2UgQWdlRGF0YUVudW1FeHtcclxuICAgIGFsbDpFbnVtPHN0cmluZz47XHJcbiAgICB0ZWVuYWdlcjpFbnVtPHN0cmluZz47XHJcbiAgICB5b3VuZzpFbnVtPHN0cmluZz47XHJcbiAgICBvbGQ6RW51bTxzdHJpbmc+O1xyXG4gICAgdW5rbm93bjpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IEFnZURhdGE6IHsgW2tleTogc3RyaW5nXTogRW51bTxzdHJpbmc+IH0gJiBBZ2VEYXRhRW51bUV4PSB7XHJcbiAgICBhbGw6e2tleTonYWxsJyx2YWx1ZTonYWxsJyx0ZXh0Oiflhajpg6gnfSxcclxuICAgIHRlZW5hZ2VyOntrZXk6J3RlZW5hZ2VyJyx2YWx1ZTondGVlbmFnZXInLHRleHQ6J+WwkeW5tCd9LFxyXG4gICAgeW91bmc6e2tleToneW91bmcnLHZhbHVlOid5b3VuZycsdGV4dDon6Z2S5bm0J30sXHJcbiAgICBvbGQ6e2tleTonb2xkJyx2YWx1ZTonb2xkJyx0ZXh0OifogIHlubQnfSxcclxuICAgIHVua25vd246e2tleTondW5rbm93bicsdmFsdWU6J3Vua25vd24nLHRleHQ6J+acquefpSd9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlRGF0YUxpc3QoKTogQXJyYXk8RW51bTxzdHJpbmc+PiB7XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8RW51bTxzdHJpbmc+PjtcclxuICAgIGZvciAobGV0IGsgaW4gQWdlRGF0YSkge1xyXG4gICAgICAgIGFyci5wdXNoKHtrZXk6IEFnZURhdGFba10ua2V5LCB2YWx1ZTogQWdlRGF0YVtrXS52YWx1ZSwgdGV4dDogQWdlRGF0YVtrXS50ZXh0fSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuaW50ZXJmYWNlIENsb3RoZXNEYXRhRW51bUV4e1xyXG4gICAgYWxsOkVudW08c3RyaW5nPjtcclxuICAgIGxvbmdzbGVldmU6RW51bTxzdHJpbmc+O1xyXG4gICAgc2hvcnRzbGVldmU6RW51bTxzdHJpbmc+O1xyXG4gICAgdmVzdDpFbnVtPHN0cmluZz47XHJcbiAgICBsb25nczpFbnVtPHN0cmluZz47XHJcbiAgICBzaG9ydHM6RW51bTxzdHJpbmc+O1xyXG4gICAgc2tpcnQ6RW51bTxzdHJpbmc+O1xyXG4gICAgdW5rbm93bjpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IENsb3RoZXNEYXRhOiB7IFtrZXk6IHN0cmluZ106IEVudW08c3RyaW5nPiB9ICYgQ2xvdGhlc0RhdGFFbnVtRXg9IHtcclxuICAgIGFsbDp7a2V5OidhbGwnLHZhbHVlOidhbGwnLHRleHQ6J+WFqOmDqCd9LFxyXG4gICAgbG9uZ3NsZWV2ZTp7a2V5Oidsb25nc2xlZXZlJyx2YWx1ZTonbG9uZ3NsZWV2ZScsdGV4dDon6ZW/6KKWJ30sXHJcbiAgICBzaG9ydHNsZWV2ZTp7a2V5OidzaG9ydHNsZWV2ZScsdmFsdWU6J3Nob3J0c2xlZXZlJyx0ZXh0Oifnn63oopYnfSxcclxuICAgIHZlc3Q6e2tleTondmVzdCcsdmFsdWU6J3Zlc3QnLHRleHQ6J+iDjOW/gyd9LFxyXG4gICAgbG9uZ3M6e2tleTonbG9uZ3MnLHZhbHVlOidsb25ncycsdGV4dDon6ZW/6KOkJ30sXHJcbiAgICBzaG9ydHM6e2tleTonc2hvcnRzJyx2YWx1ZTonc2hvcnRzJyx0ZXh0Oifnn63oo6QnfSxcclxuICAgIHNraXJ0OntrZXk6J3NraXJ0Jyx2YWx1ZTonc2tpcnQnLHRleHQ6J+ijmeWtkCd9LFxyXG4gICAgdW5rbm93bjp7a2V5Oid1bmtub3duJyx2YWx1ZTondW5rbm93bicsdGV4dDon5pyq55+lJ31cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbG90aGVzRGF0YUxpc3QoKTogQXJyYXk8RW51bTxzdHJpbmc+PiB7XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8RW51bTxzdHJpbmc+PjtcclxuICAgIGZvciAobGV0IGsgaW4gQ2xvdGhlc0RhdGEpIHtcclxuICAgICAgICBhcnIucHVzaCh7a2V5OiBDbG90aGVzRGF0YVtrXS5rZXksIHZhbHVlOiBDbG90aGVzRGF0YVtrXS52YWx1ZSwgdGV4dDogQ2xvdGhlc0RhdGFba10udGV4dH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmludGVyZmFjZSBIYWlyRGF0YUVudW1FeHtcclxuICAgIGFsbDpFbnVtPHN0cmluZz47XHJcbiAgICBsb25nOkVudW08c3RyaW5nPjtcclxuICAgIG1pZDpFbnVtPHN0cmluZz47XHJcbiAgICBzaG9ydDpFbnVtPHN0cmluZz47XHJcbiAgICBiYWxkOkVudW08c3RyaW5nPjtcclxuICAgIGhhaWRvOkVudW08c3RyaW5nPjtcclxuICAgIHVua25vd246RW51bTxzdHJpbmc+O1xyXG59XHJcbmV4cG9ydCBjb25zdCBIYWlyRGF0YTogeyBba2V5OiBzdHJpbmddOiBFbnVtPHN0cmluZz4gfSAmIEhhaXJEYXRhRW51bUV4PSB7XHJcbiAgICBhbGw6e2tleTonYWxsJyx2YWx1ZTonYWxsJyx0ZXh0Oiflhajpg6gnfSxcclxuICAgIGxvbmc6e2tleTonbG9uZycsdmFsdWU6J2xvbmcnLHRleHQ6J+mVv+WPkSd9LFxyXG4gICAgbWlkOntrZXk6J21pZCcsdmFsdWU6J21pZCcsdGV4dDon5Lit6ZW/5Y+RJ30sXHJcbiAgICBzaG9ydDp7a2V5OidzaG9ydCcsdmFsdWU6J3Nob3J0Jyx0ZXh0Oifnn63lj5EnfSxcclxuICAgIGJhbGQ6e2tleTonYmFsZCcsdmFsdWU6J2JhbGQnLHRleHQ6J+eng+WktCd9LFxyXG4gICAgaGFpZG86e2tleTonaGFpZG8nLHZhbHVlOidoYWlkbycsdGV4dDon5p2f5Y+RJ30sXHJcbiAgICB1bmtub3duOntrZXk6J3Vua25vd24nLHZhbHVlOid1bmtub3duJyx0ZXh0OifmnKrnn6UnfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhhaXJEYXRhTGlzdCgpOiBBcnJheTxFbnVtPHN0cmluZz4+IHtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbnVtPHN0cmluZz4+O1xyXG4gICAgZm9yIChsZXQgayBpbiBIYWlyRGF0YSkge1xyXG4gICAgICAgIGFyci5wdXNoKHtrZXk6IEhhaXJEYXRhW2tdLmtleSwgdmFsdWU6IEhhaXJEYXRhW2tdLnZhbHVlLCB0ZXh0OiBIYWlyRGF0YVtrXS50ZXh0fSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuaW50ZXJmYWNlIFNob2VzRGF0YUVudW1FeHtcclxuICAgIGFsbDpFbnVtPHN0cmluZz47XHJcbiAgICBzbmVha2VyOkVudW08c3RyaW5nPjtcclxuICAgIGxlYXRoZXI6RW51bTxzdHJpbmc+O1xyXG4gICAgc2xpcHBlcnM6RW51bTxzdHJpbmc+O1xyXG4gICAgc2FuZGFsOkVudW08c3RyaW5nPjtcclxuICAgIGJvb3Q6RW51bTxzdHJpbmc+O1xyXG4gICAgdW5rbm93bjpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IFNob2VzRGF0YTogeyBba2V5OiBzdHJpbmddOiBFbnVtPHN0cmluZz4gfSAmIFNob2VzRGF0YUVudW1FeD0ge1xyXG4gICAgYWxsOntrZXk6J2FsbCcsdmFsdWU6J2FsbCcsdGV4dDon5YWo6YOoJ30sXHJcbiAgICBzbmVha2VyOntrZXk6J3NuZWFrZXInLHZhbHVlOidzbmVha2VyJyx0ZXh0Oifov5DliqjpnosnfSxcclxuICAgIGxlYXRoZXI6e2tleTonbGVhdGhlcicsdmFsdWU6J2xlYXRoZXInLHRleHQ6J+earumeiyd9LFxyXG4gICAgc2xpcHBlcnM6e2tleTonc2xpcHBlcnMnLHZhbHVlOidzbGlwcGVycycsdGV4dDon5ouW6Z6LJ30sXHJcbiAgICBzYW5kYWw6e2tleTonc2FuZGFsJyx2YWx1ZTonc2FuZGFsJyx0ZXh0Oiflh4npnosnfSxcclxuICAgIGJvb3Q6e2tleTonYm9vdCcsdmFsdWU6J2Jvb3QnLHRleHQ6J+mdtOWtkCd9LFxyXG4gICAgdW5rbm93bjp7a2V5Oid1bmtub3duJyx2YWx1ZTondW5rbm93bicsdGV4dDon5pyq55+lJ31cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaG9lc0RhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIFNob2VzRGF0YSkge1xyXG4gICAgICAgIGFyci5wdXNoKHtrZXk6IFNob2VzRGF0YVtrXS5rZXksIHZhbHVlOiBTaG9lc0RhdGFba10udmFsdWUsIHRleHQ6IFNob2VzRGF0YVtrXS50ZXh0fSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuaW50ZXJmYWNlIFZlaGljbGVUeXBlRW51bUV4e1xyXG4gICAgYWxsOkVudW08c3RyaW5nPjtcclxuICAgIGNhcjpFbnVtPHN0cmluZz47XHJcbiAgICBTVVY6RW51bTxzdHJpbmc+O1xyXG4gICAgTVBWOkVudW08c3RyaW5nPjtcclxuICAgIHJvYWRzdGVyOkVudW08c3RyaW5nPjtcclxuICAgIG1pbml2YW46RW51bTxzdHJpbmc+O1xyXG4gICAgbWljcm9jYWxvcmllOkVudW08c3RyaW5nPjtcclxuICAgIGxpZ2h0OkVudW08c3RyaW5nPjtcclxuICAgIHBpY2t1cDpFbnVtPHN0cmluZz47XHJcbn1cclxuZXhwb3J0IGNvbnN0IFZlaGljbGVUeXBlRGF0YTogeyBba2V5OiBzdHJpbmddOiBFbnVtPHN0cmluZz4gfSAmIFZlaGljbGVUeXBlRW51bUV4PSB7XHJcbiAgICBhbGw6e2tleTonYWxsJyx2YWx1ZTonYWxsJyx0ZXh0Oiflhajpg6gnfSxcclxuICAgIGNhcjp7a2V5OidjYXInLHZhbHVlOidjYXInLHRleHQ6J+i9v+i9pid9LFxyXG4gICAgU1VWOntrZXk6J1NVVicsdmFsdWU6J1NVVicsdGV4dDonU1VWJ30sXHJcbiAgICBNUFY6e2tleTonTVBWJyx2YWx1ZTonTVBWJyx0ZXh0OidNUFYnfSxcclxuICAgIHJvYWRzdGVyOntrZXk6J3JvYWRzdGVyJyx2YWx1ZToncm9hZHN0ZXInLHRleHQ6J+i3kei9pid9LFxyXG4gICAgbWluaXZhbjp7a2V5OidtaW5pdmFuJyx2YWx1ZTonbWluaXZhbicsdGV4dDon5b6u6Z2iJ30sXHJcbiAgICBtaWNyb2NhbG9yaWU6e2tleTonbWljcm9jYWxvcmllJyx2YWx1ZTonbWljcm9jYWxvcmllJyx0ZXh0Oiflvq7ljaEnfSxcclxuICAgIGxpZ2h0OntrZXk6J2xpZ2h0Jyx2YWx1ZTonbGlnaHQnLHRleHQ6J+i9u+Wuoid9LFxyXG4gICAgcGlja3VwOntrZXk6J3BpY2t1cCcsdmFsdWU6J3BpY2t1cCcsdGV4dDon55qu5Y2hJ31cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWZWhpY2xlVHlwZURhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIFZlaGljbGVUeXBlRGF0YSkge1xyXG4gICAgICAgIGFyci5wdXNoKHtrZXk6IFZlaGljbGVUeXBlRGF0YVtrXS5rZXksIHZhbHVlOiBWZWhpY2xlVHlwZURhdGFba10udmFsdWUsIHRleHQ6IFZlaGljbGVUeXBlRGF0YVtrXS50ZXh0fSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuaW50ZXJmYWNlIEJyYW5kRW51bUV4e1xyXG4gICAgYWxsOkVudW08c3RyaW5nPjtcclxuICAgIGhvdDpFbnVtPHN0cmluZz47XHJcbiAgICBBOkVudW08c3RyaW5nPjtcclxuICAgIEI6RW51bTxzdHJpbmc+O1xyXG4gICAgQzpFbnVtPHN0cmluZz47XHJcbiAgICBEOkVudW08c3RyaW5nPjtcclxuICAgIEU6RW51bTxzdHJpbmc+O1xyXG4gICAgRjpFbnVtPHN0cmluZz47XHJcbiAgICBHOkVudW08c3RyaW5nPjtcclxuICAgIEg6RW51bTxzdHJpbmc+O1xyXG4gICAgSTpFbnVtPHN0cmluZz47XHJcbiAgICBKOkVudW08c3RyaW5nPjtcclxuICAgIEs6RW51bTxzdHJpbmc+O1xyXG4gICAgTDpFbnVtPHN0cmluZz47XHJcbiAgICBNOkVudW08c3RyaW5nPjtcclxuICAgIE46RW51bTxzdHJpbmc+O1xyXG4gICAgTzpFbnVtPHN0cmluZz47XHJcbiAgICBQOkVudW08c3RyaW5nPjtcclxuICAgIFE6RW51bTxzdHJpbmc+O1xyXG4gICAgUjpFbnVtPHN0cmluZz47XHJcbiAgICBTOkVudW08c3RyaW5nPjtcclxuICAgIFQ6RW51bTxzdHJpbmc+O1xyXG4gICAgVTpFbnVtPHN0cmluZz47XHJcbiAgICBWOkVudW08c3RyaW5nPjtcclxuICAgIFc6RW51bTxzdHJpbmc+O1xyXG4gICAgWDpFbnVtPHN0cmluZz47XHJcbiAgICBZOkVudW08c3RyaW5nPjtcclxuICAgIFo6RW51bTxzdHJpbmc+O1xyXG59XHJcbmV4cG9ydCBjb25zdCBCcmFuZERhdGE6IHsgW2tleTogc3RyaW5nXTogRW51bTxzdHJpbmc+IH0gJiBCcmFuZEVudW1FeD0ge1xyXG4gICAgYWxsOntrZXk6J2FsbCcsdmFsdWU6J2FsbCcsdGV4dDon5YWo6YOoJ30sXHJcbiAgICBob3Q6e2tleTonaG90Jyx2YWx1ZTonaG90Jyx0ZXh0Oifng63pl6gnfSxcclxuICAgIEE6e2tleTonQScsdmFsdWU6J0EnLHRleHQ6J0EnfSxcclxuICAgIEI6e2tleTonQicsdmFsdWU6J0InLHRleHQ6J0InfSxcclxuICAgIEM6e2tleTonQycsdmFsdWU6J0MnLHRleHQ6J0MnfSxcclxuICAgIEQ6e2tleTonRCcsdmFsdWU6J0QnLHRleHQ6J0QnfSxcclxuICAgIEU6e2tleTonRScsdmFsdWU6J0UnLHRleHQ6J0UnfSxcclxuICAgIEY6e2tleTonRicsdmFsdWU6J0YnLHRleHQ6J0YnfSxcclxuICAgIEc6e2tleTonRycsdmFsdWU6J0cnLHRleHQ6J0cnfSxcclxuICAgIEg6e2tleTonSCcsdmFsdWU6J0gnLHRleHQ6J0gnfSxcclxuICAgIEk6e2tleTonSScsdmFsdWU6J0knLHRleHQ6J0knfSxcclxuICAgIEo6e2tleTonSicsdmFsdWU6J0onLHRleHQ6J0onfSxcclxuICAgIEs6e2tleTonSycsdmFsdWU6J0snLHRleHQ6J0snfSxcclxuICAgIEw6e2tleTonTCcsdmFsdWU6J0wnLHRleHQ6J0wnfSxcclxuICAgIE06e2tleTonTScsdmFsdWU6J00nLHRleHQ6J00nfSxcclxuICAgIE46e2tleTonTicsdmFsdWU6J04nLHRleHQ6J04nfSxcclxuICAgIE86e2tleTonTycsdmFsdWU6J08nLHRleHQ6J08nfSxcclxuICAgIFA6e2tleTonUCcsdmFsdWU6J1AnLHRleHQ6J1AnfSxcclxuICAgIFE6e2tleTonUScsdmFsdWU6J1EnLHRleHQ6J1EnfSxcclxuICAgIFI6e2tleTonUicsdmFsdWU6J1InLHRleHQ6J1InfSxcclxuICAgIFM6e2tleTonUycsdmFsdWU6J1MnLHRleHQ6J1MnfSxcclxuICAgIFQ6e2tleTonVCcsdmFsdWU6J1QnLHRleHQ6J1QnfSxcclxuICAgIFU6e2tleTonVScsdmFsdWU6J1UnLHRleHQ6J1UnfSxcclxuICAgIFY6e2tleTonVicsdmFsdWU6J1YnLHRleHQ6J1YnfSxcclxuICAgIFc6e2tleTonVycsdmFsdWU6J1cnLHRleHQ6J1cnfSxcclxuICAgIFg6e2tleTonWCcsdmFsdWU6J1gnLHRleHQ6J1gnfSxcclxuICAgIFk6e2tleTonWScsdmFsdWU6J1knLHRleHQ6J1knfSxcclxuICAgIFo6e2tleTonWicsdmFsdWU6J1onLHRleHQ6J1onfSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRCcmFuZERhdGFMaXN0KCk6IEFycmF5PEVudW08c3RyaW5nPj4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVudW08c3RyaW5nPj47XHJcbiAgICBmb3IgKGxldCBrIGluIEJyYW5kRGF0YSkge1xyXG4gICAgICAgIGFyci5wdXNoKHtrZXk6IEJyYW5kRGF0YVtrXS5rZXksIHZhbHVlOiBCcmFuZERhdGFba10udmFsdWUsIHRleHQ6IEJyYW5kRGF0YVtrXS50ZXh0fSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuaW50ZXJmYWNlIENvbG9yRW51bUV4e1xyXG4gICAgYWxsOkVudW08c3RyaW5nPjtcclxuICAgIGJsdWU6RW51bTxzdHJpbmc+O1xyXG4gICAgeWVsbG93OkVudW08c3RyaW5nPjtcclxuICAgIGJsYWNrOkVudW08c3RyaW5nPjtcclxuICAgIGdyZWVuOkVudW08c3RyaW5nPjtcclxuICAgIHBpbms6RW51bTxzdHJpbmc+O1xyXG4gICAgcmVkOkVudW08c3RyaW5nPjtcclxuICAgIGdyYXk6RW51bTxzdHJpbmc+O1xyXG4gICAgcHVycGxlOkVudW08c3RyaW5nPjtcclxufVxyXG5leHBvcnQgY29uc3QgQ29sb3JEYXRhOiB7IFtrZXk6IHN0cmluZ106IEVudW08c3RyaW5nPiB9ICYgQ29sb3JFbnVtRXg9IHtcclxuICAgIGFsbDp7a2V5OidhbGwnLHZhbHVlOidhbGwnLHRleHQ6J+WFqOmDqCd9LFxyXG4gICAgYmx1ZTp7a2V5OidibHVlJyx2YWx1ZTonYmx1ZScsdGV4dDonYmx1ZSd9LFxyXG4gICAgeWVsbG93OntrZXk6J3llbGxvdycsdmFsdWU6J3llbGxvdycsdGV4dDoneWVsbG93J30sXHJcbiAgICBibGFjazp7a2V5OidibGFjaycsdmFsdWU6J2JsYWNrJyx0ZXh0OidibGFjayd9LFxyXG4gICAgZ3JlZW46e2tleTonZ3JlZW4nLHZhbHVlOidncmVlbicsdGV4dDonZ3JlZW4nfSxcclxuICAgIHBpbms6e2tleToncGluaycsdmFsdWU6J3BpbmsnLHRleHQ6J3BpbmsnfSxcclxuICAgIHJlZDp7a2V5OidyZWQnLHZhbHVlOidyZWQnLHRleHQ6J3JlZCd9LFxyXG4gICAgZ3JheTp7a2V5OidncmF5Jyx2YWx1ZTonbGlnZ3JheWh0Jyx0ZXh0OidncmF5J30sXHJcbiAgICBwdXJwbGU6e2tleToncHVycGxlJyx2YWx1ZToncHVycGxlJyx0ZXh0OidwdXJwbGUnfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbG9yRGF0YUxpc3QoKTogQXJyYXk8RW51bTxzdHJpbmc+PiB7XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8RW51bTxzdHJpbmc+PjtcclxuICAgIGZvciAobGV0IGsgaW4gQ29sb3JEYXRhKSB7XHJcbiAgICAgICAgYXJyLnB1c2goe2tleTogQ29sb3JEYXRhW2tdLmtleSwgdmFsdWU6IENvbG9yRGF0YVtrXS52YWx1ZSwgdGV4dDogQ29sb3JEYXRhW2tdLnRleHR9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG4vLyDlpJrpgInlj4LmlbBcclxuZXhwb3J0IGludGVyZmFjZSBtdWx0aXBsZUNob2ljZXtcclxuICAgIHN0YXR1czogYm9vbGVhbjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHZhbDogYW55O1xyXG4gICAgb3RoZXI/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIOaAp+WIq+WIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gU2V4TGlzdCgpOiBBcnJheTxtdWx0aXBsZUNob2ljZT57XHJcbiAgIGxldCBkYXRhOkFycmF5PG11bHRpcGxlQ2hvaWNlPiA9IFtcclxuICAgICAgIHtcclxuICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxyXG4gICAgICAgICAgIHZhbDogJ2FsbCdcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgbmFtZTogJ+eUtycsXHJcbiAgICAgICAgICAgdmFsOiAnTWVuJ1xyXG4gICAgICAgfSx7XHJcbiAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICBuYW1lOiAn5aWzJyxcclxuICAgICAgICAgICB2YWw6ICdXb21lbidcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgbmFtZTogJ+acquefpScsXHJcbiAgICAgICAgICAgdmFsOiAndW5rbm93bidcclxuICAgICAgIH1dO1xyXG4gICAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuLy8g5pe25q61XHJcbmV4cG9ydCBmdW5jdGlvbiBDcm9zc1RyYWluVGltZUxpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXHJcbiAgICAgICAgICAgIHZhbDogMFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6L+R5LiA5aSpJyxcclxuICAgICAgICAgICAgdmFsOiAxXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfov5HkuIDlkagnLFxyXG4gICAgICAgICAgICB2YWw6IDJcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6L+R5LiA5pyIJyxcclxuICAgICAgICAgICAgdmFsOiAzXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfoh6rlrprkuYknLFxyXG4gICAgICAgICAgICB2YWw6IDRcclxuICAgICAgICB9XTtcclxuICAgIHJldHVybiBkYXRhXHJcbn1cclxuXHJcbi8vIOaooeW8j1xyXG5leHBvcnQgZnVuY3Rpb24gUGF0dGVybkxpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgdmFsOiAnYWxsJ1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnIOS6uuiEuCcsXHJcbiAgICAgICAgICAgIHZhbDogJzEnXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfkurrkvZMnLFxyXG4gICAgICAgICAgICB2YWw6ICcyJ1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5Lq65YOP5qOA57SiJyxcclxuICAgICAgICAgICAgdmFsOiAnMydcclxuICAgICAgICB9XTtcclxuICAgIHJldHVybiBkYXRhXHJcbn1cclxuXHJcbi8vIOaQuuW4pueJqVxyXG5leHBvcnQgZnVuY3Rpb24gRXF1aXBtZW50TGlzdCgpOiBBcnJheTxtdWx0aXBsZUNob2ljZT57XHJcbiAgICBsZXQgZGF0YTpBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxyXG4gICAgICAgICAgICB2YWw6ICdhbGwnXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfljIUnLFxyXG4gICAgICAgICAgICB2YWw6IDFcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+aLieadhueusScsXHJcbiAgICAgICAgICAgIHZhbDogMlxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5o6o6L2mJyxcclxuICAgICAgICAgICAgdmFsOiAzXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmirHlsI/lraknLFxyXG4gICAgICAgICAgICB2YWw6IDRcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+aJk+S8nicsXHJcbiAgICAgICAgICAgIHZhbDogNVxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5pyq55+lJyxcclxuICAgICAgICAgICAgdmFsOiA2XHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG4vLyDlubTpvoTmrrVcclxuZXhwb3J0IGZ1bmN0aW9uIEFnZUxpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgdmFsOiAnYWxsJ1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5bCR5bm0JyxcclxuICAgICAgICAgICAgdmFsOiAxXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfpnZLlubQnLFxyXG4gICAgICAgICAgICB2YWw6IDJcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+S4reW5tCcsXHJcbiAgICAgICAgICAgIHZhbDogM1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6ICB5bm0JyxcclxuICAgICAgICAgICAgdmFsOiAzXHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcbi8vIOiho+W4veeJueW+gVxyXG5leHBvcnQgZnVuY3Rpb24gQ2xvdGhlc0xpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgdmFsOiAnYWxsJ1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6ZW/6KKWJyxcclxuICAgICAgICAgICAgdmFsOiAxXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfnn63oopYnLFxyXG4gICAgICAgICAgICB2YWw6IDJcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+iDjOW/gycsXHJcbiAgICAgICAgICAgIHZhbDogM1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6ZW/6KOkJyxcclxuICAgICAgICAgICAgdmFsOiA0XHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfnn63oo6QnLFxyXG4gICAgICAgICAgICB2YWw6IDVcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+ijmeWtkCcsXHJcbiAgICAgICAgICAgIHZhbDogNlxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5pyq55+lJyxcclxuICAgICAgICAgICAgdmFsOiA3XHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG4vLyDlj5HlnotcclxuZXhwb3J0IGZ1bmN0aW9uIEhhaXJMaXN0KCk6IEFycmF5PG11bHRpcGxlQ2hvaWNlPntcclxuICAgIGxldCBkYXRhOkFycmF5PG11bHRpcGxlQ2hvaWNlPiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXHJcbiAgICAgICAgICAgIHZhbDogJ2FsbCdcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+mVv+WPkScsXHJcbiAgICAgICAgICAgIHZhbDogMVxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5Lit6ZW/5Y+RJyxcclxuICAgICAgICAgICAgdmFsOiAyXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfnn63lj5EnLFxyXG4gICAgICAgICAgICB2YWw6IDNcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+eng+WktCcsXHJcbiAgICAgICAgICAgIHZhbDogNFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5p2f5Y+RJyxcclxuICAgICAgICAgICAgdmFsOiA1XHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmnKrnn6UnLFxyXG4gICAgICAgICAgICB2YWw6IDZcclxuICAgICAgICB9XTtcclxuICAgIHJldHVybiBkYXRhXHJcbn1cclxuXHJcbi8vIOmei+WtkFxyXG5leHBvcnQgZnVuY3Rpb24gU2hvZUxpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgdmFsOiAnYWxsJ1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6L+Q5Yqo6Z6LJyxcclxuICAgICAgICAgICAgdmFsOiAxXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfnmq7pnosnLFxyXG4gICAgICAgICAgICB2YWw6IDJcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+aLlumeiycsXHJcbiAgICAgICAgICAgIHZhbDogM1xyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YeJ6Z6LJyxcclxuICAgICAgICAgICAgdmFsOiA0XHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfpnbTlrZAnLFxyXG4gICAgICAgICAgICB2YWw6IDVcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+acquefpScsXHJcbiAgICAgICAgICAgIHZhbDogNlxyXG4gICAgICAgIH1dO1xyXG4gICAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuLy8g55y86ZWcXHJcbmV4cG9ydCBmdW5jdGlvbiBHbGFzc2VzTGlzdCgpOiBBcnJheTxtdWx0aXBsZUNob2ljZT57XHJcbiAgICBsZXQgZGF0YTpBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxyXG4gICAgICAgICAgICB2YWw6ICdhbGwnXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmma7pgJrnnLzplZwnLFxyXG4gICAgICAgICAgICB2YWw6IDFcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+WkqumYs+ecvOmVnCcsXHJcbiAgICAgICAgICAgIHZhbDogMFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5pyq55+lJyxcclxuICAgICAgICAgICAgdmFsOiAtMVxyXG4gICAgICAgIH1dO1xyXG4gICAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuLy8g5Y+j572pXHJcbmV4cG9ydCBmdW5jdGlvbiBNYXNrTGlzdCgpOiBBcnJheTxtdWx0aXBsZUNob2ljZT57XHJcbiAgICBsZXQgZGF0YTpBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxyXG4gICAgICAgICAgICB2YWw6ICdhbGwnXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmiLTlj6PnvaknLFxyXG4gICAgICAgICAgICB2YWw6IDFcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+S4jeaItOWPo+e9qScsXHJcbiAgICAgICAgICAgIHZhbDogMFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5pyq55+lJyxcclxuICAgICAgICAgICAgdmFsOiAtMVxyXG4gICAgICAgIH1dO1xyXG4gICAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuLy8g5bi95a2QXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXBMaXN0KCk6IEFycmF5PG11bHRpcGxlQ2hvaWNlPntcclxuICAgIGxldCBkYXRhOkFycmF5PG11bHRpcGxlQ2hvaWNlPiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXHJcbiAgICAgICAgICAgIHZhbDogJ2FsbCdcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+aItOW4veWtkCcsXHJcbiAgICAgICAgICAgIHZhbDogMVxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5LiN5oi05bi95a2QJyxcclxuICAgICAgICAgICAgdmFsOiAwXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmnKrnn6UnLFxyXG4gICAgICAgICAgICB2YWw6IC0xXHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG4vLyDovabovobpq5jnuqfmo4DntKLlj4LmlbBcclxuZXhwb3J0IGludGVyZmFjZSBDYXJTZWFyY2hQYXJhbXN7XHJcbiAgICBzZWFyY2hLZXlXb3Jkczogc3RyaW5nO1xyXG4gICAgZmVhdHVyZVNpbWlsYXJpdHk6IG51bWJlcjtcclxuICAgIGNhclNpbWlsYXJpdHk6IG51bWJlcjtcclxuICAgIHN0YXJ0VGltZT86IHN0cmluZztcclxuICAgIGVuZFRpbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIOS6uuiEuOmrmOe6p+ajgOe0ouWPguaVsFxyXG5leHBvcnQgaW50ZXJmYWNlIEZhY2VTZWFyY2hQYXJhbXN7XHJcbiAgICBjdXJyZW50UGFnZTogbnVtYmVyO1xyXG4gICAga2V5V29yZDogYW55O1xyXG4gICAgb3JkZXJCeToge1xyXG4gICAgICAgIGZpZWxkTmFtZT86IHN0cmluZztcclxuICAgICAgICBpc0FzYzogYm9vbGVhbjtcclxuICAgIH07XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGFza0lkPzogc3RyaW5nO1xyXG4gICAgaXNGaXJzdFNlYXJjaD86IGJvb2xlYW47XHJcbiAgICBpbWFnZVBhdGg/OiBzdHJpbmc7XHJcbiAgICB0aHJlc2hvbGQ/OiBudW1iZXI7XHJcbiAgICBzdGFydFRpbWU/OiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lPzogc3RyaW5nO1xyXG4gICAgYXJyVHlwZT86IEFycmF5PHN0cmluZz47XHJcbiAgICBhcnJDYW1lcmFJZD86IEFycmF5PHN0cmluZz47XHJcbiAgICBhcnJHZW5kZXI/OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgbWluQWdlPzogbnVtYmVyO1xyXG4gICAgbWF4QWdlPzogbnVtYmVyO1xyXG4gICAgYXJyRXllR2xhc3Nlcz86IEFycmF5PG51bWJlcj47XHJcbiAgICBhcnJTdW5HbGFzc2VzPzogQXJyYXk8bnVtYmVyPjtcclxuICAgIGFyclNtaWxlPzogQXJyYXk8bnVtYmVyPjtcclxuICAgIGFyck1hc2s/OiBBcnJheTxudW1iZXI+O1xyXG4gICAgYXJySXNQYW50cz86IEFycmF5PG51bWJlcj47XHJcbiAgICBhcnJJc1NsZWV2ZT86IEFycmF5PG51bWJlcj47XHJcbiAgICBhcnJDYXJyeVRoaW5ncz86IEFycmF5PHN0cmluZz47XHJcbiAgICBhcnJIYXQ/OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgYXJySGFpclR5cGU/OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgYXJyU2hvZXM/OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgYXJyQXJlYUlEPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIGZlYXR1cmVTZWFyY2hFeHQ/OiBhbnk7XHJcbiAgICBmZXR1cmVUYXNrUGFyYW0/OiBhbnk7XHJcbiAgICB1c2VySWQ6IHN0cmluZztcclxufVxyXG5cclxuLy8gV2lmaemrmOe6p+ajgOe0ouWPguaVsFxyXG5leHBvcnQgaW50ZXJmYWNlIFdpZmlTZWFyY2hQYXJhbXN7XHJcbiAgICBjdXJyZW50UGFnZTogbnVtYmVyO1xyXG4gICAga2V5V29yZDogc3RyaW5nO1xyXG4gICAgb3JkZXJCeToge1xyXG4gICAgICAgIGZpZWxkTmFtZT86IHN0cmluZztcclxuICAgICAgICBpc0FzYzogYm9vbGVhbjtcclxuICAgIH07XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gICAgaXNGaXJzdFNlYXJjaD86IGJvb2xlYW47XHJcbiAgICB0YXNrSWQ/OiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU/OiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lPzogc3RyaW5nO1xyXG4gICAgQXJPYmplY3RJRD86IEFycmF5PHN0cmluZz47XHJcbiAgICBhcmVhPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIHVzZXJJZDogc3RyaW5nO1xyXG59XHJcblxyXG4vLyDnlLXlm7Tpq5jnuqfmo4DntKLlj4LmlbBcclxuZXhwb3J0IGludGVyZmFjZSBFbGVjdHJvbmljU2VhcmNoUGFyYW1ze1xyXG4gICAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICAgIGtleVdvcmQ6IHN0cmluZztcclxuICAgIG9yZGVyQnk6IHtcclxuICAgICAgICBmaWVsZE5hbWU/OiBzdHJpbmc7XHJcbiAgICAgICAgaXNBc2M6IGJvb2xlYW47XHJcbiAgICB9O1xyXG4gICAgcGFnZVNpemU6IG51bWJlcjtcclxuICAgIGlzRmlyc3RTZWFyY2g/OiBib29sZWFuO1xyXG4gICAgdGFza0lkPzogc3RyaW5nO1xyXG4gICAgc3RhcnRUaW1lPzogc3RyaW5nO1xyXG4gICAgZW5kVGltZT86IHN0cmluZztcclxuICAgIEFyT2JqZWN0SUQ/OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgYXJlYT86IEFycmF5PHN0cmluZz47XHJcbiAgICB1c2VySWQ6IHN0cmluZztcclxufVxyXG5cclxuLy8g6L2m6L6G57G75Z6LXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXJUeXBlTGlzdCgpOiBBcnJheTxtdWx0aXBsZUNob2ljZT57XHJcbiAgICBsZXQgZGF0YTpBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgdmFsOiAwXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6L2/6L2mJyxcclxuICAgICAgICAgICAgdmFsOiAxXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnU1VWJyxcclxuICAgICAgICAgICAgdmFsOiAyXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnTVBWJyxcclxuICAgICAgICAgICAgdmFsOiAzXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6LeR6L2mJyxcclxuICAgICAgICAgICAgdmFsOiA0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5b6u6Z2iJyxcclxuICAgICAgICAgICAgdmFsOiA1XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5b6u5Y2hJyxcclxuICAgICAgICAgICAgdmFsOiA2XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6L275a6iJyxcclxuICAgICAgICAgICAgdmFsOiA3XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn55qu5Y2hJyxcclxuICAgICAgICAgICAgdmFsOiA4XHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG4vLyDovabniYzpopzoibJcclxuZXhwb3J0IGZ1bmN0aW9uIExpY2VuY2VQbGF0ZUxpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgdmFsOiAtMSxcclxuICAgICAgICAgICAgb3RoZXI6IFwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn55m96ImyJyxcclxuICAgICAgICAgICAgdmFsOiAwLFxyXG4gICAgICAgICAgICBvdGhlcjogXCIjZmZmZmZmXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfpu4ToibInLFxyXG4gICAgICAgICAgICB2YWw6IDEsXHJcbiAgICAgICAgICAgIG90aGVyOiBcIiNmZmZmMDBcIlxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+iTneiJsicsXHJcbiAgICAgICAgICAgIHZhbDogMixcclxuICAgICAgICAgICAgb3RoZXI6IFwiIzAwMDBmZlwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6buR6ImyJyxcclxuICAgICAgICAgICAgdmFsOiAzLFxyXG4gICAgICAgICAgICBvdGhlcjogXCIjMDAwMDAwXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICfnu7/oibInLFxyXG4gICAgICAgICAgICB2YWw6IDEwMSxcclxuICAgICAgICAgICAgb3RoZXI6IFwiIzAwODAwMFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YW25a6DJyxcclxuICAgICAgICAgICAgdmFsOiA0LFxyXG4gICAgICAgICAgICBvdGhlcjogXCJ0cmFuc3BhcmVudFwiXHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG4vLyDovabovoblk4HniYxcclxuZXhwb3J0IGZ1bmN0aW9uIFZlaGljbGVCcmFuZExpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+e1xyXG4gICAgbGV0IGRhdGE6QXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXHJcbiAgICAgICAgICAgIHZhbDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn54Ot6ZeoJyxcclxuICAgICAgICAgICAgdmFsOiAxXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnQScsXHJcbiAgICAgICAgICAgIHZhbDogMlxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ0InLFxyXG4gICAgICAgICAgICB2YWw6IDNcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdDJyxcclxuICAgICAgICAgICAgdmFsOiA0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnRCcsXHJcbiAgICAgICAgICAgIHZhbDogNVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ0UnLFxyXG4gICAgICAgICAgICB2YWw6IDZcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdGJyxcclxuICAgICAgICAgICAgdmFsOiA3XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnRycsXHJcbiAgICAgICAgICAgIHZhbDogOFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ0gnLFxyXG4gICAgICAgICAgICB2YWw6IDlcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdJJyxcclxuICAgICAgICAgICAgdmFsOiAxMFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ0onLFxyXG4gICAgICAgICAgICB2YWw6IDExXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnSycsXHJcbiAgICAgICAgICAgIHZhbDogMTJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdMJyxcclxuICAgICAgICAgICAgdmFsOiAxM1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ00nLFxyXG4gICAgICAgICAgICB2YWw6IDE0XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnTicsXHJcbiAgICAgICAgICAgIHZhbDogMTVcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdPJyxcclxuICAgICAgICAgICAgdmFsOiAxNlxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ1AnLFxyXG4gICAgICAgICAgICB2YWw6IDE3XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnUScsXHJcbiAgICAgICAgICAgIHZhbDogMThcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdSJyxcclxuICAgICAgICAgICAgdmFsOiAxOVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ1MnLFxyXG4gICAgICAgICAgICB2YWw6IDIwXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnVCcsXHJcbiAgICAgICAgICAgIHZhbDogMjFcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdVJyxcclxuICAgICAgICAgICAgdmFsOiAyMlxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ1YnLFxyXG4gICAgICAgICAgICB2YWw6IDIzXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnVycsXHJcbiAgICAgICAgICAgIHZhbDogMjRcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hbWU6ICdYJyxcclxuICAgICAgICAgICAgdmFsOiAyNVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ1knLFxyXG4gICAgICAgICAgICB2YWw6IDI2XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAnWicsXHJcbiAgICAgICAgICAgIHZhbDogMjdcclxuICAgICAgICB9XTtcclxuICAgIHJldHVybiBkYXRhXHJcbn1cclxuXHJcbi8vIOi9pui+huminOiJslxyXG5leHBvcnQgZnVuY3Rpb24gQ2FyQ29sb3JMaXN0KCk6IEFycmF5PG11bHRpcGxlQ2hvaWNlPntcclxuICAgIGxldCBkYXRhOkFycmF5PG11bHRpcGxlQ2hvaWNlPiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXHJcbiAgICAgICAgICAgIHZhbDogXCJcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn55m96ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkFcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn54Gw6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkJcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiI2Q5ZDlkOVwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6buE6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkNcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiI2ZmZmYwMFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn57KJ6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkRcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiI2U4YTFiN1wiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn57qi6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkVcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn57Sr6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkZcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiIzk0MjA5MlwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn57u/6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkdcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiIzAwODAwMFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6JOd6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkhcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiIzAwMDBmZlwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5qOV6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIklcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiI2JmOTAwMFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn6buR6ImyJyxcclxuICAgICAgICAgICAgdmFsOiBcIkpcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwiIzAwMDAwMFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYW1lOiAn5YW25a6DJyxcclxuICAgICAgICAgICAgdmFsOiBcIlpcIixcclxuICAgICAgICAgICAgb3RoZXI6IFwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH1dO1xyXG4gICAgcmV0dXJuIGRhdGFcclxufSJdfQ==
