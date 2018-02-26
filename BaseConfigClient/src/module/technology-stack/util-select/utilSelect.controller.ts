/**
 * Created by dell on 2017/7/4.
 */
import {app} from "../../common/app/main.app";
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
type AreaCameraEx = AreaEx & CameraEx;

export class SelectController{
    static $inject = ["$scope" ,'areaService'];

    testData : Array<any>;

    testClick : Function; //点击事件
    initVal : string;


    //请求摄像机树结构数据
    camerasData : any;
    camerasId : string;
    treeClick : Function;
    treeDblClick : Function;
    diyLocation : Function;
    diyAttention : Function;
    listDiyIconFun : Function;

    constructor(private $scope: any , connectTreeService : IConnectTreeService){
        let vm = this;
        vm.testData = [];
        let strArr = [
            {
                city : "深圳",
                Attribution : "广东",
                level : "一线"
            },
            {
                city : "桂林",
                Attribution : "广西",
                level : "三线"
            },
            {
                city : "昆明",
                Attribution : "云南",
                level : "二线"
            },
        ]
        let n = Math.random()*20|0 + 5;
        for(let i = 0; i < n;i++){
            vm.testData.push(strArr[i%3])
        }
        console.log(vm.testData);
        vm.initVal = "深圳市";


        vm.testClick = (data : any) => {
            console.log('点击事件--选中值为 ：');
            console.log(data);
        };

        //列表模式自定义图标回调
        vm.listDiyIconFun = (data : any) => {
            console.log(data);
        };


        //请求摄像机树结构数据
        vm.camerasId = 'cameras';
        connectTreeService.findAreaCamera().then((data : Array<AreaCameraEx> )=>{
            vm.camerasData = data;
            console.log(data);
        });

        //tree click
        vm.treeClick = (event:any, treeId:string, treeNode:any) => {
            console.log('摄像机---单击');
            console.log(treeNode.Name);
            vm.initVal = treeNode.Name;
        };
        //tree DblClick
        vm.treeDblClick = (event:any, treeId:any, treeNode:any) => {
            console.log('摄像机---双击');
        };
        //tree diyLocation
        vm.diyLocation = (treeId:string, treeNode:{}) => {
            console.log('摄像机---定位');
        };
        //tree diyAttention
        vm.diyAttention = (treeId:string, treeNode:{}) => {
            console.log('摄像机---关注');
        };

        $scope.$on("$destroy", ()=>{

        });

    }


}

app.controller("technologyStackSelectController", SelectController);