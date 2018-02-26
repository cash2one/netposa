/**
 * Created by dell on 2017/5/8.
 */
var extend = require("../dist/utils/ExtendUtils").extend;


(function(){

    var obj1 = {
        name: "名字1",
        area: {
            name: "area名字一",
            name1: "名字1"
        }
    };

    var obj2 = {
        name: "二",
        area: {
            name: "area名字二",
            name2: "名字2"
        }
    };

    var obj3 = {
        name: "名字三",
        area: {
            name: "area名字三",
            name3: "名字3"
        }
    };

    var objTotal = {};
    console.log(extend(true, obj1, obj2, obj3));

    obj1.area.name = "名字一修改";
    obj1.area.name1 = "名字1 修改name1";
    obj3.area.name = "名字三修改";
    obj3.area.name3 = "名字三修改 name3";


    console.log(objTotal);
    console.log(obj1);
    console.log(obj2);
    console.log(obj3);
})();