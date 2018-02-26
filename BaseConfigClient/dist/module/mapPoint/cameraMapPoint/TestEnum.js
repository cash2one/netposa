define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Capture = (function () {
        function Capture() {
        }
        return Capture;
    }());
    exports.Capture = Capture;
    var Alarm = (function () {
        function Alarm() {
        }
        return Alarm;
    }());
    exports.Alarm = Alarm;
    var carArr = [
        '../../images/mock/point/4苏E 208QA.PNG',
        '../../images/mock/point/6苏G LJ981.PNG',
        '../../images/mock/point/8苏G 39999.PNG',
        '../../images/mock/point/11苏G 2A379.PNG',
        '../../images/mock/point/13苏G 6U532.PNG',
        '../../images/mock/point/14苏G LX907.PNG',
        '../../images/mock/point/28苏G EH213.PNG',
        '../../images/mock/point/24苏G NG082.PNG',
        '../../images/mock/point/18苏G LH073.PNG',
        '../../images/mock/point/20苏G DE633.PNG'
    ];
    var adressArr = [
        '白色,小轿车',
        '黑色,小轿车',
        '白色,客车',
        '白色,suv',
        '白色,suv',
        '白色,客车',
        '蓝色,小轿车',
        '白色,客车',
        '黑色,小轿车',
        '白色,客车',
        '白色,小轿车',
        '白色,小轿车'
    ];
    var Car = (function () {
        function Car() {
        }
        return Car;
    }());
    exports.Car = Car;
    function MockCarList() {
        var arr = [];
        arr.push({
            LicensePlate: "苏G1C512",
            time: "2017-08-22 11:48:30",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/1苏G 1C512.PNG"
        });
        arr.push({
            LicensePlate: "苏GNB619",
            time: "2017-08-22 11:48:33",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/2苏G NB619.PNG"
        });
        arr.push({
            LicensePlate: "苏GJH006",
            time: "2017-08-22 11:48:36",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/3苏G JH006.PNG"
        });
        arr.push({
            LicensePlate: "苏E208QA",
            time: "2017-08-22 11:48:38",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/4苏E 208QA.PNG"
        });
        arr.push({
            LicensePlate: "苏G321A5",
            time: "2017-08-22 11:48:43",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/5苏G 321A5.PNG"
        });
        arr.push({
            LicensePlate: "苏GLJ981",
            time: "2017-08-22 11:48:45",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/6苏G LJ981.PNG"
        });
        arr.push({
            LicensePlate: "苏G23L161",
            time: "2017-08-22 11:48:50",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/7苏G 23L16.PNG"
        });
        arr.push({
            LicensePlate: "苏G39999",
            time: "2017-08-22 11:48:52",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/8苏G 39999.PNG"
        });
        arr.push({
            LicensePlate: "苏G836G6",
            time: "2017-08-22 11:48:59",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/9苏G 836G6.PNG"
        });
        arr.push({
            LicensePlate: "苏G1A167",
            time: "2017-08-22 11:49:01",
            address: "邮科院湖心桥与南山路1号",
            imgPath: "../../images/mock/point/10苏G 1A167.PNG"
        });
        return arr;
    }
    exports.MockCarList = MockCarList;
    function MockCaptureList(num, imageUrl) {
        var arr = [];
        for (var i = 0; i < carArr.length; i++) {
            arr.push({
                sex: Math.round(Math.random()),
                time: '2017-03-02 12:30:48',
                info: adressArr[i],
                color: 'red',
                isCollection: Math.round(Math.random()),
                image: carArr[i],
                isMonitor: Math.round(Math.random())
            });
        }
        return arr;
    }
    exports.MockCaptureList = MockCaptureList;
    var poiintarr = [
        {
            captrueImage: '../../images/mock/point/1苏G 1C512.PNG',
            matchNum: '苏G 1C512',
            cameraAddress: '关山大道保利国际中心',
            alarmTime: '2017-08-22 11:48:30',
            createUserName: '李洋',
            libName: '在逃库',
            name: 'Avril Lavigne',
            status: Math.round(Math.random()),
            isCollection: Math.round(Math.random()),
            sex: Math.round(Math.random()),
            cardNum: '420198125422044445',
            isHandle: Math.round(Math.random()),
        },
        {
            captrueImage: '../../images/mock/point/2苏G NB619.PNG',
            matchNum: '苏G NB619',
            cameraAddress: '关山大道保利国际中心',
            alarmTime: '2017-08-22 11:58:30',
            createUserName: '李洋',
            libName: '在逃库',
            name: 'Avril Lavigne',
            status: Math.round(Math.random()),
            isCollection: Math.round(Math.random()),
            sex: Math.round(Math.random()),
            cardNum: '420198125422044445',
            isHandle: Math.round(Math.random()),
        },
        {
            captrueImage: '../../images/mock/point/3苏G JH006.PNG',
            matchNum: '苏G JH006',
            cameraAddress: '关山大道保利国际中心',
            alarmTime: '2017-08-22 11:48:30',
            createUserName: '李洋',
            libName: '在逃库',
            name: 'Avril Lavigne',
            status: Math.round(Math.random()),
            isCollection: Math.round(Math.random()),
            sex: Math.round(Math.random()),
            cardNum: '420198125422044445',
            isHandle: Math.round(Math.random()),
        },
        {
            captrueImage: '../../images/mock/point/7苏G 23L16.PNG',
            matchNum: '苏G 23L16',
            cameraAddress: '关山大道保利国际中心',
            alarmTime: '2017-08-22 11:48:30',
            createUserName: '李洋',
            libName: '在逃库',
            name: 'Avril Lavigne',
            status: Math.round(Math.random()),
            isCollection: Math.round(Math.random()),
            sex: Math.round(Math.random()),
            cardNum: '420198125422044445',
            isHandle: Math.round(Math.random()),
        },
        {
            captrueImage: '../../images/mock/point/23苏D 096QN.PNG',
            matchNum: '苏D 096QN',
            cameraAddress: '关山大道保利国际中心',
            alarmTime: '2017-08-22 11:48:30',
            createUserName: '李洋',
            libName: '在逃库',
            name: 'Avril Lavigne',
            status: Math.round(Math.random()),
            isCollection: Math.round(Math.random()),
            sex: Math.round(Math.random()),
            cardNum: '420198125422044445',
            isHandle: Math.round(Math.random()),
        }
    ];
    var personAlarm = {
        "result": {
            "AlarmLog": {
                "AccessLogID": "440039209787499051",
                "AlarmTime": "2017-11-06 13:59:04",
                "AreaID": "8d16d49414704e32ac5abdee3ad9e717",
                "CapFacePicUrl": "pLOC:402201323/data/20171106/21/66c5118c9a1611189e64f52e779eae53_4914",
                "EventType": "Hight",
                "ID": "8eff4d251b4640e391c411d0649eaebb",
                "IsUpload": false,
                "Level": 0,
                "ObjectID": "cb42aeaecbb647eca80f65f35b09dcb1",
                "ObjectName": "",
                "ObjectType": "Camera",
                "ReceiveSubAlarmDateTime": "2017-11-06 13:59:04",
                "ResponseState": "Undisposed",
                "ResponseTime": "2017-11-06 13:59:04",
                "Similarty": 0,
                "TaskId": "2b3a38d128b044779cd9dd0ffad9ea53"
            },
            "AlarmLogInfoArr": [
                {
                    "AlarmLogInfo": {
                        "AlarmLogID": "8eff4d251b4640e391c411d0649eaebb",
                        "ID": "955256304497499051",
                        "LibID": "000008",
                        "PersonInfo": {
                            "Birth": "",
                            "CertifyingAuthority": "",
                            "FacePicPath": [
                                "pLOC:402201323/data_CAPTUREIMAGE/20171102/23/6e57f5566789c1d68289d03e9e93d3f1_1"
                            ],
                            "Gender": "0",
                            "HomeAddress": "",
                            "ID": "112774491489024000",
                            "IDCardNumber": "112774491489024000",
                            "LibId": "000008",
                            "Name": "周琦",
                            "Nation": "",
                            "userTag": "112774491489024000"
                        },
                        "Similarty": 45.16148658549079,
                        "SimilartyStatus": ""
                    },
                    "LibName": "zq",
                    "Memo": ""
                }
            ],
            "AlarmNum": 1,
            "AreaName": "unkown",
            "Attention": false,
            "Collected": false,
            "ResponsePersonName": "unkown"
        },
        "resultType": "SubcribeAlarmLog"
    };
    var personList = {
        "Age": 60,
        "AreaID": "8d16d49414704e32ac5abdee3ad9e717",
        "Attractive": -1,
        "BottomColor": 0,
        "CameraID": "cb42aeaecbb647eca80f65f35b09dcb1",
        "FaceConfidence": 99.7300033569336,
        "FaceFeature": "",
        "FacePath": "pLOC:402201323/data/20171106/21/66c5118c9a1611189e64f52e779eae53_4914",
        "FaceRect": "[{\"x\":27,\"y\":27},{\"x\":81,\"y\":27},{\"x\":81,\"y\":81},{\"x\":27,\"y\":81}]",
        "Gender": "Men",
        "Glass": -1,
        "HasextractAttribute": true,
        "HasextractFeature": false,
        "HasfaceFeature": false,
        "ID": "440039209787499051",
        "IsPants": 0,
        "IsSleeve": 0,
        "LogTime": "2017-11-06 13:57:59",
        "Mask": 0,
        "Orientation": 0,
        "PersonConfidence": 0,
        "Race": -1,
        "SaveTime": "2017-11-06 13:59:01",
        "ScenePath": "",
        "Smile": -1,
        "TaskID": "2b3a38d128b044779cd9dd0ffad9ea53",
        "Texture": 0,
        "UpperColor": 0
    };
    function MockAlarmList(num, imageUrl) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            var j = {
                "Age": 60,
                "AreaID": "8d16d49414704e32ac5abdee3ad9e717",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "cb42aeaecbb647eca80f65f35b09dcb1",
                "FaceConfidence": 99.7300033569336,
                "FaceFeature": "",
                "FacePath": "pLOC:402201323/data/20171106/21/66c5118c9a1611189e64f52e779eae53_4914",
                "FaceRect": "[{\"x\":27,\"y\":27},{\"x\":81,\"y\":27},{\"x\":81,\"y\":81},{\"x\":27,\"y\":81}]",
                "Gender": "Men",
                "Glass": -1,
                "HasextractAttribute": true,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "440039209787499051",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-11-06 13:57:59",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": 0,
                "Race": -1,
                "SaveTime": "2017-11-06 13:59:01",
                "ScenePath": "",
                "Smile": -1,
                "TaskID": "2b3a38d128b044779cd9dd0ffad9ea53",
                "Texture": 0,
                "UpperColor": 0
            };
            arr.push(j);
        }
        ;
        return arr;
    }
    exports.MockAlarmList = MockAlarmList;
    function MockAlarmList1(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            var j = {
                "AlarmLog": {
                    "AccessLogID": "442181332887599051",
                    "AlarmTime": "2017-11-06 16:45:45",
                    "AreaID": "8d16d49414704e32ac5abdee3ad9e717",
                    "CapFacePicUrl": "pLOC:402201323/data/20171107/00/f8e7d396fe6e238dcadfe15ce6eb0a1f_18676",
                    "EventType": "Hight",
                    "ID": "b93c17ef2fbc4b5e8621befaa8f486a7",
                    "IsUpload": false,
                    "Level": 0,
                    "ObjectID": "cb42aeaecbb647eca80f65f35b09dcb1",
                    "ObjectName": "",
                    "ObjectType": "Camera",
                    "ReceiveSubAlarmDateTime": "2017-11-06 16:45:45",
                    "ResponseState": "Undisposed",
                    "ResponseTime": "2017-11-06 16:45:45",
                    "Similarty": 0,
                    "TaskId": "2b3a38d128b044779cd9dd0ffad9ea53"
                },
                "AlarmLogInfoArr": [
                    {
                        "AlarmLogInfo": {
                            "AlarmLogID": "b93c17ef2fbc4b5e8621befaa8f486a7",
                            "ID": "198699055497599051",
                            "LibID": "000008",
                            "PersonInfo": {
                                "Birth": "",
                                "CertifyingAuthority": "",
                                "FacePicPath": [
                                    "pLOC:402201323/data_CAPTUREIMAGE/20171102/22/bfa0c11e075b6c6311ddcb5dd61a365f_136"
                                ],
                                "Gender": "1",
                                "HomeAddress": "",
                                "ID": "654321000000000000",
                                "IDCardNumber": "654321000000000000",
                                "LibId": "000008",
                                "Name": "美女",
                                "Nation": "",
                                "userTag": "654321000000000000"
                            },
                            "Similarty": 41.70708286366129,
                            "SimilartyStatus": ""
                        },
                        "LibName": "zq",
                        "Memo": ""
                    }
                ],
                "AlarmNum": 1,
                "AreaName": "unkown",
                "Attention": false,
                "Collected": false,
                "ResponsePersonName": "unkown"
            };
            arr.push(j);
        }
        ;
        return arr;
    }
    exports.MockAlarmList1 = MockAlarmList1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvVGVzdEVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtRQU9BLENBQUM7UUFBRCxjQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFQWSwwQkFBTztJQVNwQjtRQUFBO1FBY0EsQ0FBQztRQUFELFlBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRZLHNCQUFLO0lBZWxCLElBQUksTUFBTSxHQUFHO1FBQ1QsdUNBQXVDO1FBQ3ZDLHVDQUF1QztRQUN2Qyx1Q0FBdUM7UUFDdkMsd0NBQXdDO1FBQ3hDLHdDQUF3QztRQUN4Qyx3Q0FBd0M7UUFDeEMsd0NBQXdDO1FBQ3hDLHdDQUF3QztRQUN4Qyx3Q0FBd0M7UUFDeEMsd0NBQXdDO0tBQzNDLENBQUM7SUFDRixJQUFJLFNBQVMsR0FBRztRQUNaLFFBQVE7UUFDUixRQUFRO1FBQ1IsT0FBTztRQUNQLFFBQVE7UUFDUixRQUFRO1FBQ1IsT0FBTztRQUNQLFFBQVE7UUFDUixPQUFPO1FBQ1AsUUFBUTtRQUNSLE9BQU87UUFDUCxRQUFRO1FBQ1IsUUFBUTtLQUNYLENBQUM7SUFDRjtRQUFBO1FBS0EsQ0FBQztRQUFELFVBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLGtCQUFHO0lBT2hCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBZ0IsQ0FBQztRQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ0wsWUFBWSxFQUFFLFNBQVM7WUFDdkIsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixPQUFPLEVBQUUsY0FBYztZQUN2QixPQUFPLEVBQUUsdUNBQXVDO1NBQzVDLENBQUMsQ0FBQTtRQUNULEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxZQUFZLEVBQUUsU0FBUztZQUN2QixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLE9BQU8sRUFBRSx1Q0FBdUM7U0FDNUMsQ0FBQyxDQUFBO1FBQ1QsR0FBRyxD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dEY7Z0NBQ0QsUUFBUSxFQUFFLEdBQUc7Z0NBQ2IsYUFBYSxFQUFFLEVBQUU7Z0NBQ2pCLElBQUksRUFBRSxvQkFBb0I7Z0NBQzFCLGNBQWMsRUFBRSxvQkFBb0I7Z0NBQ3BDLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixNQUFNLEVBQUUsSUFBSTtnQ0FDWixRQUFRLEVBQUUsRUFBRTtnQ0FDWixTQUFTLEVBQUUsb0JBQW9COzZCQUNsQzs0QkFDRCxXQUFXLEVBQUUsaUJBQWlCOzRCQUM5QixpQkFBaUIsRUFBRSxFQUFFO3lCQUN4Qjt3QkFDRCxTQUFTLEVBQUUsSUFBSTt3QkFDZixNQUFNLEVBQUUsRUFBRTtxQkFDYjtpQkFDSjtnQkFDRCxVQUFVLEVBQUUsQ0FBQztnQkFDYixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixvQkFBb0IsRUFBRSxRQUFRO2FBQzFCLENBQUM7WUFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2YsQ0FBQztRQUFBLENBQUM7UUFDRixNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQTNERCx3Q0EyREMiLCJmaWxlIjoibW9kdWxlL21hcFBvaW50L2NhbWVyYU1hcFBvaW50L1Rlc3RFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhcHR1cmV7XHJcbiAgICBzZXg6bnVtYmVyOy8vMCDnlLcgMeWls1xyXG4gICAgdGltZTpzdHJpbmc7XHJcbiAgICBpbmZvOnN0cmluZztcclxuICAgIGltYWdlOnN0cmluZztcclxuICAgIGlzQ29sbGVjdGlvbjpudW1iZXI7Ly8wIOW3suaUtuiXjyAx5pyq5pS26JePXHJcbiAgICBpc01vbml0b3I6bnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWxhcm17XHJcbiAgICBjYXB0cnVlSW1hZ2U6c3RyaW5nO1xyXG4gICAgbWF0Y2hOdW06c3RyaW5nO1xyXG4gICAgYWxhcm1JbWFnZTpzdHJpbmc7XHJcbiAgICBjYW1lcmFBZGRyZXNzOnN0cmluZztcclxuICAgIGFsYXJtVGltZTpzdHJpbmc7XHJcbiAgICBjcmVhdGVVc2VyTmFtZTpzdHJpbmc7XHJcbiAgICBsaWJOYW1lOnN0cmluZztcclxuICAgIHN0YXR1czpudW1iZXI7Ly8wIOacieaViCAx5peg5pWIXHJcbiAgICBpc0NvbGxlY3Rpb246bnVtYmVyOy8vMCDlt7LmlLbol48gMeacquaUtuiXj1xyXG4gICAgc2V4Om51bWJlcjsvLzAg55S3IDHlpbNcclxuICAgIGNhcmROdW06c3RyaW5nO1xyXG4gICAgaXNIYW5kbGU6bnVtYmVyOy8vMOW3suWkhOeQhiAxIOacquWkhOeQhlxyXG4gICAgbmFtZTpzdHJpbmc7XHJcbn1cclxubGV0IGNhckFyciA9IFtcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC806IuPRSAyMDhRQS5QTkcnLFxyXG4gICAgJy4uLy4uL2ltYWdlcy9tb2NrL3BvaW50Lzboi49HIExKOTgxLlBORycsXHJcbiAgICAnLi4vLi4vaW1hZ2VzL21vY2svcG9pbnQvOOiLj0cgMzk5OTkuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8xMeiLj0cgMkEzNzkuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8xM+iLj0cgNlU1MzIuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8xNOiLj0cgTFg5MDcuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8yOOiLj0cgRUgyMTMuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8yNOiLj0cgTkcwODIuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8xOOiLj0cgTEgwNzMuUE5HJyxcclxuICAgICcuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8yMOiLj0cgREU2MzMuUE5HJ1xyXG5dO1xyXG5sZXQgYWRyZXNzQXJyID0gW1xyXG4gICAgJ+eZveiJsizlsI/ovb/ovaYnLFxyXG4gICAgJ+m7keiJsizlsI/ovb/ovaYnLFxyXG4gICAgJ+eZveiJsizlrqLovaYnLFxyXG4gICAgJ+eZveiJsixzdXYnLFxyXG4gICAgJ+eZveiJsixzdXYnLFxyXG4gICAgJ+eZveiJsizlrqLovaYnLFxyXG4gICAgJ+iTneiJsizlsI/ovb/ovaYnLFxyXG4gICAgJ+eZveiJsizlrqLovaYnLFxyXG4gICAgJ+m7keiJsizlsI/ovb/ovaYnLFxyXG4gICAgJ+eZveiJsizlrqLovaYnLFxyXG4gICAgJ+eZveiJsizlsI/ovb/ovaYnLFxyXG4gICAgJ+eZveiJsizlsI/ovb/ovaYnXHJcbl07XHJcbmV4cG9ydCBjbGFzcyBDYXJ7XHJcbiAgICBpbWdQYXRoOiBzdHJpbmc7XHJcbiAgICB0aW1lOiBzdHJpbmc7XHJcbiAgICBMaWNlbnNlUGxhdGU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tDYXJMaXN0KCk6QXJyYXk8Q2FyPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxDYXI+O1xyXG4gICAgYXJyLnB1c2goe1xyXG4gICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49HMUM1MTJcIixcclxuICAgICAgICB0aW1lOiBcIjIwMTctMDgtMjIgMTE6NDg6MzBcIixcclxuICAgICAgICBhZGRyZXNzOiBcIumCruenkemZoua5luW/g+ahpeS4juWNl+Wxsei3rzHlj7dcIixcclxuICAgICAgICBpbWdQYXRoOiBcIi4uLy4uL2ltYWdlcy9tb2NrL3BvaW50LzHoi49HIDFDNTEyLlBOR1wiXHJcbiAgICB9IGFzIENhcilcclxuICAgIGFyci5wdXNoKHtcclxuICAgICAgICBMaWNlbnNlUGxhdGU6IFwi6IuPR05CNjE5XCIsXHJcbiAgICAgICAgdGltZTogXCIyMDE3LTA4LTIyIDExOjQ4OjMzXCIsXHJcbiAgICAgICAgYWRkcmVzczogXCLpgq7np5HpmaLmuZblv4PmoaXkuI7ljZflsbHot68x5Y+3XCIsXHJcbiAgICAgICAgaW1nUGF0aDogXCIuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8y6IuPRyBOQjYxOS5QTkdcIlxyXG4gICAgfSBhcyBDYXIpXHJcbiAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgTGljZW5zZVBsYXRlOiBcIuiLj0dKSDAwNlwiLFxyXG4gICAgICAgIHRpbWU6IFwiMjAxNy0wOC0yMiAxMTo0ODozNlwiLFxyXG4gICAgICAgIGFkZHJlc3M6IFwi6YKu56eR6Zmi5rmW5b+D5qGl5LiO5Y2X5bGx6LevMeWPt1wiLFxyXG4gICAgICAgIGltZ1BhdGg6IFwiLi4vLi4vaW1hZ2VzL21vY2svcG9pbnQvM+iLj0cgSkgwMDYuUE5HXCJcclxuICAgIH0gYXMgQ2FyKVxyXG4gICAgYXJyLnB1c2goe1xyXG4gICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49FMjA4UUFcIixcclxuICAgICAgICB0aW1lOiBcIjIwMTctMDgtMjIgMTE6NDg6MzhcIixcclxuICAgICAgICBhZGRyZXNzOiBcIumCruenkemZoua5luW/g+ahpeS4juWNl+Wxsei3rzHlj7dcIixcclxuICAgICAgICBpbWdQYXRoOiBcIi4uLy4uL2ltYWdlcy9tb2NrL3BvaW50LzToi49FIDIwOFFBLlBOR1wiXHJcbiAgICB9IGFzIENhcilcclxuICAgIGFyci5wdXNoKHtcclxuICAgICAgICBMaWNlbnNlUGxhdGU6IFwi6IuPRzMyMUE1XCIsXHJcbiAgICAgICAgdGltZTogXCIyMDE3LTA4LTIyIDExOjQ4OjQzXCIsXHJcbiAgICAgICAgYWRkcmVzczogXCLpgq7np5HpmaLmuZblv4PmoaXkuI7ljZflsbHot68x5Y+3XCIsXHJcbiAgICAgICAgaW1nUGF0aDogXCIuLi8uLi9pbWFnZXMvbW9jay9wb2ludC816IuPRyAzMjFBNS5QTkdcIlxyXG4gICAgfSBhcyBDYXIpXHJcbiAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgTGljZW5zZVBsYXRlOiBcIuiLj0dMSjk4MVwiLFxyXG4gICAgICAgIHRpbWU6IFwiMjAxNy0wOC0yMiAxMTo0ODo0NVwiLFxyXG4gICAgICAgIGFkZHJlc3M6IFwi6YKu56eR6Zmi5rmW5b+D5qGl5LiO5Y2X5bGx6LevMeWPt1wiLFxyXG4gICAgICAgIGltZ1BhdGg6IFwiLi4vLi4vaW1hZ2VzL21vY2svcG9pbnQvNuiLj0cgTEo5ODEuUE5HXCJcclxuICAgIH0gYXMgQ2FyKVxyXG4gICAgYXJyLnB1c2goe1xyXG4gICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49HMjNMMTYxXCIsXHJcbiAgICAgICAgdGltZTogXCIyMDE3LTA4LTIyIDExOjQ4OjUwXCIsXHJcbiAgICAgICAgYWRkcmVzczogXCLpgq7np5HpmaLmuZblv4PmoaXkuI7ljZflsbHot68x5Y+3XCIsXHJcbiAgICAgICAgaW1nUGF0aDogXCIuLi8uLi9pbWFnZXMvbW9jay9wb2ludC836IuPRyAyM0wxNi5QTkdcIlxyXG4gICAgfSBhcyBDYXIpXHJcbiAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgTGljZW5zZVBsYXRlOiBcIuiLj0czOTk5OVwiLFxyXG4gICAgICAgIHRpbWU6IFwiMjAxNy0wOC0yMiAxMTo0ODo1MlwiLFxyXG4gICAgICAgIGFkZHJlc3M6IFwi6YKu56eR6Zmi5rmW5b+D5qGl5LiO5Y2X5bGx6LevMeWPt1wiLFxyXG4gICAgICAgIGltZ1BhdGg6IFwiLi4vLi4vaW1hZ2VzL21vY2svcG9pbnQvOOiLj0cgMzk5OTkuUE5HXCJcclxuICAgIH0gYXMgQ2FyKVxyXG4gICAgYXJyLnB1c2goe1xyXG4gICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49HODM2RzZcIixcclxuICAgICAgICB0aW1lOiBcIjIwMTctMDgtMjIgMTE6NDg6NTlcIixcclxuICAgICAgICBhZGRyZXNzOiBcIumCruenkemZoua5luW/g+ahpeS4juWNl+Wxsei3rzHlj7dcIixcclxuICAgICAgICBpbWdQYXRoOiBcIi4uLy4uL2ltYWdlcy9tb2NrL3BvaW50Lznoi49HIDgzNkc2LlBOR1wiXHJcbiAgICB9IGFzIENhcilcclxuICAgIGFyci5wdXNoKHtcclxuICAgICAgICBMaWNlbnNlUGxhdGU6IFwi6IuPRzFBMTY3XCIsXHJcbiAgICAgICAgdGltZTogXCIyMDE3LTA4LTIyIDExOjQ5OjAxXCIsXHJcbiAgICAgICAgYWRkcmVzczogXCLpgq7np5HpmaLmuZblv4PmoaXkuI7ljZflsbHot68x5Y+3XCIsXHJcbiAgICAgICAgaW1nUGF0aDogXCIuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8xMOiLj0cgMUExNjcuUE5HXCJcclxuICAgIH0gYXMgQ2FyKVxyXG5cclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrQ2FwdHVyZUxpc3QobnVtOm51bWJlcixpbWFnZVVybDpzdHJpbmcpOkFycmF5PENhcHR1cmU+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PENhcHR1cmU+O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8Y2FyQXJyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgc2V4Ok1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgICAgIHRpbWU6JzIwMTctMDMtMDIgMTI6MzA6NDgnLFxyXG4gICAgICAgICAgICBpbmZvOmFkcmVzc0FycltpXSxcclxuICAgICAgICAgICAgY29sb3I6J3JlZCcsXHJcbiAgICAgICAgICAgIGlzQ29sbGVjdGlvbjpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgICAgICBpbWFnZTpjYXJBcnJbaV0sXHJcbiAgICAgICAgICAgIGlzTW9uaXRvcjpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgfSBhcyBDYXB0dXJlKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5sZXQgcG9paW50YXJyIDphbnk9IFtcclxuICAgIHtcclxuICAgICAgICBjYXB0cnVlSW1hZ2U6Jy4uLy4uL2ltYWdlcy9tb2NrL3BvaW50LzHoi49HIDFDNTEyLlBORycsXHJcbiAgICAgICAgbWF0Y2hOdW06J+iLj0cgMUM1MTInLFxyXG4gICAgICAgIGNhbWVyYUFkZHJlc3M6J+WFs+WxseWkp+mBk+S/neWIqeWbvemZheS4reW/gycsXHJcbiAgICAgICAgYWxhcm1UaW1lOicyMDE3LTA4LTIyIDExOjQ4OjMwJyxcclxuICAgICAgICBjcmVhdGVVc2VyTmFtZTon5p2O5rSLJyxcclxuICAgICAgICBsaWJOYW1lOiflnKjpgIPlupMnLFxyXG4gICAgICAgIG5hbWU6J0F2cmlsIExhdmlnbmUnLFxyXG4gICAgICAgIHN0YXR1czpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgIGlzQ29sbGVjdGlvbjpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgIHNleDpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgIGNhcmROdW06JzQyMDE5ODEyNTQyMjA0NDQ0NScsXHJcbiAgICAgICAgaXNIYW5kbGU6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgY2FwdHJ1ZUltYWdlOicuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8y6IuPRyBOQjYxOS5QTkcnLFxyXG4gICAgICAgIG1hdGNoTnVtOifoi49HIE5CNjE5JyxcclxuICAgICAgICBjYW1lcmFBZGRyZXNzOiflhbPlsbHlpKfpgZPkv53liKnlm73pmYXkuK3lv4MnLFxyXG4gICAgICAgIGFsYXJtVGltZTonMjAxNy0wOC0yMiAxMTo1ODozMCcsXHJcbiAgICAgICAgY3JlYXRlVXNlck5hbWU6J+adjua0iycsXHJcbiAgICAgICAgbGliTmFtZTon5Zyo6YCD5bqTJyxcclxuICAgICAgICBuYW1lOidBdnJpbCBMYXZpZ25lJyxcclxuICAgICAgICBzdGF0dXM6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICBpc0NvbGxlY3Rpb246TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICBzZXg6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICBjYXJkTnVtOic0MjAxOTgxMjU0MjIwNDQ0NDUnLFxyXG4gICAgICAgIGlzSGFuZGxlOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGNhcHRydWVJbWFnZTonLi4vLi4vaW1hZ2VzL21vY2svcG9pbnQvM+iLj0cgSkgwMDYuUE5HJyxcclxuICAgICAgICBtYXRjaE51bTon6IuPRyBKSDAwNicsXHJcbiAgICAgICAgY2FtZXJhQWRkcmVzczon5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmF5Lit5b+DJyxcclxuICAgICAgICBhbGFybVRpbWU6JzIwMTctMDgtMjIgMTE6NDg6MzAnLFxyXG4gICAgICAgIGNyZWF0ZVVzZXJOYW1lOifmnY7mtIsnLFxyXG4gICAgICAgIGxpYk5hbWU6J+WcqOmAg+W6kycsXHJcbiAgICAgICAgbmFtZTonQXZyaWwgTGF2aWduZScsXHJcbiAgICAgICAgc3RhdHVzOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgaXNDb2xsZWN0aW9uOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgc2V4Ok1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgY2FyZE51bTonNDIwMTk4MTI1NDIyMDQ0NDQ1JyxcclxuICAgICAgICBpc0hhbmRsZTpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBjYXB0cnVlSW1hZ2U6Jy4uLy4uL2ltYWdlcy9tb2NrL3BvaW50Lzfoi49HIDIzTDE2LlBORycsXHJcbiAgICAgICAgbWF0Y2hOdW06J+iLj0cgMjNMMTYnLFxyXG4gICAgICAgIGNhbWVyYUFkZHJlc3M6J+WFs+WxseWkp+mBk+S/neWIqeWbvemZheS4reW/gycsXHJcbiAgICAgICAgYWxhcm1UaW1lOicyMDE3LTA4LTIyIDExOjQ4OjMwJyxcclxuICAgICAgICBjcmVhdGVVc2VyTmFtZTon5p2O5rSLJyxcclxuICAgICAgICBsaWJOYW1lOiflnKjpgIPlupMnLFxyXG4gICAgICAgIG5hbWU6J0F2cmlsIExhdmlnbmUnLFxyXG4gICAgICAgIHN0YXR1czpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgIGlzQ29sbGVjdGlvbjpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgIHNleDpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgIGNhcmROdW06JzQyMDE5ODEyNTQyMjA0NDQ0NScsXHJcbiAgICAgICAgaXNIYW5kbGU6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgY2FwdHJ1ZUltYWdlOicuLi8uLi9pbWFnZXMvbW9jay9wb2ludC8yM+iLj0QgMDk2UU4uUE5HJyxcclxuICAgICAgICBtYXRjaE51bTon6IuPRCAwOTZRTicsXHJcbiAgICAgICAgY2FtZXJhQWRkcmVzczon5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmF5Lit5b+DJyxcclxuICAgICAgICBhbGFybVRpbWU6JzIwMTctMDgtMjIgMTE6NDg6MzAnLFxyXG4gICAgICAgIGNyZWF0ZVVzZXJOYW1lOifmnY7mtIsnLFxyXG4gICAgICAgIGxpYk5hbWU6J+WcqOmAg+W6kycsXHJcbiAgICAgICAgbmFtZTonQXZyaWwgTGF2aWduZScsXHJcbiAgICAgICAgc3RhdHVzOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgaXNDb2xsZWN0aW9uOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgc2V4Ok1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgY2FyZE51bTonNDIwMTk4MTI1NDIyMDQ0NDQ1JyxcclxuICAgICAgICBpc0hhbmRsZTpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgfVxyXG5dO1xyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gTW9ja0FsYXJtTGlzdChudW06bnVtYmVyLGltYWdlVXJsOnN0cmluZyk6QXJyYXk8QWxhcm0+e1xyXG4vLyAgICAgbGV0IGFyciA9IHBvaWludGFyciBhcyBBcnJheTxBbGFybT47XHJcbiAgICAvLyBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAvLyAgICAgbGV0IGogPSB7XHJcbiAgICAvLyAgICAgICAgIGNhcHRydWVJbWFnZTppbWFnZVVybCxcclxuICAgIC8vICAgICAgICAgbWF0Y2hOdW06Jzk5JScsXHJcbiAgICAvLyAgICAgICAgIGFsYXJtSW1hZ2U6aW1hZ2VVcmwsXHJcbiAgICAvLyAgICAgICAgIGNhbWVyYUFkZHJlc3M6J+mCruenkemZoua5luW/g+ahpeS4juWNl+Wxsei3rzHlj7cnLFxyXG4gICAgLy8gICAgICAgICBhbGFybVRpbWU6JzIwMTctMDgtMjIgMTE6NDg6MzAnLFxyXG4gICAgLy8gICAgICAgICBjcmVhdGVVc2VyTmFtZTonc25mYWNlJyxcclxuICAgIC8vICAgICAgICAgbGliTmFtZTon5Zyo6YCD5bqTJyxcclxuICAgIC8vICAgICAgICAgbmFtZTonQXZyaWwgTGF2aWduZScsXHJcbiAgICAvLyAgICAgICAgIHN0YXR1czpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgLy8gICAgICAgICBpc0NvbGxlY3Rpb246TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgIC8vICAgICAgICAgc2V4Ok1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAvLyAgICAgICAgIGNhcmROdW06JzQyMDE5ODEyNTQyMjA0NDQ0NScsXHJcbiAgICAvLyAgICAgICAgIGlzSGFuZGxlOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAvLyAgICAgfSBhcyBBbGFybTtcclxuICAgIC8vICAgICBhcnIucHVzaChqKVxyXG4gICAgLy8gfTtcclxuLy8gICAgIHJldHVybiBhcnJcclxuLy8gfVxyXG5cclxuLy8g55yf5a6e5pWw5o2uXHJcblxyXG5sZXQgcGVyc29uQWxhcm0gOmFueT0ge1xyXG4gICAgXCJyZXN1bHRcIjoge1xyXG4gICAgICAgIFwiQWxhcm1Mb2dcIjoge1xyXG4gICAgICAgICAgICBcIkFjY2Vzc0xvZ0lEXCI6IFwiNDQwMDM5MjA5Nzg3NDk5MDUxXCIsXHJcbiAgICAgICAgICAgIFwiQWxhcm1UaW1lXCI6IFwiMjAxNy0xMS0wNiAxMzo1OTowNFwiLFxyXG4gICAgICAgICAgICBcIkFyZWFJRFwiOiBcIjhkMTZkNDk0MTQ3MDRlMzJhYzVhYmRlZTNhZDllNzE3XCIsXHJcbiAgICAgICAgICAgIFwiQ2FwRmFjZVBpY1VybFwiOiBcInBMT0M6NDAyMjAxMzIzL2RhdGEvMjAxNzExMDYvMjEvNjZjNTExOGM5YTE2MTExODllNjRmNTJlNzc5ZWFlNTNfNDkxNFwiLFxyXG4gICAgICAgICAgICBcIkV2ZW50VHlwZVwiOiBcIkhpZ2h0XCIsXHJcbiAgICAgICAgICAgIFwiSURcIjogXCI4ZWZmNGQyNTFiNDY0MGUzOTFjNDExZDA2NDllYWViYlwiLFxyXG4gICAgICAgICAgICBcIklzVXBsb2FkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkxldmVsXCI6IDAsXHJcbiAgICAgICAgICAgIFwiT2JqZWN0SURcIjogXCJjYjQyYWVhZWNiYjY0N2VjYTgwZjY1ZjM1YjA5ZGNiMVwiLFxyXG4gICAgICAgICAgICBcIk9iamVjdE5hbWVcIjogXCJcIixcclxuICAgICAgICAgICAgXCJPYmplY3RUeXBlXCI6IFwiQ2FtZXJhXCIsXHJcbiAgICAgICAgICAgIFwiUmVjZWl2ZVN1YkFsYXJtRGF0ZVRpbWVcIjogXCIyMDE3LTExLTA2IDEzOjU5OjA0XCIsXHJcbiAgICAgICAgICAgIFwiUmVzcG9uc2VTdGF0ZVwiOiBcIlVuZGlzcG9zZWRcIixcclxuICAgICAgICAgICAgXCJSZXNwb25zZVRpbWVcIjogXCIyMDE3LTExLTA2IDEzOjU5OjA0XCIsXHJcbiAgICAgICAgICAgIFwiU2ltaWxhcnR5XCI6IDAsXHJcbiAgICAgICAgICAgIFwiVGFza0lkXCI6IFwiMmIzYTM4ZDEyOGIwNDQ3NzljZDlkZDBmZmFkOWVhNTNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJBbGFybUxvZ0luZm9BcnJcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIkFsYXJtTG9nSW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJBbGFybUxvZ0lEXCI6IFwiOGVmZjRkMjUxYjQ2NDBlMzkxYzQxMWQwNjQ5ZWFlYmJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIklEXCI6IFwiOTU1MjU2MzA0NDk3NDk5MDUxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJMaWJJRFwiOiBcIjAwMDAwOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUGVyc29uSW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQmlydGhcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDZXJ0aWZ5aW5nQXV0aG9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRmFjZVBpY1BhdGhcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwTE9DOjQwMjIwMTMyMy9kYXRhX0NBUFRVUkVJTUFHRS8yMDE3MTEwMi8yMy82ZTU3ZjU1NjY3ODljMWQ2ODI4OWQwM2U5ZTkzZDNmMV8xXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJHZW5kZXJcIjogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSG9tZUFkZHJlc3NcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJJRFwiOiBcIjExMjc3NDQ5MTQ4OTAyNDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklEQ2FyZE51bWJlclwiOiBcIjExMjc3NDQ5MTQ4OTAyNDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkxpYklkXCI6IFwiMDAwMDA4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFtZVwiOiBcIuWRqOeQplwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk5hdGlvblwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJUYWdcIjogXCIxMTI3NzQ0OTE0ODkwMjQwMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTaW1pbGFydHlcIjogNDUuMTYxNDg2NTg1NDkwNzksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTaW1pbGFydHlTdGF0dXNcIjogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiTGliTmFtZVwiOiBcInpxXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1lbW9cIjogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIkFsYXJtTnVtXCI6IDEsXHJcbiAgICAgICAgXCJBcmVhTmFtZVwiOiBcInVua293blwiLFxyXG4gICAgICAgIFwiQXR0ZW50aW9uXCI6IGZhbHNlLFxyXG4gICAgICAgIFwiQ29sbGVjdGVkXCI6IGZhbHNlLFxyXG4gICAgICAgIFwiUmVzcG9uc2VQZXJzb25OYW1lXCI6IFwidW5rb3duXCJcclxuICAgIH0sXHJcbiAgICBcInJlc3VsdFR5cGVcIjogXCJTdWJjcmliZUFsYXJtTG9nXCJcclxufVxyXG5cclxubGV0IHBlcnNvbkxpc3QgOmFueT0ge1xyXG4gICAgXCJBZ2VcIjogNjAsXHJcbiAgICBcIkFyZWFJRFwiOiBcIjhkMTZkNDk0MTQ3MDRlMzJhYzVhYmRlZTNhZDllNzE3XCIsXHJcbiAgICBcIkF0dHJhY3RpdmVcIjogLTEsXHJcbiAgICBcIkJvdHRvbUNvbG9yXCI6IDAsXHJcbiAgICBcIkNhbWVyYUlEXCI6IFwiY2I0MmFlYWVjYmI2NDdlY2E4MGY2NWYzNWIwOWRjYjFcIixcclxuICAgIFwiRmFjZUNvbmZpZGVuY2VcIjogOTkuNzMwMDAzMzU2OTMzNixcclxuICAgIFwiRmFjZUZlYXR1cmVcIjogXCJcIixcclxuICAgIFwiRmFjZVBhdGhcIjogXCJwTE9DOjQwMjIwMTMyMy9kYXRhLzIwMTcxMTA2LzIxLzY2YzUxMThjOWExNjExMTg5ZTY0ZjUyZTc3OWVhZTUzXzQ5MTRcIixcclxuICAgIFwiRmFjZVJlY3RcIjogXCJbe1xcXCJ4XFxcIjoyNyxcXFwieVxcXCI6Mjd9LHtcXFwieFxcXCI6ODEsXFxcInlcXFwiOjI3fSx7XFxcInhcXFwiOjgxLFxcXCJ5XFxcIjo4MX0se1xcXCJ4XFxcIjoyNyxcXFwieVxcXCI6ODF9XVwiLFxyXG4gICAgXCJHZW5kZXJcIjogXCJNZW5cIixcclxuICAgIFwiR2xhc3NcIjogLTEsXHJcbiAgICBcIkhhc2V4dHJhY3RBdHRyaWJ1dGVcIjogdHJ1ZSxcclxuICAgIFwiSGFzZXh0cmFjdEZlYXR1cmVcIjogZmFsc2UsXHJcbiAgICBcIkhhc2ZhY2VGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgXCJJRFwiOiBcIjQ0MDAzOTIwOTc4NzQ5OTA1MVwiLFxyXG4gICAgXCJJc1BhbnRzXCI6IDAsXHJcbiAgICBcIklzU2xlZXZlXCI6IDAsXHJcbiAgICBcIkxvZ1RpbWVcIjogXCIyMDE3LTExLTA2IDEzOjU3OjU5XCIsXHJcbiAgICBcIk1hc2tcIjogMCxcclxuICAgIFwiT3JpZW50YXRpb25cIjogMCxcclxuICAgIFwiUGVyc29uQ29uZmlkZW5jZVwiOiAwLFxyXG4gICAgXCJSYWNlXCI6IC0xLFxyXG4gICAgXCJTYXZlVGltZVwiOiBcIjIwMTctMTEtMDYgMTM6NTk6MDFcIixcclxuICAgIFwiU2NlbmVQYXRoXCI6IFwiXCIsXHJcbiAgICBcIlNtaWxlXCI6IC0xLFxyXG4gICAgXCJUYXNrSURcIjogXCIyYjNhMzhkMTI4YjA0NDc3OWNkOWRkMGZmYWQ5ZWE1M1wiLFxyXG4gICAgXCJUZXh0dXJlXCI6IDAsXHJcbiAgICBcIlVwcGVyQ29sb3JcIjogMFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tBbGFybUxpc3QobnVtOm51bWJlcixpbWFnZVVybD86c3RyaW5nKTpBcnJheTxhbnk+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgbGV0IGogPSB7XHJcbiAgICAgICAgICAgIFwiQWdlXCI6IDYwLFxyXG4gICAgICAgICAgICBcIkFyZWFJRFwiOiBcIjhkMTZkNDk0MTQ3MDRlMzJhYzVhYmRlZTNhZDllNzE3XCIsXHJcbiAgICAgICAgICAgIFwiQXR0cmFjdGl2ZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJCb3R0b21Db2xvclwiOiAwLFxyXG4gICAgICAgICAgICBcIkNhbWVyYUlEXCI6IFwiY2I0MmFlYWVjYmI2NDdlY2E4MGY2NWYzNWIwOWRjYjFcIixcclxuICAgICAgICAgICAgXCJGYWNlQ29uZmlkZW5jZVwiOiA5OS43MzAwMDMzNTY5MzM2LFxyXG4gICAgICAgICAgICBcIkZhY2VGZWF0dXJlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZVBhdGhcIjogXCJwTE9DOjQwMjIwMTMyMy9kYXRhLzIwMTcxMTA2LzIxLzY2YzUxMThjOWExNjExMTg5ZTY0ZjUyZTc3OWVhZTUzXzQ5MTRcIixcclxuICAgICAgICAgICAgXCJGYWNlUmVjdFwiOiBcIlt7XFxcInhcXFwiOjI3LFxcXCJ5XFxcIjoyN30se1xcXCJ4XFxcIjo4MSxcXFwieVxcXCI6Mjd9LHtcXFwieFxcXCI6ODEsXFxcInlcXFwiOjgxfSx7XFxcInhcXFwiOjI3LFxcXCJ5XFxcIjo4MX1dXCIsXHJcbiAgICAgICAgICAgIFwiR2VuZGVyXCI6IFwiTWVuXCIsXHJcbiAgICAgICAgICAgIFwiR2xhc3NcIjogLTEsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEF0dHJpYnV0ZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIkhhc2V4dHJhY3RGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkhhc2ZhY2VGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIklEXCI6IFwiNDQwMDM5MjA5Nzg3NDk5MDUxXCIsXHJcbiAgICAgICAgICAgIFwiSXNQYW50c1wiOiAwLFxyXG4gICAgICAgICAgICBcIklzU2xlZXZlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiTG9nVGltZVwiOiBcIjIwMTctMTEtMDYgMTM6NTc6NTlcIixcclxuICAgICAgICAgICAgXCJNYXNrXCI6IDAsXHJcbiAgICAgICAgICAgIFwiT3JpZW50YXRpb25cIjogMCxcclxuICAgICAgICAgICAgXCJQZXJzb25Db25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUmFjZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJTYXZlVGltZVwiOiBcIjIwMTctMTEtMDYgMTM6NTk6MDFcIixcclxuICAgICAgICAgICAgXCJTY2VuZVBhdGhcIjogXCJcIixcclxuICAgICAgICAgICAgXCJTbWlsZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJUYXNrSURcIjogXCIyYjNhMzhkMTI4YjA0NDc3OWNkOWRkMGZmYWQ5ZWE1M1wiLFxyXG4gICAgICAgICAgICBcIlRleHR1cmVcIjogMCxcclxuICAgICAgICAgICAgXCJVcHBlckNvbG9yXCI6IDBcclxuICAgICAgICB9IGFzIGFueTtcclxuICAgICAgICBhcnIucHVzaChqKVxyXG4gICAgfTtcclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrQWxhcm1MaXN0MShudW06bnVtYmVyKTpBcnJheTxhbnk+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgbGV0IGogPSB7XHJcbiAgICAgICAgICAgIFwiQWxhcm1Mb2dcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJBY2Nlc3NMb2dJRFwiOiBcIjQ0MjE4MTMzMjg4NzU5OTA1MVwiLFxyXG4gICAgICAgICAgICAgICAgXCJBbGFybVRpbWVcIjogXCIyMDE3LTExLTA2IDE2OjQ1OjQ1XCIsXHJcbiAgICAgICAgICAgICAgICBcIkFyZWFJRFwiOiBcIjhkMTZkNDk0MTQ3MDRlMzJhYzVhYmRlZTNhZDllNzE3XCIsXHJcbiAgICAgICAgICAgICAgICBcIkNhcEZhY2VQaWNVcmxcIjogXCJwTE9DOjQwMjIwMTMyMy9kYXRhLzIwMTcxMTA3LzAwL2Y4ZTdkMzk2ZmU2ZTIzOGRjYWRmZTE1Y2U2ZWIwYTFmXzE4Njc2XCIsXHJcbiAgICAgICAgICAgICAgICBcIkV2ZW50VHlwZVwiOiBcIkhpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICBcIklEXCI6IFwiYjkzYzE3ZWYyZmJjNGI1ZTg2MjFiZWZhYThmNDg2YTdcIixcclxuICAgICAgICAgICAgICAgIFwiSXNVcGxvYWRcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcIkxldmVsXCI6IDAsXHJcbiAgICAgICAgICAgICAgICBcIk9iamVjdElEXCI6IFwiY2I0MmFlYWVjYmI2NDdlY2E4MGY2NWYzNWIwOWRjYjFcIixcclxuICAgICAgICAgICAgICAgIFwiT2JqZWN0TmFtZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJPYmplY3RUeXBlXCI6IFwiQ2FtZXJhXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJlY2VpdmVTdWJBbGFybURhdGVUaW1lXCI6IFwiMjAxNy0xMS0wNiAxNjo0NTo0NVwiLFxyXG4gICAgICAgICAgICAgICAgXCJSZXNwb25zZVN0YXRlXCI6IFwiVW5kaXNwb3NlZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJSZXNwb25zZVRpbWVcIjogXCIyMDE3LTExLTA2IDE2OjQ1OjQ1XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNpbWlsYXJ0eVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJUYXNrSWRcIjogXCIyYjNhMzhkMTI4YjA0NDc3OWNkOWRkMGZmYWQ5ZWE1M1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiQWxhcm1Mb2dJbmZvQXJyXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIkFsYXJtTG9nSW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQWxhcm1Mb2dJRFwiOiBcImI5M2MxN2VmMmZiYzRiNWU4NjIxYmVmYWE4ZjQ4NmE3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSURcIjogXCIxOTg2OTkwNTU0OTc1OTkwNTFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJMaWJJRFwiOiBcIjAwMDAwOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlBlcnNvbkluZm9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCaXJ0aFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDZXJ0aWZ5aW5nQXV0aG9yaXR5XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZhY2VQaWNQYXRoXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBMT0M6NDAyMjAxMzIzL2RhdGFfQ0FQVFVSRUlNQUdFLzIwMTcxMTAyLzIyL2JmYTBjMTFlMDc1YjZjNjMxMWRkY2I1ZGQ2MWEzNjVmXzEzNlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHZW5kZXJcIjogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkhvbWVBZGRyZXNzXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIklEXCI6IFwiNjU0MzIxMDAwMDAwMDAwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIklEQ2FyZE51bWJlclwiOiBcIjY1NDMyMTAwMDAwMDAwMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMaWJJZFwiOiBcIjAwMDAwOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOYW1lXCI6IFwi576O5aWzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5hdGlvblwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyVGFnXCI6IFwiNjU0MzIxMDAwMDAwMDAwMDAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTaW1pbGFydHlcIjogNDEuNzA3MDgyODYzNjYxMjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU2ltaWxhcnR5U3RhdHVzXCI6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiTGliTmFtZVwiOiBcInpxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJNZW1vXCI6IFwiXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJBbGFybU51bVwiOiAxLFxyXG4gICAgICAgICAgICBcIkFyZWFOYW1lXCI6IFwidW5rb3duXCIsXHJcbiAgICAgICAgICAgIFwiQXR0ZW50aW9uXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkNvbGxlY3RlZFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJSZXNwb25zZVBlcnNvbk5hbWVcIjogXCJ1bmtvd25cIlxyXG4gICAgICAgIH0gYXMgYW55O1xyXG4gICAgICAgIGFyci5wdXNoKGopXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGFyclxyXG59Il19
