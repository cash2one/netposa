define(["require", "exports", "../../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilImgCtrlSizeDirective = (function () {
        function UtilImgCtrlSizeDirective() {
            this.restrict = 'A';
            this.scope = {};
            this.link = function (scope, element, attrs) {
                element.bind('load', function () {
                    attrs.$set("style", "");
                    var p_w = element.parent().width();
                    var p_h = element.parent().height();
                    var w = element.width();
                    var h = element.height();
                    var p_c_w = p_w / w;
                    var p_c_h = p_h / h;
                    if (w > p_w && h > p_h) {
                        if (p_c_w > p_c_h) {
                            element.css("height", "100%");
                        }
                        else {
                            element.css({
                                "width": "100%",
                                "padding-top": (p_h - p_c_w * h) / 2 + "px"
                            });
                        }
                    }
                    else if (w > p_w) {
                        element.css({
                            "width": "100%",
                            "padding-top": (p_h - p_c_w * h) / 2 + "px"
                        });
                    }
                    else if (h > p_h) {
                        element.css("height", "100%");
                    }
                    else {
                        element.css({
                            "padding-top": (p_h - h) / 2 + "px"
                        });
                    }
                    element.parent().css({
                        'text-align': 'center',
                    });
                });
            };
        }
        ;
        UtilImgCtrlSizeDirective.instance = function () {
            return new UtilImgCtrlSizeDirective();
        };
        ;
        UtilImgCtrlSizeDirective.$inject = [];
        return UtilImgCtrlSizeDirective;
    }());
    var UtilImgCenterDirective = (function () {
        function UtilImgCenterDirective() {
            this.restrict = 'A';
            this.link = function (scope, element, attrs) {
                element.css({ "opacity": 0 });
                element.on('load', function () {
                    attrs.$set("style", "");
                    var position = element.parent().css('position');
                    if (position === 'static') {
                        element.parent().css('position', 'relative');
                    }
                    var p_w = element.parent().width();
                    var p_h = element.parent().height();
                    var w = element[0].naturalWidth;
                    var h = element[0].naturalHeight;
                    var p_c_w = p_w / w;
                    var p_c_h = p_h / h;
                    if (p_w < w && p_h < h) {
                        if (p_c_w > p_c_h) {
                            element.css({
                                "height": "100%",
                                'position': 'absolute',
                                'left': '50%',
                                'top': '0',
                                'marginLeft': -(w * p_c_h / 2) + 'px'
                            });
                        }
                        else {
                            element.css({
                                "width": "100%",
                                'position': 'absolute',
                                'left': '0',
                                'top': '50%',
                                'marginTop': -(h * p_c_w / 2) + 'px'
                            });
                        }
                    }
                    else if (p_w < w && p_h > h) {
                        element.css({
                            "width": "100%",
                            'position': 'absolute',
                            'top': '50%',
                            'left': '0',
                            'marginTop': -(h * p_c_w / 2) + 'px'
                        });
                    }
                    else if (p_w > w && p_h < h) {
                        element.css({
                            "height": "100%",
                            'position': 'absolute',
                            'left': '50%',
                            'top': '0',
                            'marginLeft': -(w * p_c_h / 2) + 'px'
                        });
                    }
                    else {
                        if (p_c_w > p_c_h) {
                            element.css({
                                "height": "100%",
                                'position': 'absolute',
                                'left': '50%',
                                'top': '0',
                                'marginLeft': -(w * p_c_h / 2) + 'px'
                            });
                        }
                        else {
                            element.css({
                                "width": "100%",
                                'position': 'absolute',
                                'top': '50%',
                                'left': '0',
                                'marginTop': -(h * p_c_w / 2) + 'px'
                            });
                        }
                    }
                    element.parent().css('backgroundColor', 'rgba(0,0,0,0.8)');
                });
                scope.$on("$destroy", function () {
                    element.off();
                });
            };
        }
        ;
        UtilImgCenterDirective.instance = function () {
            return new UtilImgCenterDirective();
        };
        ;
        UtilImgCenterDirective.$inject = [];
        return UtilImgCenterDirective;
    }());
    main_app_1.app.directive('utilImgCtrlSize', UtilImgCtrlSizeDirective.instance);
    main_app_1.app.directive('utilImgCenter', UtilImgCenterDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91dGlsLWltZy1jdHJsL3V0aWwtaW1nLWN0cmwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBO1FBRUk7WUFLQSxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLFVBQUssR0FBRyxFQUVQLENBQUM7WUFDRixTQUFJLEdBQUcsVUFBVSxLQUFVLEVBQUUsT0FBWSxFQUFFLEtBQVU7Z0JBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNuQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN6QixJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDO29CQUNsQixJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDO29CQUVsQixFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO3dCQUNuQixFQUFFLENBQUEsQ0FBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQzs0QkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQzt3QkFDakMsQ0FBQzt3QkFBQSxJQUFJLENBQUEsQ0FBQzs0QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO2dDQUNSLE9BQU8sRUFBQyxNQUFNO2dDQUNkLGFBQWEsRUFBQyxDQUFDLEdBQUcs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Q0FBQyxpQkFBaUIsRUFBRyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRSxjQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91dGlsLWltZy1jdHJsL3V0aWwtaW1nLWN0cmwuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmNsYXNzIFV0aWxJbWdDdHJsU2l6ZURpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDphbnkgPSBbXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVXRpbEltZ0N0cmxTaXplRGlyZWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdBJztcclxuICAgIHNjb3BlID0ge1xyXG5cclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSkge1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhdHRycy4kc2V0KFwic3R5bGVcIixcIlwiKTtcclxuICAgICAgICAgICAgbGV0IHBfdyA9IGVsZW1lbnQucGFyZW50KCkud2lkdGgoKTtcclxuICAgICAgICAgICAgbGV0IHBfaCA9IGVsZW1lbnQucGFyZW50KCkuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIGxldCB3ID0gZWxlbWVudC53aWR0aCgpO1xyXG4gICAgICAgICAgICBsZXQgaCA9IGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIGxldCBwX2NfdyA9IHBfdy93O1xyXG4gICAgICAgICAgICBsZXQgcF9jX2ggPSBwX2gvaDtcclxuXHJcbiAgICAgICAgICAgIGlmKHcgPiBwX3cgJiYgaCA+IHBfaCl7XHJcbiAgICAgICAgICAgICAgICBpZiggcF9jX3cgPiBwX2NfaCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoXCJoZWlnaHRcIixcIjEwMCVcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjpcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nLXRvcFwiOihwX2ggLSBwX2NfdyAqaCkvMiArIFwicHhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih3ID4gcF93KXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6XCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nLXRvcFwiOihwX2ggLSBwX2NfdyAqaCkvMiArIFwicHhcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGggPiBwX2gpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoXCJoZWlnaHRcIixcIjEwMCVcIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIFwicGFkZGluZy10b3BcIjoocF9oLWgpLzIgKyBcInB4XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnQoKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbn1cclxuXHJcbmNsYXNzIFV0aWxJbWdDZW50ZXJEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IGFueSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsSW1nQ2VudGVyRGlyZWN0aXZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnQSc7XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSkge1xyXG4gICAgICAgIGVsZW1lbnQuY3NzKHtcIm9wYWNpdHlcIjowfSk7XHJcbiAgICAgICAgZWxlbWVudC5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYXR0cnMuJHNldChcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb246IHN0cmluZyA9IGVsZW1lbnQucGFyZW50KCkuY3NzKCdwb3NpdGlvbicpO1xyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudCgpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcF93OiBudW1iZXIgPSBlbGVtZW50LnBhcmVudCgpLndpZHRoKCk7IC8vIOWuueWZqOWuveW6plxyXG4gICAgICAgICAgICBsZXQgcF9oOiBudW1iZXIgPSBlbGVtZW50LnBhcmVudCgpLmhlaWdodCgpOyAvLyDlrrnlmajpq5jluqZcclxuICAgICAgICAgICAgbGV0IHc6IG51bWJlciA9IGVsZW1lbnRbMF0ubmF0dXJhbFdpZHRoOyAvLyDlm77niYflrp7pmYXlrr3luqZcclxuICAgICAgICAgICAgbGV0IGg6IG51bWJlciA9IGVsZW1lbnRbMF0ubmF0dXJhbEhlaWdodDsgLy8g5Zu+54mH5a6e6ZmF6auY5bqmXHJcbiAgICAgICAgICAgIGxldCBwX2NfdyA9IHBfdyAvIHc7IC8vIOWuueWZqOS4juWbvueJh+eahOWuveavlOS+i1xyXG4gICAgICAgICAgICBsZXQgcF9jX2ggPSBwX2ggLyBoOyAgLy8g5a655Zmo5LiO5Zu+54mH55qE6auY5q+U5L6LXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocF93IDwgdyAmJiBwX2ggPCBoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlrrnlmajlrr3luqblsI/kuo7lm77niYflrp7pmYXlrr3luqYg5a655Zmo6auY5bqm5bCP5LqO5Zu+54mH5a6e6ZmF6auY5bqmXHJcbiAgICAgICAgICAgICAgICBpZiAocF9jX3cgPiBwX2NfaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWuueWZqOS4juWbvueJh+eahOWuveavlOS+iyDlpKfkuo4g5a655Zmo5LiO5Zu+54mH55qE6auY5q+U5L6LXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g562J5q+U5L6L57yp5pS+5b2T54S25oOF5Ya15LiLIOmrmOaYr+acgOWQjuaJjei/m+WuueWZqOeahFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOivtOaYjumcgOimgSDpq5jluqblm7rlrposIOWuveW6puiHqumAguW6lFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0JzogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JzogLSh3ICogcF9jX2ggLyAyKSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0JzogJzAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndG9wJzogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnOiAtKGggKiBwX2NfdyAvIDIpICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBfdyA8IHcgJiYgcF9oID4gaCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ21hcmdpblRvcCc6IC0oaCAqIHBfY193IC8gMikgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocF93ID4gdyAmJiBwX2ggPCBoKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnOiAtKHcgKiBwX2NfaCAvIDIpICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlrrnlmajlrr3luqblpKfkuo7lm77niYflrp7pmYXlrr3luqYg5a655Zmo6auY5bqm5aSn5LqO5Zu+54mH5a6e6ZmF6auY5bqmXHJcbiAgICAgICAgICAgICAgICBpZiAocF9jX3cgPiBwX2NfaCkge1xyXG4gICAgICAgICAgICAgICAgICAgLy8g5a655Zmo5LiO5Zu+54mH55qE5a695q+U5L6LIOWkp+S6jiDlrrnlmajkuI7lm77niYfnmoTpq5jmr5TkvotcclxuICAgICAgICAgICAgICAgICAgIC8vIOivtOaYjuWcqOetieavlOS+i+e8qeaUvuaDheWGteS4i++8jOacgOWFiOmhtuWIsOWuueWZqOeahOaYr+mrmCwg5omA5Lul6auY5Zu65a6aLCDlrr3luqboh6rpgILlupRcclxuICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0JzogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JzogLSh3ICogcF9jX2ggLyAyKSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RvcCc6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpblRvcCc6IC0oaCAqIHBfY193IC8gMikgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnQoKS5jc3MoJ2JhY2tncm91bmRDb2xvcicsICdyZ2JhKDAsMCwwLDAuOCknKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5vZmYoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcC5kaXJlY3RpdmUoJ3V0aWxJbWdDdHJsU2l6ZScgLCBVdGlsSW1nQ3RybFNpemVEaXJlY3RpdmUuaW5zdGFuY2UpO1xyXG5hcHAuZGlyZWN0aXZlKCd1dGlsSW1nQ2VudGVyJyAsIFV0aWxJbWdDZW50ZXJEaXJlY3RpdmUuaW5zdGFuY2UpOyJdfQ==
