define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CollectAddParams = (function () {
        function CollectAddParams() {
        }
        return CollectAddParams;
    }());
    exports.CollectAddParams = CollectAddParams;
    var CollectDeleteParams = (function () {
        function CollectDeleteParams() {
        }
        return CollectDeleteParams;
    }());
    exports.CollectDeleteParams = CollectDeleteParams;
    function AmbitusList() {
        var data = [
            {
                id: 0,
                value: "车辆 ",
                key: "Vehicle",
                status: false
            }, {
                id: 1,
                value: "人像",
                key: "Face",
                status: false
            }, {
                id: 2,
                value: "WIFI",
                key: "WiFi",
                status: false
            }, {
                id: 3,
                value: "电围",
                key: "EFENCE",
                status: false
            }
        ];
        return data;
    }
    exports.AmbitusList = AmbitusList;
    var QueryPersionLibraryParams = (function () {
        function QueryPersionLibraryParams() {
        }
        return QueryPersionLibraryParams;
    }());
    exports.QueryPersionLibraryParams = QueryPersionLibraryParams;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudW0vUXVlcnlQYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFBQTtRQUlBLENBQUM7UUFBRCx1QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksNENBQWdCO0lBTzdCO1FBQUE7UUFFQSxDQUFDO1FBQUQsMEJBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLGtEQUFtQjtJQUtoQztRQUNJLElBQUksSUFBSSxHQUEwQjtZQUM5QjtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUUsU0FBUztnQkFDZCxNQUFNLEVBQUUsS0FBSzthQUNoQixFQUFFO2dCQUNDLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEtBQUssRUFBRSxJQUFJO2dCQUNYLEdBQUcsRUFBRSxNQUFNO2dCQUNYLE1BQU0sRUFBRSxLQUFLO2FBQ2hCLEVBQUU7Z0JBQ0MsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsTUFBTSxFQUFFLEtBQUs7YUFDaEIsRUFBRTtnQkFDQyxFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxHQUFHLEVBQUUsUUFBUTtnQkFDYixNQUFNLEVBQUUsS0FBSzthQUNoQjtTQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQXhCRCxrQ0F3QkM7SUFHRDtRQUFBO1FBWUEsQ0FBQztRQUFELGdDQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSw4REFBeUIiLCJmaWxlIjoiY29yZS9lbnVtL1F1ZXJ5UGFyYW1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5aSa6YCJ5Y+C5pWwXHJcbmV4cG9ydCBpbnRlcmZhY2UgbXVsdGlwbGVDaG9pY2Uge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIHN0YXR1cz86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIOa3u+WKoOaUtuiXj+WPguaVsFxyXG5leHBvcnQgY2xhc3MgQ29sbGVjdEFkZFBhcmFtcyB7XHJcbiAgICBqc29uOiBzdHJpbmc7XHJcbiAgICBvYmplY3RJRDogc3RyaW5nO1xyXG4gICAgb2JqZWN0VHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG4vLyDliKDpmaTmlLbol4/lj4LmlbBcclxuZXhwb3J0IGNsYXNzIENvbGxlY3REZWxldGVQYXJhbXMge1xyXG4gICAgaWRzOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIOaAp+WIq+WIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gQW1iaXR1c0xpc3QoKTogQXJyYXk8bXVsdGlwbGVDaG9pY2U+IHtcclxuICAgIGxldCBkYXRhOiBBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgdmFsdWU6IFwi6L2m6L6GIFwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiVmVoaWNsZVwiLFxyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgdmFsdWU6IFwi5Lq65YOPXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJGYWNlXCIsXHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2VcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICB2YWx1ZTogXCJXSUZJXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJXaUZpXCIsXHJcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2VcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICB2YWx1ZTogXCLnlLXlm7RcIixcclxuICAgICAgICAgICAga2V5OiBcIkVGRU5DRVwiLFxyXG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlXHJcbiAgICAgICAgfV07XHJcbiAgICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG4vLyDkurrlkZjmoaPmoYjlj4LmlbBcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5UGVyc2lvbkxpYnJhcnlQYXJhbXMge1xyXG4gICAgaW1hZ2VQYXRoOiBzdHJpbmc7IC8vIOS4iuS8oOWbvueJh+ivhuWIq+S6uuiEuFxyXG4gICAgYXJyTGliSWQ6IEFycmF5PHN0cmluZz47IC8vIOmAieS4reS6uuWDj+W6k1xyXG4gICAgdGhyZXNob2xkOiBudW1iZXI7IC8vIOebuOS8vOW6plxyXG4gICAgcmV0cmlldmFsUmVhc29uOiBzdHJpbmc7IC8vIOajgOe0ouS6i+eUsVxyXG4gICAgdGFza0lkOiBzdHJpbmc7XHJcbiAgICBmZWF0dXJlU2VhcmNoRXh0OiB7XHJcbiAgICAgICAgYWNjZXNzTG9nSWQ6IHN0cmluZztcclxuICAgICAgICBmZWF0dXJlVHlwZTogc3RyaW5nO1xyXG4gICAgICAgIGltZ1VybDogc3RyaW5nO1xyXG4gICAgICAgIGxpYklkOiBzdHJpbmc7XHJcbiAgICB9XHJcbn0iXX0=
