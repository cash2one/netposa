define(["require", "exports", "../../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var laydate = require('laydate');
    var DatePickerDirective = (function () {
        function DatePickerDirective() {
            var _this = this;
            this.restrict = 'A';
            this.require = "^ngModel";
            this.scope = {
                min: '@',
                max: '@',
                mark: '@',
                ready: '&',
                change: '&',
                done: '&'
            };
            this.dateOptions = {};
            this.link = function (scope, element, attrs, controller) {
                var vm = _this;
                scope.ngModelController = controller;
                scope.ngModelController.$parsers.push(function (viewValue) {
                    return viewValue;
                });
                scope.ngModelController.$formatters.push(function (modelValue) {
                    scope.ngModelValue = modelValue;
                    return modelValue;
                });
                vm.dateOptions.elem = element[0];
                init();
                function init() {
                    if (attrs.dateType) {
                        vm.dateOptions.type = attrs.dateType;
                    }
                    else {
                        vm.dateOptions.type = 'datetime';
                    }
                    if (attrs.range) {
                        vm.dateOptions.range = scope.$eval(attrs.range);
                    }
                    if (attrs.format) {
                        vm.dateOptions.format = attrs.format;
                    }
                    else {
                        vm.dateOptions.format = 'yyyy-MM-dd HH:mm:ss';
                    }
                    if (scope.min) {
                        vm.dateOptions.min = scope.min;
                    }
                    if (scope.max) {
                        vm.dateOptions.max = scope.max;
                    }
                    if (attrs.trigger) {
                        vm.dateOptions.trigger = attrs.trigger;
                    }
                    if (attrs.show) {
                        vm.dateOptions.show = scope.$eval(attrs.show);
                    }
                    if (attrs.position) {
                        vm.dateOptions.position = scope.$eval(attrs.position);
                    }
                    if (attrs.zIndex) {
                        vm.dateOptions.zIndex = scope.$eval(attrs.zIndex);
                    }
                    if (attrs.showBottom) {
                        vm.dateOptions.showBottom = scope.$eval(attrs.showBottom);
                    }
                    if (attrs.btns) {
                        vm.dateOptions.btns = scope.$eval(attrs.btns);
                    }
                    if (attrs.lang) {
                        vm.dateOptions.lang = scope.$eval(attrs.lang);
                    }
                    if (attrs.calendar) {
                        vm.dateOptions.calendar = scope.$eval(attrs.calendar);
                    }
                    if (scope.mark) {
                        vm.dateOptions.mark = scope.mark;
                    }
                    vm.dateOptions.ready = function (date) {
                        if (scope.ready) {
                            scope.ready({ date: date });
                        }
                    };
                    vm.dateOptions.change = function (value, date, endDate) {
                        if (scope.change) {
                            scope.change({ value: value, date: date, endDate: endDate });
                        }
                    };
                    vm.dateOptions.done = function (value, date, endDate) {
                        scope.ngModelValue = value;
                        scope.ngModelController.$setViewValue(value);
                        if (scope.done) {
                            scope.done({ value: value, date: date, endDate: endDate });
                        }
                    };
                    if (scope.ngModelValue) {
                        this.dateOptions.value = scope.ngModelValue;
                    }
                    console.log(vm.dateOptions);
                    laydate.render(vm.dateOptions);
                }
                scope.$watch('min', function (val) {
                    if (val) {
                        init();
                    }
                });
                scope.$watch('max', function (val) {
                    if (val) {
                        init();
                    }
                });
                scope.$watch('mark', function (val) {
                    if (val) {
                        init();
                    }
                });
                scope.$on('$destory', function () {
                    scope.ngModelController = null;
                });
            };
        }
        DatePickerDirective.instance = function () {
            return new DatePickerDirective();
        };
        DatePickerDirective.$inject = ["$timeout", "$interval"];
        return DatePickerDirective;
    }());
    main_app_1.app.directive("datePicker", DatePickerDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9kYXRlcGlja2VyL2RhdGVwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQWdGakM7UUFJSTtZQUFBLGlCQUNDO1lBRUQsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixZQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLFVBQUssR0FBRztnQkFDSixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsR0FBRztnQkFDVCxLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsR0FBRztnQkFDWCxJQUFJLEVBQUUsR0FBRzthQUNaLENBQUM7WUFDRixnQkFBVyxHQUFHLEVBQVMsQ0FBQztZQU14QixTQUFJLEdBQUcsVUFBQyxLQUFVLEVBQUUsT0FBWSxFQUFFLEtBQVUsRUFBRSxVQUFlO2dCQUN6RCxJQUFJLEVBQUUsR0FBRyxLQUFXLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsU0FBaUI7b0JBQzdELE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBa0I7b0JBQ3hELEtBQUssQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO29CQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBR2pDLElBQUksRUFBRSxDQUFDO2dCQUdQO29CQUNJLEVBQUUsQ0FBQyxD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QUksbUJBQW1CLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBbkJNLDJCQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFrSS9DLDBCQUFDO0tBcElELEFBb0lDLElBQUE7SUFFRCxjQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9kYXRlcGlja2VyL2RhdGVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmxldCBsYXlkYXRlID0gcmVxdWlyZSgnbGF5ZGF0ZScpO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksIHJlcXVpcmU6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7e3R5cGU6IHN0cmluZ319IOm7mOiupOWAvO+8mmRhdGVcclxuICogeWVhciAgICDlubTpgInmi6nlmaggICAg5Y+q5o+Q5L6b5bm05YiX6KGo6YCJ5oupXHJcbiAqIG1vbnRoICAgIOW5tOaciOmAieaLqeWZqCAgICDlj6rmj5DkvpvlubTjgIHmnIjpgInmi6lcclxuICogZGF0ZSAgICDml6XmnJ/pgInmi6nlmaggICAg5Y+v6YCJ5oup77ya5bm044CB5pyI44CB5pel44CCdHlwZem7mOiupOWAvO+8jOS4gOiIrOWPr+S4jeWhq1xyXG4gKiB0aW1lICAgIOaXtumXtOmAieaLqeWZqCAgICDlj6rmj5Dkvpvml7bjgIHliIbjgIHnp5LpgInmi6lcclxuICogZGF0ZXRpbWUgICAg5pel5pyf5pe26Ze06YCJ5oup5ZmoICAgIOWPr+mAieaLqe+8muW5tOOAgeaciOOAgeaXpeOAgeaXtuOAgeWIhuOAgeenklxyXG4gKlxyXG4gKiBAcmFuZ2V7e3JhbmdlOiBzdHJpbmcgfCBib29sZWFufX0g6buY6K6k5YC877yaZmFsc2VcclxuICog5aaC5p6c6K6+572uIHRydWXvvIzlsIbpu5jorqTph4fnlKgg4oCcIC0g4oCdIOWIhuWJsuOAgiDkvaDkuZ/lj6/ku6Xnm7TmjqXorr7nva4g5YiG5Ymy5a2X56ym44CC5LqU56eN6YCJ5oup5Zmo57G75Z6L5Z2H5pSv5oyB5bem5Y+z6Z2i5p2/55qE6IyD5Zu06YCJ5oup44CCXHJcbiAqXHJcbiAqIEBmb3JtYXR7e2Zvcm1hdDogc3RyaW5nfX3pu5jorqTlgLzvvJp5eXl5LU1NLWRkXHJcbiAqIHl5eXkgICAg5bm05Lu977yM6Iez5bCR5Zub5L2N5pWw44CC5aaC5p6c5LiN6Laz5Zub5L2N77yM5YiZ5YmN6Z2i6KGl6Zu2XHJcbiAqIHkgICAg5bm05Lu977yM5LiN6ZmQ5Yi25L2N5pWw77yM5Y2z5LiN566h5bm05Lu95aSa5bCR5L2N77yM5YmN6Z2i5Z2H5LiN6KGl6Zu2XHJcbiAqIE1NICAgIOaciOS7ve+8jOiHs+WwkeS4pOS9jeaVsOOAguWmguaenOS4jei2s+S4pOS9je+8jOWImeWJjemdouihpembtuOAglxyXG4gKiBNICAgIOaciOS7ve+8jOWFgeiuuOS4gOS9jeaVsOOAglxyXG4gKiBkZCAgICDml6XmnJ/vvIzoh7PlsJHkuKTkvY3mlbDjgILlpoLmnpzkuI3otrPkuKTkvY3vvIzliJnliY3pnaLooaXpm7bjgIJcclxuICogZCAgICDml6XmnJ/vvIzlhYHorrjkuIDkvY3mlbDjgIJcclxuICogSEggICAg5bCP5pe277yM6Iez5bCR5Lik5L2N5pWw44CC5aaC5p6c5LiN6Laz5Lik5L2N77yM5YiZ5YmN6Z2i6KGl6Zu244CCXHJcbiAqIEggICAg5bCP5pe277yM5YWB6K645LiA5L2N5pWw44CCXHJcbiAqIG1tICAgIOWIhumSn++8jOiHs+WwkeS4pOS9jeaVsOOAguWmguaenOS4jei2s+S4pOS9je+8jOWImeWJjemdouihpembtuOAglxyXG4gKiBtICAgIOWIhumSn++8jOWFgeiuuOS4gOS9jeaVsOOAglxyXG4gKiBzcyAgICDnp5LmlbDvvIzoh7PlsJHkuKTkvY3mlbDjgILlpoLmnpzkuI3otrPkuKTkvY3vvIzliJnliY3pnaLooaXpm7bjgIJcclxuICogcyAgICDnp5LmlbDvvIzlhYHorrjkuIDkvY3mlbDjgIJcclxuICpcclxuICogQG1pblxyXG4gKiBAbWF4XHJcbiAqIOm7mOiupOWAvO+8mm1pbjogJzE5MDAtMS0xJ+OAgW1heDogJzIwOTktMTItMzEnXHJcbiAqXHJcbiAqIEB0cmlnZ2VyXHJcbiAqIOexu+Wei++8mlN0cmluZ++8jOm7mOiupOWAvO+8mmZvY3Vz77yM5aaC5p6c57uR5a6a55qE5YWD57Sg6Z2e6L6T5YWl5qGG77yM5YiZ6buY6K6k5LqL5Lu25Li677yaY2xpY2tcclxuICpcclxuICogQHNob3dcclxuICog57G75Z6L77yaQm9vbGVhbu+8jOm7mOiupOWAvO+8mmZhbHNlXHJcbiAqIOWmguaenOiuvue9rjogdHJ1Ze+8jOWImeaOp+S7tum7mOiupOaYvuekuuWcqOe7keWumuWFg+e0oOeahOWMuuWfn+OAgumAmuW4uOeUqOS6juWklumDqOS6i+S7tuiwg+eUqOaOp+S7tu+8jOWmgu+8mlxyXG4gKlxyXG4gKiBAcG9zaXRpb25cclxuICog57G75Z6L77yaU3RyaW5n77yM6buY6K6k5YC877yaYWJzb2x1dGVcclxuICogYWJvbHV0ZSAgICDnu53lr7nlrprkvY3vvIzlp4vnu4jlkLjpmYTlnKjnu5HlrprlhYPntKDlkajlm7TjgILpu5jorqTlgLxcclxuICogZml4ZWQgICAg5Zu65a6a5a6a5L2N77yM5Yid5aeL5ZC46ZmE5Zyo57uR5a6a5YWD57Sg5ZGo5Zu077yM5LiN6ZqP5rWP6KeI5Zmo5rua5Yqo5p2h5omA5bem5Y+z44CC5LiA6Iis55So5LqO5Zyo5Zu65a6a5a6a5L2N55qE5by55bGC5Lit5L2/55So44CCXHJcbiAqIHN0YXRpYyAgICDpnZnmgIHlrprkvY3vvIzmjqfku7blsIbnm7TmjqXltYzlpZflnKjmjIflrprlrrnlmajkuK3jgIJcclxuICog5rOo5oSP77ya6K+35Yu/5LiOIHNob3cg5Y+C5pWw55qE5qaC5b+15pCe5re35reG44CCc2hvd+S4uiB0cnVlIOaXtu+8jOaOp+S7tuS7jeeEtuaYr+mHh+eUqOe7neWvueaIluWbuuWumuWumuS9jeOAguiAjOi/memHjOaYr+ebtOaOpeW1jOWll+aYvuekulxyXG4gKlxyXG4gKiBAekluZGV4XHJcbiAqIOexu+Wei++8mk51bWJlcu+8jOm7mOiupOWAvO+8mjY2NjY2NjY2XHJcbiAqIOS4gOiIrOeUqOS6juino+WGs+S4juWFtuWug+WFg+e0oOeahOS6kuebuOiiq+mBruaOqeeahOmXrumimOOAguWmguaenCBwb3NpdGlvbiDlj4LmlbDorr7kuLogc3RhdGljIOaXtu+8jOivpeWPguaVsOaXoOaViOOAglxyXG4gKlxyXG4gKiBAc2hvd0JvdHRvbSAtIOaYr+WQpuaYvuekuuW6lemDqOagj1xyXG4gKiDnsbvlnovvvJpCb29sZWFu77yM6buY6K6k5YC877yadHJ1ZVxyXG4gKiDlpoLmnpzorr7nva4gZmFsc2XvvIzlsIbkuI3kvJrmmL7npLrmjqfku7bnmoTlupXpg6jmoI/ljLrln59cclxuICpcclxuICogQGJ0bnMgLSDlt6XlhbfmjInpkq5cclxuICog57G75Z6L77yaQXJyYXnvvIzpu5jorqTlgLzvvJpbJ2NsZWFyJywgJ25vdycsICdjb25maXJtJ11cclxuICog5Y+z5LiL6KeS5pi+56S655qE5oyJ6ZKu77yM5Lya5oyJ54Wn5pWw57uE6aG65bqP5o6S5YiX77yM5YaF572u5Y+v6K+G5Yir55qE5YC85pyJ77yaY2xlYXLjgIFub3fjgIFjb25maXJtXHJcbiAqXHJcbiAqIEBsYW5nIC0g6K+t6KiAXHJcbiAqIOexu+Wei++8mlN0cmluZ++8jOm7mOiupOWAvO+8mmNuXHJcbiAqIGNu77yI5Lit5paH54mI77yJ44CBZW7vvIjlm73pmYXniYjvvIzljbPoi7HmlofniYjvvInjgILov5nph4zlubbmsqHmnInlvIDmlL7oh6rlrprkuYnmloflrZfvvIzmmK/kuLrkuobpgb/lhY3nuYHnkJDnmoTphY3nva7jgIJcclxuICpcclxuICogQGNhbGVuZGFyXHJcbiAqIOexu+Wei++8mkJvb2xlYW7vvIzpu5jorqTlgLzvvJpmYWxzZVxyXG4gKiDmiJHku6zlhoXnva7kuobkuIDkupvmiJHlm73pgJrnlKjnmoTlhazljobph43opoHoioLml6XvvIzpgJrov4forr7nva4gdHJ1ZSDmnaXlvIDlkK/jgILlm73pmYXniYjkuI3kvJrmmL7npLrjgIJcclxuICpcclxuICogQG1hcmsgLSDmoIfms6jph43opoHml6XlrZBcclxuICog57G75Z6L77yaT2JqZWN077yM6buY6K6k5YC877ya5pegXHJcbiAqXHJcbiAqIEByZWFkeSBmdW5jdGlvblxyXG4gKiDmjqfku7blnKjmiZPlvIDml7bop6blj5HvvIzlm57osIPov5Tlm57kuIDkuKrlj4LmlbDvvJrliJ3lp4vnmoTml6XmnJ/ml7bpl7Tlr7nosaFcclxuICpcclxuICogQGNoYW5nZSBmdW5jdGlvblxyXG4gKiDlubTmnIjml6Xml7bpl7TooqvliIfmjaLml7bpg73kvJrop6blj5HjgILlm57osIPov5Tlm57kuInkuKrlj4LmlbDvvIzliIbliKvku6PooajvvJrnlJ/miJDnmoTlgLzjgIHml6XmnJ/ml7bpl7Tlr7nosaHjgIHnu5PmnZ/nmoTml6XmnJ/ml7bpl7Tlr7nosaFcclxuICpcclxuICogQGRvbmUgZnVuY3Rpb24g5o6n5Lu26YCJ5oup5a6M5q+V5ZCO55qE5Zue6LCDXHJcbiAqIOeCueWHu+aXpeacn+OAgea4heepuuOAgeeOsOWcqOOAgeehruWumuWdh+S8muinpuWPkeOAguWbnuiwg+i/lOWbnuS4ieS4quWPguaVsO+8jOWIhuWIq+S7o+ihqO+8mueUn+aIkOeahOWAvOOAgeaXpeacn+aXtumXtOWvueixoeOAgee7k+adn+eahOaXpeacn+aXtumXtOWvueixoVxyXG4gKlxyXG4gKiAvL1RPRE8g6K+m57uG5Y+C6ICDbGF5ZGF0ZVxyXG4gKi9cclxuY2xhc3MgRGF0ZVBpY2tlckRpcmVjdGl2ZSB7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkdGltZW91dFwiLCBcIiRpbnRlcnZhbFwiXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0EnO1xyXG4gICAgcmVxdWlyZSA9IFwiXm5nTW9kZWxcIjtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIG1pbjogJ0AnLFxyXG4gICAgICAgIG1heDogJ0AnLFxyXG4gICAgICAgIG1hcms6ICdAJyxcclxuICAgICAgICByZWFkeTogJyYnLFxyXG4gICAgICAgIGNoYW5nZTogJyYnLFxyXG4gICAgICAgIGRvbmU6ICcmJ1xyXG4gICAgfTtcclxuICAgIGRhdGVPcHRpb25zID0ge30gYXMgYW55O1xyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGVQaWNrZXJEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5rID0gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSwgY29udHJvbGxlcjogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgc2NvcGUubmdNb2RlbENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHNjb3BlLm5nTW9kZWxDb250cm9sbGVyLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24gKHZpZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NvcGUubmdNb2RlbENvbnRyb2xsZXIuJGZvcm1hdHRlcnMucHVzaCgobW9kZWxWYWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHNjb3BlLm5nTW9kZWxWYWx1ZSA9IG1vZGVsVmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbFZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZtLmRhdGVPcHRpb25zLmVsZW0gPSBlbGVtZW50WzBdO1xyXG5cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgaWYgKGF0dHJzLmRhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy50eXBlID0gYXR0cnMuZGF0ZVR5cGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy50eXBlID0gJ2RhdGV0aW1lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXR0cnMucmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGVPcHRpb25zLnJhbmdlID0gc2NvcGUuJGV2YWwoYXR0cnMucmFuZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdHRycy5mb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGVPcHRpb25zLmZvcm1hdCA9IGF0dHJzLmZvcm1hdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGVPcHRpb25zLmZvcm1hdCA9ICd5eXl5LU1NLWRkIEhIOm1tOnNzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2NvcGUubWluKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy5taW4gPSBzY29wZS5taW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjb3BlLm1heCkge1xyXG4gICAgICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMubWF4ID0gc2NvcGUubWF4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdHRycy50cmlnZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy50cmlnZ2VyID0gYXR0cnMudHJpZ2dlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXR0cnMuc2hvdykge1xyXG4gICAgICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMuc2hvdyA9IHNjb3BlLiRldmFsKGF0dHJzLnNob3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdHRycy5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMucG9zaXRpb24gPSBzY29wZS4kZXZhbChhdHRycy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGF0dHJzLnpJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMuekluZGV4ID0gc2NvcGUuJGV2YWwoYXR0cnMuekluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXR0cnMuc2hvd0JvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMuc2hvd0JvdHRvbSA9IHNjb3BlLiRldmFsKGF0dHJzLnNob3dCb3R0b20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdHRycy5idG5zKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy5idG5zID0gc2NvcGUuJGV2YWwoYXR0cnMuYnRucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGF0dHJzLmxhbmcpIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGVPcHRpb25zLmxhbmcgPSBzY29wZS4kZXZhbChhdHRycy5sYW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXR0cnMuY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgICAgIHZtLmRhdGVPcHRpb25zLmNhbGVuZGFyID0gc2NvcGUuJGV2YWwoYXR0cnMuY2FsZW5kYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY29wZS5tYXJrKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy5tYXJrID0gc2NvcGUubWFyaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy5yZWFkeSA9IChkYXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzY29wZS5yZWFkeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnJlYWR5KHtkYXRlOiBkYXRlfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMuY2hhbmdlID0gKHZhbHVlOiBzdHJpbmcsIGRhdGU6IGFueSwgZW5kRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUuY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY2hhbmdlKHt2YWx1ZTogdmFsdWUsIGRhdGU6IGRhdGUsIGVuZERhdGU6IGVuZERhdGV9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2bS5kYXRlT3B0aW9ucy5kb25lID0gKHZhbHVlOiBzdHJpbmcsIGRhdGU6IGFueSwgZW5kRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5uZ01vZGVsVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHNjb3BlLm5nTW9kZWxDb250cm9sbGVyLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3BlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5kb25lKHt2YWx1ZTogdmFsdWUsIGRhdGU6IGRhdGUsIGVuZERhdGU6IGVuZERhdGV9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjb3BlLm5nTW9kZWxWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlT3B0aW9ucy52YWx1ZSA9IHNjb3BlLm5nTW9kZWxWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2bS5kYXRlT3B0aW9ucylcclxuICAgICAgICAgICAgbGF5ZGF0ZS5yZW5kZXIodm0uZGF0ZU9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdtaW4nLCAodmFsOnN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnbWF4JywgKHZhbDpzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzY29wZS4kd2F0Y2goJ21hcmsnLCAodmFsOmFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3RvcnknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNjb3BlLm5nTW9kZWxDb250cm9sbGVyID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuYXBwLmRpcmVjdGl2ZShcImRhdGVQaWNrZXJcIiwgRGF0ZVBpY2tlckRpcmVjdGl2ZS5pbnN0YW5jZSk7Il19
