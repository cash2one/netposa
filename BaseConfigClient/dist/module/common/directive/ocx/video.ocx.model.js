define(["require", "exports", "../../portrait-tool", "../../app/main.app", "json2"], function (require, exports, portrait_tool_1, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JSON = require("json2");
    var ToolBarFuncNameEnum = {
        PLAY: "play",
        PAUSE: "pause",
        STOP: "stop",
        DIGITAL: "digital"
    };
    var ToolBarTextEnum = {
        PLAY: "FDS_00_07_31",
        PAUSE: "FDS_00_07_32",
        STOP: "FDS_00_07_33",
        DIGITAL: "FDS_00_07_34"
    };
    var ToolBarItem = (function () {
        function ToolBarItem() {
            this.type = "button";
            this.style = "left-bottom";
            this.show = true;
            this.x = "0";
            this.y = "0";
            this.width = "40px";
            this.height = "100%";
            this.backColor = "0xffc800";
            this.textColor = "0x000000";
            this.font = "宋体";
            this.fontSize = 12;
            this.enable = true;
            this.function = "returnFunc";
        }
        return ToolBarItem;
    }());
    var ToolBarContainer = (function () {
        function ToolBarContainer() {
            this.type = "panel";
            this.style = "left-bottom";
            this.key = 0;
            this.x = "0";
            this.y = "0";
            this.width = "100%";
            this.height = "25px";
            this.backColor = "0x242424";
            this.transparent = "0.8";
            this.animateTime = "1000";
            this.show = true;
            this.items = new Array();
        }
        return ToolBarContainer;
    }());
    var RtspMultipleOpt = (function () {
        function RtspMultipleOpt() {
            this.type = 10;
            this.user = "";
            this.password = "";
            this.tcp = false;
            this.autoreconncet = false;
            this.displayModel = 0;
            this.hwdecoder = 0;
        }
        return RtspMultipleOpt;
    }());
    exports.RtspMultipleOpt = RtspMultipleOpt;
    var RtspOpt = (function () {
        function RtspOpt() {
            this.type = 6;
            this.user = "";
            this.password = "";
            this.tcp = false;
            this.autoreconncet = false;
            this.displayModel = 0;
            this.hwdecoder = 0;
        }
        return RtspOpt;
    }());
    exports.RtspOpt = RtspOpt;
    var RealTimeOpt = (function () {
        function RealTimeOpt() {
            this.type = 1;
            this.user = "";
            this.passwd = "";
            this.displayModel = 0;
            this.hwdecoder = 0;
        }
        return RealTimeOpt;
    }());
    exports.RealTimeOpt = RealTimeOpt;
    var PlayBackOpt = (function () {
        function PlayBackOpt() {
            this.type = 2;
            this.user = "";
            this.passwd = "";
            this.displayModel = 0;
            this.hwdecoder = 0;
        }
        return PlayBackOpt;
    }());
    exports.PlayBackOpt = PlayBackOpt;
    var PlayVideoToolModel = (function () {
        function PlayVideoToolModel(ocx, index, toolBarContaienr, currentTimeToolBar, totalTimeToolItem, startTime, endTime) {
            this.ocx = ocx;
            this.index = index;
            this.toolBarContaienr = toolBarContaienr;
            this.currentTimeToolBar = currentTimeToolBar;
            this.totalTimeToolItem = totalTimeToolItem;
            this.startTime = startTime;
            this.endTime = endTime;
            this.intervalTime = 1000;
        }
        PlayVideoToolModel.prototype.start = function () {
            var _this = this;
            this.stop();
            this.currentInterval = setInterval(function () {
                console.debug("执行循环");
                _this.setCurrentPlayTime();
                _this.setTotalPlayTime();
            }, this.intervalTime);
        };
        PlayVideoToolModel.prototype.getIndex = function () {
            return this.index;
        };
        PlayVideoToolModel.prototype.setIndex = function (index) {
            this.index = index;
        };
        PlayVideoToolModel.prototype.setCurrentPlayTime = function () {
            var time = this.getCurrentPlayTime(this.index);
            if (time == null)
                return;
            try {
                this.ocx.SetContent(this.currentTimeToolBar.key, this.getTimeStr(time / 1000), this.index);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.SetContent error: ", e);
                }
            }
        };
        PlayVideoToolModel.prototype.setTotalPlayTime = function () {
            this.totalTime = this.getTotalTime(this.index);
            try {
                this.ocx.SetContent(this.totalTimeToolItem.key, this.getTimeStr(this.totalTime / 1000), this.index);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.SetContent error: ", e);
                }
            }
        };
        PlayVideoToolModel.prototype.getCurrentPlayTime = function (index) {
            try {
                return this.ocx.GetPlayTime(index);
            }
            catch (e) {
                console.error("ocx.GetPlayTime error:", e);
            }
        };
        PlayVideoToolModel.prototype.getTotalTime = function (index) {
            var result;
            try {
                result = JSON.parse(this.ocx.GetVideoAttribute(index));
            }
            catch (e) {
                if (window.console) {
                    console.error("GetVideoAttribute", e);
                }
            }
            return (result && result.duration) || 0;
        };
        PlayVideoToolModel.prototype.getTimeStr = function (time) {
            return (this.toStr(Math.floor(time / 3600)) + ":" + this.toStr(Math.floor((time % 3600) / 60)) + ":" + this.toStr(Math.floor(time % 60)));
        };
        PlayVideoToolModel.prototype.toStr = function (i) {
            return (i < 10) ? ("0" + i) : (i + "");
        };
        PlayVideoToolModel.prototype.stop = function () {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
            }
            this.currentInterval = null;
        };
        PlayVideoToolModel.prototype.hide = function () {
            this.stop();
            this._toggle(false);
        };
        PlayVideoToolModel.prototype.show = function () {
            this._toggle(true);
        };
        PlayVideoToolModel.prototype._toggle = function (bShow) {
            var str = {
                key: this.toolBarContaienr.key,
                show: bShow,
                enable: bShow,
                status: 0
            };
            try {
                this.ocx.ShowAndEnable(JSON.stringify(str), this.index);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.showToolBar error: ", e);
                }
            }
        };
        PlayVideoToolModel.prototype.clear = function () {
            this.stop();
            this.currentTimeToolBar = null;
            this.totalTimeToolItem = null;
            this.toolBarContaienr = null;
            this.index = null;
            this.ocx = null;
        };
        return PlayVideoToolModel;
    }());
    var VideoOcx = (function () {
        function VideoOcx(containerDom, i18nFactory) {
            var _this = this;
            this._cacheWindowDigitalStatus = {};
            this._cachePlayVideoToolModel = {};
            this.currentKey = 0;
            this._stopCallBack = function () {
            };
            this._playCallBack = function (index, result, userParam) {
                console.debug("playCallBack", index, result, userParam);
                if (result != 0) {
                    _this._stopOtherResource(index);
                }
            };
            this._displayFirstFrameCallBack = function (index, result, userParam) {
                console.debug("_displayFirstFrameCallBack", index, result, userParam);
                if (result === 0) {
                    _this.videoSize = _this._getVideoAttribute(index);
                }
            };
            this._RecordEndCallBack = function (index, result, userParam) {
                console.debug("_RecordEndCallBack", index, result, userParam);
                _this._stopOtherResource(index);
            };
            this._getVideoAttribute = function (index) {
                if (!this.ocx)
                    return null;
                var result;
                try {
                    result = JSON.parse(this.ocx.GetVideoAttribute(index));
                }
                catch (e) {
                    if (window.console) {
                        console.error("ocx.GetVideoAttribute error: ", e);
                    }
                }
                return result;
            };
            this.ocxId = portrait_tool_1.default.getUUID();
            this.containerDom = containerDom;
            this.i18nFactory = i18nFactory;
            this._init();
        }
        VideoOcx.prototype._CatchPictrue = function (index) {
            var result;
            try {
                result = this.ocx.CatchPictrue(index, 3);
            }
            catch (e) {
                console.log("\u622A\u56FE\u5931\u8D25" + e);
            }
            return result;
        };
        VideoOcx.prototype.CatchPictrue = function (index) {
            if (index <= this._getWindowCount()) {
                return this._CatchPictrue(index);
            }
        };
        VideoOcx.prototype.GetVideoAttribute = function (index) {
            try {
                return JSON.parse(this.ocx.GetVideoAttribute(index));
            }
            catch (e) {
                console.log("\u83B7\u53D6\u5931\u8D25");
            }
        };
        VideoOcx.prototype.bindOcxEvent = function (eventName, func) {
            switch (eventName) {
                case "WndDClik":
                    this.dbClickCallBack = func;
                    break;
            }
        };
        VideoOcx.prototype.GetWindowBusyByIndex = function (index) {
            var result = true;
            try {
                result = this.ocx.GetWindowBusyByIndex(index);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.GetWindowBusyByIndex error:", e);
                }
            }
            return result;
        };
        VideoOcx.prototype.catchPicture = function () {
            try {
                var index = this.ocx.GetFocusWindowIndex() || 0;
                var picType = 3;
                return { base64Image: this.ocx.CatchPictrue(index, picType), videoSize: this.videoSize || {} };
            }
            catch (e) {
                console.error("ocx.CatchPictrue", e);
            }
            return null;
        };
        VideoOcx.prototype.getFocusWindowIndex = function () {
            return this._getFocusWindowIndex();
        };
        VideoOcx.prototype.setLayout = function (layoutType) {
            try {
                this.ocx && this.ocx.SetLayout(layoutType);
            }
            catch (e) {
                console.error("ocx.setLayout", e);
            }
        };
        ;
        VideoOcx.prototype.destroy = function () {
            this.i18nFactory = null;
            this.stopAll();
            this._cleanUp();
            this._clearAllOtherResource();
            angular.element(this.containerDom).empty();
            this.ocxId = null;
            this.containerDom = null;
            delete this.ocx;
            this.ocx = null;
        };
        VideoOcx.prototype._cleanUp = function () {
            try {
                this.ocx.CleanUp();
            }
            catch (e) {
                console.error("ocx.cleanUp error:", e, e && e.message);
            }
        };
        VideoOcx.prototype._getFocusWindowIndex = function () {
            var result = 0;
            try {
                result = this.ocx ? this.ocx.GetFocusWindowIndex() : 0;
            }
            catch (e) {
                console.error("ocx.getFocusWindowIndex", e);
            }
            return result;
        };
        VideoOcx.prototype.getOcxId = function () {
            return this.ocxId;
        };
        VideoOcx.prototype.playRealTime = function (options, index) {
            if (!options)
                return;
            this.stop(index || 0);
            return this._play(JSON.stringify(options), index || 0);
        };
        VideoOcx.prototype.playRtsp = function (options, index) {
            if (!options)
                return;
            this.stop(index || 0);
            return this._play(JSON.stringify(options), index || 0);
        };
        VideoOcx.prototype.playRtspMultiple = function (options) {
            if (!options)
                return;
            this.setLayout(4);
            this.stopAll();
            return this._play(JSON.stringify(options), 0);
        };
        VideoOcx.prototype.playPvgBack = function (options, index) {
            if (!options)
                return;
            this.stop(index || 0);
            var result = this._play(JSON.stringify(options), index || 0);
            this.initPlayPvgToolBar(index, options.beginTime, options.endTime);
            return result;
        };
        VideoOcx.prototype.initPlayPvgToolBar = function (index, startTime, endTime) {
            var container, toolItem;
            var currentIndex = index || 0;
            if (this._cacheWindowDigitalStatus[currentIndex]) {
                delete this._cacheWindowDigitalStatus[currentIndex];
            }
            if (this._cachePlayVideoToolModel[currentIndex]) {
                this._cachePlayVideoToolModel[currentIndex].show();
                this._cachePlayVideoToolModel[currentIndex].start();
                return;
            }
            container = new ToolBarContainer();
            container.key = this.currentKey++;
            toolItem = new ToolBarItem();
            toolItem.text = this.i18nFactory(ToolBarTextEnum.PLAY);
            toolItem.tooltip = this.i18nFactory(ToolBarTextEnum.PLAY);
            toolItem.function = ToolBarFuncNameEnum.PLAY;
            toolItem.key = this.currentKey++;
            toolItem.x = "40px";
            container.items.push(toolItem);
            toolItem = new ToolBarItem();
            toolItem.text = this.i18nFactory(ToolBarTextEnum.PAUSE);
            toolItem.tooltip = this.i18nFactory(ToolBarTextEnum.PAUSE);
            toolItem.function = ToolBarFuncNameEnum.PAUSE;
            toolItem.key = this.currentKey++;
            toolItem.x = "80px";
            container.items.push(toolItem);
            toolItem = new ToolBarItem();
            toolItem.text = this.i18nFactory(ToolBarTextEnum.DIGITAL);
            toolItem.tooltip = this.i18nFactory(ToolBarTextEnum.DIGITAL);
            toolItem.function = ToolBarFuncNameEnum.DIGITAL;
            toolItem.key = this.currentKey++;
            toolItem.x = "120px";
            toolItem.width = "60px";
            container.items.push(toolItem);
            var currentTimeToolItem = new ToolBarItem();
            currentTimeToolItem.type = "static";
            currentTimeToolItem.key = this.currentKey++;
            currentTimeToolItem.style = "right-bottom";
            currentTimeToolItem.text = "00:00:00";
            currentTimeToolItem.x = "60";
            currentTimeToolItem.y = "-5";
            currentTimeToolItem.width = "60px";
            currentTimeToolItem.textColor = "0xffffff";
            currentTimeToolItem.fontSize = 14;
            container.items.push(currentTimeToolItem);
            var totalTimeToolItem = new ToolBarItem();
            totalTimeToolItem.type = "static";
            totalTimeToolItem.key = this.currentKey++;
            totalTimeToolItem.style = "right-bottom";
            totalTimeToolItem.text = "00:00:00";
            totalTimeToolItem.x = "0";
            totalTimeToolItem.y = "-5";
            totalTimeToolItem.width = "60px";
            totalTimeToolItem.textColor = "0xffffff";
            totalTimeToolItem.fontSize = 14;
            container.items.push(totalTimeToolItem);
            var result = this.createToolBar(JSON.stringify(container), currentIndex);
            this.setToolbarCallBack(ToolBarFuncNameEnum.PLAY, this.toolbarPauseFalse.bind(this));
            this.setToolbarCallBack(ToolBarFuncNameEnum.PAUSE, this.toolbarPauseTrue.bind(this));
            this.setToolbarCallBack(ToolBarFuncNameEnum.DIGITAL, this.toolbarDigitalZoom.bind(this));
            var currentPlayVideoToolModel = new PlayVideoToolModel(this.ocx, currentIndex, container, currentTimeToolItem, totalTimeToolItem, this.convertTime2Date(startTime).getTime(), this.convertTime2Date(endTime).getTime());
            this._cachePlayVideoToolModel[currentIndex] = currentPlayVideoToolModel;
            currentPlayVideoToolModel.start();
        };
        VideoOcx.prototype.convertTime2Date = function (str) {
            return new Date(parseInt(str.substring(0, 4), 10), parseInt(str.substring(4, 6), 10) - 1, parseInt(str.substring(6, 8), 10), parseInt(str.substring(8, 10), 10), parseInt(str.substring(10, 12), 10), parseInt(str.substring(12, 14), 10), parseInt(str.substring(14, 17), 10));
        };
        VideoOcx.prototype.setProgressRange = function (key, totalTime, index) {
            try {
                return this.ocx.SetProgressRange(key, totalTime, index);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.SetProgressRange error: ", e);
                }
            }
        };
        VideoOcx.prototype.setProgressPos = function (key, currentTime, index) {
            try {
                return this.ocx.SetProgressPos(key, currentTime, index);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.setProgressPos error: ", e);
                }
            }
        };
        VideoOcx.prototype.toolbarPauseFalse = function (strinfo) {
            var param = JSON.parse(strinfo);
            var index = param.index;
            this._pause(index, false);
        };
        VideoOcx.prototype.toolbarPauseTrue = function (strinfo) {
            var param = JSON.parse(strinfo);
            var index = param.index;
            this._pause(index, true);
        };
        VideoOcx.prototype._pause = function (index, isPause) {
            if (isPause) {
                try {
                    return this.ocx.StopEx(true, index, function () { }, 0);
                }
                catch (e) {
                    if (window.console) {
                        console.error("ocx.pause pause error", e);
                    }
                }
            }
            else {
                try {
                    return this.ocx.PlayEx2("", index, function () { }, 0, function () { }, 0, this._RecordEndCallBack.bind(this), 0);
                }
                catch (e) {
                    console.error("ocx.pause start error: ", e);
                }
            }
        };
        VideoOcx.prototype.toolbarDigitalZoom = function (strInfo) {
            var param = JSON.parse(strInfo);
            var index = param.index;
            if (this._cacheWindowDigitalStatus[index]) {
                delete this._cacheWindowDigitalStatus[index];
            }
            else {
                this._cacheWindowDigitalStatus[index] = true;
            }
            this._digitalZoom(index, !!this._cacheWindowDigitalStatus[index]);
        };
        VideoOcx.prototype._digitalZoom = function (index, isEnable) {
            var result = false;
            if (isEnable) {
                this.ocx.SetWndOsdProperty(0xff00ff, 8, 0xffffffff, index);
                result = this.ocx.StartZoomByIndex(0, index);
            }
            else {
                result = this.ocx.StopZoomByIndex(index);
            }
            return true;
        };
        VideoOcx.prototype.getLastError = function () {
            try {
                return this.ocx.GetLastError();
            }
            catch (e) {
                console.error("ocx.getLastError err: ", e);
            }
        };
        VideoOcx.prototype.stop = function (index) {
            if (index <= this._getWindowCount()) {
                this._stop(index);
                this._stopOtherResource(index);
            }
        };
        VideoOcx.prototype._stop = function (index) {
            try {
                this.ocx.StopEx(false, index, this._stopCallBack, 0);
            }
            catch (e) {
                if (window.console) {
                    console.error("ocx.stopEx error: ", e);
                }
            }
        };
        VideoOcx.prototype.stopAll = function () {
            this._stopAll();
            this._stopAllOtherResource();
        };
        VideoOcx.prototype._stopAll = function () {
            var totalIndex, i, len;
            try {
                totalIndex = this._getWindowCount();
                for (i = 0; i < totalIndex; i++) {
                    this.ocx.StopEx(false, i, this._stopCallBack, 0);
                }
            }
            catch (e) {
                console.error("VideoOcx.stop Error", e);
            }
        };
        VideoOcx.prototype._stopOtherResource = function (index) {
            var playVideoToolModel = this._cachePlayVideoToolModel[index];
            if (playVideoToolModel) {
                playVideoToolModel.hide();
            }
        };
        VideoOcx.prototype._stopAllOtherResource = function () {
            var k;
            for (k in this._cachePlayVideoToolModel) {
                this._cachePlayVideoToolModel[k].hide();
            }
        };
        VideoOcx.prototype._clearAllOtherResource = function () {
            var k;
            for (k in this._cachePlayVideoToolModel) {
                this._cachePlayVideoToolModel[k].clear();
                delete this._cachePlayVideoToolModel[k];
            }
        };
        VideoOcx.prototype.createToolBar = function (strInfo, index) {
            try {
                return this.ocx.CreateToolBar(strInfo, index);
            }
            catch (e) {
                console.error("createToolBar Error: ", e);
            }
        };
        VideoOcx.prototype.setToolbarCallBack = function (funcName, func) {
            try {
                return this.ocx.SetCallBack(funcName, func);
            }
            catch (e) {
                console.error("ocx.setToolbarCallBack error", e);
            }
        };
        VideoOcx.prototype._init = function () {
            var _ocx, _param;
            _ocx = angular.element("<object></object>");
            _ocx.attr("id", this.ocxId);
            if (portrait_tool_1.default.getIEVer() > 0 && portrait_tool_1.default.getIEVer() <= 8) {
                _ocx.attr("classid", "CLSID:CEA4ADE1-AC94-4A75-AE30-85B99364FCD2");
            }
            else {
                _ocx.html("<param  style='width: 100px;height: 100px;background: #000;position: absolute;left: 0;top: 0;' name='unload' value='pluginLoaded'></param>");
            }
            _ocx.attr("type", "applicatin/x-firebreath-sn");
            _ocx.css("width", "100%");
            _ocx.css("height", "100%");
            angular.element(this.containerDom).append(_ocx);
            this.ocx = _ocx[0];
            this._bindEvent();
        };
        VideoOcx.prototype._play = function (path, index) {
            console.debug("_play", path);
            var result = 500;
            try {
                result = this.ocx.PlayEx2(path, index, this._playCallBack.bind(this), 0, this._displayFirstFrameCallBack.bind(this), 0, this._RecordEndCallBack.bind(this), 0);
            }
            catch (e) {
                console.error("ocx._play error: ", e);
            }
            return result;
        };
        VideoOcx.prototype._getWindowCount = function () {
            var result = 0;
            try {
                result = this.ocx ? this.ocx.GetWindowCount() : 0;
            }
            catch (e) {
                console.error("ocx.GetWindowCount Error", e);
            }
            return result;
        };
        VideoOcx.prototype._bindEvent = function () {
            var _this = this;
            var ocx = this.ocx;
            this._addEvent(ocx, 'WndClick', function () {
            });
            this._addEvent(ocx, 'WndDClik', function (index, xPoint, yPoint) {
                if (typeof _this.dbClickCallBack === "function") {
                    _this.dbClickCallBack(index);
                }
            });
            this._addEvent(ocx, 'MouseLeaveControl', function (ulFlag, x, y, brReserved) {
            });
            this._addEvent(ocx, 'SwitchWindow', function (srcIndex, desIndex) {
                _this.changeLayoutPlayVideoResource(srcIndex, desIndex);
            });
        };
        VideoOcx.prototype.changeLayoutPlayVideoResource = function (srcIndex, desIndex) {
            var srcPlayVideoToolModel = this._cachePlayVideoToolModel[srcIndex];
            var desPlayVideoToolModel = this._cachePlayVideoToolModel[desIndex];
            this._cachePlayVideoToolModel[srcIndex] = null;
            delete this._cachePlayVideoToolModel[srcIndex];
            this._cachePlayVideoToolModel[desIndex] = null;
            delete this._cachePlayVideoToolModel[desIndex];
            if (srcPlayVideoToolModel) {
                srcPlayVideoToolModel.setIndex(desIndex);
                this._cachePlayVideoToolModel[desIndex] = srcPlayVideoToolModel;
                if (!this.GetWindowBusyByIndex(desIndex)) {
                    srcPlayVideoToolModel && srcPlayVideoToolModel.hide();
                }
            }
            if (desPlayVideoToolModel) {
                desPlayVideoToolModel.setIndex(srcIndex);
                this._cachePlayVideoToolModel[srcIndex] = desPlayVideoToolModel;
                if (!this.GetWindowBusyByIndex(srcIndex)) {
                    desPlayVideoToolModel && desPlayVideoToolModel.hide();
                }
            }
        };
        VideoOcx.prototype._addEvent = function (obj, name, func) {
            if (window.attachEvent) {
                obj.attachEvent('on' + name, func);
            }
            else {
                obj.addEventListener(name, func, false);
            }
        };
        return VideoOcx;
    }());
    var VideoOcxFactory = (function () {
        function VideoOcxFactory(i18nFactory) {
            this.i18nFactory = i18nFactory;
        }
        VideoOcxFactory.prototype.getVideoOcx = function (containerDom) {
            return new VideoOcx(containerDom, this.i18nFactory);
        };
        VideoOcxFactory.$inject = ["i18nFactory"];
        return VideoOcxFactory;
    }());
    var VideoOcxTool = (function () {
        function VideoOcxTool(i18nFactory, layer) {
            this.i18nFactory = i18nFactory;
            this.layer = layer;
            this.$ = angular.element;
            this._version = "Crowd_OCX_V2.2.5";
            this._ocxDownloadUrl = "/foplayer/SN_Crowd_Plugins_2.2.5.exe";
            this._firefoxDownloadUrl = "/foplayer/Firefox_44.exe";
            this._googleDownloadUrl = "/foplayer/GoogleChromeframeStandaloneEnterprise.4144293914.msi";
        }
        VideoOcxTool.prototype.checkOcx = function () {
            var result = {};
            result.ocx = this._checkOcx();
            result.browser = this._checkBrowser();
            this.showDownload(result);
        };
        VideoOcxTool.prototype._checkOcx = function () {
            var $ocx = this._createTempOcx();
            var result = "false";
            if (!$ocx)
                return result;
            var $container;
            try {
                $container = this.$("<div style='position:absolute; top:0; left:-1000px;'></div>");
                $container.appendTo('body');
                $container.append($ocx);
                if (!(portrait_tool_1.default.getIEVer() > 0 && portrait_tool_1.default.getIEVer() <= 8)) {
                    this._setParamToOcx($ocx);
                }
                var version = $ocx[0].GetVersion();
                $ocx[0].CleanUp();
                if (version && version != this._version) {
                    result = "upgrade";
                }
                else {
                    result = "true";
                }
                if (window.console) {
                    console.debug("The current version of the video controls is:", version);
                }
            }
            catch (e) {
                if (window.console) {
                    console.error("checkocx error: ", e.message);
                }
            }
            finally {
                if ($container) {
                    $container.empty();
                    $container.remove();
                }
                $ocx = null;
                $container = null;
            }
            return result;
        };
        VideoOcxTool.prototype._checkBrowser = function () {
            var param = portrait_tool_1.default.getBrowser();
            var result = "good";
            if (param.name.toUpperCase() == "IE" && (Number(param.major) <= 8)) {
                result = "bad";
            }
            return result;
        };
        VideoOcxTool.prototype.showDownload = function (param) {
            if (param.browser == "bad") {
                this._showDownload({ type: 3 });
            }
            else if (param.ocx == "false") {
                this._showDownload({ type: 1 });
            }
            else if (param.browser == "normal") {
                this._showDownload({ type: 2 });
            }
            else if (param.ocx == "upgrade") {
                this._showDownload({ type: 4 });
            }
        };
        VideoOcxTool.prototype._showDownload = function (param) {
            var _this = this;
            var method, html, urlId, url;
            switch (param.type) {
                case 1:
                    urlId = 'ocxDownloadUrl';
                    html = "<div class='u-msg-notclose-1'><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_02') + "</a></div>";
                    url = this._ocxDownloadUrl;
                    break;
                case 2:
                    urlId = 'firefoxDownloadUrl';
                    html = "<div class='u-msg-notclose-1'><p>" + this.i18nFactory('FDS_00_13_03') + "</p><p><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_06') + "</a></p></div>";
                    url = this._googleDownloadUrl;
                    break;
                case 3:
                    urlId = 'firefoxDownloadUrl';
                    html = "<div class='u-msg-notclose-1' style='min-height:1px;'><p>" + this.i18nFactory('FDS_00_13_04') + "</p><p><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_06') + "</a></p></div>";
                    url = this._googleDownloadUrl;
                    break;
                case 4:
                    urlId = 'ocxDownloadUrl';
                    html = "<div class='u-msg-notclose-1'><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_05') + "</a></div>";
                    url = this._ocxDownloadUrl;
                    break;
                default:
                    urlId = 'ocxDownloadUrl';
                    html = "<div class='u-msg-notclose-1'><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_02') + "</a></div>";
                    url = this._ocxDownloadUrl;
                    break;
            }
            method = this._downloadResource;
            layer.open({
                type: 1,
                title: null,
                shade: 0,
                area: ['320px'],
                offset: 'rb',
                closeBtn: 0,
                content: html,
                btn: this.i18nFactory('FDS_00_07_01'),
                success: function (dom, index) {
                    setTimeout(function () {
                        _this.$(dom).find("#" + urlId).on('click', { index: index, url: url }, method);
                    });
                }
            });
        };
        VideoOcxTool.prototype._downloadResource = function (event) {
            var data = event.data;
            if (data) {
                window.location.href = data.url;
                layer.close(data.index);
            }
        };
        VideoOcxTool.prototype._createTempOcx = function () {
            var $ocx = null;
            try {
                $ocx = this.$("<object></object>");
                $ocx.attr("id", "testOcxExist");
                $ocx.attr("type", "applicatin/x-firebreath-sn");
                if (portrait_tool_1.default.getIEVer() > 0 && portrait_tool_1.default.getIEVer() <= 8) {
                    $ocx.attr("classid", "CLSID:CEA4ADE1-AC94-4A75-AE30-85B99364FCD2");
                }
            }
            catch (e) {
                if (window.console) {
                    console.error("_createTempOcx", e.message);
                }
            }
            return $ocx;
        };
        VideoOcxTool.prototype._setParamToOcx = function ($ocx) {
            try {
                var param = "<param name='unload' value='pluginLoaded'></param>";
                $ocx.html(param);
            }
            catch (e) {
                if (window.console) {
                    console.error("_setParamToOcx", e.message);
                }
            }
            return $ocx;
        };
        VideoOcxTool.$inject = ['i18nFactory', 'layer'];
        return VideoOcxTool;
    }());
    main_app_1.app.service("videoOcxFactory", VideoOcxFactory);
    main_app_1.app.service("videoOcxTool", VideoOcxTool);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQXdLNUIsSUFBTSxtQkFBbUIsR0FBRztRQUN4QixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsU0FBUztLQUNyQixDQUFDO0lBTUYsSUFBTSxlQUFlLEdBQUc7UUFDcEIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsS0FBSyxFQUFFLGNBQWM7UUFDckIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsT0FBTyxFQUFFLGNBQWM7S0FDMUIsQ0FBQztJQUtGO1FBQ0k7WUFDQSxTQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ2hCLFVBQUssR0FBRyxhQUFhLENBQUM7WUFFdEIsU0FBSSxHQUFHLElBQUksQ0FBQztZQUNaLE1BQUMsR0FBRyxHQUFHLENBQUM7WUFDUixNQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ1IsVUFBSyxHQUFHLE1BQU0sQ0FBQztZQUNmLFdBQU0sR0FBRyxNQUFNLENBQUM7WUFDaEIsY0FBUyxHQUFHLFVBQVUsQ0FBQztZQUV2QixjQUFTLEdBQUcsVUFBVSxDQUFDO1lBQ3ZCLFNBQUksR0FBRyxJQUFJLENBQUM7WUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO1lBRWQsV0FBTSxHQUFHLElBQUksQ0FBQztZQUNkLGFBQVEsR0FBRyxZQUFZLENBQUM7UUFoQlYsQ0FBQztRQW9CbkIsa0JBQUM7SUFBRCxDQXJCQSxBQXFCQyxJQUFBO0lBRUQ7UUFDSTtZQUNBLFNBQUksR0FBRyxPQUFPLENBQUM7WUFDZixVQUFLLEdBQUcsYUFBYSxDQUFDO1lBQ3RCLFFBQUcsR0FBRyxDQUFDLENBQUM7WUFDUixNQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ1IsTUFBQyxHQUFHLEdBQUcsQ0FB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QUMsQ0FBQztvQkFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNENBQTRDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztZQUNMLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTyxxQ0FBYyxHQUF0QixVQUF1QixJQUFTO1lBQzVCLElBQUksQ0FBQztnQkFDRCxJQUFJLEtBQUssR0FBRyxvREFBb0QsQ0FBQztnQkFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBMUxNLG9CQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUMsT0FBTyxDQUFDLENBQUM7UUEyTDdDLG1CQUFDO0tBNUxELEFBNExDLElBQUE7SUFHRCxjQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELGNBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3gubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9ydHJhaXRUb29sIGZyb20gXCIuLi8uLi9wb3J0cmFpdC10b29sXCI7XHJcbmltcG9ydCBcImpzb24yXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vYXBwL21haW4uYXBwXCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuZGVjbGFyZSBsZXQgd2luZG93OiBhbnk7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuZGVjbGFyZSBsZXQgbGF5ZXI6IGFueTtcclxuXHJcbmxldCBKU09OID0gcmVxdWlyZShcImpzb24yXCIpO1xyXG5cclxuLy8gb2N45a6e5L6L5pys6Lqr5YWB6K6455qE5Yqf6IO9KHZpZGVvT2N45oyH5Luk5a6a5LmJ55SoLCDkuJrliqHmqKHlnZfkuI3kvb/nlKgpXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZGVvT2N4IHtcclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5a6e5pe26KeG6aKRXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcmV0dXJuIDDkuLrmraPluLgg5YW25LuW5pWw5a2X5Li66ZSZ6K+vXHJcbiAgICAgKi9cclxuICAgIHBsYXlSZWFsVGltZShvcHRpb25zOiBSZWFsVGltZU9wdCwgaW5kZXg/OiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvnJ0c3BcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqIEByZXR1cm4gMOS4uuato+W4uCDlhbbku5bmlbDlrZfkuLrplJnor69cclxuICAgICAqL1xyXG4gICAgcGxheVJ0c3Aob3B0aW9uczogUnRzcE9wdCwgaW5kZXg/OiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvnJ0c3DlpJrot6/op4bpopFcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIDDkuLrmraPluLgg5YW25LuW5pWw5a2X5Li66ZSZ6K+vXHJcbiAgICAgKi9cclxuICAgIHBsYXlSdHNwTXVsdGlwbGUob3B0aW9uczogUnRzcE11bHRpcGxlT3B0KTogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7ljoblj7Lop4bpopFcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqIEByZXR1cm4gMOS4uuato+W4uCDlhbbku5bmlbDlrZfkuLrplJnor69cclxuICAgICAqL1xyXG4gICAgcGxheVB2Z0JhY2sob3B0aW9uczogUGxheUJhY2tPcHQsIGluZGV4PzogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgLy8g5YGc5q2iIOaMieeFp2luZGV4XHJcbiAgICBzdG9wKGluZGV4OiBudW1iZXIpOiB2b2lkOyAvLyDlhbPpl63mjIflrprnqpflj6MsIGluZGV45LuOMOW8gOWni1xyXG4gICAgc3RvcEFsbCgpOnZvaWQ7IC8vIOWFs+mXreaJgOacieinhumikVxyXG4gICAgLy8g6ZSA5q+B5o6n5Lu2XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBzZXRMYXlvdXQobGF5ZXJUeXBlOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0Rm9jdXNXaW5kb3dJbmRleCgpOm51bWJlcjtcclxuICAgIC8vIOaIquWbviwg6buY6K6kanBn5qC85byPXHJcbiAgICBjYXRjaFBpY3R1cmUoKTogSUNhdGNoUGljdHVyZVJlc3VsdDtcclxuICAgIENhdGNoUGljdHJ1ZShpbmRleDogbnVtYmVyKTogc3RyaW5nO1xyXG4gICAgR2V0VmlkZW9BdHRyaWJ1dGUoaW5kZXg6IG51bWJlcik6VmlkZW9PY3hBdHRyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3nqpflj6PnmoTnqbrpl7LnirbmgIFcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIEdldFdpbmRvd0J1c3lCeUluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuO1xyXG5cclxuICAgIGJpbmRPY3hFdmVudChldmVudE5hbWU6IHN0cmluZywgZnVuYzogRnVuY3Rpb24pOiB2b2lkO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgT2N4Q29udHJvbCB7XHJcbiAgICBJc0NvbnRyb2xGdWxsU2NyZWVuKCk6IGJvb2xlYW47XHJcbiAgICBSZXN0b3JlQ29udHJvbFNjcmVlblNob3coKTogdm9pZDtcclxuICAgIFNldENvbnRyb2xGdWxsU2NyZWVuKCk6IHZvaWQ7XHJcbiAgICBHZXRXaW5kb3dDb3VudCgpOiBudW1iZXI7XHJcbiAgICBQbGF5RXgyOiAocGF0aDogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBwbGF5Q2FsbEJhY2s6IChpbmRleDogbnVtYmVyLCByZXN1bHQ6IG51bWJlciwgdXNlclBhcmFtOiBhbnkpPT52b2lkLCB1c2VyUGxheVBhcmFtOiBhbnksXHJcbiAgICAgICAgICAgICAgLy8g56ys5LiA5bin5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAgZGlzcGxheUZpcnN0RnJhbWVDYWxsQmFjazogKGluZGV4OiBudW1iZXIsIHJlc3VsdDogbnVtYmVyLCB1c2VyUGFyYW06IGFueSk9PnZvaWQsIHVzZXJEaXNwbGF5Rmlyc3RGcmFtZVBhcmFtOiBhbnksXHJcbiAgICAgICAgICAgICAgLy8g5pKt5pS+5b2V5YOP57uT5p2f5pe25Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAgcFJlY29yZEVuZENhbGxCYWNrOiAoaW5kZXg6IG51bWJlciwgcmVzdWx0OiBudW1iZXIsIHVzZXJQYXJhbTogYW55KT0+dm9pZCwgcmVjb3JkRW5kUGFyYW06IGFueVxyXG4gICAgKT0+bnVtYmVyO1xyXG4gICAgU3RvcEV4OiBGdW5jdGlvbjtcclxuICAgIC8vIOa4hemZpOaOp+S7tlxyXG4gICAgQ2xlYW5VcDogKCk9PnZvaWQ7XHJcbiAgICBTZXRMYXlvdXQobGF5ZXJUeXBlOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgR2V0Rm9jdXNXaW5kb3dJbmRleCgpOm51bWJlcjtcclxuICAgIC8vIHBpY1R5cGU65Zu+54mH55qE5oiq5Y+W57G75Z6LMTpibXAgMjpnaWYgMzpqcGcgNDpwbmdcclxuICAgIENhdGNoUGljdHJ1ZShpbmRleDogbnVtYmVyLCBwaWNUeXBlOiBudW1iZXIpOiBzdHJpbmc7XHJcbiAgICBHZXRWaWRlb0F0dHJpYnV0ZShpbmRleDogbnVtYmVyKTogSVZpZGVvU2l6ZTtcclxuICAgIENyZWF0ZVRvb2xCYXIoc3RySW5mbzogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgU2V0Q2FsbEJhY2soZnVuY05hbWU6IHN0cmluZywgZnVuYzogRnVuY3Rpb24pOiBudW1iZXI7XHJcbiAgICBTZXRXbmRPc2RQcm9wZXJ0eShjb2xvcjogYW55LCBsaW5lV2lkdGg6IG51bWJlciwgZmlsbENvbG9yOiBhbnksIGluZGV4OiBudW1iZXIpOmFueTtcclxuICAgIC8qKlxyXG4gICAgICog5ZCv55So5pWw5a2X5pS+5aSnXHJcbiAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgU3RhcnRab29tQnlJbmRleCh0eXBlOiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmlbDlrZfmlL7lpKdcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIFN0b3Bab29tQnlJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICog5LiL6L295Zu+54mH57yT5a2Y5Yiwb2N45LitLCDnlKjkuo7liqDovb1vY3jmjqfku7bkuK3nmoTlm77moIdcclxuICAgICAqIEBwYXJhbSBwYXRoXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEByZXR1cm4gT0sgLyBFUlJPUlxyXG4gICAgICovXHJcbiAgICBEb3duTG9hZEltYWdlKHBhdGg6IHN0cmluZyk6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6ZSZ6K+v56CBXHJcbiAgICAgKi9cclxuICAgIEdldExhc3RFcnJvcigpOnN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6L+b5bqm5p2h55qE6IyD5Zu0XHJcbiAgICAgKiBAcGFyYW0gdG90YWxUaW1l44CA5oC75pe26Ze0XHJcbiAgICAgKiBAcGFyYW0ga2V5IOi/m+W6puadoeeahOWPr+S7pVxyXG4gICAgICogQHBhcmFtIGluZGV4IOeql+agvOS9jee9rlxyXG4gICAgICogQHJldHVybiAwIOaIluiAhSDplJnor6/noIFcclxuICAgICAqL1xyXG4gICAgU2V0UHJvZ3Jlc3NSYW5nZShrZXk6IG51bWJlciwgdG90YWxUaW1lOiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui/m+W6puadoeeahOS9jee9rlxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIGN1cnJlbnRUaW1lXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybiAwIOaIluiAhemUmeivr+eggVxyXG4gICAgICovXHJcbiAgICBTZXRQcm9ncmVzc1BvcyhrZXk6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWKqOS9nOadoeeahOS/oeaBr1xyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIHN0ckluZm9cclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIFNldENvbnRlbnQoa2V5OiBudW1iZXIsIHN0ckluZm86IHN0cmluZywgaW5kZXg6IG51bWJlcik6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5o6n5Lu25q2j5Zyo5pKt5pS+55qE5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybiDlpKfkuo7nrYnkuo4wIOihqOekuuato+W4uCwg5bCP5LqOMOihqOekuumUmeivr+eggVxyXG4gICAgICovXHJcbiAgICBHZXRQbGF5VGltZShpbmRleDogbnVtYmVyKTpudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaIlumakOiXj+W9k+WJjeeql+WPo+eahOW3peWFt+adoVxyXG4gICAgICogQHBhcmFtIGJTaG93XHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBTaG93VG9vbEJhcihiU2hvdzogYm9vbGVhbiwgaW5kZXg6IG51bWJlcik6dm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruW3peWFt+adoeeahOS9v+iDvVxyXG4gICAgICogQHBhcmFtIHN0ckluZm9cclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIFNob3dBbmRFbmFibGUoc3RySW5mbzogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN56qX5Y+j55qE56m66Zey54q25oCBXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybiB0cnVlL2ZhbHNlIOW/meeijC/nqbrpl7JcclxuICAgICAqL1xyXG4gICAgR2V0V2luZG93QnVzeUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG4gICAgR2V0VmlkZW9BdHRyaWJ1dGUoaW5kZXg6IG51bWJlcik6VmlkZW9PY3hBdHRyO1xyXG4gICAgQ2F0Y2hQaWN0cnVlKGluZGV4OiBudW1iZXIsIHR5cGU6IG51bWJlcik6IHN0cmluZztcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFZpZGVvT2N4QXR0ciB7XHJcbiAgICB2aWRlb1R5cGU6IG51bWJlcixcclxuICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgIGR1cmF0aW9uOiBudW1iZXIsXHJcbn1cclxuLyoqXHJcbiAqIOW3peWFt+adoeaWueazleWQjeaemuS4vlxyXG4gKiBAdHlwZSB7e1BMQVk6IHN0cmluZzsgUEFVU0U6IHN0cmluZzsgU1RPUDogc3RyaW5nfX1cclxuICovXHJcbmNvbnN0IFRvb2xCYXJGdW5jTmFtZUVudW0gPSB7XHJcbiAgICBQTEFZOiBcInBsYXlcIixcclxuICAgIFBBVVNFOiBcInBhdXNlXCIsXHJcbiAgICBTVE9QOiBcInN0b3BcIixcclxuICAgIERJR0lUQUw6IFwiZGlnaXRhbFwiXHJcbn07XHJcblxyXG4vKipcclxuICog5bel5YW35p2h5paH5a2X5p6a5Li+XHJcbiAqIEB0eXBlIHt7fX1cclxuICovXHJcbmNvbnN0IFRvb2xCYXJUZXh0RW51bSA9IHtcclxuICAgIFBMQVk6IFwiRkRTXzAwXzA3XzMxXCIsXHJcbiAgICBQQVVTRTogXCJGRFNfMDBfMDdfMzJcIixcclxuICAgIFNUT1A6IFwiRkRTXzAwXzA3XzMzXCIsXHJcbiAgICBESUdJVEFMOiBcIkZEU18wMF8wN18zNFwiXHJcbn07XHJcblxyXG4vKipcclxuICog5Yqo5L2c5p2hYmFyXHJcbiAqL1xyXG5jbGFzcyBUb29sQmFySXRlbXtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgdHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICBzdHlsZSA9IFwibGVmdC1ib3R0b21cIjtcclxuICAgIGtleTogbnVtYmVyO1xyXG4gICAgc2hvdyA9IHRydWU7XHJcbiAgICB4ID0gXCIwXCI7XHJcbiAgICB5ID0gXCIwXCI7XHJcbiAgICB3aWR0aCA9IFwiNDBweFwiO1xyXG4gICAgaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICBiYWNrQ29sb3IgPSBcIjB4ZmZjODAwXCI7XHJcbiAgICB0ZXh0OiBzdHJpbmc7IC8vIOW/heWhq1xyXG4gICAgdGV4dENvbG9yID0gXCIweDAwMDAwMFwiO1xyXG4gICAgZm9udCA9IFwi5a6L5L2TXCI7XHJcbiAgICBmb250U2l6ZSA9IDEyO1xyXG4gICAgdG9vbHRpcDogc3RyaW5nOyAvLyDlv4XloatcclxuICAgIGVuYWJsZSA9IHRydWU7XHJcbiAgICBmdW5jdGlvbiA9IFwicmV0dXJuRnVuY1wiO1xyXG5cclxuICAgIGFkanVzdHdpZHRoOiBib29sZWFuO1xyXG4gICAgcGljdHVyZToge1trZXk6c3RyaW5nXTpzdHJpbmd9O1xyXG59XHJcblxyXG5jbGFzcyBUb29sQmFyQ29udGFpbmVye1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICB0eXBlID0gXCJwYW5lbFwiO1xyXG4gICAgc3R5bGUgPSBcImxlZnQtYm90dG9tXCI7XHJcbiAgICBrZXkgPSAwO1xyXG4gICAgeCA9IFwiMFwiO1xyXG4gICAgeSA9IFwiMFwiO1xyXG4gICAgd2lkdGggPSBcIjEwMCVcIjtcclxuICAgIGhlaWdodCA9IFwiMjVweFwiO1xyXG4gICAgYmFja0NvbG9yID0gXCIweDI0MjQyNFwiO1xyXG4gICAgdHJhbnNwYXJlbnQgPSBcIjAuOFwiO1xyXG4gICAgYW5pbWF0ZVRpbWUgPSBcIjEwMDBcIjsgIC8v5q+r56eS5YC8XHJcbiAgICBzaG93ID0gdHJ1ZTtcclxuICAgIGl0ZW1zID0gbmV3IEFycmF5PFRvb2xCYXJJdGVtPigpO1xyXG59XHJcblxyXG4vKipcclxuICog55Sx5LqO5a2Y5Zyo5Yid5aeL5YyWXHJcbiAqIOatpOWPguaVsOS4gOWumuimgeeUqG5ldyBSdHNwTXVsdGlwbGVPcHQoKeadpeWIm+W7ulxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ0c3BNdWx0aXBsZU9wdCB7XHJcbiAgICB0eXBlOiBudW1iZXIgPSAxMDsgLy8g5q2k5YC85Zu65a6a5LiN5Y+YXHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIHVzZXI6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwYXNzd29yZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHRjcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYXV0b3JlY29ubmNldDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZGlzcGxheU1vZGVsOiBudW1iZXIgPSAwOyAvLyDpnZ7lv4XloassIDDkuLrmma7pgJrmqKHlvI/vvIzkuI3mlK/mjIHluIPpmLLluIPmjqfnlLvlm77lip/og73vvJsgMeS4uuW4g+mYsuW4g+aOp+aooeW8j++8jOS4jeaUr+aMgeaUvuWkp+OAgeminOiJsuiuvue9ruetie+8m+aXoOatpOmhue+8jOWImeaMieaZrumAmuaooeW8j+i/m+ihjO+8m1xyXG4gICAgaHdkZWNvZGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog55Sx5LqO5a2Y5Zyo5Yid5aeL5YyWXHJcbiAqIOatpOWPguaVsOS4gOWumuimgeeUqG5ldyBSdHNwT3B0KCnmnaXliJvlu7pcclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdHNwT3B0IHtcclxuICAgIHR5cGU6IG51bWJlciA9IDY7IC8vIOatpOWAvOWbuuWumuS4jeWPmFxyXG4gICAgdXJsOiBzdHJpbmc7IC8vIOW/heWhqywg55Sx6LCD55So5pa55Li75Yqo5oyH5a6aXHJcbiAgICB1c2VyOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB0Y3A6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGF1dG9yZWNvbm5jZXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGRpc3BsYXlNb2RlbDogbnVtYmVyID0gMDsgLy8g6Z2e5b+F5aGrLCAw5Li65pmu6YCa5qih5byP77yM5LiN5pSv5oyB5biD6Ziy5biD5o6n55S75Zu+5Yqf6IO977ybIDHkuLrluIPpmLLluIPmjqfmqKHlvI/vvIzkuI3mlK/mjIHmlL7lpKfjgIHpopzoibLorr7nva7nrYnvvJvml6DmraTpobnvvIzliJnmjInmma7pgJrmqKHlvI/ov5vooYzvvJtcclxuICAgIGh3ZGVjb2RlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOeUseS6juWtmOWcqOWIneWni+WMllxyXG4gKiDmraTlj4LmlbDkuIDlrpropoHnlKhuZXcgUmVhbFRpbWVPcHQoKeadpeWIm+W7ulxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlYWxUaW1lT3B0IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogbnVtYmVyID0gMTsgLy8g5q2k5YC85Zu65a6a5LiN5Y+YLCDkuI3og73ooqvkv67mlLlcclxuICAgIHBhdGg6IHN0cmluZzsgLy8g5b+F5aGrLOeUseiwg+eUqOaWueS4u+WKqOaMh+WumlxyXG4gICAgdXNlcjogc3RyaW5nID0gXCJcIjsvLyDpnZ7lv4XloatcclxuICAgIHBhc3N3ZDogc3RyaW5nID0gXCJcIjsvLyDpnZ7lv4XloatcclxuICAgIGlwOiBzdHJpbmc7IC8vIOW/heWhqyznlLHosIPnlKjmlrnkuLvliqjmjIflrppcclxuICAgIHBvcnQ6IG51bWJlcjsgLy8g5b+F5aGrLCDnlLHosIPnlKjmlrnkuLvliqjmjIflrppcclxuICAgIGRpc3BsYXlNb2RlbDogbnVtYmVyID0gMDsgLy8g6Z2e5b+F5aGrLCAw5Li65pmu6YCa5qih5byP77yM5LiN5pSv5oyB5biD6Ziy5biD5o6n55S75Zu+5Yqf6IO977ybIDHkuLrluIPpmLLluIPmjqfmqKHlvI/vvIzkuI3mlK/mjIHmlL7lpKfjgIHpopzoibLorr7nva7nrYnvvJvml6DmraTpobnvvIzliJnmjInmma7pgJrmqKHlvI/ov5vooYzvvJtcclxuICAgIGh3ZGVjb2RlcjogbnVtYmVyID0gMDsgLy8g6Z2e5b+F5aGrXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIOaSreaUvuWOhuWPsuinhumikeWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBsYXlCYWNrT3B0e1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0eXBlOiBudW1iZXIgPSAyOyAvLyDmraTlgLzlm7rlrprkuI3lj5gsIOS4jeiDveiiq+S/ruaUuVxyXG4gICAgcGF0aDogc3RyaW5nOyAvLyDlv4XloassIOeUseiwg+eUqOaWueS4u+WKqOaMh+WumlxyXG4gICAgdXNlcjogc3RyaW5nID0gXCJcIjsgLy8g6Z2e5b+F5aGrXHJcbiAgICBwYXNzd2Q6IHN0cmluZyA9IFwiXCI7IC8vIOmdnuW/heWhq1xyXG4gICAgaXA6IHN0cmluZzsgLy8g5b+F5aGrLCDnlLHosIPnlKjmlrnkuLvliqjmjIflrppcclxuICAgIHBvcnQ6IG51bWJlcjsgLy8g5b+F5aGrLCDnlLHosIPnlKjmlrnkuLvliqjmjIflrppcclxuICAgIGRpc3BsYXlNb2RlbDogbnVtYmVyID0gMDsgLy8g6Z2e5b+F5aGrLCAw5Li65pmu6YCa5qih5byP77yM5LiN5pSv5oyB5biD6Ziy5biD5o6n55S75Zu+5Yqf6IO977ybIDHkuLrluIPpmLLluIPmjqfmqKHlvI/vvIzkuI3mlK/mjIHmlL7lpKfjgIHpopzoibLorr7nva7nrYnvvJvml6DmraTpobnvvIzliJnmjInmma7pgJrmqKHlvI/ov5vooYzvvJtcclxuICAgIGh3ZGVjb2RlcjogbnVtYmVyID0gMDsgLy8g6Z2e5b+F5aGrXHJcblxyXG4gICAgLy8g5b2V5YOP5LiT55So5Y+C5pWwXHJcbiAgICBiZWdpblRpbWU6IHN0cmluZzsgLy8g5b+F5aGr6aG5LCDnpLrkvosyMDEyMDEwMTEzMjAwMDAwMCDljbN5eXl5TU1kZGhobW1zc1NTU1xyXG4gICAgZW5kVGltZTogc3RyaW5nOyAvLyDlv4XloavpobksIOekuuS+izIwMTIwMTAxMTUyMDAwMDAwIOWNs3l5eXlNTWRkaGhtbXNzU1NTXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZGVvU2l6ZXtcclxuICAgIHZpZGVvVHlwZTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjsgLy8g6KeG6aKR5rqQ5pys6Lqr55qE5a695bqmXHJcbiAgICBoZWlnaHQ6IG51bWJlcjsgLy8g6KeG6aKR5rqQ5pys6Lqr55qE6auY5bqmXHJcbiAgICBkdXJhdGlvbjogbnVtYmVyOyAvLyDop4bpopHmupDnmoTplb/luqYg5pe26Ze05oizIOWPquWcqOW9leWDj+WbnuaUvuaXtui1t+S9nOeUqFxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNhdGNoUGljdHVyZVJlc3VsdHtcclxuICAgIGJhc2U2NEltYWdlOiBzdHJpbmc7XHJcbiAgICB2aWRlb1NpemU6IElWaWRlb1NpemU7XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5bel5YW35p2h5a+56LGhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4vKipcclxuICog5pGE5YOP5py65pe26Ze05Yi75bqm5bel5YW3bW9kZWxcclxuICog55So5p2l6ZqP5pe26Ze05a+55b2V5YOP5Zue5pS+55qE5pe26Ze05Yi75bqm6L+b6KGM5Y+Y5pu0XHJcbiAqL1xyXG5jbGFzcyBQbGF5VmlkZW9Ub29sTW9kZWx7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnZhbFRpbWUgPSAxMDAwO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50SW50ZXJ2YWw6IGFueTtcclxuICAgIHByaXZhdGUgdG90YWxUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvY3g6IE9jeENvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGluZGV4OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRvb2xCYXJDb250YWllbnI6IFRvb2xCYXJDb250YWluZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGN1cnJlbnRUaW1lVG9vbEJhcjogVG9vbEJhckl0ZW0sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRvdGFsVGltZVRvb2xJdGVtOiBUb29sQmFySXRlbSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVuZFRpbWU6IG51bWJlcil7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/liqjliqjkvZzmnaHmkq3mlL7liLvluqbmmL7npLpcclxuICAgICAqL1xyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCLmiafooYzlvqrnjq9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFBsYXlUaW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG90YWxQbGF5VGltZSgpO1xyXG4gICAgICAgIH0sIHRoaXMuaW50ZXJ2YWxUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u56qX5qC855qEaW5kZXgsIOW9k+eql+agvOWPmOWKqOaXtuinpuWPkVxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHNldEluZGV4KGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+iuvue9ruaSreaUvuaXtumXtFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnJlbnRQbGF5VGltZSgpe1xyXG4gICAgICAgIGxldCB0aW1lID0gdGhpcy5nZXRDdXJyZW50UGxheVRpbWUodGhpcy5pbmRleCk7XHJcbiAgICAgICAgaWYodGltZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICB0aGlzLm9jeC5TZXRDb250ZW50KHRoaXMuY3VycmVudFRpbWVUb29sQmFyLmtleSwgdGhpcy5nZXRUaW1lU3RyKHRpbWUvMTAwMCksIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYod2luZG93LmNvbnNvbGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5TZXRDb250ZW50IGVycm9yOiBcIiwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUb3RhbFBsYXlUaW1lKCl7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSB0aGlzLmdldFRvdGFsVGltZSh0aGlzLmluZGV4KTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHRoaXMub2N4LlNldENvbnRlbnQodGhpcy50b3RhbFRpbWVUb29sSXRlbS5rZXksIHRoaXMuZ2V0VGltZVN0cih0aGlzLnRvdGFsVGltZS8xMDAwKSwgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBpZih3aW5kb3cuY29uc29sZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LlNldENvbnRlbnQgZXJyb3I6IFwiLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDdXJyZW50UGxheVRpbWUoaW5kZXg6IG51bWJlcik6IG51bWJlcntcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9jeC5HZXRQbGF5VGltZShpbmRleCk7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LkdldFBsYXlUaW1lIGVycm9yOlwiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VG90YWxUaW1lKGluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogSVZpZGVvU2l6ZTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UodGhpcy5vY3guR2V0VmlkZW9BdHRyaWJ1dGUoaW5kZXgpKTtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb25zb2xlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJHZXRWaWRlb0F0dHJpYnV0ZVwiLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHJlc3VsdCAmJiByZXN1bHQuZHVyYXRpb24pIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lvZPliY3ml7bpl7TmiLPojrflj5bml7bliIbnp5JcclxuICAgICAqIOagvOW8j+S4uiAwMDowMDowMFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRpbWVTdHIodGltZTogbnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gKHRoaXMudG9TdHIoTWF0aC5mbG9vcih0aW1lLzM2MDApKStcIjpcIit0aGlzLnRvU3RyKE1hdGguZmxvb3IoKHRpbWUlMzYwMCkvNjApKStcIjpcIit0aGlzLnRvU3RyKE1hdGguZmxvb3IodGltZSAlIDYwKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG5a2X56ym5Liy6Ieq5Yqo6KGl5YWoMFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRvU3RyKGk6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gKGk8MTApID8gKFwiMFwiICsgaSkgOiAoaSArIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+57uT5p2fLCDlgZzmraJpbnRlcnZhbFxyXG4gICAgICovXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50SW50ZXJ2YWwpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuY3VycmVudEludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKXtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB0aGlzLl90b2dnbGUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKXtcclxuICAgICAgICB0aGlzLl90b2dnbGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlLHkuo7lt6XlhbfmnaHliJvlu7rku6XlkI7ml6Dms5XkuLvliqjosIPnlKhhcGnplIDmr4EsIOaJgOS7peS4uuS6humBv+WFjemHjeWkjeWIm+W7uiwg5pWF5aKe5Yqg5q2k5pa55rOVLCDlnKhzdG9w56qX5Y+j5LmL5YmN6ZqQ6JeP5bel5YW35p2hXHJcbiAgICAgKiDlvZPlho3mrKHlnKjmraTnqpflj6PkuIrmkq3mlL7ml7YsIOWGjeaYvuekuuatpOW3peWFt+adoVxyXG4gICAgICovXHJcbiAgICBfdG9nZ2xlKGJTaG93OiBib29sZWFuKXtcclxuICAgICAgICBsZXQgc3RyID0ge1xyXG4gICAgICAgICAgICBrZXk6IHRoaXMudG9vbEJhckNvbnRhaWVuci5rZXksXHJcbiAgICAgICAgICAgIHNob3c6IGJTaG93LFxyXG4gICAgICAgICAgICBlbmFibGU6IGJTaG93LFxyXG4gICAgICAgICAgICBzdGF0dXM6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgdGhpcy5vY3guU2hvd0FuZEVuYWJsZShKU09OLnN0cmluZ2lmeShzdHIpLCB0aGlzLmluZGV4KTtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb25zb2xlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvY3guc2hvd1Rvb2xCYXIgZXJyb3I6IFwiLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xlYXIoKXtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lVG9vbEJhciA9IG51bGwgYXMgYW55O1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lVG9vbEl0ZW0gPSBudWxsIGFzIGFueTtcclxuICAgICAgICB0aGlzLnRvb2xCYXJDb250YWllbnIgPSBudWxsIGFzIGFueTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gbnVsbCBhcyBhbnk7XHJcbiAgICAgICAgdGhpcy5vY3ggPSBudWxsIGFzIGFueTtcclxuICAgIH1cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLW9jeOWunuS9ky0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqXHJcbiAqIG9jeOaOp+S7tuWunuS+i1xyXG4gKi9cclxuY2xhc3MgVmlkZW9PY3ggaW1wbGVtZW50cyBJVmlkZW9PY3gge1xyXG5cclxuICAgIHByaXZhdGUgb2N4SWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgY29udGFpbmVyRG9tOiBEb2N1bWVudDtcclxuICAgIHByaXZhdGUgb2N4OiBPY3hDb250cm9sO1xyXG4gICAgcHJpdmF0ZSB2aWRlb1NpemU6IElWaWRlb1NpemU7XHJcbiAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnk7XHJcbiAgICBwcml2YXRlIF9jYWNoZVdpbmRvd0RpZ2l0YWxTdGF0dXMgPSB7fSBhcyB7W2tleTpzdHJpbmddOmJvb2xlYW59O1xyXG4gICAgLy8gcHJpdmF0ZSBfY3VycmVudFBsYXlWaWRlb1Rvb2xNb2RlbDpQbGF5VmlkZW9Ub29sTW9kZWw7XHJcbiAgICBwcml2YXRlIF9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbCA9IHt9IGFzIHtba2V5OiBzdHJpbmddOiBQbGF5VmlkZW9Ub29sTW9kZWx9O1xyXG5cclxuICAgIHByaXZhdGUgZGJDbGlja0NhbGxCYWNrOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeW3peWFt+adoWtleeiuoeaVsCwg5q+P55Sf5oiQ5LiA5Liq5bel5YW35p2h5YqgMVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50S2V5ID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXJEb206IERvY3VtZW50LCBpMThuRmFjdG9yeTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vY3hJZCA9IFBvcnRyYWl0VG9vbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20gPSBjb250YWluZXJEb207XHJcbiAgICAgICAgdGhpcy5pMThuRmFjdG9yeSA9IGkxOG5GYWN0b3J5O1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0NhdGNoUGljdHJ1ZShpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5vY3guQ2F0Y2hQaWN0cnVlKGluZGV4LCAzKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYOaIquWbvuWksei0pSR7ZX1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgQ2F0Y2hQaWN0cnVlKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaW5kZXggPD0gdGhpcy5fZ2V0V2luZG93Q291bnQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ2F0Y2hQaWN0cnVlKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VmlkZW9BdHRyaWJ1dGUoaW5kZXg6IG51bWJlcikgOlZpZGVvT2N4QXR0cntcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLm9jeC5HZXRWaWRlb0F0dHJpYnV0ZShpbmRleCkpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+W5aSx6LSlYClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZE9jeEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBmdW5jOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaChldmVudE5hbWUpe1xyXG4gICAgICAgICAgICBjYXNlIFwiV25kRENsaWtcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGJDbGlja0NhbGxCYWNrID0gZnVuYztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdldFdpbmRvd0J1c3lCeUluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMub2N4LkdldFdpbmRvd0J1c3lCeUluZGV4KGluZGV4KTtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb25zb2xlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvY3guR2V0V2luZG93QnVzeUJ5SW5kZXggZXJyb3I6XCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBjYXRjaFBpY3R1cmUoKTogSUNhdGNoUGljdHVyZVJlc3VsdCB7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm9jeC5HZXRGb2N1c1dpbmRvd0luZGV4KCl8fDA7XHJcbiAgICAgICAgICAgIGxldCBwaWNUeXBlID0gMztcclxuICAgICAgICAgICAgLy8g6L+Z6YeMb2N45o6n5Lu25pys6Lqr55qE5oiq5Zu+5ZCN5a2X5YaZ6ZSZ5LqGXHJcbiAgICAgICAgICAgIHJldHVybiB7YmFzZTY0SW1hZ2U6IHRoaXMub2N4LkNhdGNoUGljdHJ1ZShpbmRleCwgcGljVHlwZSksIHZpZGVvU2l6ZTogdGhpcy52aWRlb1NpemUgfHwge319IGFzIElDYXRjaFBpY3R1cmVSZXN1bHQ7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LkNhdGNoUGljdHJ1ZVwiLGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDoi6XmipvlvILluLjliJnov5vlhaXov5novrlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldEZvY3VzV2luZG93SW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Rm9jdXNXaW5kb3dJbmRleCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7luIPlsYBcclxuICAgICAqIEBwYXJhbSDovpPlhaUs5biD5bGA57yW5Y+3IDE6MXgxIDQ6MngyIDk6M3gzIDE2OjR4NCA0MTo0eDFcclxuICAgICAqL1xyXG4gICAgc2V0TGF5b3V0KGxheW91dFR5cGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgdGhpcy5vY3ggJiYgdGhpcy5vY3guU2V0TGF5b3V0KGxheW91dFR5cGUpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5zZXRMYXlvdXRcIixlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5pMThuRmFjdG9yeSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wQWxsKCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYW5VcCgpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyQWxsT3RoZXJSZXNvdXJjZSgpO1xyXG4gICAgICAgIC8vIOa2iOmZpG9jeOeahGRvbeWFg+e0oFxyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0aGlzLmNvbnRhaW5lckRvbSkuZW1wdHkoKTtcclxuICAgICAgICB0aGlzLm9jeElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckRvbSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub2N4O1xyXG4gICAgICAgIHRoaXMub2N4ID0gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfY2xlYW5VcCgpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9jeC5DbGVhblVwKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LmNsZWFuVXAgZXJyb3I6XCIsIGUsIGUgJiYgZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0Rm9jdXNXaW5kb3dJbmRleCgpe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5vY3g/dGhpcy5vY3guR2V0Rm9jdXNXaW5kb3dJbmRleCgpOjA7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LmdldEZvY3VzV2luZG93SW5kZXhcIixlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0T2N4SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2N4SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlSZWFsVGltZShvcHRpb25zOiBSZWFsVGltZU9wdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghb3B0aW9ucykgcmV0dXJuO1xyXG4gICAgICAgIC8vIOaUvuS5i+WJjeWFiOWFs+mXrVxyXG4gICAgICAgIHRoaXMuc3RvcChpbmRleCB8fCAwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGxheShKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaW5kZXggfHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL5ydHNw5Y2V6Lev6KeG6aKRXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5UnRzcChvcHRpb25zOiBSdHNwT3B0LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgLy8g5pS+5LmL5YmN5YWI5YWz6ZetXHJcbiAgICAgICAgdGhpcy5zdG9wKGluZGV4IHx8IDApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wbGF5KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpLCBpbmRleCB8fCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvnJ0c3DlpJrot6/nqpfmoLzop4bpopFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlSdHNwTXVsdGlwbGUob3B0aW9uczogUnRzcE11bHRpcGxlT3B0KSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgLy8g5by65Yi26L2s5o2i5Li6NOWIhuagvFxyXG4gICAgICAgIHRoaXMuc2V0TGF5b3V0KDQpO1xyXG4gICAgICAgIHRoaXMuc3RvcEFsbCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wbGF5KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuWOhuWPsuinhumikVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGxheVB2Z0JhY2sob3B0aW9uczogUGxheUJhY2tPcHQsIGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgLy8g5pS+5LmL5YmN5YWI5YWz6ZetXHJcbiAgICAgICAgdGhpcy5zdG9wKGluZGV4IHx8IDApO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAgdGhpcy5fcGxheShKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaW5kZXggfHwgMCk7XHJcbiAgICAgICAgdGhpcy5pbml0UGxheVB2Z1Rvb2xCYXIoaW5kZXgsIG9wdGlvbnMuYmVnaW5UaW1lLCBvcHRpb25zLmVuZFRpbWUpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJblvZXlg4/lm57mlL7lt6XlhbfmnaFcclxuICAgICAqIOWPquacieWcqOaSreaUvuW9leWDj+aXtuWAmeWQr+eUqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRQbGF5UHZnVG9vbEJhcihpbmRleDogbnVtYmVyLCBzdGFydFRpbWU6IHN0cmluZywgZW5kVGltZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgY29udGFpbmVyLCB0b29sSXRlbTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IGluZGV4IHx8IDA7XHJcblxyXG4gICAgICAgIC8vIOi/mOWOn+W9k+WJjeeql+WPo+eahOaVsOWtl+aUvuWkp+eKtuaAgVxyXG4gICAgICAgIGlmKHRoaXMuX2NhY2hlV2luZG93RGlnaXRhbFN0YXR1c1tjdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlV2luZG93RGlnaXRhbFN0YXR1c1tjdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5aaC5p6c5b2T5YmN5pyJ57yT5a2Y55qEaW5kZXgsIOWImeS4jeWcqOWIm+W7uuW3peWFt+adoVxyXG4gICAgICAgIGlmKHRoaXMuX2NhY2hlUGxheVZpZGVvVG9vbE1vZGVsW2N1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbFtjdXJyZW50SW5kZXhdLnNob3coKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxbY3VycmVudEluZGV4XS5zdGFydCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250YWluZXIgPSBuZXcgVG9vbEJhckNvbnRhaW5lcigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5rZXkgPSB0aGlzLmN1cnJlbnRLZXkrKztcclxuXHJcbiAgICAgICAgdG9vbEl0ZW0gPSBuZXcgVG9vbEJhckl0ZW0oKTtcclxuICAgICAgICB0b29sSXRlbS50ZXh0ID0gdGhpcy5pMThuRmFjdG9yeShUb29sQmFyVGV4dEVudW0uUExBWSk7XHJcbiAgICAgICAgdG9vbEl0ZW0udG9vbHRpcCA9IHRoaXMuaTE4bkZhY3RvcnkoVG9vbEJhclRleHRFbnVtLlBMQVkpO1xyXG4gICAgICAgIHRvb2xJdGVtLmZ1bmN0aW9uID0gVG9vbEJhckZ1bmNOYW1lRW51bS5QTEFZO1xyXG4gICAgICAgIHRvb2xJdGVtLmtleSA9IHRoaXMuY3VycmVudEtleSsrO1xyXG4gICAgICAgIHRvb2xJdGVtLnggPSBcIjQwcHhcIjtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLml0ZW1zLnB1c2godG9vbEl0ZW0pO1xyXG5cclxuICAgICAgICB0b29sSXRlbSA9IG5ldyBUb29sQmFySXRlbSgpO1xyXG4gICAgICAgIHRvb2xJdGVtLnRleHQgPSB0aGlzLmkxOG5GYWN0b3J5KFRvb2xCYXJUZXh0RW51bS5QQVVTRSk7XHJcbiAgICAgICAgdG9vbEl0ZW0udG9vbHRpcCA9IHRoaXMuaTE4bkZhY3RvcnkoVG9vbEJhclRleHRFbnVtLlBBVVNFKTtcclxuICAgICAgICB0b29sSXRlbS5mdW5jdGlvbiA9IFRvb2xCYXJGdW5jTmFtZUVudW0uUEFVU0U7XHJcbiAgICAgICAgdG9vbEl0ZW0ua2V5ID0gdGhpcy5jdXJyZW50S2V5Kys7XHJcbiAgICAgICAgdG9vbEl0ZW0ueCA9IFwiODBweFwiO1xyXG4gICAgICAgIGNvbnRhaW5lci5pdGVtcy5wdXNoKHRvb2xJdGVtKTtcclxuXHJcbiAgICAgICAgdG9vbEl0ZW0gPSBuZXcgVG9vbEJhckl0ZW0oKTtcclxuICAgICAgICB0b29sSXRlbS50ZXh0ID0gdGhpcy5pMThuRmFjdG9yeShUb29sQmFyVGV4dEVudW0uRElHSVRBTCk7XHJcbiAgICAgICAgdG9vbEl0ZW0udG9vbHRpcCA9IHRoaXMuaTE4bkZhY3RvcnkoVG9vbEJhclRleHRFbnVtLkRJR0lUQUwpO1xyXG4gICAgICAgIHRvb2xJdGVtLmZ1bmN0aW9uID0gVG9vbEJhckZ1bmNOYW1lRW51bS5ESUdJVEFMO1xyXG4gICAgICAgIHRvb2xJdGVtLmtleSA9IHRoaXMuY3VycmVudEtleSsrO1xyXG4gICAgICAgIHRvb2xJdGVtLnggPSBcIjEyMHB4XCI7XHJcbiAgICAgICAgdG9vbEl0ZW0ud2lkdGggPSBcIjYwcHhcIjtcclxuICAgICAgICBjb250YWluZXIuaXRlbXMucHVzaCh0b29sSXRlbSk7XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50VGltZVRvb2xJdGVtID0gbmV3IFRvb2xCYXJJdGVtKCk7XHJcbiAgICAgICAgY3VycmVudFRpbWVUb29sSXRlbS50eXBlID0gXCJzdGF0aWNcIjtcclxuICAgICAgICBjdXJyZW50VGltZVRvb2xJdGVtLmtleSA9IHRoaXMuY3VycmVudEtleSsrO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lVG9vbEl0ZW0uc3R5bGU9XCJyaWdodC1ib3R0b21cIjtcclxuICAgICAgICBjdXJyZW50VGltZVRvb2xJdGVtLnRleHQ9XCIwMDowMDowMFwiO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lVG9vbEl0ZW0ueCA9IFwiNjBcIjtcclxuICAgICAgICBjdXJyZW50VGltZVRvb2xJdGVtLnkgPSBcIi01XCI7XHJcbiAgICAgICAgY3VycmVudFRpbWVUb29sSXRlbS53aWR0aCA9IFwiNjBweFwiO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lVG9vbEl0ZW0udGV4dENvbG9yID0gXCIweGZmZmZmZlwiO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lVG9vbEl0ZW0uZm9udFNpemUgPSAxNDtcclxuICAgICAgICBjb250YWluZXIuaXRlbXMucHVzaChjdXJyZW50VGltZVRvb2xJdGVtKTtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsVGltZVRvb2xJdGVtID0gbmV3IFRvb2xCYXJJdGVtKCk7XHJcbiAgICAgICAgdG90YWxUaW1lVG9vbEl0ZW0udHlwZSA9IFwic3RhdGljXCI7XHJcbiAgICAgICAgdG90YWxUaW1lVG9vbEl0ZW0ua2V5ID0gdGhpcy5jdXJyZW50S2V5Kys7XHJcbiAgICAgICAgdG90YWxUaW1lVG9vbEl0ZW0uc3R5bGU9XCJyaWdodC1ib3R0b21cIjtcclxuICAgICAgICB0b3RhbFRpbWVUb29sSXRlbS50ZXh0PVwiMDA6MDA6MDBcIjtcclxuICAgICAgICB0b3RhbFRpbWVUb29sSXRlbS54ID0gXCIwXCI7XHJcbiAgICAgICAgdG90YWxUaW1lVG9vbEl0ZW0ueSA9IFwiLTVcIjtcclxuICAgICAgICB0b3RhbFRpbWVUb29sSXRlbS53aWR0aCA9IFwiNjBweFwiO1xyXG4gICAgICAgIHRvdGFsVGltZVRvb2xJdGVtLnRleHRDb2xvciA9IFwiMHhmZmZmZmZcIjtcclxuICAgICAgICB0b3RhbFRpbWVUb29sSXRlbS5mb250U2l6ZSA9IDE0O1xyXG4gICAgICAgIGNvbnRhaW5lci5pdGVtcy5wdXNoKHRvdGFsVGltZVRvb2xJdGVtKTtcclxuXHJcbiAgICAgICAgLy8g5Yib5bu65bel5YW35p2hXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JlYXRlVG9vbEJhcihKU09OLnN0cmluZ2lmeShjb250YWluZXIpLCBjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIC8vIOe7keWumuW3peWFt+adoeS4reeahOS6i+S7tlxyXG4gICAgICAgIHRoaXMuc2V0VG9vbGJhckNhbGxCYWNrKFRvb2xCYXJGdW5jTmFtZUVudW0uUExBWSwgdGhpcy50b29sYmFyUGF1c2VGYWxzZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNldFRvb2xiYXJDYWxsQmFjayhUb29sQmFyRnVuY05hbWVFbnVtLlBBVVNFLCB0aGlzLnRvb2xiYXJQYXVzZVRydWUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zZXRUb29sYmFyQ2FsbEJhY2soVG9vbEJhckZ1bmNOYW1lRW51bS5ESUdJVEFMLCB0aGlzLnRvb2xiYXJEaWdpdGFsWm9vbS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnRQbGF5VmlkZW9Ub29sTW9kZWwgPSB0aGlzLl9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbFtjdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIC8vIGlmKGN1cnJlbnRQbGF5VmlkZW9Ub29sTW9kZWwgIT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgIGN1cnJlbnRQbGF5VmlkZW9Ub29sTW9kZWwuY2xlYXIoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQbGF5VmlkZW9Ub29sTW9kZWwgPSBuZXcgUGxheVZpZGVvVG9vbE1vZGVsKHRoaXMub2N4LGN1cnJlbnRJbmRleCwgY29udGFpbmVyLCBjdXJyZW50VGltZVRvb2xJdGVtLCB0b3RhbFRpbWVUb29sSXRlbSwgdGhpcy5jb252ZXJ0VGltZTJEYXRlKHN0YXJ0VGltZSkuZ2V0VGltZSgpLCB0aGlzLmNvbnZlcnRUaW1lMkRhdGUoZW5kVGltZSkuZ2V0VGltZSgpKTtcclxuICAgICAgICB0aGlzLl9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbFtjdXJyZW50SW5kZXhdID0gY3VycmVudFBsYXlWaWRlb1Rvb2xNb2RlbDtcclxuICAgICAgICAvLyDlnKjlt6XlhbfmnaHkuK3lsZXnpLrlvZPliY3mkq3mlL7ml7bpl7TliLvluqZcclxuICAgICAgICBjdXJyZW50UGxheVZpZGVvVG9vbE1vZGVsLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VGltZTJEYXRlKHN0cjogc3RyaW5nKXtcclxuICAgICAgICAvLyDlsIZ5eXl5TU1kZGhobW1zc1NTU+eahOagvOW8j+i9rOaNouaIkERhdGXnsbvlnotcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoXHJcbiAgICAgICAgICAgIHBhcnNlSW50KHN0ci5zdWJzdHJpbmcoMCw0KSwxMCksXHJcbiAgICAgICAgICAgIHBhcnNlSW50KHN0ci5zdWJzdHJpbmcoNCw2KSwxMCkgLSAxLCAvLyBtb250aOWHj+S4gFxyXG4gICAgICAgICAgICBwYXJzZUludChzdHIuc3Vic3RyaW5nKDYsOCksMTApLFxyXG4gICAgICAgICAgICBwYXJzZUludChzdHIuc3Vic3RyaW5nKDgsMTApLDEwKSxcclxuICAgICAgICAgICAgcGFyc2VJbnQoc3RyLnN1YnN0cmluZygxMCwxMiksMTApLFxyXG4gICAgICAgICAgICBwYXJzZUludChzdHIuc3Vic3RyaW5nKDEyLDE0KSwxMCksXHJcbiAgICAgICAgICAgIHBhcnNlSW50KHN0ci5zdWJzdHJpbmcoMTQsMTcpLDEwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzc1JhbmdlKGtleTogbnVtYmVyLCB0b3RhbFRpbWU6IG51bWJlciwgaW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vY3guU2V0UHJvZ3Jlc3NSYW5nZShrZXksIHRvdGFsVGltZSwgaW5kZXgpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYod2luZG93LmNvbnNvbGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5TZXRQcm9ncmVzc1JhbmdlIGVycm9yOiBcIiwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzc1BvcyhrZXk6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlciwgaW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vY3guU2V0UHJvZ3Jlc3NQb3Moa2V5LCBjdXJyZW50VGltZSwgaW5kZXgpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYod2luZG93LmNvbnNvbGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5zZXRQcm9ncmVzc1BvcyBlcnJvcjogXCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9vbGJhclBhdXNlRmFsc2Uoc3RyaW5mbzogc3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBwYXJhbSA9IEpTT04ucGFyc2Uoc3RyaW5mbyk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyYW0uaW5kZXg7XHJcbiAgICAgICAgdGhpcy5fcGF1c2UoaW5kZXgsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvb2xiYXJQYXVzZVRydWUoc3RyaW5mbzogc3RyaW5nKXtcclxuICAgICAgICB2YXIgcGFyYW0gPSBKU09OLnBhcnNlKHN0cmluZm8pO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhcmFtLmluZGV4O1xyXG4gICAgICAgIHRoaXMuX3BhdXNlKGluZGV4LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnC/mgaLlpI3lvZXlg4/lm57mlL5cclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQHBhcmFtIGlzUGF1c2VcclxuICAgICAqIEByZXR1cm4ge2FueX1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhdXNlKGluZGV4OiBudW1iZXIsIGlzUGF1c2U6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzUGF1c2Upe1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vY3guU3RvcEV4KHRydWUsIGluZGV4LCAoKT0+e30sIDApO1xyXG4gICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuY29uc29sZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5wYXVzZSBwYXVzZSBlcnJvclwiLCBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vY3guUGxheUV4MihcIlwiLCBpbmRleCwgKCk9Pnt9LCAwLCAoKT0+e30sIDAsIHRoaXMuX1JlY29yZEVuZENhbGxCYWNrLmJpbmQodGhpcyksIDApO1xyXG4gICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LnBhdXNlIHN0YXJ0IGVycm9yOiBcIixlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvb2xiYXJEaWdpdGFsWm9vbShzdHJJbmZvOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciBwYXJhbSA9IEpTT04ucGFyc2Uoc3RySW5mbyk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyYW0uaW5kZXg7XHJcbiAgICAgICAgaWYodGhpcy5fY2FjaGVXaW5kb3dEaWdpdGFsU3RhdHVzW2luZGV4XSl7XHJcbiAgICAgICAgICAgIC8vIOiLpeW9k+WJjeaYr+aUvuWkp+eKtuaAgSwg5YiZ5Y+Y5Li657yp5bCP54q25oCBXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWNoZVdpbmRvd0RpZ2l0YWxTdGF0dXNbaW5kZXhdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDoi6XlvZPliY3mmK/nvKnlsI/nirbmgIEsIOWImeiuvue9ruS4uuaUvuWkp+eKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZVdpbmRvd0RpZ2l0YWxTdGF0dXNbaW5kZXhdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGlnaXRhbFpvb20oaW5kZXgsICEhdGhpcy5fY2FjaGVXaW5kb3dEaWdpdGFsU3RhdHVzW2luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/nlKgv56aB55So5pWw5a2X5pS+5aSnXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB0cnVlL2ZhbHNlIOaIkOWKny/lpLHotKVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGlnaXRhbFpvb20oaW5kZXg6IG51bWJlciwgaXNFbmFibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZihpc0VuYWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMub2N4LlNldFduZE9zZFByb3BlcnR5KDB4ZmYwMGZmLCA4LCAweGZmZmZmZmZmLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMub2N4LlN0YXJ0Wm9vbUJ5SW5kZXgoMCwgaW5kZXgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm9jeC5TdG9wWm9vbUJ5SW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExhc3RFcnJvcigpOnN0cmluZ3tcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9jeC5HZXRMYXN0RXJyb3IoKTtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvY3guZ2V0TGFzdEVycm9yIGVycjogXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63mjIflrprnqpflj6NcclxuICAgICAqIEBwYXJhbSBpbmRleCDku44w5byA5aeLXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wKGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGluZGV4IDw9IHRoaXMuX2dldFdpbmRvd0NvdW50KCkpe1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE90aGVyUmVzb3VyY2UoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaMh+Wumueql+WPoyBsb2NhbFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zdG9wKGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgdGhpcy5vY3guU3RvcEV4KGZhbHNlLCBpbmRleCwgdGhpcy5fc3RvcENhbGxCYWNrLCAwKTtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb25zb2xlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvY3guc3RvcEV4IGVycm9yOiBcIiwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wQWxsKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3BBbGwoKTtcclxuICAgICAgICB0aGlzLl9zdG9wQWxsT3RoZXJSZXNvdXJjZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfc3RvcEFsbCgpe1xyXG4gICAgICAgIGxldCB0b3RhbEluZGV4LCBpLCBsZW47XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdG90YWxJbmRleCA9IHRoaXMuX2dldFdpbmRvd0NvdW50KCk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b3RhbEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2N4LlN0b3BFeChmYWxzZSwgaSwgdGhpcy5fc3RvcENhbGxCYWNrLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZGVvT2N4LnN0b3AgRXJyb3JcIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5LiA5Lqb5YW25LuW6LWE5rqQLCDmr5TlpoLpmpDol4/liqjkvZzmnaEsIOmUgOavgeWKqOS9nOadoeebuOWFs+eahGludGVydmFsXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zdG9wT3RoZXJSZXNvdXJjZShpbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGxheVZpZGVvVG9vbE1vZGVsID0gdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxbaW5kZXhdO1xyXG4gICAgICAgIGlmKHBsYXlWaWRlb1Rvb2xNb2RlbCl7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWPqumakOiXj+W3peWFt+adoSwg5LiN5riF6Zmk57yT5a2YXHJcbiAgICAgICAgICAgIHBsYXlWaWRlb1Rvb2xNb2RlbC5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3N0b3BBbGxPdGhlclJlc291cmNlKCl7XHJcbiAgICAgICAgbGV0IGs7XHJcbiAgICAgICAgLy8g5riF56m65omA5pyJ55qE5pe25YCZ5omN6ZqQ6JeP5bel5YW35p2hXHJcbiAgICAgICAgZm9yKGsgaW4gdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWwpe1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbFtrXS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NsZWFyQWxsT3RoZXJSZXNvdXJjZSgpe1xyXG4gICAgICAgIGxldCBrO1xyXG4gICAgICAgIC8vIOa4heepuuaJgOacieeahOaXtuWAmeaJjemakOiXj+W3peWFt+adoVxyXG4gICAgICAgIGZvcihrIGluIHRoaXMuX2NhY2hlUGxheVZpZGVvVG9vbE1vZGVsKXtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxba10uY2xlYXIoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlUGxheVZpZGVvVG9vbE1vZGVsW2tdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdG9wQ2FsbEJhY2sgPSAoKT0+IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aKe5Yqg5Yqo5L2c5p2hXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVG9vbEJhcihzdHJJbmZvOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vY3guQ3JlYXRlVG9vbEJhcihzdHJJbmZvLCBpbmRleCk7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY3JlYXRlVG9vbEJhciBFcnJvcjogXCIsIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFRvb2xiYXJDYWxsQmFjayhmdW5jTmFtZTogc3RyaW5nLCBmdW5jOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9jeC5TZXRDYWxsQmFjayhmdW5jTmFtZSwgZnVuYyk7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwib2N4LnNldFRvb2xiYXJDYWxsQmFjayBlcnJvclwiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhoXpg6jnmoRvY3jmjqfku7bliJ3lp4vljJbmlrnms5VcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICAgICAgbGV0IF9vY3g6IGFueSwgX3BhcmFtOiBhbnk7XHJcbiAgICAgICAgX29jeCA9IGFuZ3VsYXIuZWxlbWVudChcIjxvYmplY3Q+PC9vYmplY3Q+XCIpO1xyXG4gICAgICAgIF9vY3guYXR0cihcImlkXCIsIHRoaXMub2N4SWQpO1xyXG4gICAgICAgIGlmIChQb3J0cmFpdFRvb2wuZ2V0SUVWZXIoKSA+IDAgJiYgUG9ydHJhaXRUb29sLmdldElFVmVyKCkgPD0gOCkge1xyXG4gICAgICAgICAgICBfb2N4LmF0dHIoXCJjbGFzc2lkXCIsIFwiQ0xTSUQ6Q0VBNEFERTEtQUM5NC00QTc1LUFFMzAtODVCOTkzNjRGQ0QyXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9vY3guaHRtbChcIjxwYXJhbSAgc3R5bGU9J3dpZHRoOiAxMDBweDtoZWlnaHQ6IDEwMHB4O2JhY2tncm91bmQ6ICMwMDA7cG9zaXRpb246IGFic29sdXRlO2xlZnQ6IDA7dG9wOiAwOycgbmFtZT0ndW5sb2FkJyB2YWx1ZT0ncGx1Z2luTG9hZGVkJz48L3BhcmFtPlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9vY3guYXR0cihcInR5cGVcIiwgXCJhcHBsaWNhdGluL3gtZmlyZWJyZWF0aC1zblwiKTtcclxuICAgICAgICBfb2N4LmNzcyhcIndpZHRoXCIsIFwiMTAwJVwiKTtcclxuICAgICAgICBfb2N4LmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIik7XHJcblxyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0aGlzLmNvbnRhaW5lckRvbSkuYXBwZW5kKF9vY3gpO1xyXG5cclxuICAgICAgICAvLyDlj5blvpdvY3jnmoTmjqfku7blrp7kvossIOatpOWunuS+i+eUqOS6juWFtuS7luaWueazleiwg+eUqG9jeOaOp+S7tuaWueazlVxyXG4gICAgICAgIHRoaXMub2N4ID0gX29jeFswXTtcclxuICAgICAgICB0aGlzLl9iaW5kRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wbGF5KHBhdGg6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJfcGxheVwiLCBwYXRoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gNTAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMub2N4LlBsYXlFeDIoXHJcbiAgICAgICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5Q2FsbEJhY2suYmluZCh0aGlzKSwvL+aSreaUvuaIkOWKn+Wbnuiwg1xyXG4gICAgICAgICAgICAgICAgMCwgLy/mkq3mlL7miJDlip/lj4LmlbBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlGaXJzdEZyYW1lQ2FsbEJhY2suYmluZCh0aGlzKSwvL+esrOS4gOW4p+aSreaUvuaIkOWKn+Wbnuiwg1xyXG4gICAgICAgICAgICAgICAgMCwvL+esrOS4gOW4p+aSreaUvuaIkOWKn+Wbnuiwg+WPguaVsCxcclxuICAgICAgICAgICAgICAgIHRoaXMuX1JlY29yZEVuZENhbGxCYWNrLmJpbmQodGhpcyksLy/mkq3mlL7lvZXlg4/ml7bvvIzlvZXlg4/liLDovr7nu5PmnZ/ml7bpl7TkvJrop6blj5HmraTlm57osINcclxuICAgICAgICAgICAgICAgIDAvL+eUqOaIt+WPguaVsFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5fcGxheSBlcnJvcjogXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BsYXlDYWxsQmFjayA9IChpbmRleDogbnVtYmVyLCByZXN1bHQ6IG51bWJlciwgdXNlclBhcmFtOiBhbnkpPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJwbGF5Q2FsbEJhY2tcIiwgaW5kZXgsIHJlc3VsdCwgdXNlclBhcmFtKTtcclxuICAgICAgICAvLyDoi6VyZXN1bHTkuI3kuLowLCDliJnooajnpLrmkq3mlL7lpLHotKUsIOaVhemcgOimgeWwhuW9k+WJjeW9leWDj+WbnuaUvuinhumikei/m+W6puadoei9ruW3oee7meWBnOatolxyXG4gICAgICAgIGlmKHJlc3VsdCAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE90aGVyUmVzb3VyY2UoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzcGxheUZpcnN0RnJhbWVDYWxsQmFjayA9IChpbmRleDogbnVtYmVyLCByZXN1bHQ6IG51bWJlciwgdXNlclBhcmFtOiBhbnkpPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJfZGlzcGxheUZpcnN0RnJhbWVDYWxsQmFja1wiLCBpbmRleCwgcmVzdWx0LCB1c2VyUGFyYW0pO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgLy/ku6PnoIHojrflj5bop4bpopHlj4LmlbBcclxuICAgICAgICAgICAgLy8g57yT5a2Y5b2T5YmN5pKt5pS+6KeG6aKR55qEdmlkZW9TaXplLCDnlLHkuo7lj6rmnInkuIDkuKp2aWRlb1NpemUsIOaJgOS7peiLpeWcqOWkmuWIhuagvOS4i+mcgOimgei/m+ihjOaIquWbvueahOaTjeS9nOOAguWwsemcgOimgeS/ruaUueatpOWkhOeahOS7o+eggVxyXG4gICAgICAgICAgICB0aGlzLnZpZGVvU2l6ZSA9IHRoaXMuX2dldFZpZGVvQXR0cmlidXRlKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX1JlY29yZEVuZENhbGxCYWNrID0gKGluZGV4OiBudW1iZXIsIHJlc3VsdDogbnVtYmVyLCB1c2VyUGFyYW06IGFueSk9PiB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIl9SZWNvcmRFbmRDYWxsQmFja1wiLCBpbmRleCwgcmVzdWx0LCB1c2VyUGFyYW0pO1xyXG4gICAgICAgIC8vIOiLpeaYr+W9leWDj+WbnuaUvuaooeW8jywg5YiZ5riF56m65omA5pyJ5b2V5YOP5Zue5pS+55qE6LWE5rqQXHJcbiAgICAgICAgdGhpcy5fc3RvcE90aGVyUmVzb3VyY2UoaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlm9jeOaMh+Wumueql+agvOeahOWPguaVsCjpq5jlrr3nrYkpXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldFZpZGVvQXR0cmlidXRlID0gZnVuY3Rpb24oaW5kZXg6IG51bWJlcik6IElWaWRlb1NpemV7XHJcbiAgICAgICAgaWYoIXRoaXMub2N4KSByZXR1cm4gbnVsbDtcclxuICAgICAgICBsZXQgcmVzdWx0OiBJVmlkZW9TaXplO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZSh0aGlzLm9jeC5HZXRWaWRlb0F0dHJpYnV0ZShpbmRleCkpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYod2luZG93LmNvbnNvbGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm9jeC5HZXRWaWRlb0F0dHJpYnV0ZSBlcnJvcjogXCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2dldFdpbmRvd0NvdW50KCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5vY3ggPyB0aGlzLm9jeC5HZXRXaW5kb3dDb3VudCgpIDogMDtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvY3guR2V0V2luZG93Q291bnQgRXJyb3JcIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmluZEV2ZW50KCkge1xyXG4gICAgICAgIC8vIOe7keWumuS4gOS6m29jeOaOp+S7tueahOeCueWHu+etieS6i+S7tlxyXG4gICAgICAgIHZhciBvY3ggPSB0aGlzLm9jeDtcclxuICAgICAgICB0aGlzLl9hZGRFdmVudChvY3gsICdXbmRDbGljaycsICgpPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2FkZEV2ZW50KG9jeCwgJ1duZERDbGlrJywgKGluZGV4OiBudW1iZXIsIHhQb2ludDogYW55LCB5UG9pbnQ6IGFueSk9PiB7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5kYkNsaWNrQ2FsbEJhY2sgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRiQ2xpY2tDYWxsQmFjayhpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRkRXZlbnQob2N4LCAnTW91c2VMZWF2ZUNvbnRyb2wnLCAodWxGbGFnOiBib29sZWFuLCB4OiBudW1iZXIsIHk6IG51bWJlciwgYnJSZXNlcnZlZDogYm9vbGVhbik9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYWRkRXZlbnQob2N4LCAnU3dpdGNoV2luZG93JywgKHNyY0luZGV4OiBudW1iZXIsIGRlc0luZGV4OiBudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTGF5b3V0UGxheVZpZGVvUmVzb3VyY2Uoc3JjSW5kZXgsIGRlc0luZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZUxheW91dFBsYXlWaWRlb1Jlc291cmNlKHNyY0luZGV4OiBudW1iZXIsIGRlc0luZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIC8vIOWwhnNyY0luZGV45ZKMZGVzSW5kZXhcclxuICAgICAgICBsZXQgc3JjUGxheVZpZGVvVG9vbE1vZGVsID0gdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxbc3JjSW5kZXhdO1xyXG4gICAgICAgIGxldCBkZXNQbGF5VmlkZW9Ub29sTW9kZWwgPSB0aGlzLl9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbFtkZXNJbmRleF07XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlUGxheVZpZGVvVG9vbE1vZGVsW3NyY0luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlUGxheVZpZGVvVG9vbE1vZGVsW3NyY0luZGV4XTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxbZGVzSW5kZXhdID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxbZGVzSW5kZXhdO1xyXG5cclxuICAgICAgICAvLyDkupLnm7jkuqTmjaJcclxuICAgICAgICBpZihzcmNQbGF5VmlkZW9Ub29sTW9kZWwpe1xyXG4gICAgICAgICAgICBzcmNQbGF5VmlkZW9Ub29sTW9kZWwuc2V0SW5kZXgoZGVzSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZVBsYXlWaWRlb1Rvb2xNb2RlbFtkZXNJbmRleF0gPSBzcmNQbGF5VmlkZW9Ub29sTW9kZWw7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLkdldFdpbmRvd0J1c3lCeUluZGV4KGRlc0luZGV4KSl7XHJcbiAgICAgICAgICAgICAgICBzcmNQbGF5VmlkZW9Ub29sTW9kZWwgJiYgc3JjUGxheVZpZGVvVG9vbE1vZGVsLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZGVzUGxheVZpZGVvVG9vbE1vZGVsKXtcclxuICAgICAgICAgICAgZGVzUGxheVZpZGVvVG9vbE1vZGVsLnNldEluZGV4KHNyY0luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGVQbGF5VmlkZW9Ub29sTW9kZWxbc3JjSW5kZXhdID0gZGVzUGxheVZpZGVvVG9vbE1vZGVsO1xyXG4gICAgICAgICAgICBpZighdGhpcy5HZXRXaW5kb3dCdXN5QnlJbmRleChzcmNJbmRleCkpe1xyXG4gICAgICAgICAgICAgICAgZGVzUGxheVZpZGVvVG9vbE1vZGVsICYmIGRlc1BsYXlWaWRlb1Rvb2xNb2RlbC5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkRXZlbnQob2JqOiBhbnksIG5hbWU6IHN0cmluZywgZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIG9iai5hdHRhY2hFdmVudCgnb24nICsgbmFtZSwgZnVuYyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuYywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tb2N45a6e5L2T55Sf5oiQ5bel5Y6CLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZGVvT2N4RmFjdG9yeXtcclxuICAgIGdldFZpZGVvT2N4KGNvbnRhaW5lckRvbTogRG9jdW1lbnQpOklWaWRlb09jeDtcclxuXHJcbn1cclxuY2xhc3MgVmlkZW9PY3hGYWN0b3J5IGltcGxlbWVudHMgSVZpZGVvT2N4RmFjdG9yeXtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcImkxOG5GYWN0b3J5XCJdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSl7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0VmlkZW9PY3goY29udGFpbmVyRG9tOiBEb2N1bWVudCk6IElWaWRlb09jeHtcclxuICAgICAgICByZXR1cm4gbmV3IFZpZGVvT2N4KGNvbnRhaW5lckRvbSwgdGhpcy5pMThuRmFjdG9yeSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBfQ2hlY2tPY3hSZXN1bHR7XHJcbiAgICBvY3g6IGFueTtcclxuICAgIGJyb3dzZXI6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIF9Eb3dubG9hZFJlc3VsdHtcclxuICAgIHR5cGU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlkZW9PY3hUb29se1xyXG4gICAgY2hlY2tPY3goKTogdm9pZDtcclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1vY3jmo4DmtYvlt6XlhbctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbi8qKlxyXG4gKiBWaWRlb09jeOajgOa1i+W3peWFt1xyXG4gKiDnlKjkuo7mo4DmtYtvY3jml7blgJnlrZjlnKjlubbnu5nlh7rkuIvovb3mj5DnpLrkv6Hmga9cclxuICovXHJcbmNsYXNzIFZpZGVvT2N4VG9vbCBpbXBsZW1lbnRzIElWaWRlb09jeFRvb2wge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJ2kxOG5GYWN0b3J5JywnbGF5ZXInXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSwgcHJpdmF0ZSBsYXllcjogYW55KXtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlICQgPSBhbmd1bGFyLmVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF92ZXJzaW9uID0gXCJDcm93ZF9PQ1hfVjIuMi41XCI7XHJcbiAgICBwcml2YXRlIF9vY3hEb3dubG9hZFVybCA9IFwiL2ZvcGxheWVyL1NOX0Nyb3dkX1BsdWdpbnNfMi4yLjUuZXhlXCI7XHJcbiAgICBwcml2YXRlIF9maXJlZm94RG93bmxvYWRVcmwgPSBcIi9mb3BsYXllci9GaXJlZm94XzQ0LmV4ZVwiO1xyXG4gICAgcHJpdmF0ZSBfZ29vZ2xlRG93bmxvYWRVcmwgPSAgXCIvZm9wbGF5ZXIvR29vZ2xlQ2hyb21lZnJhbWVTdGFuZGFsb25lRW50ZXJwcmlzZS40MTQ0MjkzOTE0Lm1zaVwiO1xyXG5cclxuICAgIGNoZWNrT2N4KCkge1xyXG4gICAgICAgIC8v5qOA5rWL5rWP6KeI5Zmo5ZCI6YCC56iL5bqmXHJcbiAgICAgICAgLy/mo4DmtYtvY3jmjqfku7bmmK/lkKblronoo4VcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge30gYXMgX0NoZWNrT2N4UmVzdWx0O1xyXG4gICAgICAgIHJlc3VsdC5vY3ggPSB0aGlzLl9jaGVja09jeCgpOy8vdHJ1ZSBmYWxzZSB1cGdyYWRlXHJcbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSB0aGlzLl9jaGVja0Jyb3dzZXIoKTsvL3JldHVybiBnb29kIG5vcm1hbCBiYWRcclxuICAgICAgICB0aGlzLnNob3dEb3dubG9hZChyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWLb2N45o6n5Lu25piv5ZCm5a6J6KOFXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIG9yIGZhbHNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NoZWNrT2N4ICgpIHtcclxuICAgICAgICB2YXIgJG9jeCA9IHRoaXMuX2NyZWF0ZVRlbXBPY3goKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gXCJmYWxzZVwiO1xyXG4gICAgICAgIGlmICghJG9jeCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB2YXIgJGNvbnRhaW5lcjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAkY29udGFpbmVyID0gdGhpcy4kKFwiPGRpdiBzdHlsZT0ncG9zaXRpb246YWJzb2x1dGU7IHRvcDowOyBsZWZ0Oi0xMDAwcHg7Jz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoJG9jeCk7XHJcbiAgICAgICAgICAgIGlmICghKFBvcnRyYWl0VG9vbC5nZXRJRVZlcigpID4gMCAmJiBQb3J0cmFpdFRvb2wuZ2V0SUVWZXIoKSA8PSA4KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1Ub09jeCgkb2N4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmVyc2lvbiA9ICRvY3hbMF0uR2V0VmVyc2lvbigpOy8v6I635Y+W54mI5pys5Y+3LOeUqOS6juajgOa1i+aWsOeJiOacrFxyXG4gICAgICAgICAgICAkb2N4WzBdLkNsZWFuVXAoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uICYmIHZlcnNpb24gIT0gdGhpcy5fdmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgLy/mj5DnpLrmm7TmlrBcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwidXBncmFkZVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgdmlkZW8gY29udHJvbHMgaXM6XCIsIHZlcnNpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjaGVja29jeCBlcnJvcjogXCIsZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZmluYWxseXtcclxuICAgICAgICAgICAgaWYoJGNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRvY3ggPSBudWxsO1xyXG4gICAgICAgICAgICAkY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+a1j+iniOWZqOaYr+WQpuWFvOWuuW9jeOaOp+S7tlxyXG4gICAgICogQHJldHVybiDov5Tlm57nqIvluqbmoIflv5fvvJpnb29kIG5vcm1hbCBiYWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY2hlY2tCcm93c2VyKCkge1xyXG4gICAgICAgIHZhciBwYXJhbSA9IFBvcnRyYWl0VG9vbC5nZXRCcm93c2VyKCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiZ29vZFwiO1xyXG4gICAgICAgIC8vIGlmKHBhcmFtLm5hbWUudG9VcHBlckNhc2UoKSA9PSBcIkVER0VcIil7XHJcbiAgICAgICAgLy8gXHRyZXN1bHQgPSBcImJhZFwiO1xyXG4gICAgICAgIC8vIH1lbHNlIGlmKHBhcmFtLm5hbWUudG9VcHBlckNhc2UoKSA9PSBcIklFXCIgJiYgTnVtYmVyKHBhcmFtLm1ham9yKT4xMCl7XHJcbiAgICAgICAgLy8gXHRyZXN1bHQgPSBcIm5vcm1hbFwiO1xyXG4gICAgICAgIC8vIH1lbHNlIGlmKHBhcmFtLm5hbWUudG9VcHBlckNhc2UoKSA9PSBcIkNIUk9NRVwiICYmIE51bWJlcihwYXJhbS5tYWpvcik+NDApe1xyXG4gICAgICAgIC8vIFx0cmVzdWx0ID0gXCJiYWRcIjtcclxuICAgICAgICAvLyB9ZWxzZSBpZihwYXJhbS5uYW1lLnRvVXBwZXJDYXNlKCkgPT0gXCJJRVwiICYmIChOdW1iZXIocGFyYW0ubWFqb3IpPD04KSl7XHJcbiAgICAgICAgLy8gXHRyZXN1bHQgPSBcImJhZFwiO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAocGFyYW0ubmFtZS50b1VwcGVyQ2FzZSgpID09IFwiSUVcIiAmJiAoTnVtYmVyKHBhcmFtLm1ham9yKSA8PSA4KSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcImJhZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4fliKTmlq1vY3jnmoTmo4DmtYvmg4XlhrXvvIzlvLnlh7rnm7jlupTnmoTkuIvovb3mj5DnpLrmoYZcclxuICAgICAqIEBwYXJhbSBwYXJhbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dEb3dubG9hZChwYXJhbTogX0NoZWNrT2N4UmVzdWx0KSB7XHJcbiAgICAgICAgaWYgKHBhcmFtLmJyb3dzZXIgPT0gXCJiYWRcIikgey8v5LiN5pSv5oyBLOWuieijheS6huajgOa1i+S4jeWIsFxyXG4gICAgICAgICAgICB0aGlzLl9zaG93RG93bmxvYWQoe3R5cGU6IDN9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLm9jeCA9PSBcImZhbHNlXCIpIHsvL+acquWuieijhSzmnKrlronoo4VcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0Rvd25sb2FkKHt0eXBlOiAxfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbS5icm93c2VyID09IFwibm9ybWFsXCIpIHsvL+S4jeWujOWFqOaUr+aMgVxyXG4gICAgICAgICAgICB0aGlzLl9zaG93RG93bmxvYWQoe3R5cGU6IDJ9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLm9jeCA9PSBcInVwZ3JhZGVcIikgey8v5paw54mI5pys5pu05pawXHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEb3dubG9hZCh7dHlwZTogNH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHBhcmFtIDHkuIvovb0gMua1j+iniOWZqOS4jeiDveW+iOWlveeahOaUr+aMgW9jeCAz5rWP6KeI5Zmo5LiN5pSv5oyBb2N4IDRvY3jniYjmnKzmm7TmlrBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2hvd0Rvd25sb2FkKHBhcmFtOiBfRG93bmxvYWRSZXN1bHQpIHtcclxuICAgICAgICB2YXIgbWV0aG9kOiBGdW5jdGlvbiwgaHRtbDogc3RyaW5nLCB1cmxJZDogc3RyaW5nLCB1cmw6IHN0cmluZztcclxuICAgICAgICBzd2l0Y2ggKHBhcmFtLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdXJsSWQgPSAnb2N4RG93bmxvYWRVcmwnO1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IFwiPGRpdiBjbGFzcz0ndS1tc2ctbm90Y2xvc2UtMSc+PGEgaWQ9J1wiICsgdXJsSWQgKyBcIicgaHJlZj0namF2YXNjcmlwdDp2b2lkKDApJyBzdHlsZT0ndGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsnPlwiICsgdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAwXzEzXzAyJykgK1wiPC9hPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5fb2N4RG93bmxvYWRVcmw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdXJsSWQgPSAnZmlyZWZveERvd25sb2FkVXJsJztcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBcIjxkaXYgY2xhc3M9J3UtbXNnLW5vdGNsb3NlLTEnPjxwPlwiICsgdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAwXzEzXzAzJykgK1wiPC9wPjxwPjxhIGlkPSdcIiArIHVybElkICsgXCInIGhyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKScgc3R5bGU9J3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7Jz5cIiArIHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMF8xM18wNicpICtcIjwvYT48L3A+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLl9nb29nbGVEb3dubG9hZFVybDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB1cmxJZCA9ICdmaXJlZm94RG93bmxvYWRVcmwnO1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IFwiPGRpdiBjbGFzcz0ndS1tc2ctbm90Y2xvc2UtMScgc3R5bGU9J21pbi1oZWlnaHQ6MXB4Oyc+PHA+XCIgKyB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDBfMTNfMDQnKSArXCI8L3A+PHA+PGEgaWQ9J1wiICsgdXJsSWQgKyBcIicgaHJlZj0namF2YXNjcmlwdDp2b2lkKDApJyBzdHlsZT0ndGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTsnPlwiICsgdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAwXzEzXzA2JykgK1wiPC9hPjwvcD48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuX2dvb2dsZURvd25sb2FkVXJsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHVybElkID0gJ29jeERvd25sb2FkVXJsJztcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBcIjxkaXYgY2xhc3M9J3UtbXNnLW5vdGNsb3NlLTEnPjxhIGlkPSdcIiArIHVybElkICsgXCInIGhyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKScgc3R5bGU9J3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7Jz5cIiArIHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMF8xM18wNScpICtcIjwvYT48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuX29jeERvd25sb2FkVXJsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB1cmxJZCA9ICdvY3hEb3dubG9hZFVybCc7XHJcbiAgICAgICAgICAgICAgICBodG1sID0gXCI8ZGl2IGNsYXNzPSd1LW1zZy1ub3RjbG9zZS0xJz48YSBpZD0nXCIgKyB1cmxJZCArIFwiJyBocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCknIHN0eWxlPSd0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOyc+XCIgKyB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDBfMTNfMDInKSArXCI8L2E+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLl9vY3hEb3dubG9hZFVybDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2QgPSB0aGlzLl9kb3dubG9hZFJlc291cmNlO1xyXG4gICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcclxuICAgICAgICAgICAgc2hhZGU6IDAsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnMzIwcHgnXSxcclxuICAgICAgICAgICAgb2Zmc2V0OiAncmInLFxyXG4gICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgLy8gdGltZTogLTEsXHJcbiAgICAgICAgICAgIC8vIHNoaWZ0OiAtMSxcclxuICAgICAgICAgICAgY29udGVudDogaHRtbCxcclxuICAgICAgICAgICAgYnRuOiB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDBfMDdfMDEnKSxcclxuICAgICAgICAgICAgLy8gY29udGVudDogXCI8ZGl2IHN0eWxlPSdoZWlnaHQ6IDkwcHg7Jz7kuIDkupvmloflrZfkv6Hmga88L2Rpdj5cIixcclxuICAgICAgICAgICAgc3VjY2VzczogKGRvbTogRG9jdW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PnsgLy8gc3VjY2Vzc+iwg+eUqOaIkOWKn+aXtiwg5LiN6IO96Kem5Y+RZG9t55qE57uR5a6aLCDmiYDku6XliqDkuobkuIDlsYJ0aW1lb3V0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kKGRvbSkuZmluZChcIiNcIiArIHVybElkKS5vbignY2xpY2snLCB7aW5kZXg6IGluZGV4LCB1cmw6IHVybH0sIG1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZG93bmxvYWRSZXNvdXJjZShldmVudDogYW55KSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBldmVudC5kYXRhO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZGF0YS51cmw7XHJcbiAgICAgICAgICAgIGxheWVyLmNsb3NlKGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65Li05pe2b2N45o6n5Lu277yM55So5LqOb2N45qOA5rWLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZVRlbXBPY3goKXtcclxuICAgICAgICB2YXIgJG9jeCA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgJG9jeCA9IHRoaXMuJChcIjxvYmplY3Q+PC9vYmplY3Q+XCIpO1xyXG4gICAgICAgICAgICAkb2N4LmF0dHIoXCJpZFwiLCBcInRlc3RPY3hFeGlzdFwiKTtcclxuICAgICAgICAgICAgJG9jeC5hdHRyKFwidHlwZVwiLCBcImFwcGxpY2F0aW4veC1maXJlYnJlYXRoLXNuXCIpO1xyXG4gICAgICAgICAgICBpZiAoUG9ydHJhaXRUb29sLmdldElFVmVyKCkgPiAwICYmIFBvcnRyYWl0VG9vbC5nZXRJRVZlcigpIDw9IDgpIHtcclxuICAgICAgICAgICAgICAgICRvY3guYXR0cihcImNsYXNzaWRcIiwgXCJDTFNJRDpDRUE0QURFMS1BQzk0LTRBNzUtQUUzMC04NUI5OTM2NEZDRDJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIl9jcmVhdGVUZW1wT2N4XCIsIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICRvY3g7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9zZXRQYXJhbVRvT2N4KCRvY3g6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbSA9IFwiPHBhcmFtIG5hbWU9J3VubG9hZCcgdmFsdWU9J3BsdWdpbkxvYWRlZCc+PC9wYXJhbT5cIjtcclxuICAgICAgICAgICAgJG9jeC5odG1sKHBhcmFtKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIl9zZXRQYXJhbVRvT2N4XCIsIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICRvY3g7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIOWwhlZpZGVvT2N45ZKMVmlkZW9PY3hUb29s5byE5oiQ5bel5Y6CXHJcbmFwcC5zZXJ2aWNlKFwidmlkZW9PY3hGYWN0b3J5XCIsIFZpZGVvT2N4RmFjdG9yeSk7XHJcbmFwcC5zZXJ2aWNlKFwidmlkZW9PY3hUb29sXCIsIFZpZGVvT2N4VG9vbCk7Il19
