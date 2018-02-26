define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperActionType", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperThirdModule_1, OperSecondModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnalysisService = (function () {
        function AnalysisService($http, $q, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.$q = $q;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg();
        }
        AnalysisService.prototype.searchFaceTrack = function (params) {
            return this.$http({
                method: "POST",
                url: "/pdp/faceCtrl/search/accessLog",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_Track.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.findRealyInfo = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/analysis/searchrealyinfo",
                data: { ids: params }
            }).then(this.notifyFunc);
        };
        AnalysisService.prototype.faceAnalysis = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/analysis/faceAnalysis',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_Analysis.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.searchPersonAlarm = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/search/alarmlog',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_AlarmAnalysis.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.searchAccompanying = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/faceCtrl/accompany/analyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_AccompanyAnalysis.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.faceFrequencyAnalysis = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/faceCtrl/frequency/analyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.faceFrequencyAppear = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/faceCtrl/frequency/appear',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAppear.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.getOffLineList = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/analysis/findlistwithofflinetask',
                data: params
            });
        };
        AnalysisService.prototype.getOffLineDetail = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/configCtrl/analyseTask/detail',
                data: params
            });
        };
        AnalysisService.prototype.deleteOffLineDetail = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/IntelligentAnalyse/deleteTask',
                params: params
            }).then(this.notifyFunc);
        };
        AnalysisService.prototype.searchMacAccompanying = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/rfidCtrl/mac/followAnalyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Accompany.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.FaceCollisionAccompanying = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/faceCtrl/impact/analyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_CrashAnalysis.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.searchMacFrequency = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/rfidCtrl/mac/frequencyAnalyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Frequency.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.macCollision = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/rfidCtrl/mac/impactAnalyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Crash.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.macAlarm = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/rfidCtrl/mac/alarmAnalyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Alarm.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.faceToMac = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/rfidCtrl/FaceImpactMac/analyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_More_FaceMacCrash.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.macToFace = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/rfidCtrl/MacImpactFace/analyse',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.IntelligentAnalysis_More_FaceMacCrash.code,
                ActionType: OperActionType_1.OperActionType.Query.code
            }));
        };
        AnalysisService.prototype.faceverify = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/search/faceverify',
                params: params
            });
        };
        AnalysisService.$inject = ['$http', '$q', 'notifyFactory', 'systemLogFactory'];
        return AnalysisService;
    }());
    main_app_1.app.service('analysisService', AnalysisService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaURBO1FBS0kseUJBQW9CLEtBQVUsRUFBVSxFQUFPLEVBQVUsYUFBcUMsRUFBVSxnQkFBbUM7WUFBdkgsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFVLE9BQUUsR0FBRixFQUFFLENBQUs7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBQ3ZJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQyxDQUFDO1FBRUQseUNBQWUsR0FBZixVQUFnQixNQUFXO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxnQ0FBZ0M7Z0JBQ3JDLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUMvQixlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUN6RCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJO2dCQUNoRSxlQUFlLEVBQUUsaUNBQWUsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJO2dCQUNwRSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSTthQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNYLENBQUM7UUFFRCx1Q0FBYSxHQUFiLFVBQWMsTUFBcUI7WUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDhCQUE4QjtnQkFDbkMsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQzthQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QixDQUFDO1FBRUQsc0NBQVksR0FBWixVQUFhLE1BQVc7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQ3pELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLHdCQUF3QixDQUFDLElBQUk7Z0JBQ2hFLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLGlDQUFpQyxDQUFDLElBQUk7Z0JBQ3ZFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQztRQUVELDJDQUFpQixHQUFqQixVQUFrQixNQUFXO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxzQkFBc0I7Z0JBQzNCLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUN6RCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJO2dCQUNoRSxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxzQ0FBc0MsQ0FBQyxJQUFJO2dCQUM1RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSTthQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUM7UUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsTUFBVztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsaUNBQWlDO2dCQUN0QyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsbUJBQW1CLENBQUMsSUFBSTtnQkFDekQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsd0JBQXdCLENBQUMsSUFBSTtnQkFDaEUsZUFBZSxFQUFFLGlDQUFlLENBQUMsMENBQTBDLENBQUMsSUFBSTtnQkFDaEYsVUFBVSxFQUFFLCtCQUFjLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDeEMsQ0FBQyxDQUFDLENBQUE7UUFDUCxDQUFDO1FBRUQsK0NBQXFCLEdBQXJCLFVBQXNCLE1BQVc7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQ3pELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLHdCQUF3QixDQUFDLElBQUk7Z0JBQ2hFLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDBDQUEwQyxDQUFDLElBQUk7Z0JBQ2hGLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQztRQUVELDZDQUFtQixHQUFuQixVQUFvQixNQUFXO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxnQ0FBZ0M7Z0JBQ3JDLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUN6RCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJO2dCQUNoRSxlQUFlLEVBQUUsaUNBQWUsQ0FBQyx3Q0FBd0MsQ0FBQyxJQUFJO2dCQUM5RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSTthQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUM7UUFFRCx3Q0FBYyxHQUFkLFVBQWUsTUFBVztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsc0NBQXNDO2dCQUMzQyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCwwQ0FBZ0IsR0FBaEIsVUFBaUIsTUFBVztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsb0NBQW9DO2dCQUN6QyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCw2Q0FBbUIsR0FBbkIsVUFBb0IsTUFBVztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsb0NBQW9DO2dCQUN6QyxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QixDQUFDO1FBRUQsK0NBQXFCLEdBQXJCLFVBQXNCLE1BQVc7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQ3pELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLHVCQUF1QixDQUFDLElBQUk7Z0JBQy9ELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLGlDQUFpQyxDQUFDLElBQUk7Z0JBQ3ZFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQztRQUVELG1EQUF5QixHQUF6QixVQUEwQixNQUFXO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSw4QkFBOEI7Z0JBQ25DLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUN6RCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJO2dCQUNoRSxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxzQ0FBc0MsQ0FBQyxJQUFJO2dCQUM1RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSTthQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUM7UUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsTUFBVztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsb0NBQW9DO2dCQUN6QyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsbUJBQW1CLENBQUMsSUFBSTtnQkFDekQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSTtnQkFDL0QsZUFBZSxFQUFFLGlDQUFlLENBQUMsaUNBQWlDLENBQUMsSUFBSTtnQkFDdkUsVUFBVSxFQUFFLCtCQUFjLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDeEMsQ0FBQyxDQUFDLENBQUE7UUFDUCxDQUFDO1FBRUQsc0NBQVksR0FBWixVQUFhLE1BQVc7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQ3pELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLHVCQUF1QixDQUFDLElBQUk7Z0JBQy9ELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDZCQUE2QixDQUFDLElBQUk7Z0JBQ25FLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQztRQUVELGtDQUFRLEdBQVIsVUFBUyxNQUFXO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxnQ0FBZ0M7Z0JBQ3JDLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUN6RCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJO2dCQUMvRCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJO2dCQUNuRSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSTthQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUM7UUFFRCxtQ0FBUyxHQUFULFVBQVUsTUFBVztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUscUNBQXFDO2dCQUMxQyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsbUJBQW1CLENBQUMsSUFBSTtnQkFDekQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSTtnQkFDL0QsZUFBZSxFQUFFLGlDQUFlLENBQUMscUNBQXFDLENBQUMsSUFBSTtnQkFDM0UsVUFBVSxFQUFFLCtCQUFjLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDeEMsQ0FBQyxDQUFDLENBQUE7UUFDUCxDQUFDO1FBRUQsbUNBQVMsR0FBVCxVQUFVLE1BQVc7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHFDQUFxQztnQkFDMUMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQ3pELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLHVCQUF1QixDQUFDLElBQUk7Z0JBQy9ELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHFDQUFxQyxDQUFDLElBQUk7Z0JBQzNFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQztRQUlELG9DQUFVLEdBQVYsVUFBVyxNQUFXO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSx3QkFBd0I7Z0JBQzdCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtRQUNOLENBQUM7UUF6Tk0sdUJBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBME54RixzQkFBQztLQTVORCxBQTROQyxJQUFBO0lBRUQsY0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyRmlyc3RNb2R1bGVcIjtcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGVcIjtcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZVwiO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCAgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgJDogYW55LCByZXF1aXJlOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBbmFseXNpc1NlcnZpY2Uge1xyXG4gICAgc2VhcmNoRmFjZVRyYWNrKHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBmYWNlQW5hbHlzaXMocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIHNlYXJjaFBlcnNvbkFsYXJtKHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBzZWFyY2hBY2NvbXBhbnlpbmcocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIGZpbmRSZWFseUluZm8ocGFyYW1zOiBBcnJheTxzdHJpbmc+KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBmYWNlRnJlcXVlbmN5QW5hbHlzaXMocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIGZhY2VGcmVxdWVuY3lBcHBlYXIocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIGdldE9mZkxpbmVMaXN0KHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBnZXRPZmZMaW5lRGV0YWlsKHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBkZWxldGVPZmZMaW5lRGV0YWlsKHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBzZWFyY2hNYWNBY2NvbXBhbnlpbmcocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIEZhY2VDb2xsaXNpb25BY2NvbXBhbnlpbmcocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIHNlYXJjaE1hY0ZyZXF1ZW5jeShwYXJhbXM6IGFueSk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgbWFjQ29sbGlzaW9uKHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBtYWNBbGFybShwYXJhbXM6IGFueSk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgZmFjZVRvTWFjKHBhcmFtczogYW55KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBtYWNUb0ZhY2UocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIGZhY2V2ZXJpZnkocGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG59XHJcblxyXG5jbGFzcyBBbmFseXNpc1NlcnZpY2UgaW1wbGVtZW50cyBJQW5hbHlzaXNTZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnJHEnLCAnbm90aWZ5RmFjdG9yeScsJ3N5c3RlbUxvZ0ZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgJHE6IGFueSwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LCBwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6IElTeXN0ZW1Mb2dGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaEZhY2VUcmFjayhwYXJhbXM6IGFueSk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9wZHAvZmFjZUN0cmwvc2VhcmNoL2FjY2Vzc0xvZ1wiLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2VfVHJhY2suY29kZSxcclxuICAgICAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlF1ZXJ5LmNvZGVcclxuICAgICAgICAgICAgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFJlYWx5SW5mbyhwYXJhbXM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvYW5hbHlzaXMvc2VhcmNocmVhbHlpbmZvXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtpZHM6IHBhcmFtc31cclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYylcclxuICAgIH1cclxuXHJcbiAgICBmYWNlQW5hbHlzaXMocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvYW5hbHlzaXMvZmFjZUFuYWx5c2lzJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2VfQW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuUXVlcnkuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaFBlcnNvbkFsYXJtKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9zZWFyY2gvYWxhcm1sb2cnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZV9BbGFybUFuYWx5c2lzLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlF1ZXJ5LmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hBY2NvbXBhbnlpbmcocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL2ZhY2VDdHJsL2FjY29tcGFueS9hbmFseXNlJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2VfQWNjb21wYW55QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuUXVlcnkuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZhY2VGcmVxdWVuY3lBbmFseXNpcyhwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvZmFjZUN0cmwvZnJlcXVlbmN5L2FuYWx5c2UnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZV9GcmVxdWVuY3lBbmFseXNpcy5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5RdWVyeS5jb2RlXHJcbiAgICAgICAgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZmFjZUZyZXF1ZW5jeUFwcGVhcihwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvZmFjZUN0cmwvZnJlcXVlbmN5L2FwcGVhcicsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlX0ZyZXF1ZW5jeUFwcGVhci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5RdWVyeS5jb2RlXHJcbiAgICAgICAgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2ZmTGluZUxpc3QocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvYW5hbHlzaXMvZmluZGxpc3R3aXRob2ZmbGluZXRhc2snLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldE9mZkxpbmVEZXRhaWwocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL2NvbmZpZ0N0cmwvYW5hbHlzZVRhc2svZGV0YWlsJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVPZmZMaW5lRGV0YWlsKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9JbnRlbGxpZ2VudEFuYWx5c2UvZGVsZXRlVGFzaycsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpXHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoTWFjQWNjb21wYW55aW5nKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9yZmlkQ3RybC9tYWMvZm9sbG93QW5hbHlzZScsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hYy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hY19BY2NvbXBhbnkuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuUXVlcnkuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIEZhY2VDb2xsaXNpb25BY2NvbXBhbnlpbmcocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL2ZhY2VDdHJsL2ltcGFjdC9hbmFseXNlJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2VfQ3Jhc2hBbmFseXNpcy5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5RdWVyeS5jb2RlXHJcbiAgICAgICAgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoTWFjRnJlcXVlbmN5KHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9yZmlkQ3RybC9tYWMvZnJlcXVlbmN5QW5hbHlzZScsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hYy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hY19GcmVxdWVuY3kuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuUXVlcnkuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIG1hY0NvbGxpc2lvbihwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvcmZpZEN0cmwvbWFjL2ltcGFjdEFuYWx5c2UnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19NYWMuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19NYWNfQ3Jhc2guY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuUXVlcnkuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIG1hY0FsYXJtKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9yZmlkQ3RybC9tYWMvYWxhcm1BbmFseXNlJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfTWFjLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfTWFjX0FsYXJtLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlF1ZXJ5LmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmYWNlVG9NYWMocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3JmaWRDdHJsL0ZhY2VJbXBhY3RNYWMvYW5hbHlzZScsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hYy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01vcmVfRmFjZU1hY0NyYXNoLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlF1ZXJ5LmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICBtYWNUb0ZhY2UocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3JmaWRDdHJsL01hY0ltcGFjdEZhY2UvYW5hbHlzZScsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXMuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hYy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01vcmVfRmFjZU1hY0NyYXNoLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlF1ZXJ5LmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZhY2V2ZXJpZnkocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3NlYXJjaC9mYWNldmVyaWZ5JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnYW5hbHlzaXNTZXJ2aWNlJywgQW5hbHlzaXNTZXJ2aWNlKTsiXX0=
