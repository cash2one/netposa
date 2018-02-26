define(["require", "exports", "../app/main.app", "./http.interceptor", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterceptorProvider = (function () {
        function InterceptorProvider($httpProvider) {
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
            $httpProvider.interceptors.push('httpInterceptor');
        }
        InterceptorProvider.$inject = ['$httpProvider'];
        return InterceptorProvider;
    }());
    exports.default = InterceptorProvider;
    main_app_1.app.config(InterceptorProvider);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ludGVyY2VwdG9ycy9pbnRlcmNlcHRvci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7UUFHSSw2QkFBWSxhQUFpQjtZQUl6QixFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDNUMsQ0FBQztZQUVELGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLCtCQUErQixDQUFDO1lBRTFGLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDakUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUUzRCxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFoQk0sMkJBQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBaUJ2QywwQkFBQztLQWxCRCxBQWtCQyxJQUFBO3NCQWxCb0IsbUJBQW1CO0lBb0J4QyxjQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9pbnRlcmNlcHRvcnMvaW50ZXJjZXB0b3IuY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gJy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCAnLi9odHRwLmludGVyY2VwdG9yJztcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJjZXB0b3JQcm92aWRlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cFByb3ZpZGVyJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHBQcm92aWRlcjphbnkpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyDku6XkuIvku6PnoIHnlKjkuo7kv67lpI1pZea1j+iniOWZqGFqYXjnvJPlrZjpl67pophcclxuICAgICAgICAvL2luaXRpYWxpemUgZ2V0IGlmIG5vdCB0aGVyZVxyXG4gICAgICAgIGlmICghJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmdldCkge1xyXG4gICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuZ2V0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZGlzYWJsZSBJRSBhamF4IHJlcXVlc3QgY2FjaGluZ1xyXG4gICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5nZXRbJ0lmLU1vZGlmaWVkLVNpbmNlJ10gPSAnTW9uLCAyNiBKdWwgMTk5NyAwNTowMDowMCBHTVQnO1xyXG4gICAgICAgIC8vIGV4dHJhXHJcbiAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmdldFsnQ2FjaGUtQ29udHJvbCddID0gJ25vLWNhY2hlJztcclxuICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuZ2V0WydQcmFnbWEnXSA9ICduby1jYWNoZSc7XHJcblxyXG4gICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnaHR0cEludGVyY2VwdG9yJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb25maWcoSW50ZXJjZXB0b3JQcm92aWRlcik7Il19
