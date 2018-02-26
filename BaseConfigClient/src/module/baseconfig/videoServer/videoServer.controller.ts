/// <amd-dependency path="text!./videoServer.updatePopup.html" name="videoServerUpdatePopupHtml" />
import "css!../css/baseconfig-serve.css";
import "css!../style/baseconfig-area.css";
import PageParams from "../../common/directive/page/page-params";
declare var require:any;

import {app} from "../../common/app/main.app";
import 'angular';
import '../../common/services/videoServer.service';
import '../../common/services/area.service';

import './videoServer.updatePopup.controller';

import {IAreaService} from "../../common/services/area.service";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {IVideoServerService} from "../../common/services/videoServer.service";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {VideoServerListParams} from "../../../core/params/VideoServerParams";
import {VideoServer} from "../../../core/entity/VideoServer";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {VideoServerEx} from "../../../core/entity/ex/VideoServerEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {UpdateModalParams} from "../../common/types/serverUpdateModal.params";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
import {VideoServerType} from "../../../core/enum/VideoServerType";
import {ProxyServer} from "../../../core/entity/ProxyServer";
import {ProxyServerListParams} from "../../../core/params/ProxyServerParams";
import '../../common/services/proxyServer.service';
import {IProxyServerService} from '../../common/services/proxyServer.service';
declare var videoServerUpdatePopupHtml: any;
declare var angular: any;

class BaseConfigVideoServerController{
    tHeadList:Array<ITableHeader>;
    tBodyList:Array<VideoServer>;
    currentLayer?:number;

    //--------分页指令
    pageParams :PageParams;
    //---------
    // 选择行政区域树
    areaTreeDatas:ITreeDataParams<AreaEx>;

    areaTreeSearchInputStr:string = "";

    // 列表获取参数
    findListParams:VideoServerListParams;
    //多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectItems: boolean;
    videoServerTypeObj: {[key:string]:string};
    proxyListForVideo:Array<ProxyServer> = [];
    static $inject = ['$scope','$filter','$timeout','$controller','videoServerService','layer','areaService','casCadeService','proxyServerService','i18nFactory'];
    constructor(private $scope:any,private $filter:any,private $timeout:Function,private $controller:any,
                private serverService:IVideoServerService, private layer:any,private areaService:IAreaService,
                private casCadeService: ICasCadeService,private proxyServerService:IProxyServerService,private i18nFactory:any){

        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeVideo';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;
        this.initListParams();
        // 节点选择
        function treeSelectNode(event: MouseEvent, treeId:string, treeNode:AreaEx){
            if(treeNode.ID == self_this.findListParams.areaId){
                if(self_this.tBodyList){
                    return;
                }
            }
            let req_params:VideoServerListParams = self_this.findListParams;
            req_params.areaId = treeNode.ID;
            req_params.currentPage = 1;
            self_this.getListByParams(req_params);
        }
        this.initProxyList();
        function treeInitComplete(){

        }
        this.getAreaTreeList();

        let self_this = this;
        this.$scope.$on('closeServerUpdateModel', function (even:any, isCommit: boolean) {
            self_this.closeLayer(self_this.getCurrentLayer());
            console.log(isCommit)
            if(isCommit){
                $timeout(()=>{
                    self_this.getListByParams(self_this.findListParams);
                },1000);
            }
        });

        $scope.$on("$destroy", function(){
            if(self_this.layer){
                self_this.layer.closeAll();
            }
        });
    };
    private initProxyList(){
        let params = new ProxyServerListParams();
        params.type = 'VideoServer';
        params.currentPage = 1;
        params.pageSize = 100;
        this.proxyServerService.findListByParams(params).then((res)=>{
            this.proxyListForVideo = res.data.Result as Array<ProxyServer>;
        })
    }
    //----------- 树列 操作函数
    // 数据获取
    getAreaTreeList(keyword?:string){
        let params:TreeParams = this.areaTreeDatas.reqParams;
        params.keyword = keyword;
        this.areaService.findListTree(params).then((resp:Array<AreaEx>)=>{
            if(resp){
                this.areaTreeDatas.finishedNoData = false;
            }else{
                this.areaTreeDatas.finishedNoData = true;
            }
            this.$timeout(()=>{
                this.setAreaTreeDatas(resp);
            });
        })
    };
    // 树搜索
    areaTreeSearchInputKeyUp(e:any){
        if(e.keyCode === 13){
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        }
    };
    // 树搜索
    areaTreeSearchInput(){
        this.getAreaTreeList(this.areaTreeSearchInputStr);
    };
    // 树赋值
    setAreaTreeDatas(treeDatas: Array<AreaEx>){
        this.areaTreeDatas.treeDatas = treeDatas;
    };
    //----------------
    // 初始化列表数据
    initListParams(){
        this.pageParams = new PageParams();
        this.findListParams = new VideoServerListParams();
        this.findListParams.areaId = '';
        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.tBodyList = [];
        this.tHeadList =  [
            { field: "Name", title: "DP_CONFIG_COMMON_03"},
            { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03"},
            { field: "Port", title: "DP_CONFIG_COMMON_11"},
            { field: "VideoServerType", title: "DP_CONFIG_PROXYSERVER_04"},
            { field: "Description", title: "DP_CONFIG_COMMON_34"},
            { field: "buttons", title: "DP_CONFIG_COMMON_35"},
        ];
        this.findListParams.sortName = 'VideoServerType';

        this.isSelectItems = false;

        this.videoServerTypeObj = {} as {[key: string]: string};
        // 初始化 类型选择
        for(let key in VideoServerType){
            this.videoServerTypeObj[VideoServerType[key].value] = VideoServerType[key].text;
        }
    };

    _getCasCadeSearchParams(tableParams: VideoServerListParams){
        if(!tableParams) return {} as CasCadeSearchParams;

        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        return result;
    };

    // 根据finListParams:IFindVideoServerListParams 获取列表
    getListByParams(params:VideoServerListParams){
        this.casCadeService.findVideoServerList(this._getCasCadeSearchParams(params)).then((resp:ResponseResult<Array<VideoServer>>)=>{
            if(resp.code == 200){
                let pageParams = new PageParams();
                pageParams.setCurrentPage(params.currentPage);
                pageParams.setPageSize(params.pageSize);
                pageParams.setTotalCount(resp.count);
                this.pageParams = pageParams;
                this.findListParams = params;
                this.setTBodyList(resp.data);
            }
        })
    }
    //单删除
    deleteById(_index:VideoServer){
        this.layer.confirm(this.i18nFactory('DP_CONFIG_VIDEOSERVER_01'), {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);
            this.submitDelete(_index.ID,index,_index.VideoServerType,_index );
        })
    }

    submitDelete(id:string,layerNum:number,type:string,pvgJSON:VideoServer){
        if(type=="PVG"){
            this.serverService.isHasTask([id]).then((resp:ResponseResult<any>)=>{
                if(resp.code == 200&&resp.status =="SUCCESS"){
                    var respData = resp.data;
                    var falseName = "";
                    if(respData.hasOwnProperty(id)&&respData[id]){
                        falseName = pvgJSON[respData].Name;
                        this.layer.open({
                            title: '提示',
                            content: '服务器:<strong>'+falseName+'</strong>有任务正在运行,不能删除!'
                        }); 
                        return;
                    }
                    this.deleteVideo(id,layerNum);
                }else{
                    this.layer.open({
                        title: '警告',
                        content: '系统异常，请联系管理员!'
                    });     
                }
            });
        }else{
            this.deleteVideo(id,layerNum);
        }
    }

    deleteVideo(id:string,layerNum:number){
        //pvg的服务，没有正在执行的任务后，才能删除
        this.serverService.deleteById(id).then((resp:ResponseResult<any>)=>{
            if(resp.code == 200){
                this.$timeout(()=>{
                    this.getListByParams(this.findListParams);
                },1000);
                this.layer.close(layerNum);
            }
        });
    }

    synchronize(item:VideoServer){
        this.layer.confirm(`确定同步此服务器${item.Name}?`, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            iod: ["500px", "200px"]
        }, (index: number) => {
            console.log(item,"同步服务器")
            this.serverService.synchronize(item.ID).then((res:any)=>{
                console.log(res);
            });
            this.layer.close(index);

        });
    }
    /**
     * 选择某一条数据
     * @time: 2017-04-21 19:43:07
     * @params:
     * @return:
     */
    afterChangeCheck(resultList:Array<boolean>,isCheckAll:boolean):void{
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    //获取当前已被选中列表
    getSelectedList():Array<VideoServer>{
        let personList:Array<VideoServer> = [];
        if(this.selectedList){
            this.tBodyList.forEach((person:VideoServer,index:number)=>{
                if(this.selectedList[index]){
                    personList.push(person);
                }
            });
        }
        return personList;
    };

    //多个删除
    deleteByIds(){
        let personList:Array<VideoServer> = this.getSelectedList();
        if(! personList || personList.length ==0){
            return;
        }
        let ids:Array<string> = [];
        let pvgIds:Array<string> = [];
        let pvgJSON = {}
        personList.forEach((server:VideoServer)=>{
            ids.push(server.ID);
            if(server.VideoServerType == "PVG"){
                pvgIds.push(server.ID);
                pvgJSON[server.ID] = server;
            }
        });
        let showText = '确定删除当前选中的 ' + ids.length + ' 条视频服务器配置吗?';
        this.layer.confirm(showText, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);
            this.submitDeleteByIds(ids,pvgIds,pvgJSON);
        });
    }

    submitDeleteByIds(ids:Array<string>,pvgIds:Array<string>,pvgJSON:{}){
        if(pvgIds.length!=0){
            //pvg的服务，没有正在执行的任务后，才能删除
            this.serverService.isHasTask(pvgIds).then((resp:ResponseResult<JSON>)=>{
                if(resp.code == 200&&resp.status =="SUCCESS"){
                    let respData  = resp.data;
                    if(respData){
                        var falseName = "";
                        for (let index = 0; index < pvgIds.length; index++) {
                            const pvgId = pvgIds[index];
                            if(respData.hasOwnProperty(pvgId)&&respData[pvgId]){
                                falseName = falseName + pvgJSON[pvgId].Name + "、";
                            }
                        }
                        if (falseName =="") {
                            this.deleteVideos(ids);
                        }else{
                            falseName = falseName.substring(0,falseName.length-1)
                            this.layer.open({
                                title: '提示',
                                content: '服务器:<strong>'+falseName+'</strong>有任务正在运行,不能删除!'
                            });
                        }
                    }
                }else{
                    this.layer.open({
                        title: '警告',
                        content: '服务器发生异常，请联系管理员!'
                    });     
                }
            });
        }else{
            this.deleteVideos(ids);
        }
    };

    deleteVideos(ids:Array<string>){
        this.serverService.deleteByIds(ids).then((resp:ResponseResult<string>)=>{
            if(resp.code == 200){
                this.findListParams.currentPage =1;
                this.getListByParams(this.findListParams);
            }else{

            }
        });
    }

    addVideoServer(){

        let scope:any = this.$scope.$new();
        let updateModalParams:UpdateModalParams<VideoServer> = new UpdateModalParams<VideoServer>();
        updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
        updateModalParams.isUpdate = false;
        scope.updateModalParams = updateModalParams;
        scope.proxyListForVideo = this.proxyListForVideo;
        let titleStr = '新建服务器';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: videoServerUpdatePopupHtml,
            scope: scope,
            area:["500px"],
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    }
    findById(id:string){

        return this.serverService.findById(id);
    }

    updateServer(model?:VideoServer):void{
        this.findById(model.ID).then((resp:ResponseResult<VideoServerEx>)=>{
            if(resp.code == 200){
                this.openUpdateVideoServer(true,resp.data);
            }else{

            }
        });

    };

    openUpdateVideoServer(isUpdate:boolean,data?:VideoServer){
        let scope:any = this.$scope.$new();
        let updateModalParams:UpdateModalParams<VideoServer> = new UpdateModalParams<VideoServer>();
        updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
        updateModalParams.isUpdate = true;
        updateModalParams.updateModel = data;
        scope.updateModalParams = updateModalParams;
        scope.proxyListForVideo = this.proxyListForVideo;
        let titleStr = isUpdate?'编辑服务器':'新建服务器';
        this.layer.open({
            type: 1,
            title:titleStr,
            content: videoServerUpdatePopupHtml,
            scope: scope,
            area:["500px"],
            end: function(){
                scope.$destroy();
            }
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    };

    closeLayer(index:number){
        this.layer.close(index);
        return ;
    }

    setCurrentLayer(index:number):void{
        this.currentLayer = index;
    }

    getCurrentLayer():number{
        return this.currentLayer;
    }

    setTBodyList(result:Array<VideoServer>) {
        // this.tBodyList = this.$filter('videoServerTypeFilter')(result,'VideoServerType');
        this.tBodyList = result;
    };


    // 单栏选择排序
    sortByField(_index:number,field:string,sortStatus:boolean){

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;
        this.getListByParams(this.findListParams);
    }

    //about page click
    changePage(num:number){

        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }

    changePageSize(num:number){
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = num;
        this.getListByParams(this.findListParams);
    }

    /**
     * creator wyr: 判断和设置当前列表是否有选中的元素
     * @param items
     */
    setIsSelectItems(items: Array<boolean>){
        let result = false;
        if(items && items.length > 0){
            let i,len;
            for(i=0,len=items.length;i<len;i++){
                if(items[i]){
                    result = true;
                    break;
                }
            }
        }
        if(this.isSelectItems !== result){
            this.isSelectItems = result;
        }
    }
}
app
    .controller('baseConfigVideoServerController', BaseConfigVideoServerController);