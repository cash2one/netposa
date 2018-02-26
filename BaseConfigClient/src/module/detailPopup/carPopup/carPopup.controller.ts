/// <amd-dependency path="text!../carRecordPopup/carRecordPopup.html" name="carRecordPopupHtml" />
/// <amd-dependency path="text!../../fullPlayPopup/fullPlayPopup.html" name="fullPlayPopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!../style/carPopup.css';

// 弹框
import '../../fullPlayPopup/fullPlayPopup.controller';

// 服务
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';

// 参数
import {car, carLience} from "../../../core/enum/QueryRecord";
import {multipleChoice, AmbitusList} from "../../../core/enum/QueryParams";
import {ResourceTypeEnum} from "../../../core/server/enum/ResourceType";
import {ObjectType} from '../../../core/enum/ObjectType';

declare let carRecordPopupHtml: any, fullPlayPopupHtml: any;

class CarPopupController {
    static $inject = ["$scope", "$timeout", "layer", "resourceRetrievalService"];

    switchButton: boolean = true;

    activeRank: number;
    totalRank: number;
    accessRecords: car;
    accessRecordsList: Array<car>;

    carLience: carLience;
    quickSearchAgainText: string = "";
    ambitusText: string = "All";
    ambitusInfo: Array<multipleChoice>;
    showFooter:boolean = false;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,) {
        let self = this;
        self.activeRank = $scope.rank + 1;
        self.totalRank = $scope.allList.length;
        self.accessRecordsList = $scope.allList;
        self.accessRecords = self.accessRecordsList[$scope.rank];
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

    // 查看全图
    public fullScreen(path: string) {
        let scope: { layer: any; index: string, path: any, $destroy: Function } = this.$scope.$new();
        scope.index = "fullScreenPopup";
        scope.path = path;

        if (path) {
            let contentHTML = `<img ng-src=${path} style='width:800px;height:632px;'>`;

            this.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg no-scroll',
                shadeClose: true,
                shade: 0.6,
                area: ['800px', '632px'],
                content: contentHTML,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        } else {
            this.layer.msg("图片地址不存在")
        }
    }

    // 查看视频
    public fullPlay(item:any) {
        let scope: { layer: any; index: string, $destroy: Function, PointDeTail:any } = this.$scope.$new();
        scope.index = "fullPlayPopup";
        if (this.$scope.cameraInfo){
            scope.PointDeTail = this.$scope.cameraInfo;
        }
        
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['查看视频', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['680px', '433px'],
            content: fullPlayPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 查看完整档案
    public lookRecordDetail() {
        let scope: { layer: any; index: string, $destroy: Function, carDetailArchives: carLience } = this.$scope.$new();
        scope.index = "carRecordPopup";
        scope.carDetailArchives = this.carLience;

        this.layer.open({
            content: carRecordPopupHtml,
            ID: scope.index,
            scope: scope,
            AreaAndPosition: {
                left: 700,
                top: 200,
                width: 560,
                height: 410
            },
            end: function () {
                scope.$destroy();
            }
        });
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
     * @param {QueryItem} item
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

app.controller("carPopupController", CarPopupController);