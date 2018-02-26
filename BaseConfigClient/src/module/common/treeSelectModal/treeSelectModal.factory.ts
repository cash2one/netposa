
/// <amd-dependency path="text!./treeSelectModal.html" name="treeSelectModalHtml" />
import {app} from "../app/main.app";

declare let angular: any;
declare const treeSelectModalHtml:string;

export interface ITreeSelectModalFactory{
    /** create by zxq
     *  更新 树列表 （必须调用）
     * @time: 2017-07-06 14:57:38
     * @params: baseSrcs (可传多个元数据数组)
     * @return:
     */
    updateTreeBase :(...baseSrcs: Array<any>[])=>boolean;
    /** create by zxq
     *  获取已存 树 元数据
     * @time: 2017-07-06 14:57:38
     */
    getTreeBase:()=>Array<any>;
    /** create by zxq
     *  更新保存 已选 缓存数据
     * @time: 2017-07-06 14:57:38
     * @params: ids
     */
    updateTreeSelectedIds:(ids:Array<string>,idKeyName?:string)=>void;
    /** create by zxq
     *  获取选择数据列表id 集合
     * @time: 2017-07-06 14:57:38
     * @params: ids
     */
    getTreeSelectedIds:()=>Array<string>;
    /** create by zxq
     *  更改默认 窗口 关闭回调名称
     * @time: 2017-07-06 14:57:38
     * @params: name
     */
    updateSelectModalClosedWatchName:(name:string)=>void;
    /** create by zxq
     *  获取 窗口 关闭回调名称
     * @time: 2017-07-06 14:57:38
     * @params:
     * @return: name :string
     */
    getSelectModalClosedWatchName:()=>string;

    getModalHtmlTemplate :()=> string;

    /** create by zxq
     *  初始化 树 属性
     * @time: 2017-07-06 14:57:38
     * @params: checkType 选择返回 以及 勾选 显示 节点 树类型，不指定 表 全部
     * @params: idKey key 名称 默认 "ID"
     * @params: parentIdKey key 名称 默认 "treeParentId"
     */
    updateBaseTreeParams:(checkType:string,idKey?:string,parentIdKey?:string)=>void;

    getTreeKeyName:()=> string;

    getTreeCheckType:()=> string;

    getTreeParentKeyName:()=> string;
}

class TreeSelectModalFactory implements ITreeSelectModalFactory{

    private modalClosedWatchName = "treeSelectModal.closed";

    private treeBase:Array<any>;

    private treeSelectedIds:Array<string>;

    private modalHtml = treeSelectModalHtml;

    private treeKeyName:string;
    private treeParentKeyName:string;

    private treeCheckType:string;


    constructor(){
        this.initDefault();
    }
    private initDefault = ()=>{
        this.treeBase = [] as Array<any>;
        this.treeSelectedIds = [] as Array<string>;
        this.modalClosedWatchName = "treeSelectModal.closed";
        this.updateBaseTreeParams(null);
    };

    updateTreeBase = (...baseSrcs: Array<any>[]):boolean=>{
        this.initDefault();
        if(baseSrcs && baseSrcs.length>0){
            angular.forEach(baseSrcs,(val:Array<any>)=>{
                this.treeBase = this.treeBase.concat(val);
            });
        }else{
            return false;
        }
        return true;
    };

    getTreeBase = ():Array<any>=>{
        return this.treeBase.concat();
    };

    updateTreeSelectedIds = (ids:Array<string>,idKeyName?:string):void=>{
        if(idKeyName){
            this.treeKeyName = idKeyName;
        }
        if(ids && ids.length>0){
            this.treeSelectedIds = ids.concat();
        }else{
            this.treeSelectedIds = [];
        }
    };

    getTreeSelectedIds = ():Array<string>=>{
        return this.treeSelectedIds.concat();
    };

    updateSelectModalClosedWatchName = (name:string):void =>{
        if(name){
            this.modalClosedWatchName = name;
        }
    };

    getSelectModalClosedWatchName = ():string=>{
        return this.modalClosedWatchName;
    };

    getModalHtmlTemplate = ():string=>{
        return this.modalHtml;
    };

    updateBaseTreeParams = (checkType:string,idKey?:string,parentIdKey?:string)=>{
        this.treeKeyName = !!idKey?idKey:"ID";
        this.treeCheckType = !!checkType?checkType:null;
        this.treeParentKeyName = !!parentIdKey ? parentIdKey: "treeParentId";
    };
    getTreeKeyName = ():string=>{
        return this.treeKeyName;
    };

    getTreeCheckType = ():string=>{
        return this.treeCheckType;
    };
    getTreeParentKeyName = ():string=>{
        return this.treeParentKeyName;
    };


}
app.service('treeSelectModalFactory', TreeSelectModalFactory);
