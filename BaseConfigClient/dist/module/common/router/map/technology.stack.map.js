define(["require", "exports", "../enum/RouteKeyEnum", "../../../../config"], function (require, exports, RouteKeyEnum_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TechnologyStack = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        url: '/technologystack',
        moduleName: '技术栈',
        controllerName: 'technologyStackController',
        controllerUrl: 'module/technology-stack/controller',
        controllerAs: 'technologyStackCtrl',
        templateUrl: '/module/technology-stack/technology-stack.html',
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackLayout = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackLayout,
        url: '/layout',
        moduleName: "布局指令",
        controllerUrl: 'module/technology-stack/layout/layout.controller',
        views: {
            "technologystack": {
                controllerName: "layoutController",
                controllerAs: 'layoutCtrl',
                templateUrl: '/module/technology-stack/layout/layout.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackMapController = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackMap,
        url: "/map",
        moduleName: "地图",
        controllerUrl: "module/technology-stack/map/technology.stack.map.controller",
        views: {
            "technologystack": {
                controllerName: "technologyStackMapController",
                controllerAs: 'technologyStackMapCtrl',
                templateUrl: '/module/technology-stack/map/technology.stack.map.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackOcxController = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackOcx,
        url: "/ocx",
        moduleName: "ocx演示",
        controllerUrl: "module/technology-stack/ocx/ocx.controller",
        views: {
            "technologystack": {
                controllerName: "technologyStackOcxController",
                controllerAs: 'technologyStackOcxCtrl',
                templateUrl: '/module/technology-stack/ocx/ocx.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackTreeController = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackTree,
        url: "/tree",
        moduleName: "tree演示",
        controllerUrl: "module/technology-stack/tree/tree.controller",
        views: {
            "technologystack": {
                controllerName: "technologyStackTreeController",
                controllerAs: 'technologyStackTreeCtrl',
                templateUrl: '/module/technology-stack/tree/tree.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackSocketController = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackSocket,
        url: "/socket",
        moduleName: "socket演示",
        controllerUrl: "module/technology-stack/socket/socket.controller",
        views: {
            "technologystack": {
                controllerName: "technologyStackSocketController",
                controllerAs: 'technologyStackSocketCtrl',
                templateUrl: '/module/technology-stack/socket/socket.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackSelectController = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackSelect,
        url: "/select",
        moduleName: "select演示",
        controllerUrl: "module/technology-stack/util-select/utilSelect.controller",
        views: {
            "technologystack": {
                controllerName: "technologyStackSelectController",
                controllerAs: 'technologyStackSelectCtrl',
                templateUrl: '/module/technology-stack/util-select/utilSelect.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    var TechnologyStackTreeSelectModalDemoController = {
        key: RouteKeyEnum_1.RouteKeyEnum.TechnologyStackTreeSelectModalDemo,
        url: "/treeSelectModalDemo",
        moduleName: "treeSelectModalDemo",
        controllerUrl: "module/technology-stack/tree-selectModal/treeSelectModal.controller",
        views: {
            "technologystack": {
                controllerName: "tsTreeSelectModalController",
                controllerAs: 'tsTreeSelectModalCtrl',
                templateUrl: '/module/technology-stack/tree-selectModal/tree-selectModal.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.TechnologyStack,
        isLocal: config_1.default.IS_DEV
    };
    exports.TechnologyStackMap = [
        TechnologyStack, TechnologyStackLayout, TechnologyStackMapController, TechnologyStackOcxController, TechnologyStackTreeController, TechnologyStackSocketController,
        TechnologyStackSelectController, TechnologyStackTreeSelectModalDemoController
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvdGVjaG5vbG9neS5zdGFjay5tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUEsSUFBTSxlQUFlLEdBQWtCO1FBQ25DLEdBQUcsRUFBRSwyQkFBWSxDQUFDLGVBQWU7UUFDakMsR0FBRyxFQUFFLGtCQUFrQjtRQUN2QixVQUFVLEVBQUUsS0FBSztRQUNqQixjQUFjLEVBQUUsMkJBQTJCO1FBQzNDLGFBQWEsRUFBRSxvQ0FBb0M7UUFDbkQsWUFBWSxFQUFFLHFCQUFxQjtRQUNuQyxXQUFXLEVBQUUsZ0RBQWdEO1FBQzdELE9BQU8sRUFBQyxnQkFBTSxDQUFDLE1BQU07S0FDeEIsQ0FBQztJQUVGLElBQU0scUJBQXFCLEdBQWtCO1FBQ3pDLEdBQUcsRUFBRSwyQkFBWSxDQUFDLHFCQUFxQjtRQUN2QyxHQUFHLEVBQUUsU0FBUztRQUNkLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLGFBQWEsRUFBRSxrREFBa0Q7UUFDakUsS0FBSyxFQUFFO1lBQ0gsaUJBQWlCLEVBQUU7Z0JBQ2YsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLFdBQVcsRUFBRSw2Q0FBNkM7YUFDN0Q7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLGVBQWU7UUFDcEMsT0FBTyxFQUFDLGdCQUFNLENBQUMsTUFBTTtLQUN4QixDQUFDO0lBRUYsSUFBTSw0QkFBNEIsR0FBa0I7UUFDaEQsR0FBRyxFQUFFLDJCQUFZLENBQUMsa0JBQWtCO1FBQ3BDLEdBQUcsRUFBRSxNQUFNO1FBQ1gsVUFBVSxFQUFFLElBQUk7UUFDaEIsYUFBYSxFQUFFLDZEQUE2RDtRQUM1RSxLQUFLLEVBQUU7WUFDSCxpQkFBaUIsRUFBRTtnQkFDZixjQUFjLEVBQUUsOEJBQThCO2dCQUM5QyxZQUFZLEVBQUUsd0JBQXdCO2dCQUN0QyxXQUFXLEVBQUUsd0RBQXdEO2FBQ3hFO1NBQ0o7UUFDRCxNQUFNLEVBQUUsMkJB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c291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMjQuXHJcbiAqL1xyXG5pbXBvcnQge0lSb3V0ZXJDb25maWd9IGZyb20gXCIuLi9yb3V0ZXJcIjtcclxuaW1wb3J0IHtSb3V0ZUtleUVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlS2V5RW51bVwiO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuLi8uLi8uLi8uLi9jb25maWdcIjtcclxuXHJcblxyXG5jb25zdCBUZWNobm9sb2d5U3RhY2s6IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5UZWNobm9sb2d5U3RhY2ssXHJcbiAgICB1cmw6ICcvdGVjaG5vbG9neXN0YWNrJyxcclxuICAgIG1vZHVsZU5hbWU6ICfmioDmnK/moIgnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICd0ZWNobm9sb2d5U3RhY2tDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdGVjaG5vbG9neS1zdGFjay9jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ3RlY2hub2xvZ3lTdGFja0N0cmwnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svdGVjaG5vbG9neS1zdGFjay5odG1sJyxcclxuICAgIGlzTG9jYWw6Q29uZmlnLklTX0RFVlxyXG59O1xyXG5cclxuY29uc3QgVGVjaG5vbG9neVN0YWNrTGF5b3V0OiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrTGF5b3V0LFxyXG4gICAgdXJsOiAnL2xheW91dCcsXHJcbiAgICBtb2R1bGVOYW1lOiBcIuW4g+WxgOaMh+S7pFwiLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS90ZWNobm9sb2d5LXN0YWNrL2xheW91dC9sYXlvdXQuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwidGVjaG5vbG9neXN0YWNrXCI6IHtcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6IFwibGF5b3V0Q29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdsYXlvdXRDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svbGF5b3V0L2xheW91dC5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5UZWNobm9sb2d5U3RhY2ssXHJcbiAgICBpc0xvY2FsOkNvbmZpZy5JU19ERVZcclxufTtcclxuXHJcbmNvbnN0IFRlY2hub2xvZ3lTdGFja01hcENvbnRyb2xsZXI6IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5UZWNobm9sb2d5U3RhY2tNYXAsXHJcbiAgICB1cmw6IFwiL21hcFwiLFxyXG4gICAgbW9kdWxlTmFtZTogXCLlnLDlm75cIixcclxuICAgIGNvbnRyb2xsZXJVcmw6IFwibW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svbWFwL3RlY2hub2xvZ3kuc3RhY2subWFwLmNvbnRyb2xsZXJcIixcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJ0ZWNobm9sb2d5c3RhY2tcIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogXCJ0ZWNobm9sb2d5U3RhY2tNYXBDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RlY2hub2xvZ3lTdGFja01hcEN0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay9tYXAvdGVjaG5vbG9neS5zdGFjay5tYXAuaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrLFxyXG4gICAgaXNMb2NhbDpDb25maWcuSVNfREVWXHJcbn07XHJcblxyXG5jb25zdCBUZWNobm9sb2d5U3RhY2tPY3hDb250cm9sbGVyOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrT2N4LFxyXG4gICAgdXJsOiBcIi9vY3hcIixcclxuICAgIG1vZHVsZU5hbWU6IFwib2N45ryU56S6XCIsXHJcbiAgICBjb250cm9sbGVyVXJsOiBcIm1vZHVsZS90ZWNobm9sb2d5LXN0YWNrL29jeC9vY3guY29udHJvbGxlclwiLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcInRlY2hub2xvZ3lzdGFja1wiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiBcInRlY2hub2xvZ3lTdGFja09jeENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndGVjaG5vbG9neVN0YWNrT2N4Q3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90ZWNobm9sb2d5LXN0YWNrL29jeC9vY3guaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrLFxyXG4gICAgaXNMb2NhbDpDb25maWcuSVNfREVWXHJcbn07XHJcblxyXG5jb25zdCBUZWNobm9sb2d5U3RhY2tUcmVlQ29udHJvbGxlcjogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRlY2hub2xvZ3lTdGFja1RyZWUsXHJcbiAgICB1cmw6IFwiL3RyZWVcIixcclxuICAgIG1vZHVsZU5hbWU6IFwidHJlZea8lOekulwiLFxyXG4gICAgY29udHJvbGxlclVybDogXCJtb2R1bGUvdGVjaG5vbG9neS1zdGFjay90cmVlL3RyZWUuY29udHJvbGxlclwiLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcInRlY2hub2xvZ3lzdGFja1wiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiBcInRlY2hub2xvZ3lTdGFja1RyZWVDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RlY2hub2xvZ3lTdGFja1RyZWVDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svdHJlZS90cmVlLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRlY2hub2xvZ3lTdGFjayxcclxuICAgIGlzTG9jYWw6Q29uZmlnLklTX0RFVlxyXG59O1xyXG5cclxuY29uc3QgVGVjaG5vbG9neVN0YWNrU29ja2V0Q29udHJvbGxlcjogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRlY2hub2xvZ3lTdGFja1NvY2tldCxcclxuICAgIHVybDogXCIvc29ja2V0XCIsXHJcbiAgICBtb2R1bGVOYW1lOiBcInNvY2tldOa8lOekulwiLFxyXG4gICAgY29udHJvbGxlclVybDogXCJtb2R1bGUvdGVjaG5vbG9neS1zdGFjay9zb2NrZXQvc29ja2V0LmNvbnRyb2xsZXJcIixcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJ0ZWNobm9sb2d5c3RhY2tcIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogXCJ0ZWNobm9sb2d5U3RhY2tTb2NrZXRDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RlY2hub2xvZ3lTdGFja1NvY2tldEN0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay9zb2NrZXQvc29ja2V0Lmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRlY2hub2xvZ3lTdGFjayxcclxuICAgIGlzTG9jYWw6Q29uZmlnLklTX0RFVlxyXG59O1xyXG5cclxuLy96eWggIOS4i+aLieahhua1i+ivlVxyXG5jb25zdCBUZWNobm9sb2d5U3RhY2tTZWxlY3RDb250cm9sbGVyOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrU2VsZWN0LFxyXG4gICAgdXJsOiBcIi9zZWxlY3RcIixcclxuICAgIG1vZHVsZU5hbWU6IFwic2VsZWN05ryU56S6XCIsXHJcbiAgICBjb250cm9sbGVyVXJsOiBcIm1vZHVsZS90ZWNobm9sb2d5LXN0YWNrL3V0aWwtc2VsZWN0L3V0aWxTZWxlY3QuY29udHJvbGxlclwiLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcInRlY2hub2xvZ3lzdGFja1wiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiBcInRlY2hub2xvZ3lTdGFja1NlbGVjdENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndGVjaG5vbG9neVN0YWNrU2VsZWN0Q3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90ZWNobm9sb2d5LXN0YWNrL3V0aWwtc2VsZWN0L3V0aWxTZWxlY3QuaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrLFxyXG4gICAgaXNMb2NhbDpDb25maWcuSVNfREVWXHJcbn07XHJcblxyXG4vL3p5aCAg5LiL5ouJ5qGG5rWL6K+VXHJcbmNvbnN0IFRlY2hub2xvZ3lTdGFja1RyZWVTZWxlY3RNb2RhbERlbW9Db250cm9sbGVyOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVGVjaG5vbG9neVN0YWNrVHJlZVNlbGVjdE1vZGFsRGVtbyxcclxuICAgIHVybDogXCIvdHJlZVNlbGVjdE1vZGFsRGVtb1wiLFxyXG4gICAgbW9kdWxlTmFtZTogXCJ0cmVlU2VsZWN0TW9kYWxEZW1vXCIsXHJcbiAgICBjb250cm9sbGVyVXJsOiBcIm1vZHVsZS90ZWNobm9sb2d5LXN0YWNrL3RyZWUtc2VsZWN0TW9kYWwvdHJlZVNlbGVjdE1vZGFsLmNvbnRyb2xsZXJcIixcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJ0ZWNobm9sb2d5c3RhY2tcIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogXCJ0c1RyZWVTZWxlY3RNb2RhbENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndHNUcmVlU2VsZWN0TW9kYWxDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svdHJlZS1zZWxlY3RNb2RhbC90cmVlLXNlbGVjdE1vZGFsLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRlY2hub2xvZ3lTdGFjayxcclxuICAgIGlzTG9jYWw6Q29uZmlnLklTX0RFVlxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFRlY2hub2xvZ3lTdGFja01hcCA9IFtcclxuICAgIFRlY2hub2xvZ3lTdGFjaywgVGVjaG5vbG9neVN0YWNrTGF5b3V0LFRlY2hub2xvZ3lTdGFja01hcENvbnRyb2xsZXIsVGVjaG5vbG9neVN0YWNrT2N4Q29udHJvbGxlcixUZWNobm9sb2d5U3RhY2tUcmVlQ29udHJvbGxlcixUZWNobm9sb2d5U3RhY2tTb2NrZXRDb250cm9sbGVyXHJcbixUZWNobm9sb2d5U3RhY2tTZWxlY3RDb250cm9sbGVyLFRlY2hub2xvZ3lTdGFja1RyZWVTZWxlY3RNb2RhbERlbW9Db250cm9sbGVyXSBhcyBBcnJheTxJUm91dGVyQ29uZmlnPjsiXX0=
