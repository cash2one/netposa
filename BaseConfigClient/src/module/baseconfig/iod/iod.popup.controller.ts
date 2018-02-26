/**
 * Created by dell on 2017/3/29.
 */
import { app } from "../../common/app/main.app";
import '../../common/services/iod.service';
import { IodEx } from "../../../core/entity/ex/IodEx";
import { Area } from "../../../core/entity/Area";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { IIodService } from "../../common/services/iod.service";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { ProxyServer } from "../../../core/entity/ProxyServer";
import 'angular';
declare let angular: any;
interface IIodTypes {
    key: string, value: string
}
const IodTypesEnum: Array<IIodTypes> = [
    { key: 'WiFi', value: 'Wi-Fi' },
    { key: 'EFENCE', value: '电子围栏' },
    { key: 'RmpGate', value: '卡口' }
];

class IodPopupController {
    static $inject = ['$scope', '$rootScope', 'iodService', '$q', '$timeout'];
    curdType: string;
    Area: Area = new Area();
    Iod: IodEx = new IodEx();
    treeParams: TreeDataParams<AreaEx> = new TreeDataParams<AreaEx>();
    isShowIodTree: boolean;
    // 是否是根区域, 只有在修改操作时生效
    // 当前区域是根区域时, 不允许选择根结点
    isRootIod: boolean = false;
    IodTypes: Array<IIodTypes> = IodTypesEnum;
    proxyList: Array<ProxyServer>;
    constructor(
        private $scope: any,
        private $rootScope: any,
        private iodService: IIodService,
        private $q: any,
        private $timeout: any
    ) {
        this.curdType = this.$scope.curdType;
        this.proxyList = this.$scope.proxyListForIod;
        this.$scope.$on("$destroy", function () {
            console.warn("销毁了弹出框");
        });

        this.initParams();

    }

    changeTypeSelect() {
        angular.forEach(this.proxyList, (val: ProxyServer) => {
            if(!this.Iod.ProxyServerID){
                this.Iod.Port = null;
            }
            if (val.ID === this.Iod.ProxyServerID) {
                this.Iod.Port = val.Port;
            }
        });
    }

    initParams() {

        if (this.curdType === 'add' && this.$scope.currentArea) {
            this.Iod.ParentArea = {} as Area;
            this.Iod.ParentArea.ID = this.$scope.currentArea.ID;
            this.Iod.ParentArea.Name = this.$scope.currentArea.Name;
            this.$timeout(() => {
                this.treeParams.treeDatas = this.$scope.treeDatas;
                this.treeParams.defaultSelectTreeId = this.$scope.currentArea.ID;
            });
            // 树节点默认选中的是当前选择的父节点id
            // 初始化树节点

        } else if (this.curdType === 'edit' && this.$scope.currentIod) {
            this.Iod = this.$scope.currentIod;
            this.$timeout(() => {
                this.treeParams.treeDatas = this.$scope.treeDatas;
                this.Iod.AreaID ? (this.treeParams.defaultSelectTreeId = this.Iod.AreaID) : (this.isRootIod = true);
            });

        }

        this.treeParams.treeId = "iodPopupIodTree";
        this.treeParams.isDefaultSelected = true;
        this.treeParams.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            console.log(treeNode);
            this.$timeout(() => {
                this.Iod.ParentArea = treeNode;
                this.isShowIodTree = false;
            })
        };
    }
    submitAction() {
        if (this.curdType === 'add') {
            this.saveIod();
        } else {
            this.editIod();
        }
    }
    saveIod() {
        if (!this.validate()) return;
        this.iodService.save(this.Iod).then((res: ResponseResult<string>) => {
            if (res.code === 200) {
                // 调用关闭窗口事件
                return null;
            } else {
                return this.$q.reject(res.code);
            }
        }).then(() => {
            this.cancelIodPopup(true);
        });

    }
    editIod() {
        if (!this.validate()) return;
        this.iodService.edit(this.Iod).then((res: ResponseResult<string>) => {
            console.log("editIod complete", res);
            if (res.code === 200) {
                return null;
            } else {
                return this.$q.reject(res.code);
            }
        }).then(() => {
            this.cancelIodPopup(true);
        });
    }
    validate() {
        let result = true;
        if (!this.Iod.Code) {
            result = false;
        } else if (!this.Iod.Name) {
            result = false;
        } else if (!this.Iod.IpAddress) {
            result = false;
        } else if (!this.Iod.Port) {
            result = false;
        }
        return result;
    }
    cancelIodPopup(refresh?: boolean) {
        this.$rootScope.$broadcast('iod.closePopup', refresh);
    }
}

app
    .controller('iodPopupController', IodPopupController);