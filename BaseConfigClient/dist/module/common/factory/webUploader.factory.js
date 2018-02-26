define(["require", "exports", "../../common/app/main.app", "webUploader"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var webUploader = require("webUploader");
    var WebUploaderFactory = (function () {
        function WebUploaderFactory() {
        }
        WebUploaderFactory.prototype.initWebUploader = function (seletor, uploadSuccess, filesQueued, uploadError) {
            var _this = this;
            this.uploader = webUploader.Base.create({
                auto: true,
                swf: "/libs/webuploader-0.1.5/Uploader.swf",
                server: "/bimg_upload/UpLoadFile",
                resize: false,
                pick: seletor,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                formData: {
                    dest: "LOC"
                },
                sendAsBinary: true,
                duplicate: true,
                disableGlobalDnd: true,
                fileNumLimit: 2
            });
            this.uploader.on("filesQueued", function (file) {
                console.log(file);
                _this.uploader.makeThumb(file, function (err, src) {
                    !!filesQueued && filesQueued(err, src);
                });
            });
            this.uploader.on('uploadError', function (file) {
                console.log(file);
                !!uploadError && uploadError(file);
            });
            this.uploader.on('uploadSuccess', function (file, response) {
                console.log(file);
                !!uploadSuccess && uploadSuccess(response);
            });
            return this.uploader;
        };
        return WebUploaderFactory;
    }());
    main_app_1.app.service('webUploaderFactory', WebUploaderFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3Rvcnkvd2ViVXBsb2FkZXIuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFzQnpDO1FBQUE7UUFnREEsQ0FBQztRQTdDRyw0Q0FBZSxHQUFmLFVBQWdCLE9BQWMsRUFBQyxhQUFzQixFQUFDLFdBQW9CLEVBQUMsV0FBb0I7WUFBL0YsaUJBNENDO1lBMUNHLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3BDLElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxzQ0FBc0M7Z0JBQzNDLE1BQU0sRUFBRSx5QkFBeUI7Z0JBQ2pDLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxPQUFPO2dCQUliLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsUUFBUTtvQkFDZixVQUFVLEVBQUUsc0JBQXNCO29CQUNsQyxTQUFTLEVBQUUsU0FBUztpQkFDdkI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNOLElBQUksRUFBRSxLQUFLO2lCQUNkO2dCQUNELFlBQVksRUFBRSxJQUFJO2dCQUNsQixTQUFTLEVBQUUsSUFBSTtnQkFDZixnQkFBZ0IsRUFBRSxJQUFJO2dCQUV0QixZQUFZLEVBQUUsQ0FBQzthQUNsQixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsVUFBQyxJQUFzQjtnQkFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFVBQUMsR0FBTyxFQUFDLEdBQU87b0JBQ3pDLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxVQUFDLElBQWU7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFDLFVBQUMsSUFBZSxFQUFDLFFBQVk7Z0JBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FoREEsQUFnREMsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY3Rvcnkvd2ViVXBsb2FkZXIuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGtleSBvbiAyMDE3LzYvMjQuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwid2ViVXBsb2FkZXJcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxubGV0IHdlYlVwbG9hZGVyID0gcmVxdWlyZShcIndlYlVwbG9hZGVyXCIpO1xyXG5cclxuaW50ZXJmYWNlIGZpbGVNb2R1bGV7XHJcbiAgICBleHQ6c3RyaW5nO1xyXG4gICAgaWQ6c3RyaW5nO1xyXG4gICAgbGFzdE1vZGlmaWVkRGF0ZTpzdHJpbmc7XHJcbiAgICBsb2FkZWQ6bnVtYmVyO1xyXG4gICAgbmFtZTpzdHJpbmc7XHJcbiAgICBzaXplOm51bWJlcjtcclxuICAgIHNvdXJjZTp7W2tleTpzdHJpbmddOmFueX1cclxuICAgIHN0YXR1c1RleHQ6c3RyaW5nO1xyXG4gICAgdHlwZTpzdHJpbmc7XHJcbiAgICBfY29tcHJlc3NlZDpib29sZWFuO1xyXG4gICAgX2V2ZW50czpBcnJheTx7W2tleTpzdHJpbmddOmFueX0+XHJcbiAgICBfaW5mbzp7W2tleTpzdHJpbmddOmFueX1cclxuICAgIF9tZXRhOmFueVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElXZWJVcGxvYWRlckZhY3Rvcnl7XHJcbiAgICBpbml0V2ViVXBsb2FkZXI6RnVuY3Rpb25cclxufVxyXG5cclxuY2xhc3MgV2ViVXBsb2FkZXJGYWN0b3J5IGltcGxlbWVudHMgSVdlYlVwbG9hZGVyRmFjdG9yeXtcclxuICAgIHVwbG9hZGVyOmFueTtcclxuICAgIC8v5Yid5aeL5YyWd2ViVXBsb2FkZXJcclxuICAgIGluaXRXZWJVcGxvYWRlcihzZWxldG9yOnN0cmluZyx1cGxvYWRTdWNjZXNzOkZ1bmN0aW9uLGZpbGVzUXVldWVkOkZ1bmN0aW9uLHVwbG9hZEVycm9yOkZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIHRoaXMudXBsb2FkZXIgPSB3ZWJVcGxvYWRlci5CYXNlLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGF1dG86IHRydWUsXHJcbiAgICAgICAgICAgIHN3ZjogXCIvbGlicy93ZWJ1cGxvYWRlci0wLjEuNS9VcGxvYWRlci5zd2ZcIixcclxuICAgICAgICAgICAgc2VydmVyOiBcIi9iaW1nX3VwbG9hZC9VcExvYWRGaWxlXCIsXHJcbiAgICAgICAgICAgIHJlc2l6ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHBpY2s6IHNlbGV0b3IsXHJcbiAgICAgICAgICAgIC8vIGRuZDonLm0tcHV0UGljLWFyZWEnLFxyXG5cclxuICAgICAgICAgICAgLy8g5Y+q5YWB6K646YCJ5oup5Zu+54mH5paH5Lu244CCXHJcbiAgICAgICAgICAgIGFjY2VwdDoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdJbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogJ2dpZixqcGcsanBlZyxibXAscG5nJyxcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogJ2ltYWdlLyonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBkZXN0OiBcIkxPQ1wiIC8vIOS4iuS8oOWbvueJh+acjeWKoeWZqOW4pueahOWPguaVsFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZW5kQXNCaW5hcnk6IHRydWUsIC8vIOaYr+WQpuWwhuWbvueJh+aMieeFp2JvZHnmnaXlj5HpgIFcclxuICAgICAgICAgICAgZHVwbGljYXRlIDp0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlR2xvYmFsRG5kOiB0cnVlLFxyXG4gICAgICAgICAgICAvL+WPr+S4iuS8oOeahOaWh+S7tuaVsOmHj1xyXG4gICAgICAgICAgICBmaWxlTnVtTGltaXQ6IDJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGxvYWRlci5vbihcImZpbGVzUXVldWVkXCIsKGZpbGU6QXJyYXk8ZmlsZU1vZHVsZT4pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXIubWFrZVRodW1iKGZpbGUsKGVycjphbnksc3JjOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgISFmaWxlc1F1ZXVlZCAmJiBmaWxlc1F1ZXVlZChlcnIsc3JjKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGxvYWRlci5vbigndXBsb2FkRXJyb3InLChmaWxlOmZpbGVNb2R1bGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICAgICAgICAgICEhdXBsb2FkRXJyb3IgJiYgdXBsb2FkRXJyb3IoZmlsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBsb2FkZXIub24oJ3VwbG9hZFN1Y2Nlc3MnLChmaWxlOmZpbGVNb2R1bGUscmVzcG9uc2U6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgICAgICAhIXVwbG9hZFN1Y2Nlc3MgJiYgdXBsb2FkU3VjY2VzcyhyZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnd2ViVXBsb2FkZXJGYWN0b3J5JywgV2ViVXBsb2FkZXJGYWN0b3J5KTtcclxuIl19
