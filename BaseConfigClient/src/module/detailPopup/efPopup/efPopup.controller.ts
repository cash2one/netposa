import {app} from "../../common/app/main.app";
import 'css!../style/wifiPopup.css';

// 参数
import {electronic, carLience} from "../../../core/enum/QueryRecord";
import {multipleChoice, AmbitusList} from "../../../core/enum/QueryParams";
import {ResourceTypeEnum} from "../../../core/server/enum/ResourceType";
import {ObjectType} from '../../../core/enum/ObjectType';

class efPopupController {
    static $inject = ["$scope", "$timeout", "layer"];

    switchButton: boolean = true;

    activeRank: number;
    totalRank: number;
    accessRecords: electronic;
    accessRecordsList: Array<electronic>;

    quickSearchAgainText: string = "";
    ambitusText: string = "All";
    ambitusInfo: Array<multipleChoice>;
    showFooter: boolean = false;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any) {
        let self = this;
        self.activeRank = $scope.rank + 1;
        self.totalRank = $scope.allList.length;
        self.accessRecords = $scope.allList[$scope.rank];
        self.accessRecordsList = $scope.allList;
        self.showFooter = $scope.showFooter || false;
        self.initParams();
    }

    initParams() {
        let self = this;
        self.ambitusInfo = AmbitusList();// 周边
    }

    // 初始化查询数据
    private initData(num: number) {
        this.accessRecords = this.accessRecordsList[num];
    }

    // 上一条数据
    public popupUp() {
        let self = this;
        this.initData(self.activeRank - 2);
        self.activeRank = self.activeRank - 1;

    }

    // 下一条数据
    public popupDown() {
        let self = this;
        this.initData(self.activeRank);
        self.activeRank = self.activeRank + 1;
    }

    // 关闭弹框
    public closeLayer() {
        this.$scope.closePopup();
    }

    clickCollect() {
        this.$scope.collectFunction(this.accessRecords);
    }

    clickAnalysis() {
        this.$scope.analysisFunction(this.accessRecords);
    }

    clickSurveillance() {
        this.$scope.surveillanceFunction(this.accessRecords);
    }

    /**
     * @description 选择周边数据
     * @param {multipleChoice} item
     */
    public selectAmbitusInfo(item: multipleChoice) {
        let self = this;

        self.ambitusInfo.forEach(function (value, index, array) {
            if (value.id === item.id) {
                value.status = true;
                self.ambitusText = value.key;
            } else {
                value.status = false;
            }
        });
    };

    // 二次检索
    public quickSearchAgain() {
        let self = this;
        let params: any = {
            "keyword": self.quickSearchAgainText,
            "objectType": self.ambitusText,
            "deviceArrId": []
        };
        let arrObjectID: Array<string> = [];
        if (self.accessRecords.deviceInfo && self.accessRecords.deviceInfo.JsonUserData) {
            let point = {
                lat: self.accessRecords.deviceInfo.JsonUserData.Point.Lat,
                lon: self.accessRecords.deviceInfo.JsonUserData.Point.Lon
            };
            self.$scope.$emit('map-peripheral-information', point,function(res:any) {
                res.forEach(function (value, index) {
                    if (self.ambitusText === "All") {
                        arrObjectID.push(value.ObjectID);

                    } else if (self.ambitusText === ResourceTypeEnum[2].value) {
                        if (value.ObjectType === ObjectType.Vehicle.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    } else if (self.ambitusText === ResourceTypeEnum[1].value) {
                        if (value.ObjectType === ObjectType.Camera.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    } else if (self.ambitusText === ResourceTypeEnum[5].value) {
                        if (value.ObjectType === ObjectType.Wifi.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    } else if (self.ambitusText === ResourceTypeEnum[7].value) {
                        if (value.ObjectType === ObjectType.ElectronicFence.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    }
                });
                params.deviceArrId = arrObjectID;
                console.log("--------",params);
                self.$scope.$emit('quickSearchAgain', params);
                self.$scope.closePopup();
            });
        } else {
            self.$scope.$emit('quickSearchAgain', params);
            self.$scope.closePopup();
        }
    }
}

app.controller("efPopupController", efPopupController);