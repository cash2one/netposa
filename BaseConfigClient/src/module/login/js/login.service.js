/**
 * Created by dell on 2017/3/16.
 */
define(['jquery', 'module/login/js/login.app'], function($, app){
    app.factory("loginService", loginService);
    loginService.$inject = ['$http', '$q', 'md5', 'json'];

    function loginService($http, $q, md5, JSON){

        return {
            login: login
        };

        function login(username, password){

            var def = $q.defer();
            $.ajax({
                url: "/api/auth",
                type: 'post',
                timeout: 6000,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.toJSON({
                    "username": username,
                    "password": md5.md5(password)
                })
            }).done(function(res){
                def.resolve(res.token);
            }).fail(function(res){
                def.reject("fail");
            });

            return def.promise;
        }
    }
});