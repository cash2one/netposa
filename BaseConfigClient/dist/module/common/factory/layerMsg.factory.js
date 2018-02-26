define(["require", "exports", "../app/main.app", "angular", "es6-promise"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var LayerConfirmParams = (function () {
        function LayerConfirmParams() {
        }
        return LayerConfirmParams;
    }());
    exports.LayerConfirmParams = LayerConfirmParams;
    ;
    var LayerDec = (function () {
        function LayerDec(layer, i18nFactory) {
            var _this = this;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.errorMasLayer = {};
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
        LayerDec.prototype.failInfo = function (info, code) {
            var _this = this;
            if (code == 0) {
                return null;
            }
            else {
                if (this.openedMsgLayer > 0) {
                    this.closeOpened();
                }
                return this.openMsg(info, { skin: 'layer-msg-fail ' }).then(function () {
                    _this.errorMasLayer[info] = _this.openedMsgLayer;
                });
            }
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
        LayerDec.prototype.confirm = function (params) {
            var _this = this;
            var defaultParams = new LayerConfirmParams();
            defaultParams.btnStrList = [this.i18nFactory('FDS_00_07_01'), this.i18nFactory('FDS_00_07_02')];
            defaultParams.icon = 0;
            defaultParams.cancelBtnFun = function (index) {
                _this.layer.close(index);
            };
            defaultParams.okBtnFun = function (index) {
                _this.layer.close(index);
            };
            defaultParams.content = params.content;
            defaultParams.title = params.title ? params.title : this.i18nFactory("FDS_00_05_04");
            var promise = new Promise(function (resolve, reject) {
                !!params.cancelBtnFun && (defaultParams.cancelBtnFun = params.cancelBtnFun);
                !!params.okBtnFun && (defaultParams.okBtnFun = params.okBtnFun);
                !!params.icon && (defaultParams.icon = params.icon);
                if (params.btnStrList && angular.isArray(params.btnStrList)) {
                    if (params.btnStrList[0]) {
                        defaultParams.btnStrList[0] = params.btnStrList[0];
                    }
                    if (params.btnStrList[1]) {
                        defaultParams.btnStrList[1] = params.btnStrList[1];
                    }
                }
                _this.layer.confirm(defaultParams.content, {
                    icon: defaultParams.icon,
                    title: defaultParams.title,
                    closeBtn: 0,
                    btn: defaultParams.btnStrList,
                    skin: 'overflow-visible',
                    area: ["500px", "auto"],
                    success: function (dom, index) {
                        resolve(index);
                    }
                }, defaultParams.okBtnFun, defaultParams.cancelBtnFun);
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
        LayerDec.$inject = ['layer', 'i18nFactory'];
        return LayerDec;
    }());
    main_app_1.app.service('layerDec', LayerDec);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFHckM7UUFBQTtRQU9BLENBQUM7UUFBRCx5QkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksZ0RBQWtCO0lBTzlCLENBQUM7SUFtQkY7UUFLSSxrQkFBb0IsS0FBVSxFQUFVLFdBQWdCO1lBQXhELGlCQUE2RDtZQUF6QyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFIaEQsa0JBQWEsR0FBOEIsRUFBRSxDQUFDO1lBMkl0RCxtQkFBYyxHQUFHLFVBQUMsS0FBYTtnQkFDM0IsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxDQUFDO1lBQ0YsZ0JBQVcsR0FBRztnQkFDVixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFBO1FBN0kyRCxDQUFDO1FBRzdELDhCQUFXLEdBQVgsVUFBWSxJQUFZO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsMkJBQVEsR0FBUixVQUFTLElBQVksRUFBRSxJQUFhO1lBQXBDLGlCQVdDO1lBVkcsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQTtZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkIsQ0FB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QU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBrZXkgb24gMjAxNy83LzIwLlxyXG4gKi9cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQgXCJlczYtcHJvbWlzZVwiO1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbmxldCBQcm9taXNlID0gcmVxdWlyZShcImVzNi1wcm9taXNlXCIpO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5ZXJDb25maXJtUGFyYW1zIHtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgYnRuU3RyTGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICAgIG9rQnRuRnVuOiBGdW5jdGlvbjtcclxuICAgIGNhbmNlbEJ0bkZ1bj86IEZ1bmN0aW9uO1xyXG4gICAgaWNvbj86IG51bWJlcjtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxheWVyRGVjIHtcclxuICAgIHN1Y2Nlc3NJbmZvOiBGdW5jdGlvbjtcclxuICAgIGZhaWxJbmZvOiBGdW5jdGlvbjtcclxuICAgIHdhcm5JbmZvOiBGdW5jdGlvbjtcclxuICAgIGluZm86IEZ1bmN0aW9uO1xyXG4gICAgLyoqXHJcbiAgICAgKiDkuI3kvJrlhbPpl63nmoTkv6Hmga/lvLnlh7rmoYZcclxuICAgICAqIEBwYXJhbSBpbmZvXHJcbiAgICAgKiBAcGFyYW0gdGl0bGVNc2dcclxuICAgICAqIEBwYXJhbSBidG5Nc2dcclxuICAgICAqIEByZXR1cm4g5b2T56qX5Y+j5YWz6Zet5pe2LCDov5vooYznmoTlkI7nu63mk43kvZxcclxuICAgICAqL1xyXG4gICAgbm90Q2xvc2VJbmZvKGluZm86IHN0cmluZywgdGl0bGVNc2c/OiBzdHJpbmcsIGJ0bk1zZz86IHN0cmluZyk6IFByb21pc2U8YW55PjtcclxuXHJcbiAgICBjb25maXJtKHBhcmFtczogTGF5ZXJDb25maXJtUGFyYW1zKTogUHJvbWlzZTxudW1iZXI+O1xyXG59XHJcblxyXG5jbGFzcyBMYXllckRlYyBpbXBsZW1lbnRzIElMYXllckRlYyB7XHJcbiAgICBvcGVuZWRNc2dMYXllcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBlcnJvck1hc0xheWVyOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnbGF5ZXInLCAnaTE4bkZhY3RvcnknXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyOiBhbnksIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSkgeyB9XHJcblxyXG4gICAgLy/miJDlip9cclxuICAgIHN1Y2Nlc3NJbmZvKGluZm86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMub3Blbk1zZyhpbmZvLCB7IHNraW46ICdsYXllci1tc2ctc3VjY2VzcycgfSk7XHJcbiAgICB9XHJcbiAgICAvL+Wksei0pVxyXG4gICAgZmFpbEluZm8oaW5mbzogc3RyaW5nLCBjb2RlPzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5lZE1zZ0xheWVyID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZU9wZW5lZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5Nc2coaW5mbywgeyBza2luOiAnbGF5ZXItbXNnLWZhaWwgJyB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNYXNMYXllcltpbmZvXSA9IHRoaXMub3BlbmVkTXNnTGF5ZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K2m5ZGKXHJcbiAgICB3YXJuSW5mbyhpbmZvOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9wZW5Nc2coaW5mbywgeyBza2luOiAnbGF5ZXItbXNnLXdhcm4nIH0pO1xyXG4gICAgfVxyXG4gICAgLy/mma7pgJpcclxuICAgIGluZm8oaW5mbzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuTXNnKGluZm8sIHsgc2tpbjogJ2xheWVyLW1zZy1pbmZvJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4jeS8muiHquWKqOWFs+mXreeahOW8ueWHuuahhiwg5LiU5LiN5Lya5Zug5Li65YW25LuW5by55Ye65qGG5by55Ye66ICM5raI5aSxXHJcbiAgICAgKi9cclxuICAgIG5vdENsb3NlSW5mbyhpbmZvOiBzdHJpbmcsIHRpdGxlTXNnPzogc3RyaW5nLCBidG5Nc2c/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSwgcmVqZWN0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpbmZvLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlTXNnIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAvL+iuqeW8ueeql+WGheWuueWxgue6p+mrmOS6jk9DWOaPkuS7tuinhumikVxyXG4gICAgICAgICAgICAgICAgaGFzSWZyYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGVDbG9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIGJ0bjogYnRuTXNnIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICB5ZXM6IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICog5bim5pyJ56Gu6K6k5Y+W5raI5oyJ6ZKu56Gu6K6k5qGGXHJcbiAgICAgICAgICogQHBhcmFtIHN0clxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICBjb25maXJtKHBhcmFtczogTGF5ZXJDb25maXJtUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRQYXJhbXMgPSBuZXcgTGF5ZXJDb25maXJtUGFyYW1zKCk7XHJcbiAgICAgICAgZGVmYXVsdFBhcmFtcy5idG5TdHJMaXN0ID0gW3RoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMF8wN18wMScpLCB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDBfMDdfMDInKV07XHJcbiAgICAgICAgZGVmYXVsdFBhcmFtcy5pY29uID0gMDtcclxuICAgICAgICBkZWZhdWx0UGFyYW1zLmNhbmNlbEJ0bkZ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlZmF1bHRQYXJhbXMub2tCdG5GdW4gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBkZWZhdWx0UGFyYW1zLmNvbnRlbnQgPSBwYXJhbXMuY29udGVudDtcclxuICAgICAgICBkZWZhdWx0UGFyYW1zLnRpdGxlID0gcGFyYW1zLnRpdGxlID8gcGFyYW1zLnRpdGxlIDogdGhpcy5pMThuRmFjdG9yeShcIkZEU18wMF8wNV8wNFwiKTtcclxuXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgISFwYXJhbXMuY2FuY2VsQnRuRnVuICYmIChkZWZhdWx0UGFyYW1zLmNhbmNlbEJ0bkZ1biA9IHBhcmFtcy5jYW5jZWxCdG5GdW4pO1xyXG4gICAgICAgICAgICAhIXBhcmFtcy5va0J0bkZ1biAmJiAoZGVmYXVsdFBhcmFtcy5va0J0bkZ1biA9IHBhcmFtcy5va0J0bkZ1bik7XHJcblxyXG4gICAgICAgICAgICAhIXBhcmFtcy5pY29uICYmIChkZWZhdWx0UGFyYW1zLmljb24gPSBwYXJhbXMuaWNvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmJ0blN0ckxpc3QgJiYgYW5ndWxhci5pc0FycmF5KHBhcmFtcy5idG5TdHJMaXN0KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5idG5TdHJMaXN0WzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFBhcmFtcy5idG5TdHJMaXN0WzBdID0gcGFyYW1zLmJ0blN0ckxpc3RbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmJ0blN0ckxpc3RbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UGFyYW1zLmJ0blN0ckxpc3RbMV0gPSBwYXJhbXMuYnRuU3RyTGlzdFsxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0oZGVmYXVsdFBhcmFtcy5jb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiBkZWZhdWx0UGFyYW1zLmljb24sXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZGVmYXVsdFBhcmFtcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICAgICAgYnRuOiBkZWZhdWx0UGFyYW1zLmJ0blN0ckxpc3QsXHJcbiAgICAgICAgICAgICAgICBza2luOiAnb3ZlcmZsb3ctdmlzaWJsZScsXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZG9tOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaWZyYW1zSHRtbCA9IFwiPGlmcmFtZSBjbGFzcz0nZi1hYnMgdS1pZnJhbWUtbGF5ZXInPjwvaWZyYW1lPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZ3VsYXIuZWxlbWVudChkb20pLnByZXYoKS5wcmVwZW5kKGlmcmFtc0h0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsdGVyIHd5ciAyMDE3LjkuMTIgY29uZmlybeehruiupOahhuayoeacieW/heimgee8k+WtmGluZGV4LCDkuZ/kuI3kvJrlm6DkuLrop6blj5Hlhbbku5ZpbmZvIHdhcm7nrYnlvLnlh7rkv6Hmga/ogIzlhbPpl61cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZU9wZW5MYXllckluZGV4KGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZGVmYXVsdFBhcmFtcy5va0J0bkZ1biwgZGVmYXVsdFBhcmFtcy5jYW5jZWxCdG5GdW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3Blbk1zZyhtc2dTdHI6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5vcGVuZWRNc2dMYXllciA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZU9wZW5lZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnksIHJlamVjdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJsYXllci1tc2ctY29tbW9uIFwiICsgcGFyYW1zLnNraW4sXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBwYXJhbXMudGltZSB8fCAyMDAwLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogbXNnU3RyLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBwYXJhbXMub2Zmc2V0IHx8ICcxMjBweCcsXHJcbiAgICAgICAgICAgICAgICAvL+iuqeW8ueeql+WGheWuueWxgue6p+mrmOS6jk9DWOaPkuS7tuinhumikVxyXG4gICAgICAgICAgICAgICAgaGFzSWZyYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IHBhcmFtcy5zaGFkZSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCdG46IDAsXHJcbiAgICAgICAgICAgICAgICByZXNpemU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW92ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBidG46IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZG9tOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1zZ0xheWVyKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNc2dMYXllciA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vcGVuZWRNc2dMYXllciA9IGluZGV4O1xyXG4gICAgfTtcclxuICAgIGNsb3NlT3BlbmVkID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy5vcGVuZWRNc2dMYXllcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdsYXllckRlYycsIExheWVyRGVjKTsiXX0=
