import * as express from "express";
import ErrorCode from "../common/res/ErrorCode";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import * as util from "util";
import * as Promise from "promise";
import { DaoType } from '../dao/enum/DaoType';
import OtherDao from '../dao/OtherDao';
import { BeanHelper } from '../common/help/BeanHelper';
/**
 * 附件上传service.
 * create by zmp.
 * @time: 2017-08-23
 */
export interface IUploadService {

    // 图片上传
    imageUpload(image: object, fields: any): Promise<BackResponseBody<string>>;

    // 人像图片上传
    faceImageUpload(image: object, fields: any): Promise<BackResponseBody<string>>;

}

export class UploadService implements IUploadService {

    imageUpload(image: object, fields: any): Promise<BackResponseBody<string>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                let storeType = {} as any , 
                    imageCategory = {} as any,
                    commandType = {} as any , 
                    detectType = {} as any;
                Object.keys(fields).forEach(function(key) {
                   if(key == "storeType") {
                        storeType[key] = fields[key][0];
                   }
                   if(key == "imageCategory") {
                        storeType[key] = fields[key][0];
                   }
                    if(key == "commandType") {
                        commandType[key] = fields[key][0];
                   }
                   if(key == "detectType") {
                        detectType[key] = fields[key][0];
                   }
                });
                return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).imageUpload(image, storeType, imageCategory, commandType, detectType);
            });

        function validateParams() {
            // 对照片内容、存储类型、车型类别
            if(!image || UploadService.isEmptyObject(image)) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_Image_Upload);
            }
            if(fields && util.isArray(fields) && fields.length <=0) {
                return Promise.reject<number>(ErrorCode.ERROR_INVALID_PARAMETER);
            }
            let keys = Object.keys(fields).join(",");

            if(keys.indexOf("storeType") < 0) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_STORE_TYPE);
            }
            if(keys.indexOf("imageCategory") < 0) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_Image_Category);
            };
            return null;
        }
    }


    faceImageUpload(image: object, fields: any): Promise<BackResponseBody<string>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                let storeType = {} as any , 
                    imageCategory = {} as any;
                Object.keys(fields).forEach(function(key) {
                    let fieldparam = {} as any;
                    if(key == "storeType") {
                        storeType[key] = fields[key][0];
                    }
                    if(key == "imageCategory") {
                        imageCategory[key] = fields[key][0];
                    }
                });
                return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).faceImageUpload(image, storeType, imageCategory);
            });

        function validateParams() {
            // 对照片内容、命令类型、特征提取类别
            if(!image || UploadService.isEmptyObject(image)) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_Image_Upload);
            }
            return null;
        }
    }
    
    /**
     * 检验image是否为空
     * @param jsonObj 
     */
    private static isEmptyObject(jsonObj: object) {  
        var t;  
        for (t in jsonObj)  
            return !1;  
        return !0  
    } 

}
