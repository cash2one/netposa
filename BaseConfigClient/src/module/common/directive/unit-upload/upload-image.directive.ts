import {app} from '../../app/main.app';
import 'angular';
declare var $:any;
declare var window:any
declare var imgObj:any

class UtilUploadImageDirective{
    static $inject: Array<string> = ['$compile','$timeout'];
    constructor() {
    }
    //初始化 最顶级数据
    initFromParent:Function;
    currentIsParent:boolean;
    static instance() {
        return new UtilUploadImageDirective();
    }

    restrict: string = 'AE';
    replace: boolean = true;
    transclude: boolean = false;
    controllerAs = 'uploadImageCtrl';
    template = "<input type='file' class='m-uploadfile' size='1' >";

    link = function (scope: any, element: any, attrs: any) {
        element.on('change',function(){
            var $file = $(this);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $("#preview");

            if (fileObj && fileObj.files && fileObj.files[0]) {
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.attr('src', dataURL);
            } else {
                dataURL = $file.val();
                var imgObj = document.getElementById("preview");
                imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            }
        })
    };
}
app
    .directive('uploadImage', UtilUploadImageDirective.instance)
;


