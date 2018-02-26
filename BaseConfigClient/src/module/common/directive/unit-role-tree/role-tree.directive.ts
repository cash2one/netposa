/// <amd-dependency path="text!./role-tree.html" name="roleTreeHtml" />

import {app} from '../../app/main.app';
import 'angular';

declare const roleTreeHtml: any;
declare const angular: any;

class UtilRoleTreeDirective{
    static $inject: Array<string> = ['$compile','$timeout'];
    constructor() {
    }
    //初始化 最顶级数据
    initFromParent:Function;

    //
    currentIsParent:boolean;
    static instance() {
        return new UtilRoleTreeDirective();
    }

    restrict: string = 'AE';
    replace: boolean = true;
    transclude: boolean = false;
    controllerAs = 'roleTreeCtrl';
    template = roleTreeHtml;
    scope = {
        treeChild:'=',

        treeParent:'=',

        treeParentCheckbox:"=",

        treeChildLevel:"@",

        treeChildChangeCheck:"&",

    };

    controller = function ($scope:any,$compile:any,$timeout:Function) {
        $scope.$compile = $compile;
        this.initFromParent = function () {
            if($scope.treeParent){
                this.currentIsParent = true;
                this.currentLevel = 1;
                this.currentTree = $scope.treeParent;
            }else{
                this.currentIsParent = false;
                this.currentTree = $scope.treeChild;

                // treeParentCheckbox
                this.currentLevel = $scope.treeChildLevel;
            }
        };

        // 点击改变当前打钩全选
        this.clickCheckBoxBtn = function (status:number) {
            if(status == 0 || status == 1 || status == -1){
                console.log("%c 改变操作权限 触发 打钩 按钮 ===" + status,"color:green");
                this.currentTree.checkBoxStatus = status;
            }else{
                console.log("%c 点击 改变操作权限 触发 打钩 按钮 ===" + status,"color:green");
                if(this.currentTree.checkBoxStatus == 1){
                    this.currentTree.checkBoxStatus = 0;
                }else{
                    this.currentTree.checkBoxStatus = 1;
                }

                if(this.currentTree.checkBoxStatus == 0){
                    this.currentTree.OperateList.forEach((val:any,index:number)=>{
                        this.changeOperateSelect(index,0);
                    });
                }else if(this.currentTree.checkBoxStatus == 1){
                    this.currentTree.OperateList.forEach((val:any,index:number)=>{
                        this.changeOperateSelect(index,1);
                    });
                }
            }
                $timeout(()=>{
                    //向上冒泡
                    $scope.treeChildChangeCheck({childStatus:this.currentTree.checkBoxStatus});
                });
        };
        // 最顶层 点击改变当前打钩全选
        this.topClickCheckBoxBtn = function (status:number,p_index:number) {
            console.log("%c 改变操作权限 触发 打钩 按钮 ===" + status,"color:green");
            if(status == 0 || status == 1 || status == -1){
                this.currentTree[p_index].checkBoxStatus = status;
            }else{
                if(this.currentTree[p_index].checkBoxStatus == 1){
                    this.currentTree[p_index].checkBoxStatus = 0
                }else{
                    this.currentTree[p_index].checkBoxStatus = 1;
                }
            }
            if(this.currentTree.checkBoxStatus == 0){
                this.currentTree.OperateList.forEach((val:any,index:number)=>{
                    this.changeOperateSelect(index,false);
                });
            }else if(this.currentTree.checkBoxStatus == 1){
                this.currentTree.OperateList.forEach((val:any,index:number)=>{
                    this.changeOperateSelect(index,true);
                });
            }
            //返回最终回调
            this.treeResultCallBack();
        };
        // 接收到 子 回调冒泡操作
        this.changeCheckBoxCallBack = function (childStatus:number) {
            console.log(this.currentTree.Name + "-----"+this.currentLevel +" 层 接收 子CheckBox 冒泡状态 " + childStatus);
            let flag:number;
            let currentStatus = this.currentTree.checkBoxStatus;
            //子已经全选
            if(childStatus == 1){
                if(currentStatus == 1){
                    flag = 1;
                }else if(currentStatus == 0){
                    flag = -1;
                }else{
                    // 当前半选 =》 半选/ 不选
                    // TODO 判断 当前 子列表和操作组 决定全选 和半选
                    flag = this.getCurrentCheckBoxResult();
                }
            }else if(childStatus == 0){
                if(currentStatus == 1){
                    // 当前全选 =》半选
                    flag = -1;
                }else if(currentStatus == 0){
                    flag = 0;
                }else{
                    // 当前半选 =》 半选/ 不选
                    flag = this.getCurrentCheckBoxResult();
                }
            }else if(childStatus == -1){
                    flag = -1;
            }

            this.currentTree.checkBoxStatus = flag;
           console.log("%c 收到 打钩 按钮冒泡后向上冒泡父级结果 ===" + flag,"color:green");
            //向上 发送当前状态
           $scope.treeChildChangeCheck({childStatus:this.currentTree.checkBoxStatus});
        };
        // 最顶层 收到子 checkbox 改变回调
        this.topChangeCheckBoxCallBack =function (childStatus:number,p_index:number,c_index:number) {
            $timeout(()=>{
                this.currentTree[p_index].checkBoxStatus = this.getTopCheckBoxResult(p_index);
                this.treeResultCallBack();
            });

        };
        //最终回调 结果
        this.treeResultCallBack = function () {
            $timeout(()=>{
                //向上冒泡 ----最终通知
                console.log("%c 整理结果 ----最终通知 ===" + status,"color:red");
            });
        };
        // 父级打钩改变后。。。
        this.afterChangeParentCheckbox = function(status:number){
            console.log("%c 父级打钩改变触发 下级改变 ===" +  this.currentLevel+ "---"+ status,"color:orange");
            this.currentTree.checkBoxStatus = status;
            let flag:boolean;
            if(status == 1){
                flag = true;
            }else{
                flag = false;
            }
            let self_this =this;
            this.currentTree.OperateList.forEach((val:any,index:number)=>{
                this.changeOperateSelect(index,status);
            });

            // 遍历选上当前操作数组

            //子 由自己 监听触发
        };
        // 改变当前下级是否 加载
        this.clickTreeChildShowBtn = function(){
            console.log("%c 改变下级显示开关 ==== " + !this.currentTree.isShowChild,"color:green");
            this.currentTree.isShowChild = !this.currentTree.isShowChild;
        };
        // 改变当前下级是否 加载
        this.topClickTreeChildShowBtn = function(index:number){
            console.log("%c top改变下级显示开关 ==== " + !this.currentTree[index].isShowChild,"color:green");
            this.currentTree[index].isShowChild = !this.currentTree[index].isShowChild;
        };
        //改变当前选择按钮
        this.changeOperateSelect = function (_index:number,status:number) {
            let flag:boolean;

            if(status === 1){
                flag = true;
            }else if(status === 0) {
                flag = false;
            }else{
                flag = !this.currentTree.OperateList[_index].isSelect;
            }

            //TODO 未判断 当前是否为有下拉选择
            this.currentTree.OperateList[_index].isSelect = flag;
            return flag;
        };

        this.topChangeOperateSelect = function (p_index:number,_index:number,status:number) {
            let flag:boolean;
            if(status === 1){
                flag = true;
            }else if(status === 0) {
                flag = false;
            }else{
                flag = !this.currentTree[p_index].OperateList[_index].isSelect;
            }

            //TODO 未判断 当前是否为有下拉选择
            this.currentTree[p_index].OperateList[_index].isSelect = flag;
            return flag;
        };

        // 点击改变当前功能按钮选择
        this.clickOperateSelectBtn = function (_index:number) {
            this.changeOperateSelect(_index);
            console.log("%c 改变当前选择按钮" + this.currentLevel,"color:blue");
            this.clickCheckBoxBtn(this.getCurrentCheckBoxResult());
        };

        this.topClickOperateSelectBtn = function (p_index:number,_index:number) {
            this.topChangeOperateSelect(p_index,_index);

            this.topChangeCheckBoxCallBack(-2,p_index);
        };
        //获取 当前 子节点 综合状态 0 全不选，1 全选 -1 部分选 -2 无子
        this.getChildrenCheckBoxResult = function ():number {
          if(this.currentTree.children && this.currentTree.children.length>0){
              let trueCount:number = 0;
              this.currentTree.children.forEach((val:any)=>{
                 if(val.checkBoxStatus == 1){
                      trueCount ++;
                  }else if(val.checkBoxStatus == -1){
                     trueCount = -1;
                     return;
                 }
              });

              if(trueCount == this.currentTree.children.length){
                  return 1;
              }else if(trueCount == 0){
                  return 0;
              }else{
                  return -1;
              }
          }else{
              return -2;
          }
        };
        //获取 当前 操作综合状态
        this.getOperateSelectResult = function ():number {
            if(this.currentTree.OperateList){
                let trueCount:number = 0;
                this.currentTree.OperateList.forEach((val:any)=>{
                    if(val.isSelect){
                        trueCount++;
                    }
                });
                console.log(this.currentLevel + " 层当前节点 操作选中 ：："+ trueCount);
                if(trueCount == 0){
                    return 0;
                }else if(trueCount == this.currentTree.OperateList.length){
                    return 1;
                }else{
                    return -1;
                }
            }else{
                return -2;
            }
        };

        this.getCurrentCheckBoxResult = function ():number {
            let flag_1 = this.getChildrenCheckBoxResult();
            let flag_2 = this.getOperateSelectResult();
            let flag_result = -1;

            if(flag_1 == 1 && flag_2 == 1){
                flag_result = 1;
            }else if(flag_1 == 0 && flag_2 == 0){
                flag_result = 0;
            }else if(flag_1 == -2){
                flag_result = flag_2;
            }else{
                flag_result =  -1;
            }
            console.log(this.currentLevel +"当前节点 综合结果：：；=== Children -- Operate ==" + flag_1 + " -- "+  flag_2 + " -- "+flag_result);
            return flag_result;
        };

        this.getTopCheckBoxResult = function (p_index:number) {

            let checkCount:number = 0;
            this.currentTree[p_index].children.forEach((val:any)=>{
                if(val.checkBoxStatus == 1){
                    checkCount++
                }else if(val.checkBoxStatus == -1){
                    checkCount = -1;
                    return;
                }
            });

            let selectCount:number = 0;
            this.currentTree[p_index].OperateList.forEach((val:any)=>{
                if(val.isSelect){
                    selectCount ++;
                }
            });
            console.error(selectCount,checkCount);
            if(checkCount ==0 && selectCount == 0){
                return 0;
            }else if(checkCount ==this.currentTree[p_index].children.length
                        && selectCount == this.currentTree[p_index].OperateList.length
            ){
                return 1;
            }else{
                return -1;
            }
        };

        //判断参数 是否为函数
        this.paramsIsFunction = function(param:string){
            if(typeof param  === "function") {
                return true;
            }
            return false;
        };
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
            controller.initFromParent();
            //父改变
            console.log("%c 渲染完成"+ controller.currentTree.Name || "wu==","color:orange" ,controller);
            console.log();

           // scope.$watch('treeParentCheckbox', watchParentCheckbox, true);

            function watchParentCheckbox(newData:number,oldData:number){
                // 父 打钩 改变
                console.log("%c 父级改变 新：：：" +newData,"color:orange");
                if(newData != oldData  && (newData == 0 || newData == 1) ){
                    controller.afterChangeParentCheckbox(newData);
                }
            }

           /* scope.$watch('treeChildParent', function (newVal:any,oldVal:any) {
                console.log("数据链改变。。。",oldVal,newVal,oldVal===newVal);
                if(oldVal === newVal){

                }else{
                    console.log("数据链改变。。。重新初始化");
                    controller.initFromParent();
                }
            }, true);*/
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
                      //  console.log("%c 渲染完成","color:orange");
                    }
                }
            };
        }
    }
}
app
    .directive('utilRoleTree', UtilRoleTreeDirective.instance)
;


