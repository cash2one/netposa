define(["require", "exports", "../common/app/main.app", "../../core/server/enum/SocketResultTypeEnum", "css!./compare.css", "../common/services/uploadImage.service", "../common/services/analysis.service", "../common/factory/layerMsg.factory", "../common/factory/socket.factory"], function (require, exports, main_app_1, SocketResultTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImageObjEum = (function () {
        function ImageObjEum() {
        }
        return ImageObjEum;
    }());
    var compareController = (function () {
        function compareController($scope, $rootScope, uploadImageService, $timeout, layerDec, analysisService, socketFactory) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.uploadImageService = uploadImageService;
            this.$timeout = $timeout;
            this.layerDec = layerDec;
            this.analysisService = analysisService;
            this.socketFactory = socketFactory;
            this.leftQueryList = [];
            this.rightQueryList = [];
            this.taskId = '';
            this.comparAnimate = false;
        }
        compareController.prototype.closePage = function () {
            this.$rootScope.$emit('closeComparePopup');
        };
        compareController.prototype.inputContent = function (testFile) {
            if (testFile = " ") {
                console.log("jieshou");
            }
        };
        compareController.prototype.imgUploadById = function (IdValue, position) {
            console.log(IdValue);
            console.log(position);
            var self = this;
            if (!IdValue) {
                this.layerDec.warnInfo("请输入身份证号");
                return;
            }
            this.uploadImageService.uploadImageForId([IdValue]).then(function (res) {
                if (res.code === 200) {
                    res.data.forEach(function (item) {
                        if (item.FacePicPath) {
                            item.FacePicPath.forEach(function (imagePath) {
                                var obj = {};
                                obj.imageUrl = imagePath;
                                obj.status = true;
                                if (position == "left") {
                                    self.leftQueryList.push(obj);
                                }
                                else {
                                    self.rightQueryList.push(obj);
                                }
                            });
                        }
                    });
                    console.log(self.leftQueryList);
                    console.log(self.rightQueryList);
                    self.$timeout(function () {
                        if (position === 'left') {
                        }
                        else if (position === 'right') {
                        }
                        self.faceCompare();
                    }, 3000);
                }
            });
        };
        compareController.ImageShowData = function () {
            var imageObj = {};
        };
        compareController.prototype.fipePage = function (phrase) {
            if (phrase === 'previous') {
                var previous = true;
            }
            else if (phrase === 'next') {
                var next = true;
            }
        };
        compareController.prototype.imgUploading = function (event, position) {
            var _this = this;
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "VerifyFace",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    var obj_1 = {
                        imageUrl: res.data.imageurl,
                        key: res.data.key,
                        status: true,
                    };
                    self.$timeout(function () {
                        if (position === 'left') {
                            _this.leftQueryList = [];
                            _this.leftQueryList.push(obj_1);
                        }
                        else if (position === 'right') {
                            _this.rightQueryList = [];
                            _this.rightQueryList.push(obj_1);
                        }
                        self.faceCompare();
                    });
                }
                else {
                    self.layerDec.warnInfo('人脸识别失败');
                }
            });
        };
        compareController.prototype.faceCompare = function () {
            var params = { key0: '', key1: '' };
            for (var i = 0; i < this.leftQueryList.length; i++) {
                if (this.leftQueryList[i].status) {
                    params.key0 = this.leftQueryList[i].key;
                }
            }
            for (var i = 0; i < this.rightQueryList.length; i++) {
                if (this.rightQueryList[i].status) {
                    params.key1 = this.rightQueryList[i].key;
                }
            }
            if (params.key0 !== "" && params.key1 !== "") {
                this.faceCompareQuery(params);
            }
        };
        compareController.prototype.faceCompareQuery = function (params) {
            var self = this;
            self.taskId = params.key0;
            self.$timeout(function () {
                self.comparAnimate = true;
            });
            self.analysisService.faceverify(params).then(function (res) {
                if (res.code === 200) {
                    self.monitorSocket();
                }
                else {
                    self.layerDec.warnInfo('1:1查询失败');
                    self.$timeout(function () {
                        self.comparAnimate = false;
                    });
                }
            });
        };
        compareController.prototype.monitorSocket = function () {
            var self = this;
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.VerifyFace, function (result) {
                var _loop_1 = function (i) {
                    if ((result[i].code === 200) && (result[i].data.TaskId === self.taskId)) {
                        self.$timeout(function () {
                            self.score = parseInt(result[i].data.Score);
                            self.score = Math.round(self.score);
                            self.comparAnimate = false;
                            console.log(self.score);
                        });
                        self.cancelMonitorSocket();
                    }
                };
                for (var i = 0; i < result.length; i++) {
                    _loop_1(i);
                }
            });
        };
        compareController.prototype.cancelMonitorSocket = function () {
            var self = this;
            self.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.VerifyFace);
        };
        compareController.$inject = ['$scope', '$rootScope', 'uploadImageService', '$timeout', 'layerDec', 'analysisService', 'socketFactory'];
        return compareController;
    }());
    main_app_1.app.controller("compareController", compareController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tcGFyZS9jb21wYXJlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0JBO1FBQUE7UUFNQSxDQUFDO1FBQUQsa0JBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQUVEO1FBaUJJLDJCQUNZLE1BQVUsRUFDVixVQUFjLEVBQ2Qsa0JBQXVDLEVBQ3ZDLFFBQVksRUFDWixRQUFrQixFQUNsQixlQUFnQyxFQUNoQyxhQUE0QjtZQU41QixXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBSTtZQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUNaLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBZnhDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztZQUN0QyxtQkFBYyxHQUFzQixFQUFFLENBQUM7WUFDdkMsV0FBTSxHQUFVLEVBQUUsQ0FBQztZQUVuQixrQkFBYSxHQUFTLEtBQUssQ0FBQztRQWE1QixDQUFDO1FBRU0scUNBQVMsR0FBaEI7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFTSx3Q0FBWSxHQUFuQixVQUFvQixRQUFlO1lBRWhDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekIsQ0FBQztRQUNKLENBQUM7UUFPTSx5Q0FBYSxHQUFwQixVQUFxQixPQUFXLEVBQUMsUUFBZTtZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDckIsSUFBSSxJQUFJ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QUFDLGFBQWEsR0FBQyxLQUFLLENBQUM7NEJBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM1QixDQUFDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDL0IsQ0FBQztnQkFDTCxDQUFDO2dCQVZELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUU7NEJBQTVCLENBQUM7aUJBVVQ7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHTSwrQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsMkNBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQTNNTSx5QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBNE03SCx3QkFBQztLQTdNRCxBQTZNQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21wYXJlL2NvbXBhcmUuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY3NzIS4vY29tcGFyZS5jc3MnO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgXCIuLi9jb21tb24vc2VydmljZXMvdXBsb2FkSW1hZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQge0lVcGxvYWRJbWFnZVNlcnZpY2V9IGZyb20gXCIuLi9jb21tb24vc2VydmljZXMvdXBsb2FkSW1hZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQge0lBbmFseXNpc1NlcnZpY2V9IGZyb20gXCIuLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IElMYXllckRlYyB9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVNvY2tldEZhY3Rvcnl9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5cclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7U29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcblxyXG5kZWNsYXJlIGxldCAkOmFueTtcclxuXHJcbmNsYXNzIEltYWdlT2JqRXVtIHtcclxuICAgXHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBzdGF0dXM6IGJvb2xlYW47XHJcblxyXG59XHJcblxyXG5jbGFzcyBjb21wYXJlQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCckcm9vdFNjb3BlJywgJ3VwbG9hZEltYWdlU2VydmljZScsJyR0aW1lb3V0JywgJ2xheWVyRGVjJywgJ2FuYWx5c2lzU2VydmljZScsJ3NvY2tldEZhY3RvcnknXTtcclxuICAgIFxyXG4gICAgZmFjZUltZ0xpc3Q6YW55O1xyXG4gICAgaW1nTnVtOm51bWJlcjtcclxuICAgIGltZ1BhdGhMZWZ0OnN0cmluZ1xyXG4gICAgaW1nUGF0aFJpZ2h0OnN0cmluZztcclxuICAgIGltZ01pZGRsZU9uZTpzdHJpbmc7XHJcbiAgICBpbWdNaWRkbGVUd286c3RyaW5nO1xyXG4gICAgbGVmdFF1ZXJ5TGlzdDpBcnJheTxJbWFnZU9iakV1bT4gPSBbXTtcclxuICAgIHJpZ2h0UXVlcnlMaXN0OkFycmF5PEltYWdlT2JqRXVtPiA9IFtdO1xyXG4gICAgdGFza0lkOnN0cmluZyA9ICcnO1xyXG4gICAgc2NvcmU6bnVtYmVyO1xyXG4gICAgY29tcGFyQW5pbWF0ZTpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6YW55LFxyXG4gICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTphbnksXHJcbiAgICAgICAgcHJpdmF0ZSB1cGxvYWRJbWFnZVNlcnZpY2U6IElVcGxvYWRJbWFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDphbnksXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllckRlYzpJTGF5ZXJEZWMsXHJcbiAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6SUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHNvY2tldEZhY3Rvcnk6SVNvY2tldEZhY3RvcnlcclxuICAgICl7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlUGFnZSgpe1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnY2xvc2VDb21wYXJlUG9wdXAnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5wdXRDb250ZW50KHRlc3RGaWxlOnN0cmluZyl7XHJcblxyXG4gICAgICAgaWYodGVzdEZpbGU9XCIgXCIpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJqaWVzaG91XCIpXHJcbiAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27mkJzntKLouqvku73lj7dcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIHtJbWFnZU9iakV1bX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1nVXBsb2FkQnlJZChJZFZhbHVlOmFueSxwb3NpdGlvbjpzdHJpbmcpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKElkVmFsdWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uKVxyXG4gICAgICAgIGxldCBzZWxmOmNvbXBhcmVDb250cm9sbGVyPXRoaXM7XHJcbiAgICAgICAgaWYgKCFJZFZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbyhcIuivt+i+k+WFpei6q+S7veivgeWPt1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwbG9hZEltYWdlU2VydmljZS51cGxvYWRJbWFnZUZvcklkKFtJZFZhbHVlXSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzLmNvZGU9PT0yMDApe1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoaXRlbTphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLkZhY2VQaWNQYXRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5GYWNlUGljUGF0aC5mb3JFYWNoKCAoaW1hZ2VQYXRoOnN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHt9IGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbWFnZVVybCA9IGltYWdlUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwb3NpdGlvbj09XCJsZWZ0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVmdFF1ZXJ5TGlzdC5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJpZ2h0UXVlcnlMaXN0LnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYubGVmdFF1ZXJ5TGlzdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnJpZ2h0UXVlcnlMaXN0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbj09PSdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLmxlZnRRdWVyeUxpc3QgPSBuZXdJbWFnZUxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihwb3NpdGlvbj09PSdyaWdodCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLnJpZ2h0UXVlcnlMaXN0ID0gbmV3SW1hZ2VMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZUNvbXBhcmUoKTtcclxuICAgICAgICAgICAgICAgIH0sMzAwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBJbWFnZVNob3dEYXRhKCl7XHJcbiAgICAgICAgbGV0IGltYWdlT2JqOmFueSA9IHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o6n5Yi25Zu+54mH57+76aG1XHJcbiAgICBwdWJsaWMgZmlwZVBhZ2UocGhyYXNlOnN0cmluZyl7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBocmFzZT09PSdwcmV2aW91cycpe1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXM9dHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICBcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBocmFzZT09PSduZXh0Jyl7XHJcbiAgICAgICAgICAgIGxldCBuZXh0PXRydWU7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgLy/kuIrkvKDlm77niYdcclxuICAgIHB1YmxpYyBpbWdVcGxvYWRpbmcoZXZlbnQ6YW55LCBwb3NpdGlvbjpzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZyb20gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmcm9tLmFwcGVuZCgnaW1hZ2UnLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdG9yZVR5cGU6IFwiTE9DXCIsXHJcbiAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBcIlZlcmlmeUZhY2VcIixcclxuICAgICAgICAgICAgZGV0ZWN0VHlwZTogXCJGYWNlXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBsb2FkSW1hZ2VTZXJ2aWNlLnVwbG9hZEltYWdlRm9yRmFjZShmcm9tLCBkYXRhKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEgJiYgcmVzLmRhdGEua2V5KSkgeyAvLyDkurrohLjor4bliKvmiJDlip9cclxuICAgICAgICAgICAgICAgIGxldCBvYmo6SW1hZ2VPYmpFdW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHJlcy5kYXRhLmltYWdldXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleTogcmVzLmRhdGEua2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbj09PSdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRRdWVyeUxpc3Q9W107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdFF1ZXJ5TGlzdC5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocG9zaXRpb249PT0ncmlnaHQnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodFF1ZXJ5TGlzdD1bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodFF1ZXJ5TGlzdC5wdXNoKG9iailcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlQ29tcGFyZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfkurrohLjor4bliKvlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAgcHVibGljIGZhY2VDb21wYXJlKCl7XHJcbiAgICAgICAgbGV0IHBhcmFtcz17a2V5MDonJyxrZXkxOicnfTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8IHRoaXMubGVmdFF1ZXJ5TGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sZWZ0UXVlcnlMaXN0W2ldLnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMua2V5MCA9IHRoaXMubGVmdFF1ZXJ5TGlzdFtpXS5rZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPCB0aGlzLnJpZ2h0UXVlcnlMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJpZ2h0UXVlcnlMaXN0W2ldLnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMua2V5MT0gdGhpcy5yaWdodFF1ZXJ5TGlzdFtpXS5rZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpumDvei1i+WAvFxyXG4gICAgICAgIGlmKHBhcmFtcy5rZXkwIT09XCJcIiYmcGFyYW1zLmtleTEhPT1cIlwiKXtcclxuICAgICAgICAgICAgdGhpcy5mYWNlQ29tcGFyZVF1ZXJ5KHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmYWNlQ29tcGFyZVF1ZXJ5KHBhcmFtczphbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi50YXNrSWQgPSBwYXJhbXMua2V5MDtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jb21wYXJBbmltYXRlPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZmFjZXZlcmlmeShwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vbml0b3JTb2NrZXQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJzE6MeafpeivouWksei0pScpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21wYXJBbmltYXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnm5HlkKxzb2NrZXRcclxuICAgIHB1YmxpYyBtb25pdG9yU29ja2V0KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlZlcmlmeUZhY2UsIChyZXN1bHQ6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKChyZXN1bHRbaV0uY29kZSA9PT0gMjAwKSYmKHJlc3VsdFtpXS5kYXRhLlRhc2tJZCA9PT0gc2VsZi50YXNrSWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2NvcmUgPSBwYXJzZUludCggcmVzdWx0W2ldLmRhdGEuU2NvcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNjb3JlPU1hdGgucm91bmQoc2VsZi5zY29yZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29tcGFyQW5pbWF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5zY29yZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYW5jZWxNb25pdG9yU29ja2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5rOo6ZSA55uR5ZCsc29ja2V0XHJcbiAgICBwdWJsaWMgY2FuY2VsTW9uaXRvclNvY2tldCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlZlcmlmeUZhY2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcImNvbXBhcmVDb250cm9sbGVyXCIsIGNvbXBhcmVDb250cm9sbGVyKTtcclxuXHJcbiJdfQ==
