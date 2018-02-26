define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/SystemLog.factory", "angular"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EngineNodeServer = (function () {
        function EngineNodeServer($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
        }
        EngineNodeServer.prototype.findListByParams = function (params) {
            return this.$http({
                method: 'get',
                params: params,
                url: '/db/EngineNode/findListByParams'
            });
        };
        ;
        EngineNodeServer.prototype.findById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/EngineNode/findById',
            });
        };
        ;
        EngineNodeServer.prototype.update = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/EngineNode/update',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineNode.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        EngineNodeServer.prototype.save = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/EngineNode/save',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineNode.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        EngineNodeServer.prototype.deleteById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/EngineNode/deleteById',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineNode.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        EngineNodeServer.prototype.deleteByIds = function (id) {
            var _params = {
                ids: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/EngineNode/deleteByIds',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineNode.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        EngineNodeServer.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return EngineNodeServer;
    }());
    main_app_1.app.service('engineNodeServer', EngineNodeServer);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VuZ2luZU5vZGVTZXJ2ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFnQ0E7UUFHSSwwQkFBb0IsS0FBVSxFQUFVLGFBQXFDLEVBQVMsZ0JBQWtDO1lBQXBHLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRXhILENBQUM7UUFDRCwyQ0FBZ0IsR0FBaEIsVUFBa0IsTUFBd0I7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFDLGlDQUFpQzthQUN4QyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBQUEsQ0FBQztRQUNGLG1DQUFRLEdBQVIsVUFBUyxFQUFVO1lBQ2YsSUFBSSxPQUFPLEdBQW1CO2dCQUMxQixFQUFFLEVBQUMsRUFBRTthQUNSLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsS0FBSztnQkFDWixNQUFNLEVBQUUsT0FBTztnQkFDZixHQUFHLEVBQUMseUJBQXlCO2FBQ2hDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQSxDQUFDO1FBRUYsaUNBQU0sR0FBTixVQUFPLE1BQWtCO1lBQ3JCLElBQUksT0FBTyxHQUFHO2dCQUNWLEtBQUssRUFBQyxNQUFNO2FBQ2YsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLE9BQU8sRUFBQyxFQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFBQztnQkFDM0QsR0FBRyxFQUFDLHVCQUF1QjtnQkFDM0IsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQy9CLENBQUMsQ0FBQyxJQUFJ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YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQTlGSyx3QkFBTyxHQUFpQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztRQStGaEYsdUJBQUM7S0FoR0QsQUFnR0MsSUFBQTtJQUNELGNBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VuZ2luZU5vZGVTZXJ2ZXIuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcbmltcG9ydCB7RW5naW5lTm9kZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0VuZ2luZU5vZGVQYXJhbXNcIjtcclxuaW1wb3J0IHtcclxuICAgIElGaW5kQnlJZFBhcmFtcywgSURlbGV0ZUJ5SWQsXHJcbiAgICBJRGVsZXRlQnlJZHNcclxufSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVxdWVzdC9SZXF1ZXN0UGFyYW1zXCI7XHJcblxyXG5cclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCJcclxuaW1wb3J0IHtJU3lzdGVtTG9nRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtFbmdpbmVOb2RlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FbmdpbmVOb2RlRXhcIjtcclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclNlY29uZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclRoaXJkTW9kdWxlfSBmcm9tICAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclRoaXJkTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyQWN0aW9uVHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckFjdGlvblR5cGUnO1xyXG5pbXBvcnQgeyBFbmdpbmVOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0VuZ2luZU5vZGVcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuZXhwb3J0IGludGVyZmFjZSBJRW5naW5lTm9kZVNlcnZlciB7XHJcbiAgICBmaW5kTGlzdEJ5UGFyYW1zKCBwYXJhbXM6IEVuZ2luZU5vZGVQYXJhbXMpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgZmluZEJ5SWQoaWQ6IHN0cmluZyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHVwZGF0ZShwYXJhbXM6IEVuZ2luZU5vZGUpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkKGlkOiBzdHJpbmcpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkcyhpZDogQXJyYXk8c3RyaW5nPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHNhdmUocGFyYW1zOiBFbmdpbmVOb2RlRXgpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbn1cclxuY2xhc3MgRW5naW5lTm9kZVNlcnZlciBpbXBsZW1lbnRzIElFbmdpbmVOb2RlU2VydmVye1xyXG4gICAgc3RhdGljICRpbmplY3Q6QXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCdub3RpZnlGYWN0b3J5Jywnc3lzdGVtTG9nRmFjdG9yeSddO1xyXG4gICAgcHJpdmF0ZSBub3RpZnlGdW5jOihyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pPT5SZXNwb25zZVJlc3VsdDxhbnk+O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnkscHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OklTeXN0ZW1Mb2dGYWN0b3J5KSB7XHJcblxyXG4gICAgfVxyXG4gICAgZmluZExpc3RCeVBhcmFtcyAocGFyYW1zOiBFbmdpbmVOb2RlUGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9FbmdpbmVOb2RlL2ZpbmRMaXN0QnlQYXJhbXMnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGZpbmRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRmluZEJ5SWRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGlkOmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9FbmdpbmVOb2RlL2ZpbmRCeUlkJyxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlKHBhcmFtczogRW5naW5lTm9kZSkge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBtb2RlbDpwYXJhbXNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9FbmdpbmVOb2RlL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoX3BhcmFtcyksXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX0VuZ2luZU5vZGUuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNhdmUocGFyYW1zOiBFbmdpbmVOb2RlRXgpIHtcclxuXHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIG1vZGVsOnBhcmFtc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL0VuZ2luZU5vZGUvc2F2ZScsXHJcbiAgICAgICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoX3BhcmFtcylcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfRW5naW5lTm9kZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5BZGQuY29kZVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklEZWxldGVCeUlkID0ge1xyXG4gICAgICAgICAgICBpZDppZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvRW5naW5lTm9kZS9kZWxldGVCeUlkJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9FbmdpbmVOb2RlLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhpZDogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklEZWxldGVCeUlkcyA9IHtcclxuICAgICAgICAgICAgaWRzOmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9FbmdpbmVOb2RlL2RlbGV0ZUJ5SWRzJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9FbmdpbmVOb2RlLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxufVxyXG5hcHAuc2VydmljZSgnZW5naW5lTm9kZVNlcnZlcicsIEVuZ2luZU5vZGVTZXJ2ZXIpOyJdfQ==
