define(["require", "exports", "../app/main.app", "../../../core/enum/LayerType", "../../../core/server/enum/TaskStatus", "../../../core/server/enum/AuditStatus", "../../../core/server/enum/AuthStatus", "../../IntelligentAnalysis/AnalysisEnum", "../../../core/enum/ObjectType", "../../../core/enum/AlarmResponseState", "angular"], function (require, exports, main_app_1, LayerType_1, TaskStatus_1, AuditStatus_1, AuthStatus_1, AnalysisEnum_1, ObjectType_1, AlarmResponseState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultValue = (function () {
        function DefaultValue() {
        }
        DefaultValue.instance = function () {
            return function (value, defaultValue) {
                if (value == null) {
                    return defaultValue;
                }
                return value;
            };
        };
        return DefaultValue;
    }());
    var GetValueFromListByIndex = (function () {
        function GetValueFromListByIndex() {
        }
        GetValueFromListByIndex.instance = function () {
            return function (value, index, defaultValue) {
                defaultValue = defaultValue ? defaultValue : "";
                var len = 0, result = defaultValue;
                if (value && value.length > 0) {
                    len = value.length;
                    if (index > len - 1) {
                        index = len - 1;
                    }
                    result = value[index];
                }
                return result;
            };
        };
        return GetValueFromListByIndex;
    }());
    var AddImagePrefix = (function () {
        function AddImagePrefix() {
        }
        AddImagePrefix.instance = function () {
            return function (value, prefix) {
                if (value) {
                    value = prefix + value;
                }
                return value;
            };
        };
        return AddImagePrefix;
    }());
    var ToEnumText = (function () {
        function ToEnumText() {
        }
        ToEnumText.instance = function () {
            return function (enumClass, enumValue) {
                var len = 0, result = "未知";
                if (angular.isUndefined(enumClass) || angular.isUndefined(enumValue)) {
                    return result;
                }
                for (var k in enumClass) {
                    if (enumClass[k].value == enumValue) {
                        return enumClass[k].text;
                    }
                }
                return result;
            };
        };
        return ToEnumText;
    }());
    var IodEmu = {
        Wifi: { key: 'Wifi', value: 'Wi-Fi' },
        ElecFence: { key: 'ElecFence', value: '电子围栏' },
        Gate: { key: 'Gate', value: '卡口' },
        Camera: { key: 'Camera', value: '摄相机' }
    };
    var toIodText = (function () {
        function toIodText() {
        }
        toIodText.instance = function () {
            return function (value) {
                if (value == "0.000000") {
                    return '未知';
                }
                switch (value) {
                    case IodEmu.Wifi.key:
                        return IodEmu.Wifi.value;
                    case IodEmu.ElecFence.key:
                        return IodEmu.ElecFence.value;
                    case IodEmu.Gate.key:
                        return IodEmu.Gate.value;
                    case IodEmu.Camera.key:
                        return IodEmu.Camera.value;
                    default:
                        return '未知';
                }
            };
        };
        return toIodText;
    }());
    var CameraTypeEmu = {
        HighCamera: { key: 'HighCamera', value: '高清摄像机' },
        FaceCamera: { key: 'FaceCamera', value: '人脸摄像机' },
        CarCamera: { key: 'CarCamera', value: '车辆摄像机' },
        PortraitCamera: { key: 'PortraitCamera', value: '人像摄相机' }
    };
    var toCameraTypeText = (function () {
        function toCameraTypeText() {
        }
        toCameraTypeText.instance = function () {
            return function (value) {
                switch (value) {
                    case CameraTypeEmu.HighCamera.key:
                        return CameraTypeEmu.HighCamera.value;
                    case CameraTypeEmu.FaceCamera.key:
                        return CameraTypeEmu.FaceCamera.value;
                    case CameraTypeEmu.CarCamera.key:
                        return CameraTypeEmu.CarCamera.value;
                    case CameraTypeEmu.PortraitCamera.key:
                        return CameraTypeEmu.PortraitCamera.value;
                    default:
                        return '未知';
                }
            };
        };
        return toCameraTypeText;
    }());
    var ToEntryTypeFilter = (function () {
        function ToEntryTypeFilter() {
        }
        ToEntryTypeFilter.instance = function () {
            var map = {};
            for (var k in LayerType_1.LayerType) {
                map[LayerType_1.LayerType[k].value] = LayerType_1.LayerType[k].text;
            }
            return function (val, defaultStr) {
                return map[val] || defaultStr;
            };
        };
        return ToEntryTypeFilter;
    }());
    var MonitorStatus = (function () {
        function MonitorStatus() {
        }
        MonitorStatus.instance = function () {
            return function (value) {
                switch (value) {
                    case TaskStatus_1.TaskStatus.Run.value:
                        return TaskStatus_1.TaskStatus.Run.text;
                    case TaskStatus_1.TaskStatus.Overdue.value:
                        return TaskStatus_1.TaskStatus.Overdue.text;
                    case TaskStatus_1.TaskStatus.Waiting.value:
                        return TaskStatus_1.TaskStatus.Waiting.text;
                    case TaskStatus_1.TaskStatus.Stop.value:
                        return TaskStatus_1.TaskStatus.Stop.text;
                    default:
                        return '未知';
                }
            };
        };
        return MonitorStatus;
    }());
    var AuditStatusFilter = (function () {
        function AuditStatusFilter() {
        }
        AuditStatusFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case AuditStatus_1.AuditStatus.Refuse.value:
                        return AuditStatus_1.AuditStatus.Refuse.text;
                    case AuditStatus_1.AuditStatus.Verifing.value:
                        return AuditStatus_1.AuditStatus.Verifing.text;
                    case AuditStatus_1.AuditStatus.Verified.value:
                        return AuditStatus_1.AuditStatus.Verified.text;
                    default:
                        return '未知';
                }
            };
        };
        return AuditStatusFilter;
    }());
    var AuthStatus = (function () {
        function AuthStatus() {
        }
        AuthStatus.instance = function () {
            return function (value) {
                switch (value) {
                    case AuthStatus_1.AuthStatus.Self.value:
                        return AuthStatus_1.AuthStatus.Self.text;
                    case AuthStatus_1.AuthStatus.Part.value:
                        return AuthStatus_1.AuthStatus.Part.text;
                    case AuthStatus_1.AuthStatus.EveryBody.value:
                        return AuthStatus_1.AuthStatus.EveryBody.text;
                    default:
                        return '未知';
                }
            };
        };
        return AuthStatus;
    }());
    var CarType = (function () {
        function CarType() {
        }
        CarType.instance = function () {
            return function (value) {
                switch (value) {
                    case 'Black':
                        return '黑名单';
                    case 'White':
                        return '白名单';
                    case 'Red':
                        return '红名单';
                    default:
                        return '未知';
                }
            };
        };
        return CarType;
    }());
    var CheckAuthority = (function () {
        function CheckAuthority() {
        }
        CheckAuthority.$inject = ['mouleList'];
        CheckAuthority.instance = function (mouleList) {
            return function (key) {
                if (!!mouleList[key]) {
                    return true;
                }
                return false;
            };
        };
        return CheckAuthority;
    }());
    var ImageUrlFilter = (function () {
        function ImageUrlFilter() {
        }
        ImageUrlFilter.instance = function () {
            return function (url) {
                var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
                var objExp = new RegExp(Expression);
                if (objExp.test(url) == true) {
                    return url;
                }
                else {
                    return "/bigdata/images/" + url;
                }
            };
        };
        return ImageUrlFilter;
    }());
    var GenderFilter = (function () {
        function GenderFilter() {
        }
        GenderFilter.instance = function () {
            return function (value) {
                if (value == '0' || value === 'Men') {
                    return '男';
                }
                else if (value == '1' || value === 'Women') {
                    return '女';
                }
                else {
                    return '未知';
                }
            };
        };
        return GenderFilter;
    }());
    var RoundNumber = (function () {
        function RoundNumber() {
        }
        RoundNumber.instance = function () {
            return function (value) {
                if ((typeof value).toLocaleLowerCase() === 'number') {
                    return Math.floor(value);
                }
                else {
                    return 0;
                }
            };
        };
        return RoundNumber;
    }());
    var MarkFilter = (function () {
        function MarkFilter() {
        }
        MarkFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case '0':
                        return '没戴口罩';
                    case '1':
                        return '戴口罩';
                    default:
                        return '未知';
                }
            };
        };
        return MarkFilter;
    }());
    var GlassFilter = (function () {
        function GlassFilter() {
        }
        GlassFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case 0:
                        return '太阳镜';
                    case 1:
                        return '普通眼镜';
                    default:
                        return '';
                }
            };
        };
        return GlassFilter;
    }());
    var IsPantsFilter = (function () {
        function IsPantsFilter() {
        }
        IsPantsFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case 0:
                        return '未穿短裤';
                    case 1:
                        return '穿短裤';
                    default:
                        return ' ';
                }
            };
        };
        return IsPantsFilter;
    }());
    var IsSleeveFilter = (function () {
        function IsSleeveFilter() {
        }
        IsSleeveFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case 0:
                        return '未穿短袖';
                    case 1:
                        return '穿短袖';
                    default:
                        return ' ';
                }
            };
        };
        return IsSleeveFilter;
    }());
    var MaskFilter = (function () {
        function MaskFilter() {
        }
        MaskFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case 0:
                        return '不戴口罩';
                    case 1:
                        return '带口罩';
                    default:
                        return '';
                }
            };
        };
        return MaskFilter;
    }());
    var OrientationFilter = (function () {
        function OrientationFilter() {
        }
        OrientationFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case '0':
                        return '朝右';
                    case '1':
                        return '朝后';
                    case '2':
                        return '朝左';
                    case '3':
                        return '朝前';
                    default:
                        return '未知';
                }
            };
        };
        return OrientationFilter;
    }());
    var SmileFilter = (function () {
        function SmileFilter() {
        }
        SmileFilter.instance = function () {
            return function (value) {
                switch (value) {
                    case 0:
                        return '没微笑';
                    case 1:
                        return '微笑';
                    default:
                        return ' ';
                }
            };
        };
        return SmileFilter;
    }());
    var HideUnknowFilter = (function () {
        function HideUnknowFilter() {
        }
        HideUnknowFilter.instance = function () {
            return function (value) {
                if (value === '未知') {
                    return '';
                }
                else {
                    return value;
                }
            };
        };
        return HideUnknowFilter;
    }());
    var AgeToGroupAge = (function () {
        function AgeToGroupAge() {
        }
        AgeToGroupAge.instance = function () {
            return function (value) {
                var ageData = AnalysisEnum_1.getAgeList();
                var result;
                for (var i = 0; i < ageData.length; i++) {
                    var item = ageData[i];
                    if (value >= item.value.minAge && value <= item.value.maxAge) {
                        result = item.text;
                        break;
                    }
                }
                return result ? result : '未知';
            };
        };
        return AgeToGroupAge;
    }());
    var ToFiltImgUrl = (function () {
        function ToFiltImgUrl() {
        }
        ToFiltImgUrl.instance = function () {
            return function (url) {
                if (!!url && angular.isString(url)) {
                    var filtImgUrl = void 0;
                    filtImgUrl = url.replace(/:6552/, ':6551');
                    return filtImgUrl;
                }
            };
        };
        return ToFiltImgUrl;
    }());
    var ToFiltSlice = (function () {
        function ToFiltSlice() {
        }
        ToFiltSlice.instance = function () {
            return function (arg, keyname, value) {
                if (arg && arg.length) {
                    return arg.slice(0, value);
                }
                else {
                    return [];
                }
            };
        };
        return ToFiltSlice;
    }());
    var ObjectTypeFilter = (function () {
        function ObjectTypeFilter() {
        }
        ObjectTypeFilter.instance = function () {
            var map = {};
            for (var k in ObjectType_1.ObjectType) {
                map[ObjectType_1.ObjectType[k].value] = ObjectType_1.ObjectType[k].text;
            }
            return function (val, defaultStr) {
                return map[val] || defaultStr;
            };
        };
        return ObjectTypeFilter;
    }());
    var AlarmResponseStateFilter = (function () {
        function AlarmResponseStateFilter() {
        }
        AlarmResponseStateFilter.instance = function () {
            var map = {};
            for (var k in AlarmResponseState_1.AlarmResponseState) {
                map[AlarmResponseState_1.AlarmResponseState[k].value] = AlarmResponseState_1.AlarmResponseState[k].text;
            }
            return function (val, defaultStr) {
                return map[val] || defaultStr;
            };
        };
        return AlarmResponseStateFilter;
    }());
    var IsLongEffectiveFilter = (function () {
        function IsLongEffectiveFilter() {
        }
        IsLongEffectiveFilter.instance = function () {
            return function (val) {
                if (val === '1' || val === 1 || val === 'true' || val === true) {
                    return true;
                }
                else {
                    return false;
                }
            };
        };
        return IsLongEffectiveFilter;
    }());
    main_app_1.app.filter("defaultValue", DefaultValue.instance);
    main_app_1.app.filter("getValueFromListByIndex", GetValueFromListByIndex.instance);
    main_app_1.app.filter("addImagePrefix", AddImagePrefix.instance);
    main_app_1.app.filter("toEnumTextFilter", ToEnumText.instance);
    main_app_1.app.filter("toIodTextFilter", toIodText.instance);
    main_app_1.app.filter('monitorStatus', MonitorStatus.instance);
    main_app_1.app.filter('authStatus', AuthStatus.instance);
    main_app_1.app.filter('carType', CarType.instance);
    main_app_1.app.filter('auditStatusFilter', AuditStatusFilter.instance);
    main_app_1.app.filter("checkAuthority", CheckAuthority.instance);
    main_app_1.app.filter('cameraTypeFilter', toCameraTypeText.instance);
    main_app_1.app.filter('imageUrlFilter', ImageUrlFilter.instance);
    main_app_1.app.filter('genderFilter', GenderFilter.instance);
    main_app_1.app.filter('roundNumber', RoundNumber.instance);
    main_app_1.app.filter('markFilter', MarkFilter.instance);
    main_app_1.app.filter('glassFilter', GlassFilter.instance);
    main_app_1.app.filter('ageToGroupAge', AgeToGroupAge.instance);
    main_app_1.app.filter('toFiltImgUrl', ToFiltImgUrl.instance);
    main_app_1.app.filter('hideUnknowFilter', HideUnknowFilter.instance);
    main_app_1.app.filter('isPantsFilter', IsPantsFilter.instance);
    main_app_1.app.filter('isSleeveFilter', IsSleeveFilter.instance);
    main_app_1.app.filter('maskFilter', MaskFilter.instance);
    main_app_1.app.filter('orientationFilter', OrientationFilter.instance);
    main_app_1.app.filter('smileFilter', SmileFilter.instance);
    main_app_1.app.filter('toFiltSlice', ToFiltSlice.instance);
    main_app_1.app.filter('objectTypeFilter', ObjectTypeFilter.instance);
    main_app_1.app.filter('toEntryTypeFilter', ToEntryTypeFilter.instance);
    main_app_1.app.filter('alarmResponseStateFilter', AlarmResponseStateFilter.instance);
    main_app_1.app.filter('isLongEffectiveFilter', IsLongEffectiveFilter.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZpbHRlci9hcHAuZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBO1FBQUE7UUFVQSxDQUFDO1FBUlUscUJBQVEsR0FBRztZQUNkLE1BQU0sQ0FBQyxVQUFVLEtBQVUsRUFBRSxZQUFvQjtnQkFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUE7UUFDTCxtQkFBQztLQVZELEFBVUMsSUFBQTtJQUVEO1FBQUE7UUFlQSxDQUFDO1FBZFUsZ0NBQVEsR0FBRztZQUNkLE1BQU0sQ0FBQyxVQUFVLEtBQWlCLEVBQUUsS0FBYSxFQUFFLFlBQW9CO2dCQUNuRSxZQUFZLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxZQUFZLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixDQUFDO29CQUNELE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUE7UUFDTCw4QkFBQztLQWZELEFBZUMsSUFBQTtJQUVE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cUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZpbHRlci9hcHAuZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMTEuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5pbXBvcnQge0xheWVyVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9MYXllclR5cGVcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIERlZmF1bHRWYWx1ZSB7XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2V0VmFsdWVGcm9tTGlzdEJ5SW5kZXgge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IEFycmF5PGFueT4sIGluZGV4OiBudW1iZXIsIGRlZmF1bHRWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZSA/IGRlZmF1bHRWYWx1ZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSAwLCByZXN1bHQgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZW4gPSB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBsZW4gLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWVbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBZGRJbWFnZVByZWZpeCB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nLCBwcmVmaXg6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcHJlZml4ICsgdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqIGNyZWF0ZSBieSB6eHFcclxuICogIOaemuS4viDmoLnmja7mnprkuL7nsbsg44CB5p6a5Li+6ZSu5YC8IOiOt+WPliDlr7nlupTnmoQgdmFsdWVcclxuICogQHRpbWU6IDIwMTctMDYtMTUgMTU6NTM6MjNcclxuICogQHBhcmFtczogZW51bUNsYXNzIOaemuS4vuaVsOaNru+8jGVudW1WYWx1ZSDmnprkuL4gdmFsdWXlgLxcclxuICogQHJldHVybjogZW51bVRleHQgOnN0cmluZyDmnprkuL7nsbvlnosgdGV4dCDlgLzvvIzmib7kuI3liLAg6buY6K6kIOacquefpVxyXG4gKi9cclxuY2xhc3MgVG9FbnVtVGV4dCB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbnVtQ2xhc3M6IGFueSwgZW51bVZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IDAsIHJlc3VsdCA9IFwi5pyq55+lXCI7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGVudW1DbGFzcykgfHwgYW5ndWxhci5pc1VuZGVmaW5lZChlbnVtVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgaW4gZW51bUNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW51bUNsYXNzW2tdLnZhbHVlID09IGVudW1WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnVtQ2xhc3Nba10udGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgSW9kRW11ID0ge1xyXG4gICAgV2lmaToge2tleTogJ1dpZmknLCB2YWx1ZTogJ1dpLUZpJ30sXHJcbiAgICBFbGVjRmVuY2U6IHtrZXk6ICdFbGVjRmVuY2UnLCB2YWx1ZTogJ+eUteWtkOWbtOagjyd9LFxyXG4gICAgR2F0ZToge2tleTogJ0dhdGUnLCB2YWx1ZTogJ+WNoeWPoyd9LFxyXG4gICAgQ2FtZXJhOiB7a2V5OiAnQ2FtZXJhJywgdmFsdWU6ICfmkYTnm7jmnLonfVxyXG59O1xyXG5cclxuY2xhc3MgdG9Jb2RUZXh0IHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiMC4wMDAwMDBcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICfmnKrnn6UnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJb2RFbXUuV2lmaS5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElvZEVtdS5XaWZpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJb2RFbXUuRWxlY0ZlbmNlLmtleTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSW9kRW11LkVsZWNGZW5jZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgSW9kRW11LkdhdGUua2V5OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJb2RFbXUuR2F0ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgSW9kRW11LkNhbWVyYS5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElvZEVtdS5DYW1lcmEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyq55+lJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBDYW1lcmFUeXBlRW11ID0ge1xyXG4gICAgSGlnaENhbWVyYToge2tleTogJ0hpZ2hDYW1lcmEnLCB2YWx1ZTogJ+mrmOa4heaRhOWDj+acuid9LFxyXG4gICAgRmFjZUNhbWVyYToge2tleTogJ0ZhY2VDYW1lcmEnLCB2YWx1ZTogJ+S6uuiEuOaRhOWDj+acuid9LFxyXG4gICAgQ2FyQ2FtZXJhOiB7a2V5OiAnQ2FyQ2FtZXJhJywgdmFsdWU6ICfovabovobmkYTlg4/mnLonfSxcclxuICAgIFBvcnRyYWl0Q2FtZXJhOiB7a2V5OiAnUG9ydHJhaXRDYW1lcmEnLCB2YWx1ZTogJ+S6uuWDj+aRhOebuOacuid9XHJcbn07XHJcblxyXG5jbGFzcyB0b0NhbWVyYVR5cGVUZXh0IHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDYW1lcmFUeXBlRW11LkhpZ2hDYW1lcmEua2V5OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDYW1lcmFUeXBlRW11LkhpZ2hDYW1lcmEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENhbWVyYVR5cGVFbXUuRmFjZUNhbWVyYS5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENhbWVyYVR5cGVFbXUuRmFjZUNhbWVyYS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ2FtZXJhVHlwZUVtdS5DYXJDYW1lcmEua2V5OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDYW1lcmFUeXBlRW11LkNhckNhbWVyYS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ2FtZXJhVHlwZUVtdS5Qb3J0cmFpdENhbWVyYS5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENhbWVyYVR5cGVFbXUuUG9ydHJhaXRDYW1lcmEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyq55+lJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb0VudHJ5VHlwZUZpbHRlciB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG1hcCA9IHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBMYXllclR5cGUpIHtcclxuICAgICAgICAgICAgbWFwW0xheWVyVHlwZVtrXS52YWx1ZV0gPSBMYXllclR5cGVba10udGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWw6IHN0cmluZywgZGVmYXVsdFN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBbdmFsXSB8fCBkZWZhdWx0U3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW1wb3J0IHtUYXNrU3RhdHVzfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UYXNrU3RhdHVzXCI7XHJcblxyXG5jbGFzcyBNb25pdG9yU3RhdHVzIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdHVzLlJ1bi52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGFza1N0YXR1cy5SdW4udGV4dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXR1cy5PdmVyZHVlLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdHVzLk92ZXJkdWUudGV4dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXR1cy5XYWl0aW5nLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdHVzLldhaXRpbmcudGV4dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXR1cy5TdG9wLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdHVzLlN0b3AudGV4dDtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfmnKrnn6UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbXBvcnQge0F1ZGl0U3RhdHVzfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BdWRpdFN0YXR1c1wiO1xyXG5cclxuY2xhc3MgQXVkaXRTdGF0dXNGaWx0ZXIge1xyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEF1ZGl0U3RhdHVzLlJlZnVzZS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXVkaXRTdGF0dXMuUmVmdXNlLnRleHQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEF1ZGl0U3RhdHVzLlZlcmlmaW5nLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBdWRpdFN0YXR1cy5WZXJpZmluZy50ZXh0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBBdWRpdFN0YXR1cy5WZXJpZmllZC52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXVkaXRTdGF0dXMuVmVyaWZpZWQudGV4dDtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfmnKrnn6UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbXBvcnQge0F1dGhTdGF0dXMgYXMgVGFza0F1dGh9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQXV0aFN0YXR1cydcclxuXHJcbmNsYXNzIEF1dGhTdGF0dXMge1xyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tBdXRoLlNlbGYudmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRhc2tBdXRoLlNlbGYudGV4dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza0F1dGguUGFydC52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGFza0F1dGguUGFydC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrQXV0aC5FdmVyeUJvZHkudmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRhc2tBdXRoLkV2ZXJ5Qm9keS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+acquefpSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENhclR5cGUge1xyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdCbGFjayc6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfpu5HlkI3ljZUnO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnV2hpdGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn55m95ZCN5Y2VJztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfnuqLlkI3ljZUnO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+acquefpSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBjcmVhdGUgYnkgenloXHJcbiAqICDmnYPpmZDmjqfliLbnmoRrZXkg5Y+W5YC86L+H5ruk5ZmoXHJcbiAqIEB0aW1lOiAyMDE3LTA4LTAxXHJcbiAqIEBwYXJhbXM6IG1vdWxlTGlzdCDmnYPpmZBrZXlcclxuICogQHJldHVybjoga2V5IOmhtemdouWvueW6lOWKn+iDveaMiemSriDmnYPpmZDnmoQga2V5XHJcbiAqL1xyXG5jbGFzcyBDaGVja0F1dGhvcml0eSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnbW91bGVMaXN0J11cclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uIChtb3VsZUxpc3Q6IHsgW2tleTogc3RyaW5nXTogQm9vbGVhbiB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoISFtb3VsZUxpc3Rba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEltYWdlVXJsRmlsdGVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBFeHByZXNzaW9uID0gL2h0dHAocyk/OlxcL1xcLyhbXFx3LV0rXFwuKStbXFx3LV0rKFxcL1tcXHctIC5cXC8/JSY9XSopPy87XHJcbiAgICAgICAgICAgIGxldCBvYmpFeHAgPSBuZXcgUmVnRXhwKEV4cHJlc3Npb24pO1xyXG4gICAgICAgICAgICBpZiAob2JqRXhwLnRlc3QodXJsKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAvYmlnZGF0YS9pbWFnZXMvJHt1cmx9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2VuZGVyRmlsdGVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09ICcwJyB8fCB2YWx1ZSA9PT0gJ01lbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn55S3JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PSAnMScgfHwgdmFsdWUgPT09ICdXb21lbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5aWzJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5pyq55+lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUm91bmROdW1iZXIge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiB2YWx1ZSkudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbHVlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hcmtGaWx0ZXIge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+ayoeaItOWPo+e9qSc7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcxJzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+aItOWPo+e9qSc7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyq55+lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2xhc3NGaWx0ZXIge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICflpKrpmLPplZwnO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pmu6YCa55y86ZWcJztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBJc1BhbnRzRmlsdGVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyq56m/55+t6KOkJztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+epv+efreijpCc7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIElzU2xlZXZlRmlsdGVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyq56m/55+t6KKWJztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+epv+efreiilic7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hc2tGaWx0ZXIge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfkuI3miLTlj6PnvaknO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5bim5Y+j572pJztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPcmllbnRhdGlvbkZpbHRlciB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyd5Y+zJztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyd5ZCOJztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzInOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyd5bemJztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5pyd5YmNJztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfmnKrnn6UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTbWlsZUZpbHRlciB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+ayoeW+rueskSc7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICflvq7nrJEnO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBIaWRlVW5rbm93RmlsdGVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAn5pyq55+lJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmltcG9ydCB7Z2V0QWdlTGlzdCwgQWdlLCBFbnVtfSBmcm9tIFwiLi4vLi4vSW50ZWxsaWdlbnRBbmFseXNpcy9BbmFseXNpc0VudW1cIjtcclxuXHJcbmNsYXNzIEFnZVRvR3JvdXBBZ2Uge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgYWdlRGF0YSA9IGdldEFnZUxpc3QoKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFnZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtOiBFbnVtPEFnZT4gPSBhZ2VEYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID49IGl0ZW0udmFsdWUubWluQWdlICYmIHZhbHVlIDw9IGl0ZW0udmFsdWUubWF4QWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaXRlbS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgPyByZXN1bHQgOiAn5pyq55+lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBjcmVhdGUgYnkgenhxXHJcbiAqICDlm77niYfot6/lvoTov4fmu6TlmahcclxuICogQHRpbWU6IDIwMTctMDYtMTUgMTU6NTM6MjNcclxuICovXHJcbmNsYXNzIFRvRmlsdEltZ1VybCB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh1cmw6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoISF1cmwgJiYgYW5ndWxhci5pc1N0cmluZyh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsdEltZ1VybDogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgZmlsdEltZ1VybCA9IHVybC5yZXBsYWNlKC86NjU1Mi8sICc6NjU1MScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdEltZ1VybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9GaWx0U2xpY2Uge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJnOiBBcnJheTxhbnk+LCBrZXluYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKGFyZyAmJiBhcmcubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJnLnNsaWNlKDAsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPYmplY3RUeXBlRmlsdGVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbWFwID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgICAgICBmb3IgKGxldCBrIGluIE9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICAgbWFwW09iamVjdFR5cGVba10udmFsdWVdID0gT2JqZWN0VHlwZVtrXS50ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbDogc3RyaW5nLCBkZWZhdWx0U3RyOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFt2YWxdIHx8IGRlZmF1bHRTdHI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBbGFybVJlc3BvbnNlU3RhdGVGaWx0ZXIge1xyXG4gICAgc3RhdGljIGluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBtYXAgPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gQWxhcm1SZXNwb25zZVN0YXRlKSB7XHJcbiAgICAgICAgICAgIG1hcFtBbGFybVJlc3BvbnNlU3RhdGVba10udmFsdWVdID0gQWxhcm1SZXNwb25zZVN0YXRlW2tdLnRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsOiBzdHJpbmcsIGRlZmF1bHRTdHI6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwW3ZhbF0gfHwgZGVmYXVsdFN0cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIElzTG9uZ0VmZmVjdGl2ZUZpbHRlciB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWw6IHN0cmluZyAmIGJvb2xlYW4gJiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gJzEnIHx8IHZhbCA9PT0gMSB8fCB2YWwgPT09ICd0cnVlJyB8fCB2YWwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbXBvcnQge0FjY2Vzc0xvZ30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL0FjY2Vzc0xvZ1wiO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0IHtBbGFybVJlc3BvbnNlU3RhdGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9BbGFybVJlc3BvbnNlU3RhdGUnO1xyXG5pbXBvcnQge1BhZ2VQYXJhbXN9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL1BhZ2VQYXJhbXMnO1xyXG5cclxuXHJcbmFwcC5maWx0ZXIoXCJkZWZhdWx0VmFsdWVcIiwgRGVmYXVsdFZhbHVlLmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcihcImdldFZhbHVlRnJvbUxpc3RCeUluZGV4XCIsIEdldFZhbHVlRnJvbUxpc3RCeUluZGV4Lmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcihcImFkZEltYWdlUHJlZml4XCIsIEFkZEltYWdlUHJlZml4Lmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcihcInRvRW51bVRleHRGaWx0ZXJcIiwgVG9FbnVtVGV4dC5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoXCJ0b0lvZFRleHRGaWx0ZXJcIiwgdG9Jb2RUZXh0Lmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcignbW9uaXRvclN0YXR1cycsIE1vbml0b3JTdGF0dXMuaW5zdGFuY2UpO1xyXG5hcHAuZmlsdGVyKCdhdXRoU3RhdHVzJywgQXV0aFN0YXR1cy5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoJ2NhclR5cGUnLCBDYXJUeXBlLmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcignYXVkaXRTdGF0dXNGaWx0ZXInLCBBdWRpdFN0YXR1c0ZpbHRlci5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoXCJjaGVja0F1dGhvcml0eVwiLCBDaGVja0F1dGhvcml0eS5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoJ2NhbWVyYVR5cGVGaWx0ZXInLCB0b0NhbWVyYVR5cGVUZXh0Lmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcignaW1hZ2VVcmxGaWx0ZXInLCBJbWFnZVVybEZpbHRlci5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoJ2dlbmRlckZpbHRlcicsIEdlbmRlckZpbHRlci5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoJ3JvdW5kTnVtYmVyJywgUm91bmROdW1iZXIuaW5zdGFuY2UpO1xyXG5hcHAuZmlsdGVyKCdtYXJrRmlsdGVyJywgTWFya0ZpbHRlci5pbnN0YW5jZSk7XHJcbmFwcC5maWx0ZXIoJ2dsYXNzRmlsdGVyJywgR2xhc3NGaWx0ZXIuaW5zdGFuY2UpOy8v55y86ZWcXHJcbmFwcC5maWx0ZXIoJ2FnZVRvR3JvdXBBZ2UnLCBBZ2VUb0dyb3VwQWdlLmluc3RhbmNlKTtcclxuYXBwLmZpbHRlcigndG9GaWx0SW1nVXJsJywgVG9GaWx0SW1nVXJsLmluc3RhbmNlKTsvL+Wkp+aVsOaNruWcsOWdgFxyXG5hcHAuZmlsdGVyKCdoaWRlVW5rbm93RmlsdGVyJywgSGlkZVVua25vd0ZpbHRlci5pbnN0YW5jZSk7Ly/ov4fmu6TmnKrnn6VcclxuYXBwLmZpbHRlcignaXNQYW50c0ZpbHRlcicsIElzUGFudHNGaWx0ZXIuaW5zdGFuY2UpOyAvL+epv+efreijpFxyXG5hcHAuZmlsdGVyKCdpc1NsZWV2ZUZpbHRlcicsIElzU2xlZXZlRmlsdGVyLmluc3RhbmNlKTsgLy/nqb/nn63oopZcclxuYXBwLmZpbHRlcignbWFza0ZpbHRlcicsIE1hc2tGaWx0ZXIuaW5zdGFuY2UpOyAvL+W4pumdouWFt1xyXG5hcHAuZmlsdGVyKCdvcmllbnRhdGlvbkZpbHRlcicsIE9yaWVudGF0aW9uRmlsdGVyLmluc3RhbmNlKTsgLy/kurrohLjmnJ3lkJFcclxuYXBwLmZpbHRlcignc21pbGVGaWx0ZXInLCBTbWlsZUZpbHRlci5pbnN0YW5jZSk7IC8v5b6u56yRXHJcbmFwcC5maWx0ZXIoJ3RvRmlsdFNsaWNlJywgVG9GaWx0U2xpY2UuaW5zdGFuY2UpOyAvL+W+rueskVxyXG5hcHAuZmlsdGVyKCdvYmplY3RUeXBlRmlsdGVyJywgT2JqZWN0VHlwZUZpbHRlci5pbnN0YW5jZSk7IC8vIOWvueixoeexu+Wei+aemuS4vui/h+a7pOWZqFxyXG5hcHAuZmlsdGVyKCd0b0VudHJ5VHlwZUZpbHRlcicsIFRvRW50cnlUeXBlRmlsdGVyLmluc3RhbmNlKTsvL+eri+adhuWvueixoeexu+Wei+aemuS4vui/h+a7pOWZqFxyXG5hcHAuZmlsdGVyKCdhbGFybVJlc3BvbnNlU3RhdGVGaWx0ZXInLCBBbGFybVJlc3BvbnNlU3RhdGVGaWx0ZXIuaW5zdGFuY2UpO1xyXG5hcHAuZmlsdGVyKCdpc0xvbmdFZmZlY3RpdmVGaWx0ZXInLCBJc0xvbmdFZmZlY3RpdmVGaWx0ZXIuaW5zdGFuY2UpOyJdfQ==
