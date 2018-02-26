/// <amd-dependency path="text!../../../common/faceLibPersonUpdateModal/faceLibPersonUpdate.modal.html" name="faceLibPersonUpdateModalHtml" />

import { app } from "../../../common/app/main.app";
import "angular";
import "css!../../css/baseconfig-faceLib-person.css";

import "../../../common/services/businessLib.service";
import "../../../common/services/businessLibPerson.service";
import { BusinessPerson, IBusinessPerson } from "../../../../core/entity/BusinessPerson";
import PageParams from "../../../common/directive/page/page-params";
import { BusinessLib } from "../../../../core/entity/BusinessLib";
import { BusinessLibPersonListParams } from "../../../../core/params/BusinessLibParams";

import { IBusinessLibPersonService } from "../../../common/services/businessLibPerson.service";
import { ResponseResult, PageResult } from "../../../../core/params/result/ResponseResult";
import { IBusinessLibService } from "../../../common/services/businessLib.service";
import { BusinessLibEx } from "../../../../core/entity/ex/BusinessLibEx";
import {
    IFaceLibUpdateModalFactory,
    FaceUpdateParams
} from "../../../common/faceLibUpdateModal/faceLibUpdateModal.factory";

import "../businessLibPerson.factory";
import { IBusinessLibPersonFactory } from "../businessLibPerson.factory";

import "../../../common/faceLibPersonUpdateModal/faceLibPersonUpdate.modal.controller";
import { UpdateFaceLibPersonModalParams } from "../../../common/faceLibPersonUpdateModal/faceLibPersonUpdate.modal.controller";
import { SystemConfig } from "../../../common/system-config";


declare let angular: any;
declare let faceLibPersonUpdateModalHtml: any;
class FaceLibPersonController {
    // 不允许修改库ID；
    constLibItem: string;
    findListParams: BusinessLibPersonListParams;

    pageParams: PageParams;
    // table 列表数据
    //   tHeadList:Array<ITableHeader>;
    tBodyList: Array<BusinessPerson>;
    //编辑窗口 广播、接收名称
    watchUpdatePersonModalName: string;
    updatePersonLayerIndex: number;

    watchUpdateLibModalName: string;
    updateLibLayerIndex: number;

    currentLib: BusinessLib;
    tableNoData: boolean = false;

    //多选相关
    selectedList: Array<boolean>;
    isSelectNone: boolean;

    dataTotal: number = 0;
    isLoading: boolean = false;

    addPersonImageIndex: number;

    static $inject = ['$scope', '$stateParams', "$state",
        'i18nFactory',
        'businessLibPersonFactory',
        'faceLibUpdateModalFactory',
        'layer',
        'businessLibService',
        'businessLibPersonService'];
    constructor(private $scope: any, private $stateParams: BusinessLib, private $state: any,
        private i18nFactory: any,
        private businessLibPersonFactory: IBusinessLibPersonFactory,
        private faceLibUpdateModalFactory: IFaceLibUpdateModalFactory,
        private layer: any,
        private businessLibService: IBusinessLibService,
        private businessLibPersonService: IBusinessLibPersonService
    ) {
        this.constLibItem = SystemConfig.CONST_LIB;

        if (this.businessLibPersonFactory.getCurrentFaceLib()) {
            this.initCurrentParams(this.businessLibPersonFactory.getCurrentFaceLib());
            this.getListByParams(this.findListParams);
        }

        if (this.businessLibPersonFactory.getIsOpenModal()) {
            this.openUpdatePersonModel(false);
        }
        this.watchUpdatePersonModalName = "fromUpdatePerson.closeLayer";

        this.$scope.$on(this.watchUpdatePersonModalName, (even: Event, data: { isCommit: boolean }) => {
            console.log(this.watchUpdatePersonModalName + "广播接收", data);
            if (data.isCommit) {
                window.setTimeout(() => {
                    this.getListByParams(this.findListParams);
                }, 1000)
            }
            console.log(this.layer);
            this.layer.close(this.updatePersonLayerIndex);
        });

        this.watchUpdateLibModalName = this.faceLibUpdateModalFactory.getModalClosedWatchName();
        this.$scope.$on(this.watchUpdateLibModalName, (even: Event, data: { isCommit: boolean, isAdd: boolean, modelData: BusinessLibEx }) => {
            console.log("watchUpdateLibModalName 广播接收", data);
            if (data.isCommit) {
                this.updateCurrentLib(data.modelData);
            }
            console.log(this.layer);
            this.layer.close(this.updateLibLayerIndex);

            this.updateLibLayerIndex = 0;
        });

        this.$scope.$on("fromUpdateFaceLibPersonModal.closed", (even: Event, data: any) => {
            this.layer.close(this.addPersonImageIndex)
        });

        this.$scope.$on("$destroy", () => {
            this.businessLibPersonFactory.clearFactoryCache();
        });
    }


    initCurrentParams(currentLib: BusinessLib) {
        this.pageParams = new PageParams;
        this.findListParams = new BusinessLibPersonListParams();

        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;

        this.findListParams.arrLibId = [] as Array<string>;
        this.findListParams.arrLibId[0] = currentLib.ID;

        this.currentLib = new BusinessLib();
        this.currentLib = currentLib;
    }

    updateCurrentLib(currentLib: BusinessLib) {
        this.currentLib = currentLib;
    }

    getListByParams(params: BusinessLibPersonListParams) {
        this.businessLibPersonService.findListByParams(params).then((resp: ResponseResult<PageResult<IBusinessPerson>>) => {
            this.findListParams = params;
            if (resp.code == 200 && resp.data) {
                this.setTableBody(resp.data.Result, resp.count);
            } else {
                this.setTableBody([], 0);
            }

        })
    };

    setTableBody(dataList: Array<IBusinessPerson>, total: number) {
        this.dataTotal = total;
        if (dataList && dataList.length > 0) {
            this.tBodyList = dataList;
            this.tableNoData = false;

            let _pageParams = new PageParams();
            _pageParams.currentPage = this.findListParams.currentPage;
            _pageParams.pageSize = this.findListParams.pageSize;
            _pageParams.setTotalCount(total);

            this.pageParams = _pageParams;
        } else {
            this.tBodyList = [];
            this.tableNoData = true;
        }
        this.selectedList = [];
        this.tBodyList.forEach(() => {
            this.selectedList.push(false);
        });
        this.isSelectNone = true;
    }

    detailShow(data: BusinessPerson) {
        console.log(data);
        console.log(this.currentLib);
        let scope: UpdateFaceLibPersonModalParams = this.$scope.$new();
        scope.updateModal = data;
        scope.isUpdate = true;
        scope.libId = this.currentLib.ID;
        // scope.imgInfo.imageurl = data.FacePicPath[0];

        // 打开弹窗
        this.addPersonImageIndex = this.layer.open({
            type: 1,
            content: faceLibPersonUpdateModalHtml,
            scope: scope,
            skin: "overflow-visible",
            title: this.i18nFactory('FDS_01_06_62'),
            area: ["auto", "auto"],
            end: function () {
                scope.$destroy();
            },
            success: (params1: any, index: number) => {
                this.updatePersonLayerIndex = index;
            },
        });
    }

    deleteById(data: BusinessPerson) {
        let str = this.i18nFactory("FDS_00_04_02");
        this.layer.confirm(str, {
            icon: 0,
            title: this.i18nFactory("FDS_00_05_04"),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);

            this.submitDelete(data.ID);
        })
    };

    submitDelete(id: string) {
        console.log("当前选择ID " + id);
        this.businessLibPersonService.deleteById(id).then((resp: any) => {
            if (resp.code == 200) {
                this.getListByParams(this.findListParams);
            }
            this.isLoading = false;
        })
    }


    deleteByIds() {
        let ids: Array<string> = [];
        angular.forEach(this.selectedList, (val: boolean, index: number) => {
            if (val && this.tBodyList[index].ID) {
                ids.push(this.tBodyList[index].ID);
            }
        });
        console.log("当前选择ID " + ids);
        if (ids.length > 0) {
            let showText = this.i18nFactory("FDS_00_04_03", { value: ids.length });
            this.layer.confirm(showText, {
                icon: 0,
                title: this.i18nFactory("FDS_00_05_04"),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.submitDeleteByIds(ids);
            });
        } else {
            console.log("未选择、。。。。。。。。。。。。");
        }
    };

    submitDeleteByIds(ids: Array<string>) {
        console.log("当前选择ID " + ids);
        this.businessLibPersonService.deleteByIds(ids).then((resp: any) => {
            if (resp.code == 200) {
                this.getListByParams(this.findListParams);
            }
            this.isLoading = false;
        })
    }

    update(data: BusinessPerson) {
        this.openUpdatePersonModel(true, data);
    }

    openUpdatePersonModel(isUpdate: boolean, data?: BusinessPerson) {
        let titleStr = isUpdate ? this.i18nFactory('FDS_01_06_62') : this.i18nFactory('FDS_01_06_61');
        let scope: UpdateFaceLibPersonModalParams = this.$scope.$new();
        scope.emitName = this.watchUpdatePersonModalName;

        if (isUpdate) {
            scope.isUpdate = true;
            scope.updateModal = data;
        } else {
            scope.libId = this.currentLib.ID;
        }

        // 打开弹窗
        this.addPersonImageIndex = this.layer.open({
            type: 1,
            content: faceLibPersonUpdateModalHtml,
            scope: scope,
            skin: "overflow-visible",
            title: titleStr,
            area: ["auto", "auto"],
            end: function () {
                scope.$destroy();
            },
            success: (params1: any, index: number) => {
                this.updatePersonLayerIndex = index;
            },
        });
    };

    updateFaceLib() {
        this.businessLibService.findById(this.currentLib.ID).then((resp: ResponseResult<BusinessLibEx>) => {
            if (resp && resp.code == 200) {
                this.openUpdateLibModel(resp.data);
            }
        });

    }

    imagePathFilter(facePicPath: Array<string>) {
        console.debug("imagePathFilter", facePicPath);
        let result = "";
        if (facePicPath && facePicPath.length > 0) {
            result = "/bimg_content/" + facePicPath[0];
        }
        return result;

    }
    //打开编辑当前人脸库
    openUpdateLibModel(updateData: BusinessLibEx) {
        let scope: any = this.$scope.$new();
        let updateParams = new FaceUpdateParams();
        updateParams.isUpdate = true;

        updateParams.updateModalData = updateData;

        updateParams.parentID = updateData.ParentID;

        let titleStr = this.i18nFactory('FDS_01_06_20');

        this.faceLibUpdateModalFactory.setUpdateParams(updateParams);
        let htmlStr = this.faceLibUpdateModalFactory.getModalHtml();

        this.layer.open({
            type: 1,
            title: titleStr,
            content: htmlStr,
            skin: "overflow-visible",
            scope: scope,
            area: ["auto", "auto"],
            success: (layero: string, index: number) => {
                this.updateLibLayerIndex = index;
            },
            end: () => {
                console.debug("编辑人脸库框体关闭!");
                scope.$destroy();
            }
        });
    };
    goBackToFaceLibView() {
        this.$state.go("baseconfig.facelib.library", { reload: true });
    };
    //改变复选
    changeSelected(_index: number): void {
        this.selectedList[_index] = !this.selectedList[_index];
        for (let i = 0; i < this.selectedList.length; i++) {
            if (this.selectedList[i]) {
                this.isSelectNone = false;
                return;
            }
        }
        this.isSelectNone = true;
    };

    //about page click
    goPrevPage(num: number) {

        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }
    goNextPage(num: number) {
        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }
    goPage(num: number) {
        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }
    changePageSize(num: number) {
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = num;
        this.getListByParams(this.findListParams);
    }
}

app.controller("bcFaceLibPersonController", FaceLibPersonController);

