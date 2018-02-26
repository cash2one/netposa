define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var I18nFactory = (function () {
        function I18nFactory($filter) {
            return $filter('translate');
        }
        I18nFactory.$inject = ["$filter"];
        return I18nFactory;
    }());
    main_app_1.app.service('i18nFactory', I18nFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvaTE4bi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBSUkscUJBQVksT0FBYTtZQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQy9CLENBQUM7UUFKTSxtQkFBTyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFLakMsa0JBQUM7S0FQRCxBQU9DLElBQUE7SUFDRCxjQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY3RvcnkvaTE4bi5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuLyoqXHJcbiAqIOeugOWNleWvueWbvemZheWMlui/m+ihjOS6huS4gOasoeWMheijhVxyXG4gKi9cclxuY2xhc3MgSTE4bkZhY3Rvcnl7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkZmlsdGVyXCJdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRmaWx0ZXI/OiBhbnkpe1xyXG4gICAgICAgIHJldHVybiAkZmlsdGVyKCd0cmFuc2xhdGUnKVxyXG4gICAgfVxyXG59XHJcbmFwcC5zZXJ2aWNlKCdpMThuRmFjdG9yeScsIEkxOG5GYWN0b3J5KTtcclxuIl19
