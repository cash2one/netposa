
/// <amd-dependency path="text!./faceLibUpdateModal.html" name="faceLibUpdateModalHtml" />
import "css!./faceLibUpdateModal.css";
import {app} from "../app/main.app";
import "./faceLibUpdateModal.controller";

import {BusinessLibEx} from "../../../core/entity/ex/BusinessLibEx";
declare let angular: any;
declare const faceLibUpdateModalHtml:string;

export class FaceUpdateParams{
    isUpdate:boolean;
    updateModalData:BusinessLibEx;
    modalClosedWatchName:string;
    parentID:string;
    parentName:string;
}

export interface IFaceLibUpdateModalFactory{

    getModalClosedWatchName:()=>string;

    setModalClosedWatchName:(name:string)=>void;

    getModalHtml:()=>string;

    setUpdateParams:(params:FaceUpdateParams)=>void;

    getUpdateParams:()=>FaceUpdateParams;
}

class FaceLibUpdateModalFactory implements IFaceLibUpdateModalFactory{
    private modalHtml:string = faceLibUpdateModalHtml;
    private modalClosedWatchName:string;
    private isUpdate:boolean;
    private updateModalData:BusinessLibEx;
    private parentID :string;
    private parentName :string;

    constructor(){
        this.initUpdateDatas();
    };
    getModalClosedWatchName = ():string => {
        return this.modalClosedWatchName;
    };
    setModalClosedWatchName = (name: string):void=>{
        this.modalClosedWatchName = name;
    };

    getModalHtml = () : string=>{
        return this.modalHtml;
    };

    setUpdateParams = (params:FaceUpdateParams): void =>{
        this.initUpdateDatas();
        if(params){
            (params.isUpdate) &&(this.isUpdate = params.isUpdate);
            (!!params.modalClosedWatchName) && (this.modalClosedWatchName = params.modalClosedWatchName);
            (!!params.parentID) && (this.parentID = params.parentID);
            (!!params.parentName) && (this.parentName = params.parentName);
            (!!params.updateModalData) && (this.updateModalData = params.updateModalData);
        }
    };

    initUpdateDatas():void{
        this.modalClosedWatchName = "$emit.FaceLibUpdateClose";
        this.isUpdate = false;
        this.updateModalData = null;
    };

    getUpdateParams():FaceUpdateParams{
        let params = new FaceUpdateParams();
        params.modalClosedWatchName = this.modalClosedWatchName;
        params.isUpdate = this.isUpdate;
        params.updateModalData = this.updateModalData;
        params.parentID = this.parentID;
        params.parentName = this.parentName;
        return  params;
    };

}
app.service('faceLibUpdateModalFactory', FaceLibUpdateModalFactory);
