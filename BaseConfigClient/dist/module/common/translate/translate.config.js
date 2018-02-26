define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AngularTranslateConfig = (function () {
        function AngularTranslateConfig($translateProvider) {
            var times = new Date().getTime();
            $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: "/language/common/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/dynamic/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/facesearch/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/maintain/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/systemconfig/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/total/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/resources/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/resourceRetrieval/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/area/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/unit/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/person/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/camera/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/lamp/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/rmpgate/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/wifi/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/electronicFence/language-",
                        suffix: ".json?v=" + times
                    },
                    {
                        prefix: "/language/baseConfig/role/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/iodServer/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/ivsServer/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/engineServer/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/proxyServer/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/videoServer/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/faceLib/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/runplan/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/taskconfig/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/systemproperties/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/videoStructure/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/common/language-",
                        suffix: ".json?v=" + times
                    }, {
                        prefix: "/language/baseConfig/mapResource/language-",
                        suffix: ".json?v=" + times
                    }
                ]
            });
            $translateProvider.preferredLanguage('cn');
            $translateProvider.useSanitizeValueStrategy('escapeParameters');
        }
        AngularTranslateConfig.$inject = ['$translateProvider'];
        return AngularTranslateConfig;
    }());
    main_app_1.app.config(AngularTranslateConfig);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3RyYW5zbGF0ZS90cmFuc2xhdGUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBS0ksZ0NBQVksa0JBQXVCO1lBQy9CLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3BDLEtBQUssRUFBRTtvQkFDSDt3QkFDSSxNQUFNLEVBQUUsNEJBQTRCO3dCQUNwQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCLEVBQUU7d0JBQ0MsTUFBTSxFQUFFLDZCQUE2Qjt3QkFDckMsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QixFQUFFO3dCQUNDLE1BQU0sRUFBRSxnQ0FBZ0M7d0JBQ3hDLE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0IsRUFBRTt3QkFDQyxNQUFNLEVBQUUsOEJBQThCO3dCQUN0QyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCLEVBQUU7d0JBQ0MsTUFBTSxFQUFFLGtDQUFrQzt3QkFDMUMsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QixFQUFFO3dCQUNDLE1BQU0sRUFBRSwyQkFBMkI7d0JBQ25DLE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0I7b0JBQ0M7d0JBQ0UsTUFBTSxFQUFFLCtCQUErQjt3QkFDdkMsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsdUNBQXVDO3dCQUMvQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCO29CQUNEO3dCQUNJLE1BQU0sRUFBRSxxQ0FBcUM7d0JBQzdDLE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0I7b0JBQ0Q7d0JBQ0ksTUFBTSxFQUFFLHFDQUFxQzt3QkFDN0MsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsdUNBQXVDO3dCQUMvQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCO29CQUNEO3dCQUNJLE1BQU0sRUFBRSx1Q0FBdUM7d0JBQy9DLE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0IsRUFBRTt3QkFDQyxNQUFNLEVBQUUscUNBQXFDO3dCQUM3QyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCO29CQUNEO3dCQUNJLE1BQU0sRUFBRSx3Q0FBd0M7d0JBQ2hELE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0I7b0JBQ0Q7d0JBQ0ksTUFBTSxFQUFFLHFDQUFxQzt3QkFDN0MsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsZ0RBQWdEO3dCQUN4RCxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCO29CQUNEO3dCQUNJLE1BQU0sRUFBRSxxQ0FBcUM7d0JBQzdDLE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0IsRUFBRTt3QkFDQyxNQUFNLEVBQUUsMENBQTBDO3dCQUNsRCxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCLEVBQUU7d0JBQ0MsTUFBTSxFQUFFLDBDQUEwQzt3QkFDbEQsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QixFQUFFO3dCQUNDLE1BQU0sRUFBRSw2Q0FBNkM7d0JBQ3JELE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0IsRUFBRTt3QkFDQyxNQUFNLEVBQUUsNENBQTRDO3dCQUNwRCxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCLEVBQUU7d0JBQ0MsTUFBTSxFQUFFLDRDQUE0Qzt3QkFDcEQsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QixFQUFFO3dCQUNDLE1BQU0sRUFBRSx3Q0FBd0M7d0JBQ2hELE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0IsRUFBRTt3QkFDQyxNQUFNLEVBQUUsd0NBQXdDO3dCQUNoRCxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCLEVBQUU7d0JBQ0MsTUFBTSxFQUFFLDJDQUEyQzt3QkFDbkQsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QixFQUFFO3dCQUNDLE1BQU0sRUFBRSxpREFBaUQ7d0JBQ3pELE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0IsRUFBRTt3QkFDQyxNQUFNLEVBQUUsK0NBQStDO3dCQUN2RCxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUs7cUJBQzdCLEVBQUU7d0JBQ0MsTUFBTSxFQUFFLHVDQUF1Qzt3QkFDL0MsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLO3FCQUM3QixFQUFFO3dCQUNDLE1BQU0sRUFBRSw0Q0FBNEM7d0JBQ3BELE1BQU0sRUFBRSxVQUFVLEdBQUcsS0FBSztxQkFDN0I7aUJBQUM7YUFDVCxDQUFDLENBQUM7WUFFSCxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUEvR00sOEJBQU8sR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFnSDVDLDZCQUFDO0tBakhELEFBaUhDLElBQUE7SUFHRCxjQUFHLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi90cmFuc2xhdGUvdHJhbnNsYXRlLmNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcblxyXG5jbGFzcyBBbmd1bGFyVHJhbnNsYXRlQ29uZmlnIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckdHJhbnNsYXRlUHJvdmlkZXInXTtcclxuXHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkdHJhbnNsYXRlUHJvdmlkZXI6IGFueSkge1xyXG4gICAgICAgIGxldCB0aW1lcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTdGF0aWNGaWxlc0xvYWRlcih7XHJcbiAgICAgICAgICAgIGZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9jb21tb24vbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvZHluYW1pYy9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9mYWNlc2VhcmNoL2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL21haW50YWluL2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL3N5c3RlbWNvbmZpZy9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS90b3RhbC9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL3Jlc291cmNlcy9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvcmVzb3VyY2VSZXRyaWV2YWwvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL2Jhc2VDb25maWcvYXJlYS9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy91bml0L2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL3BlcnNvbi9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9jYW1lcmEvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9sYW1wL2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL3JtcGdhdGUvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL2Jhc2VDb25maWcvd2lmaS9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9lbGVjdHJvbmljRmVuY2UvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL2Jhc2VDb25maWcvcm9sZS9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL2lvZFNlcnZlci9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL2l2c1NlcnZlci9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL2VuZ2luZVNlcnZlci9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL3Byb3h5U2VydmVyL2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL2Jhc2VDb25maWcvdmlkZW9TZXJ2ZXIvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9mYWNlTGliL2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL2Jhc2VDb25maWcvcnVucGxhbi9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBcIi9sYW5ndWFnZS9iYXNlQ29uZmlnL3Rhc2tjb25maWcvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9zeXN0ZW1wcm9wZXJ0aWVzL2xhbmd1YWdlLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIuanNvbj92PVwiICsgdGltZXNcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiL2xhbmd1YWdlL2Jhc2VDb25maWcvdmlkZW9TdHJ1Y3R1cmUvbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9jb21tb24vbGFuZ3VhZ2UtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcIi5qc29uP3Y9XCIgKyB0aW1lc1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCIvbGFuZ3VhZ2UvYmFzZUNvbmZpZy9tYXBSZXNvdXJjZS9sYW5ndWFnZS1cIixcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiLmpzb24/dj1cIiArIHRpbWVzXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdHJhbnNsYXRlUHJvdmlkZXIucHJlZmVycmVkTGFuZ3VhZ2UoJ2NuJyk7XHJcbiAgICAgICAgLy8gRW5hYmxlIGVzY2FwaW5nIG9mIEhUTUxcclxuICAgICAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KCdlc2NhcGVQYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hcHAuY29uZmlnKEFuZ3VsYXJUcmFuc2xhdGVDb25maWcpOyJdfQ==
