define(["require", "exports", "../../common/app/main.app", "../AnalysisEnum", "./analysisMmap.server"], function (require, exports, main_app_1, AnalysisEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MacAnalysisMapService = (function () {
        function MacAnalysisMapService(analysisMmapServer) {
            this.analysisMmapServer = analysisMmapServer;
        }
        MacAnalysisMapService.prototype.resultToMap = function (id, type) {
            if (type === "Face") {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, id, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
            else if (type === "Mac") {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, id, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
        };
        MacAnalysisMapService.prototype.unResultToMap = function (id, resultForMap, type) {
            var res = resultForMap[id];
            if (type === "Face") {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, id, AnalysisEnum_1.MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
            }
            else if (type === "Mac") {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, id, AnalysisEnum_1.MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
            }
        };
        MacAnalysisMapService.prototype.getSystemPointForParams = function (points) {
            var _this = this;
            var arr = [];
            points.forEach(function (item) {
                var ID = item.WiFiLog.MacDeviceId || item.EFenceLog.MacDeviceId;
                var s = false;
                for (var index = 0; index < _this.analysisMmapServer.getSystemPoint().length; index++) {
                    var point = _this.analysisMmapServer.getSystemPoint()[index];
                    if (ID === point.ObjectID) {
                        s = true;
                        arr.push({
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: item.PerceiveInfos.ID,
                            Descrption: point.Descrption,
                            LayerType: point.LayerType,
                            ObjectType: point.ObjectType,
                            TaskStatus: point.TaskStatus,
                            ObjectState: point.ObjectState,
                            ObjectName: point.ObjectName
                        });
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        MacAnalysisMapService.$inject = ['analysisMmapServer'];
        return MacAnalysisMapService;
    }());
    main_app_1.app.service('macAnalysisMapService', MacAnalysisMapService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9tYWluL21hY0FuYWx5c2lzTWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBWUE7UUFHSSwrQkFBb0Isa0JBQXVDO1lBQXZDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7UUFFM0QsQ0FBQztRQUVELDJDQUFXLEdBQVgsVUFBWSxFQUFVLEVBQUUsSUFBYTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQywwQkFBVyxDQUFDLGlCQUFpQixFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLDBCQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ25KLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsMEJBQVcsQ0FBQyxpQkFBaUIsRUFBRSwwQkFBVyxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsMEJBQVcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDakosQ0FBQztRQUNMLENBQUM7UUFHRCw2Q0FBYSxHQUFiLFVBQWMsRUFBVSxFQUFFLFlBQXVCLEVBQUUsSUFBYTtZQUM1RCxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsMEJBQVcsQ0FBQyxpQkFBaUIsRUFBRSwwQkFBVyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSwwQkFBVyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZLLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsMEJBQVcsQ0FBQyxpQkFBaUIsRUFBRSwwQkFBVyxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsMEJBQVcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNySyxDQUFDO1FBQ0wsQ0FBQztRQUdELHVEQUF1QixHQUF2QixVQUF3QixNQUFrQjtZQUExQyxpQkE2QkM7WUE1QkcsSUFBSSxHQUFHLEdBQUcsRUFBd0IsQ0FBQztZQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztnQkFDckIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDZCxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFDbkYsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1RCxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ1QsR0FBRyxDQUFDLElBQUksQ0FBQzs0QkFDTCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7NEJBQ2QsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHOzRCQUNkLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTs0QkFDWixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7NEJBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7NEJBQy9CLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTs0QkFDNUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTOzRCQUMxQixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7NEJBQzVCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTs0QkFDNUIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXOzRCQUM5QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7eUJBQ2pCLENBQUMsQ0FBQztvQkFDckIsQ0FBQztnQkFDTCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQXRETSw2QkFBTyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQXVENUMsNEJBQUM7S0F4REQsQUF3REMsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9tYWluL21hY0FuYWx5c2lzTWFwLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJQW5hbHlzaXNNbWFwU2VydmVyfSBmcm9tIFwiLi9hbmFseXNpc01tYXAuc2VydmVyXCI7XHJcbmltcG9ydCBcIi4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQge01hcmtlcnNJY29uLCBPdmVybGF5TmFtZX0gZnJvbSBcIi4uL0FuYWx5c2lzRW51bVwiO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxudHlwZSBNYXBSZXN1bHQgPSB7IFtrZXk6IHN0cmluZ106IGFueSB9XHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1hY0FuYWx5c2lzTWFwU2VydmljZSB7XHJcbiAgICByZXN1bHRUb01hcChpZDogc3RyaW5nLCB0eXBlPzogc3RyaW5nKTp2b2lkO1xyXG4gICAgdW5SZXN1bHRUb01hcChpZDogc3RyaW5nLCByZXN1bHRGb3JNYXA6IE1hcFJlc3VsdCwgdHlwZT86IHN0cmluZyk6dm9pZDtcclxuICAgIGdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHBvaW50czogQXJyYXk8YW55Pik6IEFycmF5PFN5c3RlbVBvaW50PjtcclxufVxyXG5cclxuY2xhc3MgTWFjQW5hbHlzaXNNYXBTZXJ2aWNlIGltcGxlbWVudHMgSU1hY0FuYWx5c2lzTWFwU2VydmljZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnYW5hbHlzaXNNbWFwU2VydmVyJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXNpc01tYXBTZXJ2ZXI6IElBbmFseXNpc01tYXBTZXJ2ZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0VG9NYXAoaWQ6IHN0cmluZywgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcIkZhY2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5zZXRNYXJrZXJJY29uKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCwgaWQsIE1hcmtlcnNJY29uLkhvdmVyUmVkSWNvbiwgOTk5KVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJNYWNcIikge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5zZXRNYXJrZXJJY29uKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXAsIGlkLCBNYXJrZXJzSWNvbi5Ib3ZlclJlZEljb24sIDk5OSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWPlua2iOe7k+aenOaYvuekuuWcsOWbvuWvueW6lOeahOeCueS9jVxyXG4gICAgdW5SZXN1bHRUb01hcChpZDogc3RyaW5nLCByZXN1bHRGb3JNYXA6IE1hcFJlc3VsdCwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSByZXN1bHRGb3JNYXBbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcIkZhY2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5zZXRNYXJrZXJJY29uKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCwgaWQsIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIk1hY1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgaWQsIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmoLnmja7ngrnkvY3pm4blkIjojrflj5blr7nlupTnmoTorr7lpIfpm4blkIhcclxuICAgIGdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHBvaW50czogQXJyYXk8YW55Pik6IEFycmF5PFN5c3RlbVBvaW50PiB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PFN5c3RlbVBvaW50PjtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBJRCA9IGl0ZW0uV2lGaUxvZy5NYWNEZXZpY2VJZCB8fCBpdGVtLkVGZW5jZUxvZy5NYWNEZXZpY2VJZDtcclxuICAgICAgICAgICAgbGV0IHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludCgpW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChJRCA9PT0gcG9pbnQuT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExhdDogcG9pbnQuTGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb246IHBvaW50LkxvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IHBvaW50LklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RJRDogcG9pbnQuT2JqZWN0SUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdElEOiBpdGVtLlBlcmNlaXZlSW5mb3MuSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NycHRpb246IHBvaW50LkRlc2NycHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExheWVyVHlwZTogcG9pbnQuTGF5ZXJUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RUeXBlOiBwb2ludC5PYmplY3RUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYXNrU3RhdHVzOiBwb2ludC5UYXNrU3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RTdGF0ZTogcG9pbnQuT2JqZWN0U3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdE5hbWU6IHBvaW50Lk9iamVjdE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9YXMgU3lzdGVtUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdtYWNBbmFseXNpc01hcFNlcnZpY2UnLCBNYWNBbmFseXNpc01hcFNlcnZpY2UpOyJdfQ==
