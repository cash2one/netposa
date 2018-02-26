define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BusinessLibService = (function () {
        function BusinessLibService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        BusinessLibService.prototype.findTreeWithArea = function () {
            return this.$http({
                method: 'get',
                url: '/db/businessLib/findTreeWithArea'
            });
        };
        ;
        BusinessLibService.prototype.findHasSelfTreeWithArea = function (areaId) {
            var params = {
                areaId: areaId
            };
            return this.$http({
                method: 'get',
                params: params,
                url: '/db/businessLib/findHasSelfTreeWithArea'
            });
        };
        ;
        BusinessLibService.prototype.findHasSelfTree = function (areaId) {
            var params = {
                areaId: areaId
            };
            return this.$http({
                method: 'get',
                params: params,
                url: '/db/businessLib/findBusinessLibHasSelfTree'
            });
        };
        ;
        BusinessLibService.prototype.findById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/businessLib/findById'
            });
        };
        ;
        BusinessLibService.prototype.update = function (params) {
            var _params = params;
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/businessLib/person/update',
                showLoad: true,
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        BusinessLibService.prototype.save = function (params) {
            var _params = params;
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/businessLib/person/save',
                showLoad: true,
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        BusinessLibService.prototype.deleteById = function (id) {
            var _params = {
                libIds: [id]
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/pdp/businesslib/delete',
                showLoad: true,
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        BusinessLibService.prototype.deleteByIds = function (ids) {
            var _params = {
                libIds: ids.join(",")
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/pdp/businesslib/delete',
                showLoad: true,
                params: _params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        BusinessLibService.prototype.findPersonCount = function (ids) {
            return this.$http({
                method: 'post',
                url: '/pdp/businesslib/statisticsperson',
                params: { libIds: ids.join(',') }
            });
        };
        BusinessLibService.prototype.findTreeAreaWithRole = function () {
            return this.$http({
                method: 'post',
                url: '/db/businessLib/findTreeAreaWithRole',
            });
        };
        BusinessLibService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return BusinessLibService;
    }());
    main_app_1.app
        .service('businessLibService', BusinessLibService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2J1c2luZXNzTGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBOERBO1FBS0ksNEJBQW9CLEtBQVUsRUFBVSxhQUFxQyxFQUFVLGdCQUFtQztZQUF0RyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtZQUN0SCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUdELDZDQUFnQixHQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSxrQ0FBa0M7YUFDMUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFBLENBQUM7UUFRRixvREFBdUIsR0FBdkIsVUFBd0IsTUFBZTtZQUNuQyxJQUFJLE1BQU0sR0FBRztnQkFDVCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHlDQUF5QzthQUNqRCxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQU1GLDRDQUFlLEdBQWYsVUFBZ0IsTUFBZTtZQUMzQixJQUFJLE1BQU0sR0FBRztnQkFDVCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDRDQUE0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QUcsRUFBRSxzQ0FBc0M7YUFDOUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQTlJTSwwQkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQStJbkYseUJBQUM7S0FqSkQsQUFpSkMsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2J1c2luZXNzTGliLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdXNpbmVzc0xpYkxpc3RQYXJhbXMsIEFyZWFBbmRCdXNpbmVzc0xpc3RSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvQnVzaW5lc3NMaWJQYXJhbXNcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYiB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9CdXNpbmVzc0xpYlwiO1xyXG5pbXBvcnQge1xyXG4gICAgSUZpbmRCeUlkUGFyYW1zLCBJRGVsZXRlQnlJZCxcclxuICAgIElEZWxldGVCeUlkc1xyXG59IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXF1ZXN0L1JlcXVlc3RQYXJhbXNcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuaW1wb3J0IHsgUmVzcG9uc2VSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IEJ1c2luZXNzTGliRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQnVzaW5lc3NMaWJFeFwiO1xyXG5pbXBvcnQgeyBPcGVyRml0c3RNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyRmlyc3RNb2R1bGUnO1xyXG5pbXBvcnQgeyBPcGVyU2Vjb25kTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7IE9wZXJUaGlyZE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7IE9wZXJBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckFjdGlvblR5cGUnO1xyXG5pbXBvcnQgeyBJU3lzdGVtTG9nRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBVc2VyUm9sZURhdGFFeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9Vc2VyUm9sZURhdGFFeFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnVzaW5lc3NMaWJTZXJ2aWNlIHtcclxuICAgIGZpbmRCeUlkOiAoaWQ6IHN0cmluZykgPT4gUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHVwZGF0ZTogKHBhcmFtczogQnVzaW5lc3NMaWIpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkOiAoaWQ6IHN0cmluZykgPT4gUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGRlbGV0ZUJ5SWRzOiAoaWRzOiBBcnJheTxzdHJpbmc+KSA9PiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgc2F2ZTogKHBhcmFtczogQnVzaW5lc3NMaWIpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICog6I635Y+WIOS6uuiEuOW6kyDvvIjml6DomZrmi5/oioLngrnvvIlcclxuICAgICAqIEB0aW1lOiAyMDE3LTA3LTEyIDIwOjUyOjQ4XHJcbiAgICAgKi9cclxuICAgIGZpbmRUcmVlV2l0aEFyZWE6ICgpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOiOt+WPliDkurrohLjlupMgKyDljLrln5/liJfooagg77yI6Iul5pyJ5a2Q5bqT77yM5YyF5ZCr5pys6LqrKe+8iOacieiZmuaLn+iKgueCue+8iVxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMDYgMjA6NTY6MTNcclxuICAgICAqL1xyXG4gICAgZmluZEhhc1NlbGZUcmVlV2l0aEFyZWE6IChhcmVhSWQ/OiBzdHJpbmcpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8QXJlYUFuZEJ1c2luZXNzTGlzdFJlc3VsdD4+O1xyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIOiOt+WPliDkurrohLjlupMg77yI6Iul5pyJ5a2Q5bqT77yM5YyF5ZCr5pys6LqrKSDvvIjmnInomZrmi5/oioLngrnvvIlcclxuICAgICAqIEB0aW1lOiAyMDE3LTA2LTA2IDIwOjU2OjEzXHJcbiAgICAgKi9cclxuICAgIGZpbmRIYXNTZWxmVHJlZTogKGFyZWFJZD86IHN0cmluZykgPT4gUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxBcnJheTxCdXNpbmVzc0xpYkV4Pj4+O1xyXG4gICAgLyoqXHJcbiAgICAgKiAg6I635Y+W5Lq65YOP5bqTIOS6uuWDj+aVsOaNrlxyXG4gICAgICogQHRpbWU6IDIwMTctMDgtMTUgMTk6MDg6MzdcclxuICAgICAqIEBwYXJhbXM6IGlkcyDkurrlg4/lupNpZHNcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGZpbmRQZXJzb25Db3VudDogKGlkczogQXJyYXk8c3RyaW5nPikgPT4gUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluadg+mZkOmFjee9ruebuOWFs+eahOS6uuWDj+W6k+WMuuWfn+eahOagkee7k+aehFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBpZHNcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2VSZXN1bHQ8QXJyYXk8QnVzaW5lc3NMaWJFeCB8IEFyZWFFeD4+Pn1cclxuICAgICAqL1xyXG4gICAgZmluZFRyZWVBcmVhV2l0aFJvbGU6ICgpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8QXJyYXk8VXNlclJvbGVEYXRhRXggJiBCdXNpbmVzc0xpYkV4ICYgQXJlYUV4Pj4+O1xyXG59XHJcblxyXG5jbGFzcyBCdXNpbmVzc0xpYlNlcnZpY2UgaW1wbGVtZW50cyBJQnVzaW5lc3NMaWJTZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeScsICdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnksIHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTogSVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7IG9ubHlTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+IOWMuuWfnyDkurrohLjlupPnu7zlkIjmoJFcclxuICAgIGZpbmRUcmVlV2l0aEFyZWEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvYnVzaW5lc3NMaWIvZmluZFRyZWVXaXRoQXJlYSdcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOafpeaJvuWMheWQqyDoh6rouqvkuLrlrZDoioLngrnnmoQg5Lq66IS45bqTK+WMuuWfn+e7vOWQiOagkVxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMDYgMjA6NTY6MTNcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBmaW5kSGFzU2VsZlRyZWVXaXRoQXJlYShhcmVhSWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBhcmVhSWQ6IGFyZWFJZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2J1c2luZXNzTGliL2ZpbmRIYXNTZWxmVHJlZVdpdGhBcmVhJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBjcmVhdGUgYnkgenhxXHJcbiAgICAgKiAg5p+l5om+5YyF5ZCrIOiHqui6q+S4uuWtkOiKgueCueeahCDkurrohLjlupMg5qCRXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNi0wNiAyMDo1NjoxM1xyXG4gICAgICovXHJcbiAgICBmaW5kSGFzU2VsZlRyZWUoYXJlYUlkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgYXJlYUlkOiBhcmVhSWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9idXNpbmVzc0xpYi9maW5kQnVzaW5lc3NMaWJIYXNTZWxmVHJlZSdcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOiBJRmluZEJ5SWRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9idXNpbmVzc0xpYi9maW5kQnlJZCdcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUocGFyYW1zOiBCdXNpbmVzc0xpYikge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04JyB9LFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvYnVzaW5lc3NMaWIvcGVyc29uL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShfcGFyYW1zKVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2VfRmFjZUxpYi5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgc2F2ZShwYXJhbXM6IEJ1c2luZXNzTGliKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnIH0sXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9idXNpbmVzc0xpYi9wZXJzb24vc2F2ZScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShfcGFyYW1zKVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2VfRmFjZUxpYi5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5BZGQuY29kZVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOiBJRGVsZXRlQnlJZHMgPSB7XHJcbiAgICAgICAgICAgIGxpYklkczogW2lkXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvZGVsZXRlJyxcclxuICAgICAgICAgICAgc2hvd0xvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KF9wYXJhbXMpXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZV9GYWNlTGliLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgX3BhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICBsaWJJZHM6IGlkcy5qb2luKFwiLFwiKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgICAgIC8vIHVybDogJy9kYi9idXNpbmVzc0xpYi9kZWxldGVCeUlkcycsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvZGVsZXRlJyxcclxuICAgICAgICAgICAgc2hvd0xvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2VfRmFjZUxpYi5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZmluZFBlcnNvbkNvdW50KGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvc3RhdGlzdGljc3BlcnNvbicsXHJcbiAgICAgICAgICAgIHBhcmFtczogeyBsaWJJZHM6IGlkcy5qb2luKCcsJykgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmaW5kVHJlZUFyZWFXaXRoUm9sZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvYnVzaW5lc3NMaWIvZmluZFRyZWVBcmVhV2l0aFJvbGUnLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ2J1c2luZXNzTGliU2VydmljZScsIEJ1c2luZXNzTGliU2VydmljZSk7Il19
