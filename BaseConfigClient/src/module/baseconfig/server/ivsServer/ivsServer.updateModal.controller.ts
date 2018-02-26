

import {app} from "../../../common/app/main.app";
import '../../../common/services/area.service';
import '../../../common/services/ivsServer.service';
import '../../../common/services/proxyServer.service';
import 'angular';

import {IAreaService} from "../../../common/services/area.service";
import {IIvsServerService} from "../../../common/services/ivsServer.service";
import {IProxyServerService} from "../../../common/services/proxyServer.service";
import {ITreeDataParams, TreeDataParams} from "../../../common/directive/tree/tree-params";
import {IvsServerEx} from "../../../../core/entity/ex/IvsServerEx";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {Enum} from "../../../../core/enum/Enum";
import {ProxyServer} from "../../../../core/entity/ProxyServer";
import {Area} from "../../../../core/entity/Area";
import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import {IvsServerType} from "../../../../core/enum/IvsServerType";
import {IvsServer} from "../../../../core/entity/IvsServer";
import {UpdateModalParams} from "../main/serverUpdateModal.params";

declare let angular: any;


class IvsServerUpdateModalController{
    isUpdate:boolean = false;
    currentServe:IvsServerEx;

    //-------start----树 结构 控件 参数
    areaTreeDatas:ITreeDataParams<AreaEx>;

    ivsServerTypeList:Array<Enum> = [];
    proxyServerList:Array<ProxyServer> = [];
    //-------end
    static $inject = ['$scope','proxyServerService','ivsServerService','$timeout','areaService'];

    constructor(private $scope:any,private proxyServerService:IProxyServerService, private ivsServerService:IIvsServerService,private $timeout:any,private areaService:IAreaService){

        // 初始化 类型选择
        for(let key in IvsServerType){
            this.ivsServerTypeList.push(IvsServerType[key]);
        }
        //树结构参数初始化
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>(true);
        this.areaTreeDatas.treeId = 'modalArea';
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;

        // 初始化 ctrl 传过来的参数
        if(this.$scope.updateModalParams.isUpdate){
            this.currentServe = this.$scope.updateModalParams.updateModel;
            this.areaTreeDatas.defaultSelectTreeId = this.currentServe.AreaID;
            this.areaTreeDatas.isDefaultSelected = true;
        }else{
            this.currentServe = new IvsServerEx();
            this.currentServe.AreaModel = new Area();
            if(this.$scope.updateModalParams.defaultDatas){
                this.areaTreeDatas.defaultSelectTreeId = this.$scope.updateModalParams.defaultDatas.areaId;
                this.areaTreeDatas.isDefaultSelected = true;
            }
        }

        console.log("%c =====VideoServerUpdatePopupController $scope=====start==============","color:blue");
        console.log("初始化 ctrl 传过来的参数");
        console.log(this.currentServe);
        console.log(this.areaTreeDatas);
        console.log("%c =========end===============","color:blue");
        //-------------

        let self_this = this;
        $scope.$on("$destroy", function(){
            console.log("%c =====VideoServerUpdatePopupController $scope.$destroy=====start==============","color:green");
            console.log("销毁了弹出框");
            console.log("%c =========end===============","color:green");
        });

        this.getProxyServerList();
        this.getAreaTree();
        //---------end ------

        function treeInitComplete(treeId:string){
            console.log("%c ===ivs tree =======start==============",'color:green');
            console.log(treeId);
            console.log("=========end===============",);

        }
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: Area)  {
            console.log("treeSelectNode  treeId", treeId);
            console.log("treeSelectNode 回调函数", treeNode);
            self_this.$timeout(()=>{
                self_this.setIvsServerArea(treeNode);
            });

        }
    }

    setIvsServerArea(area:Area){
        this.currentServe.AreaModel = new Area();
        this.currentServe.AreaModel.ID = area.ID;
        this.currentServe.AreaModel.Name = area.Name;

        this.currentServe.AreaID = area.ID;
        console.log(this.currentServe);
    };

    commitSaveOrUpdate(){
        console.log(this.currentServe);
        let checkStr = this.validateParams(this.currentServe);
        if(checkStr){
            console.log("=======checkStr===result==============",);
            console.log(checkStr + "未填写");
            console.log("=========end===============",);
            return;
        }else{
            console.log("=======checkStr===result==============",);
            console.log("参数全已经填写");
            console.log("=========end===============",);
        }
        if(this.currentServe.ID){
            console.log("=========更新===============");
            this.ivsServerService.update(this.currentServe).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }else{
            console.log("===========新加=============");
            this.ivsServerService.save(this.currentServe).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }

    };
    closeUpdateModel(isCommit:boolean){
        this.$scope.$emit('closeServerUpdateModel',{isCommit:isCommit});
    }
    //------------ areaTree data
    getAreaTree(keyword?:string){
        let reqParams ={
          keyword:''
        };
        if(keyword){
            reqParams.keyword = keyword;
        }
        let self_this = this;
        this.areaService.findListTree(reqParams).then((resp:Array<AreaEx>)=>{

            self_this.setModalAreaTree(resp);
        });
    }

    // 改变显示 areaTree
    changeIsShowAreaTree(){
        this.areaTreeDatas.isShow = !this.areaTreeDatas.isShow;
        console.log(this.currentServe);
    };
    //------------ areaTree data
    setModalAreaTree(data:Array<AreaEx>){
        this.areaTreeDatas.treeDatas  = data;
    }

    getProxyServerList(){
        this.proxyServerService.findAll().then((resp:ResponseResult<Array<ProxyServer>>)=>{
            if(resp.code == 200){
                this.proxyServerList =  resp.data;
            }
        })
    }

    //验证字段限制，返回提示语
    validateParams(model:IvsServerEx):string{

        if(!model.AreaModel){
            return 'AreaModel';
        }
        if(!model.Code){
            return 'Code';
        }
    /*    if(!model.Description){
            return 'IpAddress';
        }*/
        if(!model.IpAddress){
            return 'IpAddress';
        }
        if(!model.Name){
            return 'Name';
        }
        if(!model.Port){
            return 'Port';
        }
        if(!model.Pwd){
            return 'Pwd';
        }
        if(!model.Uid){
            return 'Uid';
        }
        if(!model.ServerType){
            return 'ServerType';
        }

        return '';
    }
}
app
    .controller('ivsServerUpdateModalController', IvsServerUpdateModalController);