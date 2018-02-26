define(["require", "exports", "../../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilUploadImageDirective = (function () {
        function UtilUploadImageDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = false;
            this.controllerAs = 'uploadImageCtrl';
            this.template = "<input type='file' class='m-uploadfile' size='1' >";
            this.link = function (scope, element, attrs) {
                element.on('change', function () {
                    var $file = $(this);
                    var fileObj = $file[0];
                    var windowURL = window.URL || window.webkitURL;
                    var dataURL;
                    var $img = $("#preview");
                    if (fileObj && fileObj.files && fileObj.files[0]) {
                        dataURL = windowURL.createObjectURL(fileObj.files[0]);
                        $img.attr('src', dataURL);
                    }
                    else {
                        dataURL = $file.val();
                        var imgObj = document.getElementById("preview");
                        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    }
                });
            };
        }
        UtilUploadImageDirective.instance = function () {
            return new UtilUploadImageDirective();
        };
        UtilUploadImageDirective.$inject = ['$compile', '$timeout'];
        return UtilUploadImageDirective;
    }());
    main_app_1.app
        .directive('uploadImage', UtilUploadImageDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXVwbG9hZC91cGxvYWQtaW1hZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBRUk7WUFTQSxhQUFRLEdBQVcsSUFBSSxDQUFDO1lBQ3hCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsZUFBVSxHQUFZLEtBQUssQ0FBQztZQUM1QixpQkFBWSxHQUFHLGlCQUFpQixDQUFDO1lBQ2pDLGFBQVEsR0FBRyxvREFBb0QsQ0FBQztZQUVoRSxTQUFJLEdBQUcsVUFBVSxLQUFVLEVBQUUsT0FBWSxFQUFFLEtBQVU7Z0JBQ2pELE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDO29CQUNoQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDO29CQUMvQyxJQUFJLE9BQU8sQ0FBQztvQkFDWixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRXpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxPQUFPLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM5QixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3RCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLHdFQUF3RSxDQUFDO29CQUNuRyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1FBL0JGLENBQUM7UUFJTSxpQ0FBUSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksd0JBQXdCLEVBQUUsQ0FBQztRQUMxQyxDQUFDO1FBUk0sZ0NBQU8sR0FBa0IsQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFrQzVELCtCQUFDO0tBbkNELEFBbUNDLElBQUE7SUFDRCxjQUFHO1NBQ0UsU0FBUyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FDL0QiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC11cGxvYWQvdXBsb2FkLWltYWdlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5kZWNsYXJlIHZhciAkOmFueTtcclxuZGVjbGFyZSB2YXIgd2luZG93OmFueVxyXG5kZWNsYXJlIHZhciBpbWdPYmo6YW55XHJcblxyXG5jbGFzcyBVdGlsVXBsb2FkSW1hZ2VEaXJlY3RpdmV7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGNvbXBpbGUnLCckdGltZW91dCddO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMliDmnIDpobbnuqfmlbDmja5cclxuICAgIGluaXRGcm9tUGFyZW50OkZ1bmN0aW9uO1xyXG4gICAgY3VycmVudElzUGFyZW50OmJvb2xlYW47XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsVXBsb2FkSW1hZ2VEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0FFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3VwbG9hZEltYWdlQ3RybCc7XHJcbiAgICB0ZW1wbGF0ZSA9IFwiPGlucHV0IHR5cGU9J2ZpbGUnIGNsYXNzPSdtLXVwbG9hZGZpbGUnIHNpemU9JzEnID5cIjtcclxuXHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSkge1xyXG4gICAgICAgIGVsZW1lbnQub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICRmaWxlID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGZpbGVPYmogPSAkZmlsZVswXTtcclxuICAgICAgICAgICAgdmFyIHdpbmRvd1VSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxuICAgICAgICAgICAgdmFyIGRhdGFVUkw7XHJcbiAgICAgICAgICAgIHZhciAkaW1nID0gJChcIiNwcmV2aWV3XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGVPYmogJiYgZmlsZU9iai5maWxlcyAmJiBmaWxlT2JqLmZpbGVzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhVVJMID0gd2luZG93VVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlT2JqLmZpbGVzWzBdKTtcclxuICAgICAgICAgICAgICAgICRpbWcuYXR0cignc3JjJywgZGF0YVVSTCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhVVJMID0gJGZpbGUudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1nT2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2aWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgaW1nT2JqLnN0eWxlLmZpbHRlciA9IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkFscGhhSW1hZ2VMb2FkZXIoc2l6aW5nTWV0aG9kPXNjYWxlKVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbn1cclxuYXBwXHJcbiAgICAuZGlyZWN0aXZlKCd1cGxvYWRJbWFnZScsIFV0aWxVcGxvYWRJbWFnZURpcmVjdGl2ZS5pbnN0YW5jZSlcclxuO1xyXG5cclxuXHJcbiJdfQ==
