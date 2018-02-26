import {app} from '../../app/main.app';
import 'angular';
declare var $:any;
declare var window:any

class mouseOverLeaveDirective{
    static $inject: Array<string> = ['$compile','$timeout'];
    constructor() {
    }
    static instance() {
        return new mouseOverLeaveDirective();
    }
    restrict: string = 'A';
    link = function (scope: any, elem: any, attrs: any) {
        elem.bind('mouseover', function(){
            elem.css("cursor", "pointer");
            scope.$apply(function(){
                scope.hover = true;
            });
        });
        elem.bind('mouseleave', function(){
            scope.$apply(function(){
                scope.hover = false;
            });
        });
    };
}
app
   .directive('mouseOverLeave', mouseOverLeaveDirective.instance)
;


