/**
 * Created by dell on 2017/3/29.
 */
import {app} from "../../common/app/main.app";
import '../../common/services/area.service';
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IAreaService} from "../../common/services/area.service";
import {TreeDataParams} from "../../common/directive/tree/tree-params";

class AreaPopupController {
    static $inject = ['$scope', '$rootScope', 'areaService', '$q', '$timeout'];
    curdType: string;
    Area: AreaEx;
    submit: Function;
    cancel: Function;
    treeParams: TreeDataParams<AreaEx>;
    isShowAreaTree: boolean;
    // 是否是根区域, 只有在修改操作时生效
    // 当前区域是根区域时, 不允许选择根结点
    isRootArea: boolean;

    constructor($scope: any, $rootScope: any, areaService: IAreaService, $q: any, $timeout: any) {

        $scope.$on("$destroy", function () {
            console.error("销毁了弹出框");
        });

        // 初始化参数, 从parentScope中获取到参数
        var vm = this; // 使用this替代$scope
        vm.curdType = $scope.curdType;
        vm.Area = {} as AreaEx;

        vm.treeParams = new TreeDataParams<AreaEx>();
        vm.treeParams.treeId = "areaPopupAreaTree";
        vm.treeParams.isDefaultSelected = true;
        vm.treeParams.onClick = treeSelectNode;

        if (vm.curdType === 'add') {
            vm.Area.ParentArea = {} as Area;
            vm.Area.ParentArea.ID = $scope.currentArea.ID;
            vm.Area.ParentArea.Name = $scope.currentArea.Name;
            vm.submit = saveArea;
            // 查询树结点数据再初始化
            areaService.findListTree().then((datas: Array<AreaEx>)=> {
                $timeout(()=>{
                    vm.treeParams.treeDatas = datas;
                    vm.treeParams.defaultSelectTreeId = vm.Area.ParentArea.ID;
                });
            });
            // 树节点默认选中的是当前选择的父节点id
            // 初始化树节点

        } else if (vm.curdType === 'edit') {
            vm.submit = editArea;
            console.log($scope.currentArea);
            $q.all([areaService.get($scope.currentArea.ID), areaService.findListTree()])
                .then((res: [ResponseResult<AreaEx>, Array<AreaEx>])=> {
                    let r0 = res[0];
                    let r1 = res[1];
                    if(r0.code !== 200){
                        return $q.reject(r0.code);
                    }

                    $timeout(()=> {
                        if (r0.data) {
                            vm.Area = r0.data;
                            console.log(vm.Area);
                            if(vm.Area.ParentID == null){
                                vm.isRootArea = true;
                            }else{
                                vm.treeParams.treeDatas = r1;
                                if (vm.Area && vm.Area.ParentArea) {
                                    vm.treeParams.defaultSelectTreeId = vm.Area.ParentArea.ID;
                                }
                            }
                        }
                    })
                });
        }
        vm.cancel = cancelAreaPopup;

        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx) {
            $timeout(()=>{
                vm.Area.ParentArea = treeNode;
                vm.isShowAreaTree = false;
            })
        }

        function saveArea() {
            if (!validate()) return;

            areaService.save(vm.Area).then(complete).then(closePopup);

            function complete(res: ResponseResult<string>) {
                console.log(res)
                if (res.code === 200) {
                    // 调用关闭窗口事件
                    return null;
                } else {
                    return $q.reject(res.code);
                }
            }

            function closePopup() {
                $rootScope.$broadcast('area.closePopup', true);
            }
        }

        function editArea() {
            if (!validate()) return;
            areaService.edit(vm.Area).then(complete).then(closePopup);

            function complete(res: ResponseResult<string>) {
                console.log("editArea complete", res);
                if (res.code === 200) {
                    return null;
                } else {
                    return $q.reject(res.code);
                }
            }

            function closePopup() {
                $rootScope.$broadcast('area.closePopup', true);
            }
        }

        function validate() {
            let result = true;
            if (!vm.Area.Code) {
                result = false;
            } else if (!vm.Area.Name) {
                result = false;
            }
            return result;
        }

        function cancelAreaPopup() {
            $rootScope.$broadcast('area.closePopup');
        }
    }
}

app
    .controller('areaPopupController', AreaPopupController);