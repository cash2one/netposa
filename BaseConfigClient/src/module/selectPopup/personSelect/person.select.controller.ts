/** create by zxq
 *  选择 部分人可见 person 窗口弹出供选择
 * @time: 2017-06-13 14:01:32
 */
import {app} from "../../common/app/main.app";
import "css!../style/person-select.css";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {PersonTreeEx} from "../../../core/entity/ex/PersonTreeEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";

import "../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import {TreeType} from "../../../core/enum/TreeType";
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
declare let angular: any;

class PersonSelectController {

    personTreeParams: TreeDataParams<PersonTreeEx | AreaEx>;
    personTreeId: string = "personSelectModelTree";
    personSelectedList: Array<PersonTreeEx> = [] as Array<PersonTreeEx>;
    personSelectedIdList: Array<string> = [] as Array<string>;
    searchPersonStr: string = "";
    static $inject = ['$scope', '$timeout', "treeDirectiveService",'connectTreeService'];

    constructor(private $scope: any,
                private $timeout: any,
                private treeService: ITreeDirectiveService,
                private connectTreeService:IConnectTreeService) {
        this.personSelectedIdList = this.$scope.selectPersonID;
        this.initPersonTreeParams();

    }

    //搜索框改变
    onChangeSearch(searchStr: string): void {
        this.$timeout(() => {
            this.treeService.filterShowNodes(this.personTreeId, 'Name', searchStr);
        });
    };

    //初始化 摄像机 树相关参数
    private initPersonTreeParams() {
        this.personTreeParams = new TreeDataParams<PersonTreeEx | AreaEx>(true);
        this.personTreeParams.treeId = this.personTreeId;
        this.personTreeParams.isShowIcon = true;
        this.personTreeParams.isShowLine = false;

        this.personTreeParams.checkEnable = true;

        this.personTreeParams.isSingleSelect = false;
        this.personTreeParams.isSimpleData = true;

        this.personTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.personSelectedList = this.getCheckedList(TreeType.person.value, treeId);
            });
        };
        this.personTreeParams.treeInitComplete = (treeId: string): void => {
            if (this.personSelectedIdList.length > 0) {
                this.defaultCheckTreeByIds(TreeType.person.value, this.personTreeId, this.personSelectedIdList);
            }
        };
        this.connectTreeService.findAreaWithPerson().then((res: Array<AreaEx | PersonTreeEx>) => {
            this.personTreeParams.treeDatas = res;
        })
    };

    /** create by zxq
     * 根据 数据集合 勾选 对应的树节点
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @params: ids 结合
     * @params: paramName 匹配参数名称 默认 "ID"
     * @return:
     */
    private defaultCheckTreeByIds = (treeType: string, treeId: string, ids: Array<string>, paramName?: string): void => {
        if (!paramName) {
            paramName = "ID";
        }
        if (ids.length > 0) {
            let checkParamsList = [] as Array<{ key: string, value: string }>;
            angular.forEach(ids, (val: string) => {
                checkParamsList.push({key: paramName, value: val});
            });
            if (this.treeService.checkNodesByParamsList(treeId, checkParamsList, true)) {
                this.personSelectedList = this.getCheckedList(treeType, treeId);
            }
        } else {
            this.personSelectedList = [];
        }
    };

    /** create by zxq
     * 获取已选择的 树节点集合
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @return: Array<CameraEx>&Array<BusinessLibEx> 节点集合 类型与 treeType 相对应
     */
    private getCheckedList(treeType: string, treeId: string): Array<PersonTreeEx & AreaEx> {
        let treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
        let result: Array<PersonTreeEx & AreaEx> = [] as Array<PersonTreeEx & AreaEx>;
        if (treeCheckedNodes) {
            angular.forEach(treeCheckedNodes, (val: PersonTreeEx & AreaEx) => {
                if (val.treeType === treeType) {
                    result.push(val);
                }
            });
        }
        return result;
    }


    //移除 已选 目的项
    removeSelected(pItem: any, isRemoveAll?: boolean) {
        if (pItem) {
            this.treeService.updateNodeChecked(this.personTreeId, pItem.tId, false);
            this.personSelectedList = this.getCheckedList(TreeType.person.value, this.personTreeId);
        }
        if (isRemoveAll) {
            if (this.treeService.checkAllNodes(this.personTreeId, false)) {
                this.personSelectedList = [];
            }
        }
    }
    closeUpdateModel(){
        this.$scope.$emit('person.select.popup');
    }

    commitPersonSelect() {
        if (this.personSelectedList.length == 0) {
            return;
        }
        let resultIdList = [] as Array<string>;
        angular.forEach(this.personSelectedList, (val: PersonTreeEx) => {
            resultIdList.push(val.ID);
        });
        this.$scope.$emit('person.select.popup', resultIdList);
    }
}

app.controller('personSelectController', PersonSelectController);