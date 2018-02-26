define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/response.notify.factory", "../factory/SystemLog.factory", "../factory/userinfo.cache.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapService = (function () {
        function MapService($http, notifyFactory, systemLogFactory, userInfoCacheFactory) {
            this.systemLogFactory = systemLogFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        MapService.prototype.saveBaseInfo = function (model) {
            return this.$http({
                method: "POST",
                url: "/db/systempoint/saveOrUpdateBaseInfo",
                data: model
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        MapService.prototype.getBaseInfo = function () {
            return this.$http({
                method: "GET",
                url: "/db/systempoint/getBaseInfo"
            });
        };
        MapService.prototype.getSystemPointsByLayerType = function (layerType) {
            return this.$http({
                method: "GET",
                url: "/db/systempoint/list/layertype",
                params: { layerType: layerType }
            });
        };
        MapService.prototype.getSystemPointsByObjectType = function (objectType) {
            return this.$http({
                method: "GET",
                url: "/db/systempoint/list/objecttype",
                params: { objectType: objectType }
            });
        };
        MapService.prototype.getSystemPointById = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/systempoint/get",
                params: { id: id }
            });
        };
        MapService.prototype.getSystemPointByObjectId = function (objectId) {
            return this.$http({
                method: "GET",
                url: "/db/systempoint/get/objectid",
                params: { objectId: objectId }
            });
        };
        MapService.prototype.saveOrUpdateSystemPoint = function (model) {
            return this.$http({
                method: "POST",
                url: "/db/systempoint/saveorupdate",
                data: model
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        MapService.prototype.getSystemPoints = function () {
            var roleId = this.userInfoCacheFactory.getRoleIds();
            console.log(11111, roleId);
            return this.$http({
                method: "GET",
                url: "/db/systempoint/list",
                params: { roleId: roleId }
            });
        };
        MapService.prototype.getMapServerData = function () {
            return this.$http({
                method: "GET",
                url: "/db/param/findMapConfig"
            });
        };
        MapService.prototype.editMapConfig = function (model) {
            return this.$http({
                method: "POST",
                url: "/db/param/editMapConfig",
                data: model
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        MapService.prototype.getLayerInfo = function () {
            return this.$http({
                method: "GET",
                url: "/db/layer/findAllList",
            }).then(complete);
            function complete(res) {
                console.log("getMapConfig", res);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        MapService.prototype.addLayerInfo = function (model) {
            return this.$http({
                method: "POST",
                url: "/db/layer/add",
                data: model
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            })).then(complete);
            function complete(res) {
                console.log("addMapConfig", res);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        MapService.prototype.editLayerInfo = function (model) {
            return this.$http({
                method: "POST",
                url: "/db/layer/edit",
                data: model
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            })).then(complete);
            function complete(res) {
                console.log("editMapConfig", res);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        MapService.prototype.deleteLayerInfo = function (ID) {
            return this.$http({
                method: "POST",
                url: "/db/layer/delete",
                data: ID
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            })).then(complete);
            function complete(res) {
                console.log("deleteMapConfig", res);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        MapService.prototype.getMapConfig = function (configName) {
            return this.$http({
                method: "GET",
                url: "/mock/" + configName + "?v=" + new Date().getTime(),
                cache: true
            }).then(complete);
            function complete(res) {
                console.log("getMapConfig", res);
                return res.data;
            }
        };
        MapService.$inject = ["$http", 'notifyFactory', 'systemLogFactory', 'userInfoCacheFactory'];
        return MapService;
    }());
    main_app_1.app.service("mapService", MapService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL21hcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW9FQTtRQTZNSSxvQkFBWSxLQUFVLEVBQUUsYUFBcUMsRUFDekMsZ0JBQW1DLEVBQ25DLG9CQUEwQztZQUQxQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBQ25DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQWpORCxpQ0FBWSxHQUFaLFVBQWEsS0FBdUI7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHNDQUFzQztnQkFDM0MsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUMzRCxlQUFlLEVBQUUsaUNBQWUsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJO2dCQUNyRSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFFRCxnQ0FBVyxHQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRyxFQUFFLDZCQUE2QjthQUNyQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsK0NBQTBCLEdBQTFCLFVBQTJCLFNBQWlCO1lBQ3hD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TUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRyxFQUFFLFFBQVEsR0FBRyxVQUFVLEdBQUcsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUN6RCxLQUFLLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEIsa0JBQWtCLEdBQXVDO2dCQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFHTSxrQkFBTyxHQUFHLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBQyxrQkFBa0IsRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBWTFGLGlCQUFDO0tBcE5ELEFBb05DLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL21hcC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCB7SHR0cFJlc3BvbnNlUmVzdWx0LCBSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG4vL2ltcG9ydCB7TWFwT3B0c30gZnJvbSBcIi4uL21hcC9jb3JlL21vZGVsL21hcC5jb25maWcubW9kZWxcIjtcclxuaW1wb3J0IHtNYXBDb25maWdNb2RlbH0gZnJvbSBcIi4uL21hcC9jb3JlL21vZGVsL21hcC5jb25maWcubW9kZWxcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7TWFwQmFzZUluZm9Nb2RlbH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL01hcEJhc2VJbmZvTW9kZWxcIjtcclxuLy/lnLDlm77mnI3liqHmlbDmja7lj4LmlbBcclxuaW1wb3J0IHtNYXBDb25maWdQYXJhbWV0ZXJFeHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9NYXBDb25maWdQYXJhbWV0ZXJcIlxyXG4vL+WbvuWxgueuoeeQhuWPguaVsFxyXG5pbXBvcnQge0xheWVyfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvTGF5ZXJcIlxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlckFjdGlvblR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHtJU3lzdGVtTG9nRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lVc2VySW5mb0NhY2hlRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgIFwiLi4vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1hcFNlcnZpY2Uge1xyXG4gICAgLy8g6K6+572u54Ot5Yqb5Zu+5pWw5o2uXHJcbiAgICBzYXZlQmFzZUluZm8obW9kZWw6IE1hcEJhc2VJbmZvTW9kZWwpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PG51bGw+PjtcclxuXHJcbiAgICAvLyDojrflj5blm77lsYLnsbvlnovkv6Hmga/liJfooago5Zu+5bGC6YWN572u55SoKVxyXG4gICAgZ2V0QmFzZUluZm8oKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxNYXBCYXNlSW5mb01vZGVsPj47XHJcblxyXG4gICAgLy8g5qC55o2u5Zu+5bGC57G75Z6L6I635Y+W54K55L2N5L+h5oGvKOaaguacquS9v+eUqClcclxuICAgIGdldFN5c3RlbVBvaW50c0J5TGF5ZXJUeXBlKGxheWVyVHlwZTogc3RyaW5nKTogYW55O1xyXG5cclxuICAgIC8vIOagueaNruWvueixoeexu+Wei+iOt+WPlueCueS9jeS/oeaBryjmmoLmnKrkvb/nlKgpXHJcbiAgICBnZXRTeXN0ZW1Qb2ludHNCeU9iamVjdFR5cGUob2JqZWN0VHlwZTogc3RyaW5nKTogYW55O1xyXG5cclxuICAgIC8vIOagueaNrnN5c3RlbXBvaW50IGlk6I635Y+W54K55L2N5L+h5oGvKOaaguacquS9v+eUqClcclxuICAgIGdldFN5c3RlbVBvaW50QnlJZChpZDogc3RyaW5nKTogYW55O1xyXG5cclxuICAgIC8vIOagueaNrnN5c3RlbXBvaW50IOS4rW9iamVjdGlk6I635Y+W54K55L2N5L+h5oGvKOaaguacquS9v+eUqClcclxuICAgIGdldFN5c3RlbVBvaW50QnlPYmplY3RJZChvYmplY3RJZDogc3RyaW5nKTogYW55O1xyXG5cclxuICAgIC8vIOS/neWtmOeCueS9jeS/oeaBryDluIPngrnlkI7osIPnlKhcclxuICAgIHNhdmVPclVwZGF0ZVN5c3RlbVBvaW50KHN5c3RlbVBvaW50OiBTeXN0ZW1Qb2ludCk6IGFueTtcclxuXHJcbiAgICAvLyDojrflj5bmiYDmnInngrnkvY3kv6Hmga9cclxuICAgIGdldFN5c3RlbVBvaW50cygpOiBhbnk7XHJcblxyXG5cclxuICAgIC8v6I635Y+W5Zyw5Zu+5pyN5Yqh5L+h5oGvXHJcbiAgICBnZXRNYXBTZXJ2ZXJEYXRhKCk6IGFueTtcclxuXHJcbiAgICAvL+e8lui+keWcsOWbvuacjeWKoeS/oeaBr1xyXG4gICAgZWRpdE1hcENvbmZpZyhtb2RlbDogTWFwQ29uZmlnUGFyYW1ldGVyRXh0KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcblxyXG4gICAgLy/ojrflj5blm77lsYLnrqHnkIbliJfooahcclxuICAgIGdldExheWVySW5mbygpOiBhbnlcclxuXHJcbiAgICAvL+WIneWni+WMluWcsOWbvlxyXG4gICAgZ2V0TWFwQ29uZmlnKGNvbmZpZ05hbWU6IHN0cmluZyk6IGFueTtcclxuXHJcbiAgICAvL+WinuWKoOWbvuWxglxyXG4gICAgYWRkTGF5ZXJJbmZvKG1vZGVsOiBMYXllcik6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG5cclxuICAgIC8v5L+u5pS55Zu+5bGCXHJcbiAgICBlZGl0TGF5ZXJJbmZvKG1vZGVsOiBMYXllcik6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG5cclxuICAgIC8v5Yig6Zmk5Zu+5bGCXHJcbiAgICBkZWxldGVMYXllckluZm8oSUQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG59XHJcblxyXG5jbGFzcyBNYXBTZXJ2aWNlIGltcGxlbWVudHMgSU1hcFNlcnZpY2Uge1xyXG4gICAgc2F2ZUJhc2VJbmZvKG1vZGVsOiBNYXBCYXNlSW5mb01vZGVsKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3N5c3RlbXBvaW50L3NhdmVPclVwZGF0ZUJhc2VJbmZvXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZV9NYXBSZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5BZGQuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCYXNlSW5mbygpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PE1hcEJhc2VJbmZvTW9kZWw+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvc3lzdGVtcG9pbnQvZ2V0QmFzZUluZm9cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN5c3RlbVBvaW50c0J5TGF5ZXJUeXBlKGxheWVyVHlwZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9zeXN0ZW1wb2ludC9saXN0L2xheWVydHlwZVwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtsYXllclR5cGU6IGxheWVyVHlwZX1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeXN0ZW1Qb2ludHNCeU9iamVjdFR5cGUob2JqZWN0VHlwZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9zeXN0ZW1wb2ludC9saXN0L29iamVjdHR5cGVcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7b2JqZWN0VHlwZTogb2JqZWN0VHlwZX1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeXN0ZW1Qb2ludEJ5SWQoaWQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvc3lzdGVtcG9pbnQvZ2V0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge2lkOiBpZH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeXN0ZW1Qb2ludEJ5T2JqZWN0SWQob2JqZWN0SWQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvc3lzdGVtcG9pbnQvZ2V0L29iamVjdGlkXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge29iamVjdElkOiBvYmplY3RJZH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlT3JVcGRhdGVTeXN0ZW1Qb2ludChtb2RlbDogU3lzdGVtUG9pbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9zeXN0ZW1wb2ludC9zYXZlb3J1cGRhdGVcIixcclxuICAgICAgICAgICAgZGF0YTogbW9kZWxcclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYykudGhlbihcclxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2VfTWFwUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeXN0ZW1Qb2ludHMoKTogYW55IHtcclxuICAgICAgICBsZXQgcm9sZUlkID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRSb2xlSWRzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coMTExMTEscm9sZUlkKVxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3N5c3RlbXBvaW50L2xpc3RcIixcclxuICAgICAgICAgICAgcGFyYW1zOntyb2xlSWQ6cm9sZUlkfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRNYXBTZXJ2ZXJEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3BhcmFtL2ZpbmRNYXBDb25maWdcIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRNYXBDb25maWcobW9kZWw6IE1hcENvbmZpZ1BhcmFtZXRlckV4dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9wYXJhbS9lZGl0TWFwQ29uZmlnXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2VfTWFwUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGF5ZXJJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xheWVyL2ZpbmRBbGxMaXN0XCIsXHJcbiAgICAgICAgfSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0TWFwQ29uZmlnXCIsIHJlcyk7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxMYXllcj47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZExheWVySW5mbyhtb2RlbDogTGF5ZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGF5ZXIvYWRkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZV9NYXBSZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5BZGQuY29kZVxyXG4gICAgICAgIH0pKS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxudWxsPikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZE1hcENvbmZpZ1wiLCByZXMpO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8bnVsbD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRMYXllckluZm8obW9kZWw6IExheWVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xheWVyL2VkaXRcIixcclxuICAgICAgICAgICAgZGF0YTogbW9kZWxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlX01hcFJlc291cmNlLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PG51bGw+KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRpdE1hcENvbmZpZ1wiLCByZXMpO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8bnVsbD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUxheWVySW5mbyhJRDogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xheWVyL2RlbGV0ZVwiLFxyXG4gICAgICAgICAgICBkYXRhOiBJRFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfUmVzb3VyY2VfTWFwUmVzb3VyY2UuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8bnVsbD4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGVNYXBDb25maWdcIiwgcmVzKTtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PG51bGw+O1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXBDb25maWcoY29uZmlnTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9tb2NrL1wiICsgY29uZmlnTmFtZSArIFwiP3Y9XCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWVcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBIdHRwUmVzcG9uc2VSZXN1bHQ8TWFwQ29uZmlnTW9kZWw+KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0TWFwQ29uZmlnXCIsIHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJGh0dHBcIiwgJ25vdGlmeUZhY3RvcnknLCdzeXN0ZW1Mb2dGYWN0b3J5JywndXNlckluZm9DYWNoZUZhY3RvcnknXTtcclxuXHJcbiAgICBwcml2YXRlICRodHRwOiBhbnk7XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFueSwgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTogSVN5c3RlbUxvZ0ZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OklVc2VySW5mb0NhY2hlRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSBub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKFwibWFwU2VydmljZVwiLCBNYXBTZXJ2aWNlKTtcclxuIl19
