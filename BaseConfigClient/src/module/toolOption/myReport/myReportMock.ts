import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {SearchAlarmLogResult} from "../../../core/server/AlarmModule";
import PortraitTool from '../../common/portrait-tool';
import {ObjectType} from "../../../core/enum/ObjectType";

export class MyReportMock {
    static Count = 80;
    // new Date(Math.random()*3000000000000);
    static currentDate = new Date(Math.random() * 3000000000000);
    static currentIndex = 0;

    static getMock(): ResponseResult<PageResult<any>> {
        return {
            code: 200,
            count: MyReportMock.Count,
            message: "",
            status: "",
            data: {
                TotalCount: MyReportMock.Count,
                Result: MyReportMock._getMock()
            }
        };
    }

    private static _getMock(): Array<SearchAlarmLogResult> {
        let i = 0, len = MyReportMock.Count, result = [];
        for (; i < len; i++) {
            result.push({
                AlarmLog: MyReportMock.getAlarmLog(),
                AlarmLogInfoArr: MyReportMock.getAlarmLogInfoArr(),
                AlarmNum: 10,
                AreaName: "AreaName",
                Attention: true,
                Collected: false,
                ResponsePersonName: "REsponsePersonName"
            });
        }
        return result;
    }

    private static getAlarmLog() {
        return {
            AccessLogID: "AccessLogID",
            AlarmTime: PortraitTool.formatDate(MyReportMock.getDate()),
            AreaID: "AreaID",
            CapFacePicUrl: "CapFacePicUrl",
            EventType: "EventType",
            ID: "ID",
            Notes: "",
            IsUpload: true,
            Level: 1,
            ObjectID: "ObjectID",
            ObjectName: "ObjectName",
            ObjectType: MyReportMock.getObjectType(),
            ReceiveSubAlarmDateTime: "ReceiveSubAlarmDateTime",
            ResponseState: "ResponseState",
            ResponseTime: "ResponseTime",
            Similarty: 0.8,
            TaskId: "TaskId"
        };
    }

    private static getObjectType() {
        let num = Math.floor(Math.random() * 10);
        let result = ObjectType.Camera.value;
        switch (num) {
            case 1:
            case 2:
                result = ObjectType.Wifi.value;
                break;
            case 3:
            case 4:
            case 5:
                result = ObjectType.ElectronicFence.value;
                break;
            case 6:
            case 7:
                result = ObjectType.Camera.value;
                break;
            case 8:
            case 9:
            case 0:
                result = ObjectType.Vehicle.value;
                break;
        }
        return result;
    }

    private static getDate() {
        let dateNum = MyReportMock.currentDate.getTime();
        let newDate = new Date(dateNum);
        return PortraitTool.addHours(newDate, MyReportMock.currentIndex++ * 2);
    }

    private static getAlarmLogInfoArr() {
        return [this.getAlarmLogInfo(), this.getAlarmLogInfo()];
    }

    private static getAlarmLogInfo() {
        return {
            AlarmLogID: "AlarmLogID",
            ID: "ID",
            LibID: "LibId",
            PersonInfo: this.getPersonInfo(),
            Similarty: "Similarty",
            SimilartyStatus: "SimilartyStatus"
        };
    }

    private static getPersonInfo() {
        return {
            Name: "Name",
            ID: "ID",
            LogTime: "LogTime",
            IDCardNumber: "IDCardNumber",
            FacePicPath: ["default.png"],
            Birth: "1990-02-15",
            HomeAddress: "HomeAddress",
            Nation: "汉族",
            LibId: "LibId",
            BeginDate: "2017-11-17 10:00:00",
            CreateTime: "2017-11-14 10:00:00",
            UpdateTime: "2017-11-16 10:00:00",
            CertifyingAuthority: "CertifyingAuthority",
            Gender: "Gender",
            userTag: "userTag"
        };
    }
} 