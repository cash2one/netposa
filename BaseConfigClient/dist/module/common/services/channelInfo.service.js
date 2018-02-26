define(["require", "exports", "../app/main.app", "angular", "../factory/response.notify.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChannelInfoService = (function () {
        function ChannelInfoService($http, notifyFactory) {
            var _this = this;
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.getChannelList = function () {
                return _this.$http({
                    method: 'post',
                    url: '/pdp/soundlight/getchannel',
                });
            };
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        ChannelInfoService.$inject = ['$http', 'notifyFactory'];
        return ChannelInfoService;
    }());
    main_app_1.app
        .service('channelInfoService', ChannelInfoService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2NoYW5uZWxJbmZvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7UUFJSSw0QkFBb0IsS0FBVSxFQUFVLGFBQXFDO1lBQTdFLGlCQUdDO1lBSG1CLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFLN0UsbUJBQWMsR0FBRztnQkFDYixNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxHQUFHLEVBQUUsNEJBQTRCO2lCQUNwQyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUE7WUFURyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQU5NLDBCQUFPLEdBQWlCLENBQUMsT0FBTyxFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBYzdELHlCQUFDO0tBZkQsQUFlQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvY2hhbm5lbEluZm8uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBpbXBvcnQge1VzZXJQZXJzb25JbmZvfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvcHJvY2VkdXJlL1VzZXJQZXJzb25JbmZvXCI7LlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Vc2VyXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHQsIEJhY2tSZXNwb25zZUJvZHl9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7Q2hhbm5lbEluZm99IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9DaGFubmVsSW5mb01vZGVsXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDaGFubmVsSW5mb1NlcnZpY2V7XHJcbiAgICAvL1BPU1QgL3NvdW5kbGlnaHQvZ2V0Y2hhbm5lbCDojrflj5blo7DlhYnmiqXorabpgJrpgZNcclxuICAgIGdldENoYW5uZWxMaXN0OigpPT5Qcm9taXNlPFJlc3BvbnNlUmVzdWx0PEFycmF5PENoYW5uZWxJbmZvPj4+O1xyXG59XHJcblxyXG5jbGFzcyAgQ2hhbm5lbEluZm9TZXJ2aWNlIGltcGxlbWVudHMgSUNoYW5uZWxJbmZvU2VydmljZXtcclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeSddO1xyXG4gICAgcHJpdmF0ZSBub3RpZnlGdW5jOihyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pPT5SZXNwb25zZVJlc3VsdDxhbnk+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhbm5lbExpc3QgPSAoKT0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3NvdW5kbGlnaHQvZ2V0Y2hhbm5lbCcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnY2hhbm5lbEluZm9TZXJ2aWNlJywgQ2hhbm5lbEluZm9TZXJ2aWNlKTsiXX0=
