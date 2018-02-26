define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LayerIconEnum = (function () {
        function LayerIconEnum() {
        }
        return LayerIconEnum;
    }());
    exports.LayerIconEnum = LayerIconEnum;
    var MapLayerIconEnum = (function () {
        function MapLayerIconEnum() {
        }
        return MapLayerIconEnum;
    }());
    exports.MapLayerIconEnum = MapLayerIconEnum;
    exports.MapLayerIcon = {
        Camera: {
            Name: 'Camera',
            Text: '摄像机',
            LayerType: 'Camera',
            LayerTypeText: '摄像机',
            LayerIconURL: [
                '/images/map-icon/camera-normol-offline.png',
                '/images/map-icon/camera-normol-online.png',
                '/images/map-icon/camera-normol-default.png'
            ]
        },
        NormalCamera: {
            Name: 'NormalCamera',
            Text: '普通摄像机',
            LayerType: 'NormalCamera',
            LayerTypeText: '普通摄像机',
            LayerIconURL: [
                '/images/map-icon/camera-normol-offline.png',
                '/images/map-icon/camera-normol-online.png',
                '/images/map-icon/camera-normol-default.png'
            ]
        },
        HighCamera: {
            Name: 'HighCamera',
            Text: '高清摄像机',
            LayerType: 'HighCamera',
            LayerTypeText: '高清摄像机',
            LayerIconURL: [
                '/images/map-icon/camera-video-offline.png',
                '/images/map-icon/camera-video-online.png',
                '/images/map-icon/camera-video-default.png'
            ]
        },
        FaceCamera: {
            Name: 'FaceCamera',
            Text: '人脸摄像机',
            LayerType: 'FaceCamera',
            LayerTypeText: '人脸摄像机',
            LayerIconURL: [
                '/images/map-icon/face-video-offline.png',
                '/images/map-icon/face-video-online.png',
                '/images/map-icon/face-video-default.png'
            ]
        },
        PortraitCamera: {
            Name: 'PortraitCamera',
            Text: '人像摄像机',
            LayerType: 'PortraitCamera',
            LayerTypeText: '人像摄像机',
            LayerIconURL: [
                '/images/map-icon/portrait-video-offline.png',
                '/images/map-icon/portrait-video-online.png',
                '/images/map-icon/portrait-video-default.png'
            ]
        },
        WiFi: {
            Name: 'WiFi',
            Text: 'Wi-Fi',
            LayerType: 'WiFi',
            LayerTypeText: 'Wi-Fi',
            LayerIconURL: [
                '/images/map-icon/wifi-default-offline.png',
                '/images/map-icon/wifi-default-online.png',
                '/images/map-icon/wifi-default-default.png'
            ]
        },
        ElectronicFence: {
            Name: 'ElectronicFence',
            Text: '电子围栏',
            LayerType: 'ElectronicFence',
            LayerTypeText: '电子围栏',
            LayerIconURL: [
                '/images/map-icon/electronifence-offline.png',
                '/images/map-icon/electronifence-online.png',
                '/images/map-icon/electronifence-default.png'
            ]
        },
        LampPost: {
            Name: 'LampPost',
            Text: '立杆',
            LayerType: 'LampPost',
            LayerTypeText: '立杆',
            LayerIconURL: [
                '/images/map-icon/lamp-default-offline.png',
                '/images/map-icon/lamp-default-online.png',
                '/images/map-icon/lamp-default.png'
            ]
        },
        RmpGate: {
            Name: 'RmpGate',
            Text: '卡口',
            LayerType: 'RmpGate',
            LayerTypeText: '卡口',
            LayerIconURL: [
                '/images/map-icon/car-bayonet-offline.png',
                '/images/map-icon/car-bayonet-online.png',
                '/images/map-icon/car-bayonet-default.png'
            ]
        },
        Unkown: {
            Name: 'Unkown',
            Text: '未知图层',
            LayerType: 'Unkown',
            LayerTypeText: '未知类型',
            LayerIconURL: [
                '/images/map/normal.png',
            ]
        },
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudW0vTWFwTGF5ZXJJY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUFNQSxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLHNDQUFhO0lBUTFCO1FBQUE7UUFXQSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLDRDQUFnQjtJQWFoQixRQUFBLFlBQVksR0FBd0Q7UUFDN0UsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFDLFFBQVE7WUFDYixJQUFJLEVBQUMsS0FBSztZQUNWLFNBQVMsRUFBQyxRQUFRO1lBQ2xCLGFBQWEsRUFBQyxLQUFLO1lBQ25CLFlBQVksRUFBQztnQkFDVCw0Q0FBNEM7Z0JBQzVDLDJDQUEyQztnQkFDM0MsNENBQTRDO2FBQy9DO1NBQ0o7UUFDRCxZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUMsY0FBYztZQUNuQixJQUFJLEVBQUMsT0FBTztZQUNaLFNBQVMsRUFBQyxjQUFjO1lBQ3hCLGFBQWEsRUFBQyxPQUFPO1lBQ3JCLFlBQVksRUFBQztnQkFDVCw0Q0FBNEM7Z0JBQzVDLDJDQUEyQztnQkFDM0MsNENBQTRDO2FBQy9DO1NBQ0o7UUFDRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUMsWUFBWTtZQUNqQixJQUFJLEVBQUMsT0FBTztZQUNaLFNBQVMsRUFBQyxZQUFZO1lBQ3RCLGFBQWEsRUFBQyxPQUFPO1lBQ3JCLFlBQVksRUFBQztnQkFDVCwyQ0FBMkM7Z0JBQzNDLDBDQUEwQztnQkFDMUMsMkNBQTJDO2FBQzlDO1NBQ0o7UUFDRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUMsWUFBWTtZQUNqQixJQUFJLEVBQUMsT0FBTztZQUNaLFNBQVMsRUFBQyxZQUFZO1lBQ3RCLGFBQWEsRUFBQyxPQUFPO1lBQ3JCLFlBQVksRUFBQztnQkFDVCx5Q0FBeUM7Z0JBQ3pDLHdDQUF3QztnQkFDeEMseUNBQXlDO2FBQzVDO1NBQ0o7UUFDRCxjQUFjLEVBQUU7WUFDWixJQUFJLEVBQUMsZ0JBQWdCO1lBQ3JCLElBQUksRUFBQyxPQUFPO1lBQ1osU0FBUyxFQUFDLGdCQUFnQjtZQUMxQixhQUFhLEVBQUMsT0FBTztZQUNyQixZQUFZLEVBQUM7Z0JBQ1QsNkNBQTZDO2dCQUM3Qyw0Q0FBNEM7Z0JBQzVDLDZDQUE2QzthQUNoRDtTQUNKO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFDLE1BQU07WUFDWCxJQUFJLEVBQUMsT0FBTztZQUNaLFNBQVMsRUFBQyxNQUFNO1lBQ2hCLGFBQWEsRUFBQyxPQUFPO1lBQ3JCLFlBQVksRUFBQztnQkFDVCwyQ0FBMkM7Z0JBQzNDLDBDQUEwQztnQkFDMUMsMkNBQTJDO2FBQzlDO1NBQ0o7UUFDRCxlQUFlLEVBQUU7WUFDYixJQUFJLEVBQUMsaUJBQWlCO1lBQ3RCLElBQUksRUFBQyxNQUFNO1lBQ1gsU0FBUyxFQUFDLGlCQUFpQjtZQUMzQixhQUFhLEVBQUMsTUFBTTtZQUNwQixZQUFZLEVBQUM7Z0JBQ1QsNkNBQTZDO2dCQUM3Qyw0Q0FBNEM7Z0JBQzVDLDZDQUE2QzthQUNoRDtTQUNKO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFDLFVBQVU7WUFDZixJQUFJLEVBQUMsSUFBSTtZQUNULFNBQVMsRUFBQyxVQUFVO1lBQ3BCLGFBQWEsRUFBQyxJQUFJO1lBQ2xCLFlBQVksRUFBQztnQkFDVCwyQ0FBMkM7Z0JBQzNDLDBDQUEwQztnQkFDMUMsbUNBQW1DO2FBQ3RDO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUMsU0FBUztZQUNkLElBQUksRUFBQyxJQUFJO1lBQ1QsU0FBUyxFQUFDLFNBQVM7WUFDbkIsYUFBYSxFQUFDLElBQUk7WUFDbEIsWUFBWSxFQUFDO2dCQUNULDBDQUEwQztnQkFDMUMseUNBQXlDO2dCQUN6QywwQ0FBMEM7YUFDN0M7U0FDSjtRQUNELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBQyxRQUFRO1lBQ2IsSUFBSSxFQUFDLE1BQU07WUFDWCxTQUFTLEVBQUMsUUFBUTtZQUNsQixhQUFhLEVBQUMsTUFBTTtZQUNwQixZQUFZLEVBQUM7Z0JBQ1Qsd0JBQXdCO2FBQzNCO1NBQ0o7S0FDSixDQUFDIiwiZmlsZSI6ImNvcmUvZW51bS9NYXBMYXllckljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTGF5ZXJJY29uRW51bSB7XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBUZXh0OiBzdHJpbmc7XHJcbiAgICBMYXllclR5cGU6IHN0cmluZztcclxuICAgIExheWVyVHlwZVRleHQ6IHN0cmluZztcclxuICAgIExheWVySWNvblVSTDogQXJyYXk8c3RyaW5nPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hcExheWVySWNvbkVudW0ge1xyXG4gICAgQ2FtZXJhOiBMYXllckljb25FbnVtO1xyXG4gICAgTm9ybWFsQ2FtZXJhOiBMYXllckljb25FbnVtO1xyXG4gICAgSGlnaENhbWVyYTogTGF5ZXJJY29uRW51bTtcclxuICAgIEZhY2VDYW1lcmE6IExheWVySWNvbkVudW07XHJcbiAgICBQb3J0cmFpdENhbWVyYTogTGF5ZXJJY29uRW51bTtcclxuICAgIFdpRmk6IExheWVySWNvbkVudW07XHJcbiAgICBFbGVjdHJvbmljRmVuY2U6IExheWVySWNvbkVudW07XHJcbiAgICBMYW1wUG9zdDogTGF5ZXJJY29uRW51bTtcclxuICAgIFJtcEdhdGU6IExheWVySWNvbkVudW07XHJcbiAgICBVbmtvd246IExheWVySWNvbkVudW1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE1hcExheWVySWNvbjogeyBba2V5OiBzdHJpbmddOiBMYXllckljb25FbnVtIH0gJiBNYXBMYXllckljb25FbnVtID0ge1xyXG4gICAgQ2FtZXJhOiB7XHJcbiAgICAgICAgTmFtZTonQ2FtZXJhJyxcclxuICAgICAgICBUZXh0OifmkYTlg4/mnLonLFxyXG4gICAgICAgIExheWVyVHlwZTonQ2FtZXJhJyxcclxuICAgICAgICBMYXllclR5cGVUZXh0OifmkYTlg4/mnLonLFxyXG4gICAgICAgIExheWVySWNvblVSTDpbXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2NhbWVyYS1ub3Jtb2wtb2ZmbGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9jYW1lcmEtbm9ybW9sLW9ubGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9jYW1lcmEtbm9ybW9sLWRlZmF1bHQucG5nJ1xyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBOb3JtYWxDYW1lcmE6IHtcclxuICAgICAgICBOYW1lOidOb3JtYWxDYW1lcmEnLFxyXG4gICAgICAgIFRleHQ6J+aZrumAmuaRhOWDj+acuicsXHJcbiAgICAgICAgTGF5ZXJUeXBlOidOb3JtYWxDYW1lcmEnLFxyXG4gICAgICAgIExheWVyVHlwZVRleHQ6J+aZrumAmuaRhOWDj+acuicsXHJcbiAgICAgICAgTGF5ZXJJY29uVVJMOltcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vY2FtZXJhLW5vcm1vbC1vZmZsaW5lLnBuZycsXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2NhbWVyYS1ub3Jtb2wtb25saW5lLnBuZycsXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2NhbWVyYS1ub3Jtb2wtZGVmYXVsdC5wbmcnXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIEhpZ2hDYW1lcmE6IHtcclxuICAgICAgICBOYW1lOidIaWdoQ2FtZXJhJyxcclxuICAgICAgICBUZXh0Oifpq5jmuIXmkYTlg4/mnLonLFxyXG4gICAgICAgIExheWVyVHlwZTonSGlnaENhbWVyYScsXHJcbiAgICAgICAgTGF5ZXJUeXBlVGV4dDon6auY5riF5pGE5YOP5py6JyxcclxuICAgICAgICBMYXllckljb25VUkw6W1xyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9jYW1lcmEtdmlkZW8tb2ZmbGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9jYW1lcmEtdmlkZW8tb25saW5lLnBuZycsXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2NhbWVyYS12aWRlby1kZWZhdWx0LnBuZydcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgRmFjZUNhbWVyYToge1xyXG4gICAgICAgIE5hbWU6J0ZhY2VDYW1lcmEnLFxyXG4gICAgICAgIFRleHQ6J+S6uuiEuOaRhOWDj+acuicsXHJcbiAgICAgICAgTGF5ZXJUeXBlOidGYWNlQ2FtZXJhJyxcclxuICAgICAgICBMYXllclR5cGVUZXh0OifkurrohLjmkYTlg4/mnLonLFxyXG4gICAgICAgIExheWVySWNvblVSTDpbXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2ZhY2UtdmlkZW8tb2ZmbGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9mYWNlLXZpZGVvLW9ubGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9mYWNlLXZpZGVvLWRlZmF1bHQucG5nJ1xyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBQb3J0cmFpdENhbWVyYToge1xyXG4gICAgICAgIE5hbWU6J1BvcnRyYWl0Q2FtZXJhJyxcclxuICAgICAgICBUZXh0Oifkurrlg4/mkYTlg4/mnLonLFxyXG4gICAgICAgIExheWVyVHlwZTonUG9ydHJhaXRDYW1lcmEnLFxyXG4gICAgICAgIExheWVyVHlwZVRleHQ6J+S6uuWDj+aRhOWDj+acuicsXHJcbiAgICAgICAgTGF5ZXJJY29uVVJMOltcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vcG9ydHJhaXQtdmlkZW8tb2ZmbGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9wb3J0cmFpdC12aWRlby1vbmxpbmUucG5nJyxcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vcG9ydHJhaXQtdmlkZW8tZGVmYXVsdC5wbmcnXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIFdpRmk6IHtcclxuICAgICAgICBOYW1lOidXaUZpJyxcclxuICAgICAgICBUZXh0OidXaS1GaScsXHJcbiAgICAgICAgTGF5ZXJUeXBlOidXaUZpJyxcclxuICAgICAgICBMYXllclR5cGVUZXh0OidXaS1GaScsXHJcbiAgICAgICAgTGF5ZXJJY29uVVJMOltcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vd2lmaS1kZWZhdWx0LW9mZmxpbmUucG5nJyxcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vd2lmaS1kZWZhdWx0LW9ubGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi93aWZpLWRlZmF1bHQtZGVmYXVsdC5wbmcnXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIEVsZWN0cm9uaWNGZW5jZToge1xyXG4gICAgICAgIE5hbWU6J0VsZWN0cm9uaWNGZW5jZScsXHJcbiAgICAgICAgVGV4dDon55S15a2Q5Zu05qCPJyxcclxuICAgICAgICBMYXllclR5cGU6J0VsZWN0cm9uaWNGZW5jZScsXHJcbiAgICAgICAgTGF5ZXJUeXBlVGV4dDon55S15a2Q5Zu05qCPJyxcclxuICAgICAgICBMYXllckljb25VUkw6W1xyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9lbGVjdHJvbmlmZW5jZS1vZmZsaW5lLnBuZycsXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2VsZWN0cm9uaWZlbmNlLW9ubGluZS5wbmcnLFxyXG4gICAgICAgICAgICAnL2ltYWdlcy9tYXAtaWNvbi9lbGVjdHJvbmlmZW5jZS1kZWZhdWx0LnBuZydcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgTGFtcFBvc3Q6IHtcclxuICAgICAgICBOYW1lOidMYW1wUG9zdCcsXHJcbiAgICAgICAgVGV4dDon56uL5p2GJyxcclxuICAgICAgICBMYXllclR5cGU6J0xhbXBQb3N0JyxcclxuICAgICAgICBMYXllclR5cGVUZXh0Oifnq4vmnYYnLFxyXG4gICAgICAgIExheWVySWNvblVSTDpbXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2xhbXAtZGVmYXVsdC1vZmZsaW5lLnBuZycsXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2xhbXAtZGVmYXVsdC1vbmxpbmUucG5nJyxcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vbGFtcC1kZWZhdWx0LnBuZydcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgUm1wR2F0ZToge1xyXG4gICAgICAgIE5hbWU6J1JtcEdhdGUnLFxyXG4gICAgICAgIFRleHQ6J+WNoeWPoycsXHJcbiAgICAgICAgTGF5ZXJUeXBlOidSbXBHYXRlJyxcclxuICAgICAgICBMYXllclR5cGVUZXh0OifljaHlj6MnLFxyXG4gICAgICAgIExheWVySWNvblVSTDpbXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2Nhci1iYXlvbmV0LW9mZmxpbmUucG5nJyxcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwLWljb24vY2FyLWJheW9uZXQtb25saW5lLnBuZycsXHJcbiAgICAgICAgICAgICcvaW1hZ2VzL21hcC1pY29uL2Nhci1iYXlvbmV0LWRlZmF1bHQucG5nJ1xyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBVbmtvd246IHtcclxuICAgICAgICBOYW1lOidVbmtvd24nLFxyXG4gICAgICAgIFRleHQ6J+acquefpeWbvuWxgicsXHJcbiAgICAgICAgTGF5ZXJUeXBlOidVbmtvd24nLFxyXG4gICAgICAgIExheWVyVHlwZVRleHQ6J+acquefpeexu+WeiycsXHJcbiAgICAgICAgTGF5ZXJJY29uVVJMOltcclxuICAgICAgICAgICAgJy9pbWFnZXMvbWFwL25vcm1hbC5wbmcnLFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbn07Il19
