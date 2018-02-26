/**
 * Created by dell on 2017/4/10.
 */
var Promise = require('promise');

(function () {

    /*var value = {name: "测试一个返回的数据"};

    console.log(typeof value === 'object' || typeof value === 'function');

    if (typeof value === 'object' || typeof value === 'function') {
        try {
            var then = value.then;
            if (typeof then === 'function') {
                return new Promise(then.bind(value));
            } else {
                console.log("什么都没有执行");
            }

        } catch (ex) {
            console.log("跑出了异常");
        }
    }*/

    /*Promise.reject({name: "测试一个返回的数据"}).then(function (res) {
        console.log("resolve", res);
    }).catch(function(res){
        console.log("catch",res);
        return Promise.resolve({"name":"一个对象"});
    }).then(function(res){
        console.log("after catch",res);
    });
*/

    // new Promise(function(resolve, reject) {
    //
    //     console.log("这个在reject之前执行");
    //     reject(123);
    //     console.log("这个在reject后面执行");
    // }).catch(function(res){
    //     console.log(res);
    //     return Promise.reject("又一次error");
    // // 继续往后调出, 因为controller调用层没有catch, 所以程序到此执行完毕, 所以绑定事件等解绑完毕
    // }).then(function(res){
    //     console.log("then1",res);
    // },function(res){
    //     console.log("error1",res);
    // }).then(function(){
    //     console.log("then2");
    // },function(){
    //     console.log("error2");
    // }).then(function(){
    //     console.log("then3");
    // }, function(){
    //     console.error("error3");
    // });

    new Promise(function(resolve, reject){
        console.log("a");
        reject("b");
        console.log("c");
        resolve("d");
    }).then(function(res){
        console.log(res);
        return Promise.reject("e");
    }, function(res){
        console.log(res);
        return "f";
    }).then(function(res){
        console.log(res);
        console.log("g");
    },function(res){
        console.log(res);
        console.log("h");
    });


    /*function doSomething(){
        return Promise.resolve("成功");
    };

    function doSomethingElse(res){
        console.log("doSomethingElse输出",res);
        return 666;
    };

    doSomething().then(doSomethingElse).then(doSomethingElse(123)).then(doSomethingElse(789)).then(doSomethingElse(789011)).then(function(res){
        console.log("执行到后面来了",res);
    });
    doSomething().then(doSomethingElse);*/

    /*Promise.resolve("bb").then(function(a){
        console.log("执行完毕",a);
    });*/

    /*var def = new Promise(function(resolve, reject){
     resolve("this is a resolve");
     });

     def.then(function(a){
     console.log("then1",a);
     return new Promise.reject("this is a reject");
     }).then(function(a,b){
     console.log("then2",a);
     }).catch(function(a){
     console.log("catch", a);
     });*/

})();