import {app} from "../../app/main.app";

class UploadChangeDirective {
    static instance() {
        return new UploadChangeDirective()
    }

    scope: any = {
        ngUploadChange: "&"
    };
    link = function ($scope: any, $element: any, $attrs: any) {

        $element.on("change", function (event: any) {
            $scope.ngUploadChange({$event: event});
            $element.val('');

        });
        $element.on("drop", function (event: any) {
            console.log(event)
        });
        $scope.$on("$destroy", function () {
            $element.off();
        });
    }
}

app.directive('ngUploadChange', UploadChangeDirective.instance);