define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CameraTypeEnum = [
        {
            value: "HighCamera",
            text: "高清摄像机"
        },
        {
            value: "FaceCamera",
            text: "人脸摄像机"
        },
        {
            value: "PortraitCamera",
            text: "人像摄像机"
        }
    ];
    var func = (function () {
        var cameraType = {}, highCamera = exports.CameraTypeEnum[0], faceCamera = exports.CameraTypeEnum[1], portraitCamera = exports.CameraTypeEnum[2];
        if (highCamera) {
            cameraType[highCamera.value] = highCamera.text;
        }
        if (faceCamera) {
            cameraType[faceCamera.value] = faceCamera.text;
        }
        if (portraitCamera) {
            cameraType[portraitCamera.value] = portraitCamera.text;
        }
        return function (type) {
            return (cameraType[type]);
        };
    })();
    exports.GetCameraType = func;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9lbnVtL0NhbWVyYVR5cGVFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdhLFFBQUEsY0FBYyxHQUFHO1FBQzFCO1lBQ0ksS0FBSyxFQUFFLFlBQVk7WUFDbkIsSUFBSSxFQUFFLE9BQU87U0FDaEI7UUFDRDtZQUNJLEtBQUssRUFBRSxZQUFZO1lBQ25CLElBQUksRUFBRSxPQUFPO1NBQ2hCO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLElBQUksRUFBRSxPQUFPO1NBQ2hCO0tBQXNDLENBQUM7SUFLNUMsSUFBSSxJQUFJLEdBQWEsQ0FBQztRQUNsQixJQUFJLFVBQVUsR0FBRyxFQUErQixFQUM1QyxVQUFVLEdBQUcsc0JBQWMsQ0FBQyxDQUFDLENBQUMsRUFDOUIsVUFBVSxHQUFHLHNCQUFjLENBQUMsQ0FBQyxDQUFDLEVBQzlCLGNBQWMsR0FBRyxzQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbkQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbkQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQzNELENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxJQUFZO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTSxRQUFBLGFBQWEsR0FBRyxJQUFnQyxDQUFDIiwiZmlsZSI6ImNvcmUvc2VydmVyL2VudW0vQ2FtZXJhVHlwZUVudW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNi8yOS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBDYW1lcmFUeXBlRW51bSA9IFtcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJIaWdoQ2FtZXJhXCIsXHJcbiAgICAgICAgdGV4dDogXCLpq5jmuIXmkYTlg4/mnLpcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJGYWNlQ2FtZXJhXCIsXHJcbiAgICAgICAgdGV4dDogXCLkurrohLjmkYTlg4/mnLpcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJQb3J0cmFpdENhbWVyYVwiLFxyXG4gICAgICAgIHRleHQ6IFwi5Lq65YOP5pGE5YOP5py6XCJcclxuICAgIH1dIGFzIHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH1bXTtcclxuXHJcbi8qKlxyXG4gKiDov5Tlm57mkYTlg4/mnLrorr7lpIfnsbvlnovlkI3np7AuXHJcbiAqL1xyXG5sZXQgZnVuYzogRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNhbWVyYVR5cGUgPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LFxyXG4gICAgICAgIGhpZ2hDYW1lcmEgPSBDYW1lcmFUeXBlRW51bVswXSxcclxuICAgICAgICBmYWNlQ2FtZXJhID0gQ2FtZXJhVHlwZUVudW1bMV0sXHJcbiAgICAgICAgcG9ydHJhaXRDYW1lcmEgPSBDYW1lcmFUeXBlRW51bVsyXTtcclxuXHJcbiAgICBpZiAoaGlnaENhbWVyYSkge1xyXG4gICAgICAgIGNhbWVyYVR5cGVbaGlnaENhbWVyYS52YWx1ZV0gPSBoaWdoQ2FtZXJhLnRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFjZUNhbWVyYSkge1xyXG4gICAgICAgIGNhbWVyYVR5cGVbZmFjZUNhbWVyYS52YWx1ZV0gPSBmYWNlQ2FtZXJhLnRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAocG9ydHJhaXRDYW1lcmEpIHtcclxuICAgICAgICBjYW1lcmFUeXBlW3BvcnRyYWl0Q2FtZXJhLnZhbHVlXSA9IHBvcnRyYWl0Q2FtZXJhLnRleHQ7XHJcbiAgICB9XHJcbiAgICAvLyDpl63ljIUs5pyA57uI5L2c5Li65Ye95pWw6L+U5ZueXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChjYW1lcmFUeXBlW3R5cGVdKTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBsZXQgR2V0Q2FtZXJhVHlwZSA9IGZ1bmMgYXMgKHR5cGU6IHN0cmluZykgPT4gc3RyaW5nOyJdfQ==