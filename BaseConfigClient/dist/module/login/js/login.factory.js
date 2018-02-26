/**
 * Created by dell on 2017/3/16.
 */
define([
    'module/login/js/login.app',
    'md5',
    'jquery.json'
], function(app){

    app
        .factory("md5", md5Factory)
        .factory("json", json);

    function md5Factory(){
        return {
            md5: function(value){
                return $.md5(value);
            }
        }
    }

    function json(){
        return {
            toJSON: function(value){
                return $.toJSON(value);
            }
        }
    }
});