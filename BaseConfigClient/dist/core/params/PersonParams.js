var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./table/TableParams"], function (require, exports, TableParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonListParams = (function (_super) {
        __extends(PersonListParams, _super);
        function PersonListParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PersonListParams;
    }(TableParams_1.TableParams));
    exports.PersonListParams = PersonListParams;
    var PersonDeleteParams = (function () {
        function PersonDeleteParams() {
        }
        return PersonDeleteParams;
    }());
    exports.PersonDeleteParams = PersonDeleteParams;
    var PersonFindByIdParams = (function () {
        function PersonFindByIdParams() {
        }
        return PersonFindByIdParams;
    }());
    exports.PersonFindByIdParams = PersonFindByIdParams;
    var AreaAndPersonListResult = (function () {
        function AreaAndPersonListResult() {
        }
        return AreaAndPersonListResult;
    }());
    exports.AreaAndPersonListResult = AreaAndPersonListResult;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3BhcmFtcy9QZXJzb25QYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQVNBO1FBQXNDLG9DQUFXO1FBQWpEOztRQUtBLENBQUM7UUFBRCx1QkFBQztJQUFELENBTEEsQUFLQyxDQUxxQyx5QkFBVyxHQUtoRDtJQUxZLDRDQUFnQjtJQWE3QjtRQUFBO1FBRUEsQ0FBQztRQUFELHlCQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSxnREFBa0I7SUFTL0I7UUFBQTtRQUVBLENBQUM7UUFBRCwyQkFBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRlksb0RBQW9CO0lBd0JqQztRQUFBO1FBR0EsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSwwREFBdUIiLCJmaWxlIjoiY29yZS9wYXJhbXMvUGVyc29uUGFyYW1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYWJsZVBhcmFtc30gZnJvbSBcIi4vdGFibGUvVGFibGVQYXJhbXNcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7UGVyc29uVHJlZUV4fSBmcm9tIFwiLi4vZW50aXR5L2V4L1BlcnNvblRyZWVFeFwiO1xyXG4vKipcclxuICogIOeUqOaIt+euoeeQhuebuOWFs+eahOivt+axguWPguaVsFxyXG4gKiBAdGltZTogMjAxNy0wNC0xOCAxNjoyODoxNlxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBlcnNvbkxpc3RQYXJhbXMgZXh0ZW5kcyBUYWJsZVBhcmFtc3tcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGFyZWFJRDogc3RyaW5nO1xyXG4gICAgdW5pdElEOiBzdHJpbmc7XHJcbiAgICByb2xlSUQ/OnN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqICDmoLnmja5pZCBkZWxldGUg5Y2V5Liq55So5oi3XHJcbiAqIEB0aW1lOiAyMDE3LTA0LTE4IDE2OjI4OjE2XHJcbiAqIEBwYXJhbXM6XHJcbiAqIEByZXR1cm46XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGVyc29uRGVsZXRlUGFyYW1zIHtcclxuICAgaWQ6c3RyaW5nO1xyXG59XHJcbi8qKlxyXG4gKiAg5qC55o2uaWQg6I635Y+W6K+m5oOFXHJcbiAqIEB0aW1lOiAyMDE3LTA0LTIyIDEwOjI2OjQwXHJcbiAqIEBwYXJhbXM6XHJcbiAqIEByZXR1cm46XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGVyc29uRmluZEJ5SWRQYXJhbXMge1xyXG4gICAgaWQ6c3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogIOagueaNrmlkcyBkZWxldGUg5Y2V5Liq55So5oi3XHJcbiAqIEB0aW1lOiAyMDE3LTA0LTE4IDE2OjI4OjE2XHJcbiAqIEBwYXJhbXM6IOWtl+espuS4suaVsOe7hFxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25EZWxldGVMaXN0UGFyYW1zIHtcclxuICAgIGlkczpBcnJheTxzdHJpbmc+O1xyXG59XHJcblxyXG4vKipcclxuICog55So5oi36K+l5Y+Y55So5oi354q25oCBXHJcbiAqIGlkczog55So5oi355qEaWTlrZfmrrUsIOWkmuS4qmlk55So6YCX5Y+36ZqU5byAXHJcbiAqIHN0YXR1czog5b2T5YmN54q25oCBXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbkNoYW5nZVN0YXR1c1BhcmFtc3tcclxuICAgIHVzZXJJZHM6IHN0cmluZztcclxuICAgIHN0YXR1czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFyZWFBbmRQZXJzb25MaXN0UmVzdWx0e1xyXG4gICAgYXJlYUV4TGlzdDpBcnJheTxBcmVhRXg+O1xyXG4gICAgcGVyc29uRXhMaXN0OkFycmF5PFBlcnNvblRyZWVFeD47XHJcbn0iXX0=
