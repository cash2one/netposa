

import {app} from "../../common/app/main.app";


import {IPersonService} from "../../common/services/person.service";
import "../../common/services/person.service";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {AreaAndPersonListResult} from "../../../core/params/PersonParams";
import {TreeType} from "../../../core/enum/TreeType";

import {ITreeSelectModalFactory} from "../../common/treeSelectModal/treeSelectModal.factory";
import  "../../common/treeSelectModal/treeSelectModal.factory";
import  "../../common/treeSelectModal/treeSelectModal.controller";
import {TreeSelectResult} from "../../common/treeSelectModal/treeSelectModal.controller";


import {BusinessLibEx} from "../../../core/entity/ex/BusinessLibEx";
import PortraitTool from "../../common/portrait-tool";
import {TreeDataParams} from "../../common/directive/tree/tree-params";


import "../../common/services/businessLib.service";
import {IBusinessLibService} from "../../common/services/businessLib.service";

export class TreeSelectModalController{
    private treeModalLayerIndex:number;

    static $inject = ["$scope","$q","$filter",
                        "layer",
                        "personService",
                        "treeSelectModalFactory",
                        "businessLibService"
    ];
    constructor(private $scope: any,private $q:any,private $filter:any,
                private layer:any,
                private personService:IPersonService,
                private treeSelectModalFactory:ITreeSelectModalFactory,
                private businessLibService: IBusinessLibService
    ){
    }

    // 获取权限选择窗口  用户 树列表数据
    getTreeSelectTreeBaseDatas = ():any =>{
        let deferred = this.$q.defer();
        if(this.treeSelectModalFactory.getTreeBase().length>0){
            deferred.resolve(true);
        }else{
            this.personService.findTreeWithArea().then((resp:ResponseResult<AreaAndPersonListResult>)=>{
                if(resp && resp.code == 200){
                    this.treeSelectModalFactory.updateTreeBase(resp.data.areaExList,resp.data.personExList);
                    deferred.resolve(true);
                }else{
                    deferred.resolve(false);
                }
            });
        }
        return deferred.promise;
    };
    // 打开用户选择窗口
    openPersonSelectModel():void{
        this.getTreeSelectTreeBaseDatas().then((resp:boolean)=>{
            if(resp){
                this.treeSelectModalFactory.updateBaseTreeParams(TreeType.person.value);
                // 默认选中ID 列表
                // this.treeSelectModalFactory.updateTreeSelectedIds([]);
                let scope:any = this.$scope.$new();
                let titleStr = "选择树窗口";
                this.layer.open({
                    type: 1,
                    scrollbar:false,
                    title:[titleStr,'text-align: left;'],
                    content: this.treeSelectModalFactory.getModalHtmlTemplate(),
                    skin:'update-person-layer',
                    scope: scope,
                    area:["720px"],
                    end: function(){
                        scope.$destroy();
                    }
                }).then((index:number)=>{
                    this.openCloseLayerWatch();
                    this.setTreeModalLayerIndex(index);
                });
            }
        });
    }

    /** create by zxq
     * 打开 layer 关闭 回调监听
     * @time: 2017-06-13 14:15:25
     * @params:
     * @return: void
     */
    openCloseLayerWatch(){
        if(!this.treeModalLayerIndex){
            this.$scope.$on(this.treeSelectModalFactory.getSelectModalClosedWatchName(),(even:any,data:TreeSelectResult<any>)=> {
                if(data.isCommit){
                    console.log(" isCommit== true 窗口提交回调");
                }
                console.log(data);
                this.layer.close(this.treeModalLayerIndex);
            });
        }
    }
    /**
     *  标识当前 编辑layer modal
     * @time: 2017-04-19 17:06:48
     * @params: index 当前打开 layer 回调的 index
     * @return:
     */
    setTreeModalLayerIndex(index:number){
        this.treeModalLayerIndex = index;
    };

    /*===========================人脸库 树 测试相关*/
    public baseTreeParams:TreeDataParams<BusinessLibEx>;
    //初始化 摄像机 树相关参数
    private initPersonTreeParams(){
        this.baseTreeParams = new TreeDataParams<BusinessLibEx>(true);
        this.baseTreeParams.treeId = "testTreeID";

        this.baseTreeParams.isShowIcon = true;
        this.baseTreeParams.isShowLine = false;

        this.baseTreeParams.checkEnable = true;

        this.baseTreeParams.isSingleSelect = false;
        this.baseTreeParams.isSimpleData = true;
        // 注意
        this.baseTreeParams.treeIdKey = "treeIdKey";
        this.baseTreeParams.treePidKey = "treeParentId";

        this.baseTreeParams.onCheck = (event: Event, treeId: string, treeNode: any):void=>{
            console.log("获取打钩结果  需要过滤 掉虚拟节点 ");

            console.log();
        };

        this.baseTreeParams.treeInitComplete= (treeId:string):void=>{

        }
    };
    getBusinessLibLibHasSelf(){
        this.initPersonTreeParams();
        this.businessLibService.findHasSelfTree().then((resp:ResponseResult<Array<BusinessLibEx>>)=>{
            if(resp && resp.code ===200){
                console.log("%c TODO ==========未过滤前,","color:blue");
                console.log(resp.data);
                console.log("%c TODO ==========过滤掉 虚拟节点后数据,","color:blue");

                console.log(this.$filter("dummyNodeFilter")(resp.data));

                //1.转树
               console.log("%c TODO ==========1.转树,","color:blue");
               console.log(PortraitTool.convert2Ztree(resp.data, "treeID", "treeParentId", "children"));
               this.baseTreeParams.treeDatas = resp.data;
            }
            return true;
        });
    }

    /*===========================人脸库 树 测试相关*/

}

app.controller("tsTreeSelectModalController", TreeSelectModalController);