/**
 * Created by dell on 2017/3/16.
 */
define(
    [
        'module/login/js/login.app',
        'jquery'
    ],
    function (app, $) {

        app.directive('autoFocus', autoFocus);

        function autoFocus() {
            return function (scope, element) {
                $(element[0]).focus();
            }
        }
    });