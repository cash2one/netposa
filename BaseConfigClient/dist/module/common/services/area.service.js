define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/response.notify.factory", "../factory/SystemLog.factory", "../factory/userinfo.cache.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AreaService = (function () {
        function AreaService($http, notifyFactory, systemLogFactory) {
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        AreaService.prototype.save = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/area/add",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Area.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        AreaService.prototype.edit = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/area/update",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Area.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        AreaService.prototype.deleteById = function (area) {
            return this.$http({
                method: "POST",
                url: "/db/area/deleteById",
                data: { id: area.ID }
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Area.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        AreaService.prototype.deleteByIds = function (ids) {
            var params = {
                ids: ids
            };
            return this.$http({
                method: "POST",
                url: "/db/area/deleteByIds",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Area.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        AreaService.prototype.get = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/area/get",
                params: { id: id }
            });
        };
        ;
        AreaService.prototype.findListTree = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/area/findAreaListTree",
                params: params,
            }).then(complete);
            function complete(res) {
                var datas = [];
                if (res && res.code === 200) {
                    datas = res.data;
                }
                return datas;
            }
        };
        ;
        AreaService.$inject = ['$http', 'notifyFactory', 'systemLogFactory', 'notifyFactory', 'userInfoCacheFactory', 'systemLogFactory'];
        return AreaService;
    }());
    main_app_1.app
        .service('areaService', AreaService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFtQ0E7UUErRkkscUJBQVksS0FBVSxFQUFFLGFBQXFDLEVBQVUsZ0JBQW1DO1lBQW5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7WUFDdEcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQTlGRCwwQkFBSSxHQUFKLFVBQUssTUFBWTtZQUViLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJO2dCQUN2RCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJO2dCQUMxRCxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFBQSxDQUFDO1FBRUYsMEJBQUksR0FBSixVQUFLLE1BQVk7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsaUJBQWlCO2dCQUN0QixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxF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QUVELGNBQUc7U0FDRSxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjkuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtUcmVlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvdHJlZS9UcmVlUGFyYW1zXCI7XHJcbmltcG9ydCB7SURlbGV0ZUJ5SWRzfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVxdWVzdC9SZXF1ZXN0UGFyYW1zXCI7XHJcbmltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuXHJcbmltcG9ydCAnLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeSc7XHJcbmltcG9ydCAnLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeSc7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lTeXN0ZW1Mb2dGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclNlY29uZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclRoaXJkTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcmVhU2VydmljZSB7XHJcbiAgICBzYXZlKHBhcmFtcz86IEFyZWEpOiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgZWRpdChwYXJhbXM/OiBBcmVhKTogUHJvbWlzZTxhbnk+O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQoYXJlYTogQXJlYSk6IFByb21pc2U8YW55PjtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pOiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgZmluZExpc3RUcmVlIChwYXJhbXM/OiBUcmVlUGFyYW1zKTogUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBBcmVhU2VydmljZSBpbXBsZW1lbnRzIElBcmVhU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSAkaHR0cDogYW55O1xyXG5cclxuICAgIHNhdmUocGFyYW1zOiBBcmVhKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2FyZWEvYWRkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlX0FyZWEuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuQWRkLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVkaXQocGFyYW1zOiBBcmVhKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvYXJlYS91cGRhdGVcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQmFzZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2VfQXJlYS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZChhcmVhOiBBcmVhKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvYXJlYS9kZWxldGVCeUlkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtpZDogYXJlYS5JRH1cclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9BcmVhLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IElEZWxldGVCeUlkcyA9IHtcclxuICAgICAgICAgICAgaWRzOiBpZHNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9hcmVhL2RlbGV0ZUJ5SWRzXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlX0FyZWEuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9hcmVhL2dldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtpZDogaWR9XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAqIEByZXR1cm4gQXJyYXk8SUFyZWFFeD47XHJcbiAgICAgKiBAZXhjZXB0aW9uIFtdO1xyXG4gICAgICovXHJcbiAgICBmaW5kTGlzdFRyZWUocGFyYW1zPzogVHJlZVBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvYXJlYS9maW5kQXJlYUxpc3RUcmVlXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgIH0pLnRoZW4oY29tcGxldGUpO1xyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxBcmVhRXg+Pikge1xyXG4gICAgICAgICAgICAvLyDov5nph4zov5vooYzmlbDmja7ovazljJYsIOi1i+WAvGljb25Ta2lu5bGe5oCnXHJcbiAgICAgICAgICAgIGxldCBkYXRhczogQXJyYXk8QXJlYUV4PiA9IFtdOyAvLyDpu5jorqTkuLrnqbpcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhcyA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhcztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsICdub3RpZnlGYWN0b3J5JywgJ3N5c3RlbUxvZ0ZhY3RvcnknLCAnbm90aWZ5RmFjdG9yeScsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFueSwgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSwgcHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OiBJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSBub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnYXJlYVNlcnZpY2UnLCBBcmVhU2VydmljZSk7Il19
