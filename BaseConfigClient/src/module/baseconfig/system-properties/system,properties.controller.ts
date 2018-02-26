import {app} from "../../common/app/main.app";
import {SystemConfigParams} from "../../../core/entity/SystemConfigParams";
import '../../common/services/system.service';
import {ISystemService} from '../../common/services/system.service';
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import "../../common/factory/systemInfo.cache.factory";
import {ISystemInfoCacheProvider} from "../../common/factory/systemInfo.cache.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";

declare let angular: any;

class SystemPropertiesConfigController {
    static $inject = ['$scope', 'systemService', 'layer', 'systemInfoCacheFactory', 'layerDec'];

    moduleName: string;

    // list
    systemData: any;
    sysLanguage: string;
    AlarmPhotoNum: string;
    PhotoFind: string;
    Identity: string;
    IdentityValue: number;
    StoreTime: string;
    videoBeforeTime: number;
    videoAfterTime: number;
    similarityMax: number = 100;

    constructor(private $scope: any,
                private systemService: ISystemService,
                private layer: any,
                private systemInfoCacheFactory: ISystemInfoCacheProvider,
                private layerDec: ILayerDec) {
        // 切换按钮
        $scope.enabled = true;
        $scope.onOff = true;
        $scope.yesNo = true;
        $scope.disabled = true;
        this.moduleName = "系统参数配置界面";
        //获取地图服务数据
        this.getSystemData();
    }

    private getSystemData() {
        this.systemService.getSystemData().then((res: ResponseResult<SystemConfigParams>) => {
            if ((res.code === 200) && (res.data)) {
                this.systemData = angular.copy(res.data);
                this.systemInfoCacheFactory.setSystemInfo(res.data);
            } else {
                this.systemData = {
                    AlarmPhotoNum: "",
                    PhotoFind: "",
                    Identity: "",
                    IdentityValue: "",
                    StoreTime: "",
                    videoBeforeTime: "",
                    videoAfterTime: "",
                    desc: ""
                }
            }
        })
    }

    public submitList() {
        let self = this;
        self.systemService.editSystemData(self.systemData).then((res: ResponseResult<null>) => {
            if (res.data && res.code === 200) {
                self.layerDec.info('编辑成功');
                self.getSystemData();
                self.systemInfoCacheFactory.setSystemInfo(self.systemData);
            } else {
                self.layerDec.info('编辑失败');
            }
        })
    }
}

app.controller("systemPropertiesController", SystemPropertiesConfigController);