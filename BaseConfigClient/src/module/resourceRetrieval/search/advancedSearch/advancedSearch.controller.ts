import {app} from "../../../common/app/main.app";

// 模块
import "./advancedPage/carSearchPage.controller";
import "./advancedPage/personSearchPage.controller";
import "./advancedPage/wifiSearchPage.controller";
import "./advancedPage/EFSearchPage.controller";
import "./advancedPage/deviceSearchPage.controller";
import "./advancedPage/positionSearchPage.controller";

// 参数
import {AdvancedParams} from "./advancedParamsEnum";
import {
    MockCar,
    MockCarList,
    MockWifi,
    MockWifiList,
    MockDevice,
    MockDeviceList,
    MockPosition,
    MockPositionList
} from "./advancedTestEnum";
import {
    Enum,
    TimeLength,
    getModelDataList,
    getFastDataList,
    getSexDataList,
    getGlassesDataList,
    getToteDataList,
    getAgeDataList,
    getMaskDataList,
    getClothesDataList,
    getHairDataList,
    getCapDataList,
    getShoesDataList,
    getVehicleTypeDataList,
    getBrandDataList,
    getColorDataList,
    ModelData,
    FastData,
    SexData,
    GlassesData,
    AgeData,
    MaskData,
    ClothesData,
    HairData,
    CapData,
    ShoesData,
    ToteData,
    VehicleTypeData,
    BrandData,
    ColorData
} from "./adVanceSearchEnum";

declare let angular: any;

interface SwichTitle {
    title: string;
    iconPath: string;
    name: string;
    visible: boolean;
}

class AdvancedSearchController {
    static $inject = ["$scope", "$timeout", "layer"];

    switchButton: Array<SwichTitle>;
    switchPage: SwichTitle;

    //数据
    MockCar: Array<MockCar> = MockCarList(16);
    MockWifi: Array<MockWifi> = MockWifiList(28);
    MockDevice: Array<MockDevice> = MockDeviceList(4, "camera");
    MockPosition: Array<MockPosition> = MockPositionList(9);

    AdvancedParams: AdvancedParams = new AdvancedParams();
    ModelDataList: Array<Enum<string>> = getModelDataList();
    FastDataList: Array<Enum<string | TimeLength>> = getFastDataList();
    SexDataList: Array<Enum<string>> = getSexDataList();
    GlassesDataList: Array<Enum<string>> = getGlassesDataList();
    ToteDataList: Array<Enum<string>> = getToteDataList();
    AgeDataList: Array<Enum<string>> = getAgeDataList();
    MaskDataList: Array<Enum<string>> = getMaskDataList();
    ClothesDataList: Array<Enum<string>> = getClothesDataList();
    HairDataList: Array<Enum<string>> = getHairDataList();
    CapDataList: Array<Enum<string>> = getCapDataList();
    ShoesDataList: Array<Enum<string>> = getShoesDataList();
    VehicleTypeDataList: Array<Enum<string>> = getVehicleTypeDataList();
    BrandDataList: Array<Enum<string>> = getBrandDataList();
    ColorDataList: Array<Enum<string>> = getColorDataList();
    ModelData: Enum<string> = ModelData.all;
    FastData: Enum<string | TimeLength> = FastData.selectDay;
    SexData: Enum<string> = SexData.all;
    GlassesData: Enum<string> = GlassesData.all;
    ToteData: Enum<string> = ToteData.all;
    AgeData: Enum<string> = AgeData.all;
    MaskData: Enum<string> = MaskData.all;
    ClothesData: Enum<string> = ClothesData.all;
    HairData: Enum<string> = HairData.all;
    CapData: Enum<string> = CapData.all;
    ShoesData: Enum<string> = ShoesData.all;
    VehicleTypeData: Enum<string> = VehicleTypeData.roadster;
    BrandData: Enum<string> = BrandData.C;
    ColorData: Enum<string> = ColorData.all;
    Sacle: number = 100;
    currentLayerIndex1: number;
    currentLayerIndex2: number;
    currentLayerIndex3: number;

    advancedSearchCarUrl: string;

    constructor(private $scope: any,
                private $timeout: Function,
                private layer: any) {

        
        this.advancedSearchCarUrl = '../module/resourceRetrieval/search/advancedSearch/advancedPage/carSearchPage.html' + "?v=" + new Date().getTime();
        this.initParams();
    }

    public initParams() {
        let self = this;

        self.switchButton = [
            {title: "车辆", iconPath: "../../../images/resourceRetrieval/switch-car.png", name: "car", visible: true},
            {
                title: "人像",
                iconPath: "../../../images/resourceRetrieval/switch-person.png",
                name: "person",
                visible: false
            },
            {
                title: "Wi-Fi",
                iconPath: "../../../images/resourceRetrieval/switch-wifi.png",
                name: "wifi",
                visible: false
            },
            // {title:"RFID",iconPath:"../../../images/resourceRetrieval/switch-rfid.png",name:"rfid",visible: false},
            {
                title: "电围",
                iconPath: "../../../images/resourceRetrieval/switch_electronicfence.png",
                name: "electronicfence",
                visible: false
            },
            // {title:"设备",iconPath:"../../../images/resourceRetrieval/switch-device.png",name:"device",visible: false},
            // {title:"位置",iconPath:"../../../images/resourceRetrieval/switch-position.png",name:"position",visible: false}
        ];

        // 数据
        self.switchPage = self.switchButton[0];

        let params = new AdvancedParams();
        params.arrCameraId = [];
        params.arrWifiId = [];
        params.arrElectronicFenceId = [];
        self.AdvancedParams = params;
    }

    // 导航条按钮切换
    public navigationSwitch(name: string) {
        let self = this;
        let switchNav: Array<SwichTitle> = angular.copy(self.switchButton);
        // 导航切换
        if(self.switchPage == null || self.switchPage.name !== name) {
            // 广播子页切换
            self.$scope.$broadcast("advancedSearch-change", name);
        }
        switchNav.forEach((Title) => {
            if (Title.name === name) {
                Title.visible = true;
                self.switchPage = Title;
            } else {
                Title.visible = false;
            }
        });
        self.switchButton = switchNav;

        self.$scope.$emit('map-clear-draw', "");
    };

    public advancedClose() {
        this.navigationSwitch("car");
        this.$scope.$broadcast("advancedSearch-change", "all");
        this.$scope.$emit("search-device-type", "All");
    }
}

app.controller("AdvancedSearchController", AdvancedSearchController);