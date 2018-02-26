/// <amd-dependency path="text!./table-tree.html" name="tableTreeHtml" />

import {app} from '../../app/main.app';
import 'angular';
import 'css!./table-tree.css';

declare const tableTreeHtml: any;
declare const angular: any;

class UtilTabledTreeDirective {
    static $inject: Array<string> = ['$compile','$timeout'];

    constructor() {

    }

    static instance() {
        return new UtilTabledTreeDirective();
    }

    restrict: string = 'E';
    replace: boolean = true;
    transclude: boolean = true;
    scope = {
        treeChild:'=',
        treeChildLevel:'@',

        treeChildIndex:'=',
        treeChildParentName:'@',



        treeChildParent:'=',

        treeChildCheck:'=',
        treeChildCheckBtn:'&',

        treeChildClick:"&",
        treeChildUpdateBtn:"&",//itemData
        treeChildDeleteBtn:"&",//itemData
        treeChildAddPersonBtn:'&'//itemData
    };
  //  require: string = '?^utilTableTreeHead';
    controllerAs = 'tableTreeCtrl';
    template = tableTreeHtml;

    controller = function ($scope:any,$compile:any,$timeout:Function) {
        $scope.$compile = $compile;
        if($scope.treeChildLevel){
            this.currentLevel = parseInt($scope.treeChildLevel) + 1;
        }else{
            this.currentLevel = 1;
        }
        this.initFromParent = function(){
            if($scope.treeChildParent.length>0){
                console.log("%c table tree 当前 头部行数据名称 " + $scope.treeChildParent.length,"color:green");
                this.dataChild = [];
                $timeout(()=>{
                    this.dataChild = angular.copy($scope.treeChildParent);
                });
                this.dataChild.isCheckBox = false;
            }else{
                console.error("tree-child-parent 数据格式出错，需要带{{}} 且为数组");
                $timeout(()=>{
                    this.dataChild = [];
                });
            }
            this.isTreeTop = true;
        };

        if($scope.treeChildParent){

            if($scope.treeChildParent.length>0){
                console.log("%c table tree 当前 头部行数据名称 " + $scope.treeChildParent.length,"color:green");
                this.dataChild = [];
                $timeout(()=>{
                    this.dataChild = angular.copy($scope.treeChildParent);
                });
                this.dataChild.isCheckBox = false;
                if($scope.treeChildIndex || $scope.treeChildIndex == 0){
                    this.treeChildIndex = $scope.treeChildIndex;
                    if(!$scope.treeChildCheck){
                        this.currentCheckBox = false;
                    }
                }
            }else{
                console.error("tree-child-parent 数据格式出错，需要带{{}} 且为数组");
                $timeout(()=>{
                    this.dataChild = [];
                });
            }
            this.isTreeTop = true;
        }else{
            this.isTreeTop = false;

            console.log("%c table tree 当前行数据名称 " + $scope.treeChild.Name,"color:green");
            this.treeChildIndex = $scope.treeChildIndex;
            if($scope.treeChild){
                this.dataChild = $scope.treeChild;

                if($scope.treeChildParentName){
                    this.treeChildParentName = $scope.treeChildParentName;
                }else{
                    if(this.dataChild.JsonUserData && this.dataChild.JsonUserData.Area){
                        this.treeChildParentName = this.dataChild.JsonUserData.Area.Name
                    }
                }
            }

            if(!$scope.treeChildCheck){
                this.dataChild.isCheckBox = false;
            }else{
                this.dataChild.isCheckBox = $scope.treeChildCheck;
            }

        }

        this.changeChildShow = function () {
            console.log("改变子显示状态，当前 下标---名称：",$scope.treeChildIndex + "---" + this.dataChild.name);
            this.dataChild.isShowChild = !this.dataChild.isShowChild;
        };
        //改变 打钩状态
        this.changeCheckBox = function () {
            this.dataChild.isCheckBox = ! this.dataChild.isCheckBox;
            //下级打钩回调，向上冒泡通知 当前 改变后的状态
            $scope.treeChildCheckBtn({checkResult:this.dataChild,preStatus:this.dataChild.isCheckBox});
            //改变 打钩状态 关联子
            this.afterCheckBoxToChild(this.dataChild.isCheckBox);
        };
        //改变 打钩状态 关联子
        this.afterCheckBoxToChild = function (newStatus:boolean) {
            console.log("打钩当前改变 关联 通知子 ： ",this.dataChild.children ||"无子");
            if(this.dataChild.children && this.dataChild.children.length>0){
                this.dataChild.children.forEach((val:any)=>{
                    val.isCheckBox = newStatus;
                })
            }
        };
        //子收到父打钩改变 通知子


        //下级打钩回调，向上冒泡通知
        this.childCheckBtnCallBack = function (checkResult:any,preStatus:boolean) {
            console.log("子向父冒泡后 收到子的状态：",preStatus);
            console.log("子向父冒泡后 父当前状态：",this.dataChild.isCheckBox);
            let flag = preStatus;
            //当前 选中
            if(this.dataChild.isCheckBox){
                //子已不选
                if(preStatus == false){
                    // 当前 改 不选
                    //this.dataChild.isCheckBox = false;
                    //向上冒泡通知 当前 改变后的状态
                 //   $scope.treeChildCheckBtn({checkResult:checkResult,preStatus:false});
                }
                $scope.treeChildCheckBtn({checkResult:checkResult,preStatus:false});
            }else{
                //当前 不选中

                //子选 不关联父
                $scope.treeChildCheckBtn({checkResult:checkResult,preStatus:false});
            }

         /*   console.log(checkResult);
            if(this.currentCheckBox == checkResult.checkBox){
                return;
            }
            if($scope.treeChildCheckBtn){
                $scope.treeChildCheckBtn({checkResult:checkResult,preIndex:(this.treeChildIndex + "--"+preIndex)});
            }*/
        };
        //TODO 有问题，暂放 下级打钩回调 最终向指令外 回调通知
       /* this.topCheckBtnCallBack = function (data:any,preIndex:any) {
            let topResultCount:number = this.dataChild.length;
            for(let i=0;i<this.resultList.length;i++){
                if(this.resultList[i].key  == preIndex){
                    if(data.checkBox){
                        this.resultList[i].result.checkBox =true;
                        //是否移除
                    }else{
                        this.resultList[i].result.checkBox =false;
                    }
                    this.mainCheckBtnCallBack(this.resultList);
                    break;
                }
            }
            this.resultList.push({
                key:preIndex,
                result:data
            });
            this.mainCheckBtnCallBack(this.resultList);
        };*/

        this.changeTopChildShow = function () {
            this.dataChild.isCheckBox = ! this.dataChild.isCheckBox;
            console.log("最上级关联子");
            //改变 打钩状态 关联子
            //改变 树根节点
            this.dataChild.forEach((val:any)=>{
                console.log(this.dataChild.isCheckBox);
                val.isCheckBox = this.dataChild.isCheckBox;
            });
            this.mainCheckBtnCallBack(false,this.dataChild.isCheckBox);

        };

        //最终通知暴露
        this.mainCheckBtnCallBack = function (_result:any,preStatus:boolean) {
            console.log("最终返回",_result,preStatus);

            console.log("最终返回========",this.dataChild);
            if(_result){
                if(this.dataChild.isCheckBox){
                    this.dataChild.forEach((val:any)=>{
                        if(val.isCheckBox == false){
                            console.log("最终改变全部xuan========",this.dataChild.isCheckBox);
                            this.dataChild.isCheckBox = false;
                            return;
                        }
                    });
                    console.log("最终改变全部xuan========",this.dataChild.isCheckBox);
                }else{
                    let flag = true;
                    this.dataChild.forEach((val:any)=>{
                        if(val.isCheckBox == false){
                            flag = false;
                            return;
                        }
                    });
                    console.log("最终改变全部xuan========",flag);
                    this.dataChild.isCheckBox = flag;
                }
            }
            if(!this.paramsIsFunction($scope.treeChildCheckBtn)){
                return;
            }
            $timeout(()=>{
                let resultList = getTreeIsCheckList(this.dataChild,[]);
                console.log("最终 多选后接收到ID结果集合：：：：",resultList);
                console.log("最终 多选后 当前操作：：：：",_result);
                console.log("最终 多选后 操作后状态：：：：",preStatus);
                $scope.treeChildCheckBtn({checkResult:resultList,checkIndex:_result,preStatus:preStatus});
            });
        };

        this.childUpdateBtnCallBack = function (itemData:any,parentName:string) {
            if(this.paramsIsFunction($scope.treeChildDeleteBtn)){
                $scope.treeChildUpdateBtn({itemData:itemData,parentName:parentName});
            }
        };

        this.childDeleteBtnCallBack = function (data:any) {
            if(this.paramsIsFunction($scope.treeChildDeleteBtn)){
                $scope.treeChildDeleteBtn({itemData:data});
            }
        };

        this.childAddPersonBtnCallBack = function (itemData:any,parentName:string) {
            if($scope.treeChildAddPersonBtn){
                $scope.treeChildAddPersonBtn({itemData:itemData,parentName:parentName});
            }
        };
        //判断参数 是否为函数
        this.paramsIsFunction = function(param:string){
            if(typeof param  === "function") {
                return true;
            }
            return false;
        };

        //遍历获取已选ID 集合
        function getTreeIsCheckList(data:any,resultList:any)
        {

            var Deep:any,T:any,F:any;
            for (F = data.length;F;)
            {
                T = data[--F];
                if (T.isCheckBox) resultList.push(T.ID);
                if (T.children)
                {
                    Deep = getTreeIsCheckList(T.children,resultList);
                    if (Deep) {
                       // resultList.push(Deep);
                        //return Deep;
                    }
                }
            }
            return resultList;
        }

    };
    /**
     * Manually compiles the element, fixing the recursion loop.
     * @param element
     * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
     * @returns An object containing the linking functions.
     */
    compile = function(element:any) {
        return directiveHelper(element,function(scope:any, iElement:any, iAttrs:any, controller:any, transcludeFn:any){
                    // 这里可以往scope中绑定一些变量
                    //父改变
                    scope.$watch('treeChildCheck', watchChildCheck, true);

                    function watchChildCheck(newData:boolean,oldData:boolean){
                        //父改变
                        //if(newData == true){
                            controller.afterCheckBoxToChild(newData);
                       // }
                    }

                    scope.$watch('treeChildParent', function (newVal:any,oldVal:any) {
                        console.log("数据链改变。。。",oldVal,newVal,oldVal===newVal);
                        if(oldVal === newVal){

                        }else{
                            console.log("数据链改变。。。重新初始化");
                            controller.initFromParent();
                          //  controller.dataChild = angular.copy(newVal);
                        }
                    }, true);
                    console.log(controller);
                });
        function directiveHelper(element:any, link:any){
            // Normalize the link parameter
            // 如果link参数是对象类型link:{pre: function(...){}, post: function(...){}}则不做处理
            // 如果link参数是函数类型则将其作为post-link函数在$compile之后调用
            if(angular.isFunction(link)){
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            // 获取并清空当前元素的内容，后面进行编译
            var contents:any = element.contents().remove();
            var compiledContents:any;

            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 * 编译和重新添加内容到当前元素
                 */
                post: function(scope:any, element:any){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = scope.$compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone:any){
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                        console.log("%c 渲染完成","color:orange");
                    }
                }
            };
        }
    }

}

app

    .directive('utilTableTree', UtilTabledTreeDirective.instance)
;


