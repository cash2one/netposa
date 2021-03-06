define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceTypeEnum = [
        { value: "All", text: "全部" },
        { value: "Face", text: "人像" },
        { value: "Vehicle", text: "车辆" },
        { value: "Camera", text: "摄像机" },
        { value: "RfiD", text: "RFID" },
        { value: "WiFi", text: "WiFi" },
        { value: "LOCATION", text: "位置" },
        { value: "EFENCE", text: "电子围栏" },
        { value: "RmpGate", text: "卡口" },
        { value: "Device", text: "设备" },
        { value: "DeviceCamera", text: "设备：像机" },
        { value: "DeviceWiFi", text: "设备：WiFi" },
        { value: "DeviceRmpGate", text: "设备：卡口" },
        { value: "DeviceEFENCE", text: "设备：电围" }
    ];
    var func = (function () {
        var resouceType = {}, All = exports.ResourceTypeEnum[0], Face = exports.ResourceTypeEnum[1], Vehicle = exports.ResourceTypeEnum[2], Camera = exports.ResourceTypeEnum[3], Rfid = exports.ResourceTypeEnum[4], Wifi = exports.ResourceTypeEnum[5], Location = exports.ResourceTypeEnum[6], ElecttonicFence = exports.ResourceTypeEnum[7], RmpGate = exports.ResourceTypeEnum[8];
        if (Face) {
            resouceType[Face.value] = Face.text;
        }
        if (Vehicle) {
            resouceType[Vehicle.value] = Vehicle.text;
        }
        if (Camera) {
            resouceType[Camera.value] = Camera.text;
        }
        if (Rfid) {
            resouceType[Rfid.value] = Rfid.text;
        }
        if (Wifi) {
            resouceType[Wifi.value] = Wifi.text;
        }
        if (Location) {
            resouceType[Location.value] = Location.text;
        }
        if (ElecttonicFence) {
            resouceType[ElecttonicFence.value] = ElecttonicFence.text;
        }
        if (RmpGate) {
            resouceType[RmpGate.value] = RmpGate.text;
        }
        return function (type) {
            return (resouceType[type]);
        };
    })();
    exports.GetResourceType = func;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9lbnVtL1Jlc291cmNlVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLYSxRQUFBLGdCQUFnQixHQUFHO1FBRTVCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1FBRTVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1FBRTdCLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1FBRWhDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBRWhDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBRS9CLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBRS9CLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1FBRWpDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBRWpDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1FBRWhDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1FBRS9CLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1FBRXhDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1FBRXhDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1FBRXpDLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0tBQ04sQ0FBQztJQUt2QyxJQUFJLElBQUksR0FBYSxDQUFDO1FBQ2xCLElBQUksV0FBVyxHQUFHLEVBQStCLEVBQzdDLEdBQUcsR0FBRyx3QkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFDekIsSUFBSSxHQUFHLHdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUMxQixPQUFPLEdBQUcsd0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQzdCLE1BQU0sR0FBRyx3QkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFDNUIsSUFBSSxHQUFHLHdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUMxQixJQUFJLEdBQUcsd0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQzFCLFFBQVEsR0FBRyx3QkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFDOUIsZUFBZSxHQUFHLHdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUNyQyxPQUFPLEdBQUcsd0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM5QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNULFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUM1QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNsQixXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDOUQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVixXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDOUMsQ0FBQztRQUVELE1BQU0sQ0FBQyxVQUFVLElBQVk7WUFDekIsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVNLFFBQUEsZUFBZSxHQUFHLElBQWdDLENBQUMiLCJmaWxlIjoiY29yZS9zZXJ2ZXIvZW51bS9SZXNvdXJjZVR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6LWE5rqQ5qOA57Si5pCc57Si57G75Z6LLlxyXG4gKiBjcmVhdGUgYnkgem1wLlxyXG4gKiBAdGltZTogMjAxNy0wOC0yOVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFJlc291cmNlVHlwZUVudW0gPSBbXHJcbiAgICAvLyDlhajpg6hcclxuICAgIHsgdmFsdWU6IFwiQWxsXCIsIHRleHQ6IFwi5YWo6YOoXCIgfSxcclxuICAgIC8vIOS6uuWDj1xyXG4gICAgeyB2YWx1ZTogXCJGYWNlXCIsIHRleHQ6IFwi5Lq65YOPXCIgfSxcclxuICAgIC8vIOi9pui+hlxyXG4gICAgeyB2YWx1ZTogXCJWZWhpY2xlXCIsIHRleHQ6IFwi6L2m6L6GXCIgfSxcclxuICAgIC8vIOaRhOWDj+aculxyXG4gICAgeyB2YWx1ZTogXCJDYW1lcmFcIiwgdGV4dDogXCLmkYTlg4/mnLpcIiB9LFxyXG4gICAgLy8gUkZJRFxyXG4gICAgeyB2YWx1ZTogXCJSZmlEXCIsIHRleHQ6IFwiUkZJRFwiIH0sXHJcbiAgICAvLyBXSUZJXHJcbiAgICB7IHZhbHVlOiBcIldpRmlcIiwgdGV4dDogXCJXaUZpXCIgfSxcclxuICAgIC8vIExPQ0FUSU9OXHJcbiAgICB7IHZhbHVlOiBcIkxPQ0FUSU9OXCIsIHRleHQ6IFwi5L2N572uXCIgfSxcclxuICAgIC8vIEVsZWN0cm9uaWNGZW5jZVxyXG4gICAgeyB2YWx1ZTogXCJFRkVOQ0VcIiwgdGV4dDogXCLnlLXlrZDlm7TmoI9cIiB9LFxyXG4gICAgLy8gUm1wR2F0ZVxyXG4gICAgeyB2YWx1ZTogXCJSbXBHYXRlXCIsIHRleHQ6IFwi5Y2h5Y+jXCIgfSxcclxuICAgIC8vIOiuvuWkh1xyXG4gICAgeyB2YWx1ZTogXCJEZXZpY2VcIiwgdGV4dDogXCLorr7lpIdcIiB9LFxyXG4gICAgLy8g5pGE5YOP5py66K6+5aSHXHJcbiAgICB7IHZhbHVlOiBcIkRldmljZUNhbWVyYVwiLCB0ZXh0OiBcIuiuvuWkh++8muWDj+aculwiIH0sXHJcbiAgICAvLyBXaUZp6K6+5aSHXHJcbiAgICB7IHZhbHVlOiBcIkRldmljZVdpRmlcIiwgdGV4dDogXCLorr7lpIfvvJpXaUZpXCIgfSxcclxuICAgIC8vIOWNoeWPo+iuvuWkh1xyXG4gICAgeyB2YWx1ZTogXCJEZXZpY2VSbXBHYXRlXCIsIHRleHQ6IFwi6K6+5aSH77ya5Y2h5Y+jXCIgfSxcclxuICAgIC8vIOeUteWtkOWbtOagj+iuvuWkh1xyXG4gICAgeyB2YWx1ZTogXCJEZXZpY2VFRkVOQ0VcIiwgdGV4dDogXCLorr7lpIfvvJrnlLXlm7RcIiB9XHJcbl0gYXMgeyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfVtdO1xyXG5cclxuLyoqXHJcbiAqIOi/lOWbnuaRhOWDj+acuuiuvuWkh+exu+Wei+WQjeensC5cclxuICovXHJcbmxldCBmdW5jOiBGdW5jdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcmVzb3VjZVR5cGUgPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LFxyXG4gICAgICAgIEFsbCA9IFJlc291cmNlVHlwZUVudW1bMF0sXHJcbiAgICAgICAgRmFjZSA9IFJlc291cmNlVHlwZUVudW1bMV0sXHJcbiAgICAgICAgVmVoaWNsZSA9IFJlc291cmNlVHlwZUVudW1bMl0sXHJcbiAgICAgICAgQ2FtZXJhID0gUmVzb3VyY2VUeXBlRW51bVszXSxcclxuICAgICAgICBSZmlkID0gUmVzb3VyY2VUeXBlRW51bVs0XSxcclxuICAgICAgICBXaWZpID0gUmVzb3VyY2VUeXBlRW51bVs1XSxcclxuICAgICAgICBMb2NhdGlvbiA9IFJlc291cmNlVHlwZUVudW1bNl0sXHJcbiAgICAgICAgRWxlY3R0b25pY0ZlbmNlID0gUmVzb3VyY2VUeXBlRW51bVs3XSxcclxuICAgICAgICBSbXBHYXRlID0gUmVzb3VyY2VUeXBlRW51bVs4XTtcclxuXHJcblxyXG4gICAgaWYgKEZhY2UpIHtcclxuICAgICAgICByZXNvdWNlVHlwZVtGYWNlLnZhbHVlXSA9IEZhY2UudGV4dDtcclxuICAgIH1cclxuICAgIGlmIChWZWhpY2xlKSB7XHJcbiAgICAgICAgcmVzb3VjZVR5cGVbVmVoaWNsZS52YWx1ZV0gPSBWZWhpY2xlLnRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoQ2FtZXJhKSB7XHJcbiAgICAgICAgcmVzb3VjZVR5cGVbQ2FtZXJhLnZhbHVlXSA9IENhbWVyYS50ZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKFJmaWQpIHtcclxuICAgICAgICByZXNvdWNlVHlwZVtSZmlkLnZhbHVlXSA9IFJmaWQudGV4dDtcclxuICAgIH1cclxuICAgIGlmIChXaWZpKSB7XHJcbiAgICAgICAgcmVzb3VjZVR5cGVbV2lmaS52YWx1ZV0gPSBXaWZpLnRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoTG9jYXRpb24pIHtcclxuICAgICAgICByZXNvdWNlVHlwZVtMb2NhdGlvbi52YWx1ZV0gPSBMb2NhdGlvbi50ZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKEVsZWN0dG9uaWNGZW5jZSkge1xyXG4gICAgICAgIHJlc291Y2VUeXBlW0VsZWN0dG9uaWNGZW5jZS52YWx1ZV0gPSBFbGVjdHRvbmljRmVuY2UudGV4dDtcclxuICAgIH1cclxuICAgIGlmIChSbXBHYXRlKSB7XHJcbiAgICAgICAgcmVzb3VjZVR5cGVbUm1wR2F0ZS52YWx1ZV0gPSBSbXBHYXRlLnRleHQ7XHJcbiAgICB9XHJcbiAgICAvLyDpl63ljIUs5pyA57uI5L2c5Li65Ye95pWw6L+U5ZueXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChyZXNvdWNlVHlwZVt0eXBlXSk7XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgbGV0IEdldFJlc291cmNlVHlwZSA9IGZ1bmMgYXMgKHR5cGU6IHN0cmluZykgPT4gc3RyaW5nOyJdfQ==
