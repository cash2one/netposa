define(["require", "exports", "../../common/app/main.app", "./MacAccompanyEnum", "../AnalysisEnum", "css!../style/MacAccompany.css"], function (require, exports, main_app_1, MacAccompanyEnum_1, AnalysisEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var analysisController = (function () {
        function analysisController($scope, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$inject = ['$scope', '$rootScope', '$timeout'];
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.FastDate = [];
            this.ResultActive = false;
            this.resultList = MacAccompanyEnum_1.MockMacResultData(5);
            this.isShowCondition = true;
            this.initResult = true;
            this.isResult = true;
            this.isCondition = false;
            this.isShowDetail = false;
            this.showTrackdetail = false;
            this.analysisResult = MacAccompanyEnum_1.getAnasisResult(5);
            this.analysisList = MacAccompanyEnum_1.getAnalysisList(5);
            this.map = this.$scope.$parent.map;
            this.systemPointList = this.$scope.$parent.systemPoint;
            this.width = $(window).width() - 60;
            this.analysisDetail = document.getElementById("result-track-detail");
            this.$timeout(function () {
                _this.$scope.$emit('goCondition', true);
            });
            this.initParams();
        }
        analysisController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        analysisController.prototype.initParams = function () {
            this.MacAccompanyParams = new MacAccompanyEnum_1.MacAccompanyParams();
        };
        analysisController.prototype.switchCondition = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('goCondition', true);
            });
        };
        analysisController.prototype.switchResult = function () {
            this.isShowCondition = false;
            this.isCondition = false;
            this.isResult = true;
        };
        analysisController.prototype.showMissionDetail = function (missionStatus) {
            console.log(missionStatus);
            if (missionStatus) {
                this.initResult = false;
                this.isShowDetail = true;
            }
        };
        analysisController.prototype.ShowAlarmDetail = function () {
            this.isShowDetail = false;
            this.showTrackdetail = true;
            this.analysisDetail.style.width = this.width + 'px';
        };
        analysisController.prototype.goResultRecords = function () {
            this.isShowDetail = true;
            this.showTrackdetail = false;
            this.analysisDetail.style.width = 0;
        };
        analysisController.prototype.goResultAnalysis = function () {
            this.isShowDetail = false;
            this.initResult = true;
        };
        analysisController.prototype.changeTime = function (time) {
            console.log(time);
        };
        analysisController.prototype.query = function () {
            this.ResultActive = true;
        };
        analysisController.prototype.resultBack = function () {
            this.ResultActive = false;
        };
        analysisController.prototype.analyzeClick = function (item) {
            console.log(item);
        };
        analysisController.prototype.collectClick = function (item) {
            console.log(item);
        };
        return analysisController;
    }());
    main_app_1.app.controller('analysisController', analysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNBY2NvbXBhbnkvYW5hbHlzaXNSZXN1bHQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUErQkE7UUE2QkksNEJBQW9CLE1BQVUsRUFBUyxRQUFZO1lBQW5ELGlCQVNDO1lBVG1CLFdBQU0sR0FBTixNQUFNLENBQUk7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFJO1lBNUJuRCxZQUFPLEdBQWtCLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsQ0FBQztZQUs1RCxpQkFBWSxHQUE0Qiw4QkFBZSxFQUFFLENBQUM7WUFDMUQsYUFBUSxHQUE0QixFQUFFLENBQUM7WUFDdkMsaUJBQVksR0FBWSxLQUFLLENBQUM7WUFHOUIsZUFBVSxHQUFxQixvQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRCxvQkFBZSxHQUFXLElBQUksQ0FBQztZQUMvQixlQUFVLEdBQVcsSUFBSSxDQUFDO1lBQzFCLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFDeEIsZ0JBQVcsR0FBVyxLQUFLLENBQUM7WUFDNUIsaUJBQVksR0FBVyxLQUFLLENBQUM7WUFDN0Isb0JBQWUsR0FBVyxLQUFLLENBQUM7WUFDaEMsbUJBQWMsR0FBZ0Msa0NBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoRSxpQkFBWSxHQUE2QixrQ0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBVXZELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFFLEVBQVksQ0FBQztZQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEs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YWNBY2NvbXBhbnkvYW5hbHlzaXNSZXN1bHQuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuLi9zdHlsZS9NYWNBY2NvbXBhbnkuY3NzJztcclxuaW1wb3J0IHsgTlBHaXNNYXBNYWluIH0gZnJvbSAnLi4vLi4vY29tbW9uL21hcC9tYXAubWFpbic7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge1xyXG4gICAgTWFjQWNjb21wYW55UGFyYW1zLFxyXG4gICAgTWFjUmVzdWx0LFxyXG4gICAgTW9ja01hY1Jlc3VsdERhdGEsXHJcbiAgICBGYWNlTWFjQ3Jhc2hQYXJhbXMsXHJcbiAgICBhbmFseXNpc1Jlc3VsdFBhcmFtcyxcclxuICAgIGFuYWx5c2lzUmVzdWx0TGlzdCxcclxuICAgIGdldEFuYXNpc1Jlc3VsdCxcclxuICAgIGdldEFuYWx5c2lzTGlzdCxcclxuICAgIHNvcnRUeXBlXHJcbn0gZnJvbSAnLi9NYWNBY2NvbXBhbnlFbnVtJztcclxuaW1wb3J0IHtcclxuICAgIEdldE5EYXlUaW1lLFxyXG4gICAgRmFzdERhdGEsXHJcbiAgICBnZXRGYXN0RGF0YUxpc3QsXHJcbiAgICBFbnVtLFxyXG4gICAgVGltZUxlbmd0aCxcclxuICAgIGdldEdsYXNzZXNEYXRhTGlzdCxcclxuICAgIGdldE1hc2tEYXRhTGlzdCxcclxuICAgIEdsYXNzZXNEYXRhLFxyXG4gICAgTWFza0RhdGEsXHJcbiAgICBnZXRTZXhEYXRhTGlzdCxcclxuICAgIFNleERhdGEsIE1vY2tJbWFnZVJlc3VsdERhdGEsIEltYWdlUmVzdWx0LCBNYWNrQ3Jhc2hMaXN0LCBMb2NhdGlvbiwgTW9ja01hY2tDcmFzaExpc3RcclxufSBmcm9tICcuLi9BbmFseXNpc0VudW0nO1xyXG5cclxuaW1wb3J0IHt9IGZyb20gJy4uL0ZhY2VNYWNDcmFzaC9GYWNlTWFjQ3Jhc2hFbnVtJztcclxuZGVjbGFyZSBsZXQgJDphbnk7XHJcbmNsYXNzIGFuYWx5c2lzQ29udHJvbGxlcntcclxuICAgICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsJyRyb290U2NvcGUnLCckdGltZW91dCddO1xyXG4gICAgbWFwOiBOUEdpc01hcE1haW47XHJcbiAgICBzeXN0ZW1Qb2ludExpc3Q6IEFycmF5PFN5c3RlbVBvaW50PjtcclxuICAgIE1hY0FjY29tcGFueVBhcmFtczogTWFjQWNjb21wYW55UGFyYW1zO1xyXG5cclxuICAgIEZhc3REYXRlTGlzdDogQXJyYXk8RW51bTxUaW1lTGVuZ3RoPj4gPSBnZXRGYXN0RGF0YUxpc3QoKTtcclxuICAgIEZhc3REYXRlOiBBcnJheTxFbnVtPFRpbWVMZW5ndGg+PiA9IFtdO1xyXG4gICAgUmVzdWx0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7IC8vIOaQnOe0oue7k+aenOWxleekuueKtuaAgVxyXG5cclxuICAgIHRpbWVBcmVhOiBBcnJheTx7dmFsdWU6IG51bWJlciwgdGV4dDogc3RyaW5nfT47IC8vIOaXtumXtOautVxyXG4gICAgcmVzdWx0TGlzdDogQXJyYXk8TWFjUmVzdWx0PiA9IE1vY2tNYWNSZXN1bHREYXRhKDUpOyAvLyDmn6Xor6LliLDmlbDmja5cclxuICAgIFxyXG4gICAgaXNTaG93Q29uZGl0aW9uOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaW5pdFJlc3VsdDpib29sZWFuID0gdHJ1ZTtcclxuICAgIGlzUmVzdWx0OmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNDb25kaXRpb246Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNTaG93RGV0YWlsOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dUcmFja2RldGFpbDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBhbmFseXNpc1Jlc3VsdDogQXJyYXk8YW5hbHlzaXNSZXN1bHRQYXJhbXM+ID0gZ2V0QW5hc2lzUmVzdWx0KDUpXHJcbiAgICBhbmFseXNpc0xpc3Q6QXJyYXk8YW5hbHlzaXNSZXN1bHRMaXN0PiA9IGdldEFuYWx5c2lzTGlzdCg1KVxyXG4gICAgd2lkdGg6bnVtYmVyO1xyXG4gICAgYW5hbHlzaXNEZXRhaWw6YW55O1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOazqOWFpeS+nei1luS4juWFpeWPo1xyXG4gICAgICogQHBhcmFtICRzY29wZVxyXG4gICAgICogQHBhcmFtICR0aW1lb3V0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSxwcml2YXRlICR0aW1lb3V0OmFueSl7XHJcbiAgICAgICAgdGhpcy5tYXAgPSB0aGlzLiRzY29wZS4kcGFyZW50Lm1hcDtcclxuICAgICAgICB0aGlzLnN5c3RlbVBvaW50TGlzdCA9IHRoaXMuJHNjb3BlLiRwYXJlbnQuc3lzdGVtUG9pbnQ7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9ICQod2luZG93KS53aWR0aCgpIC02MCBhcyBudW1iZXI7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc0RldGFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0LXRyYWNrLWRldGFpbFwiKTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdnb0NvbmRpdGlvbicsdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbml0UGFyYW1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6L+U5Zue5LiK57qnXHJcbiAgICAgKi9cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdzaG93SXRlbVBhZ2UnLGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIneWni+WMluafpeivouihqOWNleWPguaVsOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRQYXJhbXMoKXtcclxuXHJcbiAgICAgICAgdGhpcy5NYWNBY2NvbXBhbnlQYXJhbXMgPSBuZXcgTWFjQWNjb21wYW55UGFyYW1zKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN3aXRjaENvbmRpdGlvbigpe1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2dvQ29uZGl0aW9uJyx0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN3aXRjaFJlc3VsdCgpe1xyXG4gICAgICAgIHRoaXMuaXNTaG93Q29uZGl0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0NvbmRpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNSZXN1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzaG93TWlzc2lvbkRldGFpbChtaXNzaW9uU3RhdHVzOm51bWJlcil7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWlzc2lvblN0YXR1cylcclxuICAgICAgICBpZihtaXNzaW9uU3RhdHVzKXtcclxuICAgICAgICAgICAgdGhpcy5pbml0UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93RGV0YWlsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIFNob3dBbGFybURldGFpbCgpe1xyXG4gICAgICAgIHRoaXMuaXNTaG93RGV0YWlsID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93VHJhY2tkZXRhaWwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNEZXRhaWwuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoKydweCc7IFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb1Jlc3VsdFJlY29yZHMoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd0RldGFpbCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zaG93VHJhY2tkZXRhaWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzRGV0YWlsLnN0eWxlLndpZHRoID0gMDsgXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdvUmVzdWx0QW5hbHlzaXMoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd0RldGFpbD0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0UmVzdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS55Y+Y5p+l6K+i5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZVxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VUaW1lKHRpbWU6c3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aW1lKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOafpeivolxyXG4gICAgICovXHJcbiAgICBxdWVyeSgpe1xyXG4gICAgICAgIHRoaXMuUmVzdWx0QWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDnu5PmnpzpobXov5Tlm57mn6Xor6LpobVcclxuICAgICAqL1xyXG4gICAgcmVzdWx0QmFjaygpe1xyXG4gICAgICAgIHRoaXMuUmVzdWx0QWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27miqXorabliIbmnpBcclxuICAgICAqIEBwYXJhbSB7TWFjUmVzdWx0fSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGFuYWx5emVDbGljayhpdGVtOiBNYWNSZXN1bHQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5oql6K2m5pS26JePXHJcbiAgICAgKiBAcGFyYW0ge01hY1Jlc3VsdH0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjb2xsZWN0Q2xpY2soaXRlbTogTWFjUmVzdWx0KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2FuYWx5c2lzQ29udHJvbGxlcicsIGFuYWx5c2lzQ29udHJvbGxlcik7Il19
