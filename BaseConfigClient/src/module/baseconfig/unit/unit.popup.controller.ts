/**
 * Created by dell on 2017/3/29.
 */
import {app} from "../../common/app/main.app";
import '../../common/services/unit.service';
import {IUnitService} from "../../common/services/unit.service";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {UnitEx} from "../../../core/entity/ex/UnitEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IAreaService} from "../../common/services/area.service";
import {TreeDataParams, ITreeDataParams} from "../../common/directive/tree/tree-params";

class UnitPopupController{
    static $inject = ['$scope', '$rootScope', 'unitService', '$q', '$timeout', 'areaService'];
    curdType: string;
    Unit: UnitEx;
    submit: Function;
    cancel: Function;
    treeParams: ITreeDataParams<AreaEx>;
    isShowAreaTree: boolean;

    constructor($scope: any, $rootScope: any, unitService: IUnitService, $q: any, $timeout: any, areaService: IAreaService) {

        $scope.$on("$destroy", function(){
        });

        // 初始化参数, 从parentScope中获取到参数
        var vm = this; // 使用this替代$scope
        vm.curdType = $scope.curdType;
        vm.Unit = {} as UnitEx;

        vm.treeParams = new TreeDataParams<AreaEx>();
        vm.treeParams.treeId = "unitPopupAreaTree";
        vm.treeParams.onClick = treeSelectNode;

        if (vm.curdType === 'add' && $scope.currentArea) {
            vm.Unit.ParentArea = {} as Area;
            vm.Unit.ParentArea.ID = $scope.currentArea.ID;
            vm.Unit.ParentArea.Name = $scope.currentArea.Name;
            vm.submit = saveUnit;

            // 查询树结点数据再初始化
            areaService.findListTree().then((datas: Array<AreaEx>)=> {
                $timeout(()=>{
                    vm.treeParams.treeDatas = datas;
                    vm.treeParams.defaultSelectTreeId = vm.Unit.ParentArea.ID;
                });
            });

        } else if (vm.curdType === 'edit' && $scope.currentUnit) {
            vm.submit = editUnit;

            $q.all([unitService.get($scope.currentUnit.ID), areaService.findListTree()])
                .then((res: [ResponseResult<UnitEx>, Array<AreaEx>])=> {
                    console.error(res);
                    let r0 = res[0];
                    let r1 = res[1];

                    if(r0.code !== 200){
                        return $q.reject(r0.code);
                    }

                    $timeout(()=> {
                        if (r0.data) {
                            vm.Unit = r0.data;
                            vm.treeParams.treeDatas = r1;
                            if (vm.Unit && vm.Unit.ParentArea) {
                                vm.treeParams.defaultSelectTreeId = vm.Unit.ParentArea.ID;
                            }
                        }
                    })
                });
        }
        vm.cancel = cancelAreaPopup;

        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx){
            $timeout(()=>{
                vm.Unit.ParentArea = treeNode;
                vm.isShowAreaTree = false;
            })
        }

        function saveUnit() {
            if (!validate()) return;

            unitService.save(vm.Unit).then(complete).then(closePopup);

            function complete(res: ResponseResult<string>) {
                if(res.code === 200){
                    // 调用关闭窗口事件
                    return null;
                }else{
                    return $q.reject(res.code);
                }
            }

            function closePopup(){
                $rootScope.$broadcast('unit.closePopup', true);
            }
        }

        function editUnit() {
            if (!validate()) return;

            unitService.edit(vm.Unit).then(complete).then(closePopup);

            function complete(res: ResponseResult<string>){
                if(res.code === 200){
                    return null;
                }else{
                    return $q.reject(res.code);
                }
            }

            function closePopup(){
                $rootScope.$broadcast('unit.closePopup', true);
            }

        }

        function validate() {
            let result = true;
            if(!vm.Unit.Code){
                result = false;
            }else if(!vm.Unit.Name){
                result = false;
            }
            return result;
        }

        function cancelAreaPopup() {
            $rootScope.$broadcast('unit.closePopup');
        }
    }
}

app
    .controller('unitPopupController', UnitPopupController);