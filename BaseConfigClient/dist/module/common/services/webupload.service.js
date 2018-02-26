define(["require", "exports", "webUploader", "jquery"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var webUploader = require("webuploader");
    var WebUploadEventName = {
        fileQueued: "fileQueued",
        filesQueued: "filesQueued",
        fileDequeued: "fileDequeued",
        startUpload: "startUpload",
        stopUpload: "stopUpload",
        uploadFinished: "uploadFinished",
        uploadStart: "uploadStart",
        uploadBeforeSend: "uploadBeforeSend",
        uploadAccept: "uploadAccept",
        uploadProgress: "uploadProgress",
        uploadError: 'uploadError',
        uploadSuccess: "uploadSuccess",
        uploadComplete: "uploadComplete",
        error: "error"
    };
    var WebUpload = (function () {
        function WebUpload(opt) {
            this.defaultOptions = {
                swf: "/libs/webuploader-0.1.5/Uploader.swf",
                server: "/bimg/UpLoadFile",
                resize: false,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                formData: {
                    dest: "LOC"
                },
                sendAsBinary: true
            };
            opt = opt || {};
            var opts = $.extend(true, {}, this.defaultOptions, {
                formData: opt.formData,
                server: opt.server
            });
            this.uploader = webUploader.Base.create(opts);
            this.initEvent(opt);
        }
        WebUpload.prototype.option = function (optName, params) {
            if (params) {
                this.uploader[optName] = params;
            }
            else {
                return this.uploader(optName);
            }
        };
        WebUpload.prototype.destroy = function () {
            this.uploader.destroy();
        };
        WebUpload.prototype.upload = function () {
            this.uploader.upload();
        };
        WebUpload.prototype.initEvent = function (opt) {
            this.uploader.on(WebUploadEventName.filesQueued, function () {
            });
            this.uploader.on(WebUploadEventName.fileDequeued, function (file) {
                if (typeof opt.fileDequeued === "function") {
                    opt.fileDequeued(file.id);
                }
            });
            this.uploader.on(WebUploadEventName.uploadAccept, function (object, ret) {
                if (typeof opt.uploadAcceptFilter === "function") {
                    return opt.uploadAcceptFilter(ret);
                }
            });
            this.uploader.on(WebUploadEventName.uploadFinished, function () {
                if (typeof opt.uploadFinished === "function") {
                    opt.uploadFinished();
                }
            });
            this.uploader.on(WebUploadEventName.uploadStart, function () {
                if (typeof opt.uploadStart === "function") {
                    opt.uploadStart();
                }
            });
            this.uploader.on(WebUploadEventName.uploadSuccess, function (file, response) {
                if (typeof opt.uploadSuccess === "function") {
                    opt.uploadSuccess(response);
                }
            });
        };
        return WebUpload;
    }());
    var WebUploadFactory = (function () {
        function WebUploadFactory() {
        }
        WebUploadFactory.prototype.init = function (opt) {
            return new WebUpload(opt);
        };
        return WebUploadFactory;
    }());
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3dlYnVwbG9hZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxJQUFNLGtCQUFrQixHQUFHO1FBQ3ZCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLGNBQWMsRUFBRSxnQkFBZ0I7UUFDaEMsV0FBVyxFQUFFLGFBQWE7UUFDMUIsZ0JBQWdCLEVBQUUsa0JBQWtCO1FBQ3BDLFlBQVksRUFBRSxjQUFjO1FBQzVCLGNBQWMsRUFBRSxnQkFBZ0I7UUFDaEMsV0FBVyxFQUFFLGFBQWE7UUFDMUIsYUFBYSxFQUFFLGVBQWU7UUFDOUIsY0FBYyxFQUFFLGdCQUFnQjtRQUNoQyxLQUFLLEVBQUUsT0FBTztLQUNqQixDQUFDO0lBaUJGO1FBc0NJLG1CQUFZLEdBQVE7WUFsQnBCLG1CQUFjLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLHNDQUFzQztnQkFFM0MsTUFBTSxFQUFFLGtCQUFrQjtnQkFFMUIsTUFBTSxFQUFFLEtBQUs7Z0JBRWIsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxRQUFRO29CQUNmLFVBQVUsRUFBRSxzQkFBc0I7b0JBQ2xDLFNBQVMsRUFBRSxTQUFTO2lCQUN2QjtnQkFDRCxRQUFRLEVBQUU7b0JBQ04sSUFBSSxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQztZQUdFLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUMvQyxRQUFRLEVBQUUsR0FBRyxDQUFD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SUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUEiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy93ZWJ1cGxvYWQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy81LzIwLlxyXG4gKi9cclxuaW1wb3J0IFwid2ViVXBsb2FkZXJcIjtcclxuaW1wb3J0IFwianF1ZXJ5XCJcclxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5sZXQgd2ViVXBsb2FkZXIgPSByZXF1aXJlKFwid2VidXBsb2FkZXJcIik7XHJcbmNvbnN0IFdlYlVwbG9hZEV2ZW50TmFtZSA9IHtcclxuICAgIGZpbGVRdWV1ZWQ6IFwiZmlsZVF1ZXVlZFwiLFxyXG4gICAgZmlsZXNRdWV1ZWQ6IFwiZmlsZXNRdWV1ZWRcIixcclxuICAgIGZpbGVEZXF1ZXVlZDogXCJmaWxlRGVxdWV1ZWRcIixcclxuICAgIHN0YXJ0VXBsb2FkOiBcInN0YXJ0VXBsb2FkXCIsXHJcbiAgICBzdG9wVXBsb2FkOiBcInN0b3BVcGxvYWRcIixcclxuICAgIHVwbG9hZEZpbmlzaGVkOiBcInVwbG9hZEZpbmlzaGVkXCIsXHJcbiAgICB1cGxvYWRTdGFydDogXCJ1cGxvYWRTdGFydFwiLFxyXG4gICAgdXBsb2FkQmVmb3JlU2VuZDogXCJ1cGxvYWRCZWZvcmVTZW5kXCIsXHJcbiAgICB1cGxvYWRBY2NlcHQ6IFwidXBsb2FkQWNjZXB0XCIsXHJcbiAgICB1cGxvYWRQcm9ncmVzczogXCJ1cGxvYWRQcm9ncmVzc1wiLFxyXG4gICAgdXBsb2FkRXJyb3I6ICd1cGxvYWRFcnJvcicsXHJcbiAgICB1cGxvYWRTdWNjZXNzOiBcInVwbG9hZFN1Y2Nlc3NcIixcclxuICAgIHVwbG9hZENvbXBsZXRlOiBcInVwbG9hZENvbXBsZXRlXCIsXHJcbiAgICBlcnJvcjogXCJlcnJvclwiXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElXZWJVcGxvYWR7XHJcbiAgICBkZXN0cm95KCk6dm9pZDtcclxuICAgIHVwbG9hZCgpOnZvaWQ7XHJcbiAgICBvcHRpb24ob3B0TmFtZTogYW55LCBwYXJhbXM/IDphbnkpOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYlVwbG9hZE9wdHN7XHJcbiAgICBpbml0Q29tcGxldGU6IEZ1bmN0aW9uO1xyXG4gICAgdXBsb2FkQWNjZXB0RmlsdGVyOiBGdW5jdGlvbjtcclxuICAgIHVwbG9hZEZpbmlzaGVkOiBGdW5jdGlvbjtcclxuICAgIHVwbG9hZFN0YXJ0OiBGdW5jdGlvbjtcclxuICAgIHVwbG9hZFN1Y2Nlc3M6IEZ1bmN0aW9uO1xyXG4gICAgZmlsZURlcXVldWVkOiBGdW5jdGlvbjtcclxufVxyXG5cclxuY2xhc3MgV2ViVXBsb2FkIGltcGxlbWVudHMgSVdlYlVwbG9hZHtcclxuXHJcbiAgICBvcHRpb24ob3B0TmFtZTogYW55LCBwYXJhbXM/IDphbnkpOiBhbnkge1xyXG4gICAgICAgIGlmKHBhcmFtcyl7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXJbb3B0TmFtZV0gPSBwYXJhbXM7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwbG9hZGVyKG9wdE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy51cGxvYWRlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkKCl7XHJcbiAgICAgICAgdGhpcy51cGxvYWRlci51cGxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGxvYWRlcjogYW55O1xyXG5cclxuICAgIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICAgIHN3ZjogXCIvbGlicy93ZWJ1cGxvYWRlci0wLjEuNS9VcGxvYWRlci5zd2ZcIixcclxuICAgICAgICAvLyDpu5jorqTkuIrkvKDlm77niYfmnI3liqHlmahcclxuICAgICAgICBzZXJ2ZXI6IFwiL2JpbWcvVXBMb2FkRmlsZVwiLFxyXG5cclxuICAgICAgICByZXNpemU6IGZhbHNlLFxyXG4gICAgICAgIC8vIOWPquWFgeiuuOmAieaLqeWbvueJh+aWh+S7tuOAglxyXG4gICAgICAgIGFjY2VwdDoge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0ltYWdlcycsXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6ICdnaWYsanBnLGpwZWcsYm1wLHBuZycsXHJcbiAgICAgICAgICAgIG1pbWVUeXBlczogJ2ltYWdlLyonXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgICBkZXN0OiBcIkxPQ1wiIC8vIOS4iuS8oOWbvueJh+acjeWKoeWZqOW4pueahOWPguaVsFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VuZEFzQmluYXJ5OiB0cnVlIC8vIOaYr+WQpuWwhuWbvueJh+aMieeFp2JvZHnmnaXlj5HpgIFcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0OiBhbnkpe1xyXG4gICAgICAgIG9wdCA9IG9wdCB8fCB7fTtcclxuICAgICAgICBsZXQgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCB7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOiBvcHQuZm9ybURhdGEsXHJcbiAgICAgICAgICAgIHNlcnZlcjogb3B0LnNlcnZlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkZXIgPSB3ZWJVcGxvYWRlci5CYXNlLmNyZWF0ZShvcHRzKTtcclxuICAgICAgICB0aGlzLmluaXRFdmVudChvcHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEV2ZW50KG9wdDogSVdlYlVwbG9hZE9wdHMpe1xyXG4gICAgICAgIHRoaXMudXBsb2FkZXIub24oV2ViVXBsb2FkRXZlbnROYW1lLmZpbGVzUXVldWVkLCAoKT0+e1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVwbG9hZGVyLm9uKFdlYlVwbG9hZEV2ZW50TmFtZS5maWxlRGVxdWV1ZWQsIChmaWxlOiBhbnkpPT57XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBvcHQuZmlsZURlcXVldWVkID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICAgb3B0LmZpbGVEZXF1ZXVlZChmaWxlLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkZXIub24oV2ViVXBsb2FkRXZlbnROYW1lLnVwbG9hZEFjY2VwdCwgKG9iamVjdDogYW55LCByZXQ6IGFueSk9PntcclxuICAgICAgICAgICAgaWYodHlwZW9mIG9wdC51cGxvYWRBY2NlcHRGaWx0ZXIgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnVwbG9hZEFjY2VwdEZpbHRlcihyZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGxvYWRlci5vbihXZWJVcGxvYWRFdmVudE5hbWUudXBsb2FkRmluaXNoZWQsICgpPT57XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBvcHQudXBsb2FkRmluaXNoZWQgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgICAgICBvcHQudXBsb2FkRmluaXNoZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkZXIub24oV2ViVXBsb2FkRXZlbnROYW1lLnVwbG9hZFN0YXJ0LCAoKT0+e1xyXG4gICAgICAgICAgICBpZih0eXBlb2Ygb3B0LnVwbG9hZFN0YXJ0ID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICBvcHQudXBsb2FkU3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkZXIub24oV2ViVXBsb2FkRXZlbnROYW1lLnVwbG9hZFN1Y2Nlc3MsIChmaWxlOiBhbnksIHJlc3BvbnNlOiBPYmplY3QpPT57XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBvcHQudXBsb2FkU3VjY2VzcyA9PT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICAgICAgICAgIG9wdC51cGxvYWRTdWNjZXNzKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2ViVXBsb2FkRmFjdG9yeXtcclxuXHJcbiAgICBpbml0KG9wdDogYW55KXtcclxuICAgICAgICByZXR1cm4gbmV3IFdlYlVwbG9hZChvcHQpO1xyXG4gICAgfVxyXG59Il19
