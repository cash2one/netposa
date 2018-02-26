define(["require", "exports", "./login.app", "angular", "es6-promise"], function (require, exports, login_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var LayerDec = (function () {
        function LayerDec(layer) {
            var _this = this;
            this.layer = layer;
            this.updateMsgLayer = function (index) {
                _this.openedMsgLayer = index;
            };
            this.closeOpened = function () {
                _this.layer.close(_this.openedMsgLayer);
            };
        }
        LayerDec.prototype.successInfo = function (info) {
            this.openMsg(info, { skin: 'layer-msg-success' });
        };
        LayerDec.prototype.failInfo = function (info) {
            this.openMsg(info, { skin: 'layer-msg-fail ' });
        };
        LayerDec.prototype.warnInfo = function (info) {
            this.openMsg(info, { skin: 'layer-msg-warn' });
        };
        LayerDec.prototype.info = function (info) {
            this.openMsg(info, { skin: 'layer-msg-info' });
        };
        LayerDec.prototype.notCloseInfo = function (info, titleMsg, btnMsg) {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                _this.layer.open({
                    type: 1,
                    content: info,
                    title: titleMsg || null,
                    hasIframe: true,
                    shadeClose: false,
                    closeBtn: 0,
                    btn: btnMsg || null,
                    yes: function (index) {
                        _this.layer.close(index);
                    },
                    end: function () {
                        resolve(null);
                    }
                });
            });
            return promise;
        };
        LayerDec.prototype.openMsg = function (msgStr, params) {
            var _this = this;
            if (this.openedMsgLayer > 0) {
                this.closeOpened();
            }
            var promise = new Promise(function (resolve, reject) {
                _this.layer.open({
                    type: 1,
                    skin: "layer-msg-common " + params.skin,
                    time: params.time || 2000,
                    content: msgStr,
                    title: false,
                    offset: params.offset || '120px',
                    hasIframe: true,
                    shade: params.shade || 0,
                    closeBtn: 0,
                    resize: false,
                    move: false,
                    btn: null,
                    success: function (dom, index) {
                        _this.updateMsgLayer(index);
                        resolve(null);
                    }
                });
            });
            return promise;
        };
        LayerDec.$inject = ['layer'];
        return LayerDec;
    }());
    login_app_1.loginApp.service('layerDec', LayerDec);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9naW4vbGF5ZXJNc2cuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFrQnJDO1FBSUksa0JBQW9CLEtBQVU7WUFBOUIsaUJBQWtDO1lBQWQsVUFBSyxHQUFMLEtBQUssQ0FBSztZQXdFOUIsbUJBQWMsR0FBRyxVQUFDLEtBQVk7Z0JBQzFCLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLENBQUMsQ0FBQztZQUNGLGdCQUFXLEdBQUc7Z0JBQ1YsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQTtRQTdFZ0MsQ0FBQztRQUdsQyw4QkFBVyxHQUFYLFVBQVksSUFBVztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFDLElBQUksRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELDJCQUFRLEdBQVIsVUFBUyxJQUFXO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUMsSUFBSSxFQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsMkJBQVEsR0FBUixVQUFTLElBQVc7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCx1QkFBSSxHQUFKLFVBQUssSUFBVztZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUMsSUFBSSxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBS0QsK0JBQVksR0FBWixVQUFhLElBQVksRUFBRSxRQUFpQixFQUFFLE1BQWU7WUFBN0QsaUJBb0JDO1lBbkJHLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBWSxFQUFFLE1BQVc7Z0JBQ2hELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxJQUFJO29CQUNiLEtBQUssRUFBRSxRQUFRLElBQUksSUFBSTtvQkFFdkIsU0FBUyxFQUFDLElBQUk7b0JBQ2QsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLFFBQVEsRUFBRSxDQUFDO29CQUNYLEdBQUcsRUFBRSxNQUFNLElBQUksSUFBSTtvQkFDbkIsR0FBRyxFQUFFLFVBQUMsS0FBYTt3QkFDZixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztvQkFDRCxHQUFHLEVBQUU7d0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBRU8sMEJBQU8sR0FBZixVQUFnQixNQUFhLEVBQUMsTUFBVTtZQUF4QyxpQkEwQkM7WUF6QkcsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQztZQUNELElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBWSxFQUFFLE1BQVc7Z0JBQ2hELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLElBQUksRUFBRSxDQUFDO29CQUNQLElBQUksRUFBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsSUFBSTtvQkFDdEMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSTtvQkFDeEIsT0FBTyxFQUFFLE1BQU07b0JBQ2YsS0FBSyxFQUFFLEtBQUs7b0JBQ1osTUFBTSxFQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTztvQkFFL0IsU0FBUyxFQUFDLElBQUk7b0JBQ2QsS0FBSyxFQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQztvQkFDdkIsUUFBUSxFQUFFLENBQUM7b0JBQ1gsTUFBTSxFQUFDLEtBQUs7b0JBQ1osSUFBSSxFQUFDLEtBQUs7b0JBQ1YsR0FBRyxFQUFFLElBQUk7b0JBQ1QsT0FBTyxFQUFDLFVBQUMsR0FBTyxFQUFDLEtBQVk7d0JBQ3pCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQXhFTSxnQkFBTyxHQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZ0Y3QyxlQUFDO0tBbEZELEFBa0ZDLElBQUE7SUFFRCxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2xvZ2luL2xheWVyTXNnLmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBrZXkgb24gMjAxNy83LzIwLlxyXG4gKi9cclxuaW1wb3J0IHtsb2dpbkFwcH0gZnJvbSBcIi4vbG9naW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCBcImVzNi1wcm9taXNlXCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxubGV0IFByb21pc2UgPSByZXF1aXJlKFwiZXM2LXByb21pc2VcIik7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxheWVyRGVje1xyXG4gICAgc3VjY2Vzc0luZm86RnVuY3Rpb247XHJcbiAgICBmYWlsSW5mbzpGdW5jdGlvbjtcclxuICAgIHdhcm5JbmZvOkZ1bmN0aW9uO1xyXG4gICAgaW5mbzpGdW5jdGlvbjtcclxuICAgIC8qKlxyXG4gICAgICog5LiN5Lya5YWz6Zet55qE5L+h5oGv5by55Ye65qGGXHJcbiAgICAgKiBAcGFyYW0gaW5mb1xyXG4gICAgICogQHBhcmFtIHRpdGxlTXNnXHJcbiAgICAgKiBAcGFyYW0gYnRuTXNnXHJcbiAgICAgKiBAcmV0dXJuIOW9k+eql+WPo+WFs+mXreaXtiwg6L+b6KGM55qE5ZCO57ut5pON5L2cXHJcbiAgICAgKi9cclxuICAgIG5vdENsb3NlSW5mbyhpbmZvOiBzdHJpbmcsIHRpdGxlTXNnPzogc3RyaW5nLCBidG5Nc2c/OiBzdHJpbmcpOlByb21pc2U8YW55PjtcclxufVxyXG5cclxuY2xhc3MgTGF5ZXJEZWMgaW1wbGVtZW50cyBJTGF5ZXJEZWMge1xyXG4gICAgb3BlbmVkTXNnTGF5ZXI6bnVtYmVyO1xyXG4gICAgc3RhdGljICRpbmplY3Q6QXJyYXk8c3RyaW5nPiA9IFsnbGF5ZXInXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyOiBhbnkpIHt9XHJcblxyXG4gICAgLy/miJDlip9cclxuICAgIHN1Y2Nlc3NJbmZvKGluZm86c3RyaW5nKXtcclxuICAgICAgICB0aGlzLm9wZW5Nc2coaW5mbyx7c2tpbjonbGF5ZXItbXNnLXN1Y2Nlc3MnfSk7XHJcbiAgICB9XHJcbiAgICAvL+Wksei0pVxyXG4gICAgZmFpbEluZm8oaW5mbzpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMub3Blbk1zZyhpbmZvLHtza2luOidsYXllci1tc2ctZmFpbCAnfSk7XHJcbiAgICB9XHJcbiAgICAvL+itpuWRilxyXG4gICAgd2FybkluZm8oaW5mbzpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMub3Blbk1zZyhpbmZvLHtza2luOidsYXllci1tc2ctd2Fybid9KTtcclxuICAgIH1cclxuICAgIC8v5pmu6YCaXHJcbiAgICBpbmZvKGluZm86c3RyaW5nKXtcclxuICAgICAgICB0aGlzLm9wZW5Nc2coaW5mbyx7c2tpbjonbGF5ZXItbXNnLWluZm8nfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuI3kvJroh6rliqjlhbPpl63nmoTlvLnlh7rmoYYsIOS4lOS4jeS8muWboOS4uuWFtuS7luW8ueWHuuahhuW8ueWHuuiAjOa2iOWksVxyXG4gICAgICovXHJcbiAgICBub3RDbG9zZUluZm8oaW5mbzogc3RyaW5nLCB0aXRsZU1zZz86IHN0cmluZywgYnRuTXNnPzogc3RyaW5nKTpQcm9taXNlPGFueT57XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSk9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpbmZvLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlTXNnIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAvL+iuqeW8ueeql+WGheWuueWxgue6p+mrmOS6jk9DWOaPkuS7tuinhumikVxyXG4gICAgICAgICAgICAgICAgaGFzSWZyYW1lOnRydWUsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICAgICAgYnRuOiBidG5Nc2cgfHwgbnVsbCxcclxuICAgICAgICAgICAgICAgIHllczogKGluZGV4OiBudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5kOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3Blbk1zZyhtc2dTdHI6c3RyaW5nLHBhcmFtczphbnkpe1xyXG4gICAgICAgIGlmKHRoaXMub3BlbmVkTXNnTGF5ZXI+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPcGVuZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSk9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBza2luOlwibGF5ZXItbXNnLWNvbW1vbiBcIiArIHBhcmFtcy5za2luLFxyXG4gICAgICAgICAgICAgICAgdGltZTpwYXJhbXMudGltZSB8fCAyMDAwICxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1zZ1N0cixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG9mZnNldDpwYXJhbXMub2Zmc2V0IHx8ICcxMjBweCcgLFxyXG4gICAgICAgICAgICAgICAgLy/orqnlvLnnqpflhoXlrrnlsYLnuqfpq5jkuo5PQ1jmj5Lku7bop4bpopFcclxuICAgICAgICAgICAgICAgIGhhc0lmcmFtZTp0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6cGFyYW1zLnNoYWRlIHx8IDAsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHJlc2l6ZTpmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1vdmU6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBidG46IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOihkb206YW55LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1zZ0xheWVyKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNc2dMYXllciA9IChpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgdGhpcy5vcGVuZWRNc2dMYXllciA9IGluZGV4O1xyXG4gICAgfTtcclxuICAgIGNsb3NlT3BlbmVkID0gKCk9PntcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMub3BlbmVkTXNnTGF5ZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sb2dpbkFwcC5zZXJ2aWNlKCdsYXllckRlYycsIExheWVyRGVjKTsiXX0=
