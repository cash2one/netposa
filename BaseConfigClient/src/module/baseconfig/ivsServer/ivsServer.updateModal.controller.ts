

import {app} from "../../common/app/main.app";
import '../../common/services/area.service';
import '../../common/services/ivsServer.service';
import '../../common/services/proxyServer.service';
import 'angular';

import {IAreaService} from "../../common/services/area.service";
import {IIvsServerService} from "../../common/services/ivsServer.service";
import {IProxyServerService} from "../../common/services/proxyServer.service";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {IvsServerEx} from "../../../core/entity/ex/IvsServerEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {Enum} from "../../../core/enum/Enum";
import {ProxyServer} from "../../../core/entity/ProxyServer";
import {Area} from "../../../core/entity/Area";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IvsServerType} from "../../../core/enum/IvsServerType";

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

    constructor(private $scope:any, private proxyServerService:IProxyServerService, private ivsServerService:IIvsServerService,private $timeout:any,private areaService:IAreaService){

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


        let self_this = this;
        $scope.$on("$destroy", function(){
            console.log("销毁了弹出框");
        });

        this.getProxyServerList();
        this.getAreaTree();
        //---------end ------

        function treeInitComplete(treeId:string){

        }
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: Area)  {
            self_this.$timeout(()=>{
                self_this.setIvsServerArea(treeNode);
            });

        }
    }

    changeTypeSelect(){
        angular.forEach(this.proxyServerList,(val:ProxyServer) => {
            if(!this.currentServe.ProxyServerID){
                this.currentServe.Port = null;
            }
            if(val.ID === this.currentServe.ProxyServerID){
                this.currentServe.Port = val.Port;
                }
        });
    }

    setIvsServerArea(area:Area){
        this.currentServe.AreaModel = new Area();
        this.currentServe.AreaModel.ID = area.ID;
        this.currentServe.AreaModel.Name = area.Name;

        this.currentServe.AreaID = area.ID;
    };

    commitSaveOrUpdate(){
        let checkStr = this.validateParams(this.currentServe);
        if(checkStr){
            return;
        }else{
        }
        if(this.currentServe.ID){
            this.ivsServerService.update(this.currentServe).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }else{
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