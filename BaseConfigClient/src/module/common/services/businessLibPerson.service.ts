import { BusinessLibListParams, BusinessLibPersonListParams } from "../../../core/params/BusinessLibParams";
declare var require: any;
import { app } from "../app/main.app";

import 'angular';
import { BusinessPersonEx } from "../../../core/server/BusinessPersonModel";
import { DataOperType } from "../../../core/server/enum/DataOperType";
import { BusinessLib } from "../../../core/entity/BusinessLib";
import { ResponseResult, PageResult } from "../../../core/params/result/ResponseResult";
import { IResponseNotifyFactory } from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
import { IBusinessPerson } from "../../../core/entity/BusinessPerson";
import { IPersonAssist } from "../../../core/server/PersonAssistModel";
import { OperFitstModule } from '../../../core/entity/OperFirstModule';
import { OperSecondModule } from '../../../core/entity/OperSecondModule';
import { OperThirdModule } from '../../../core/entity/OperThirdModule';
import { OperActionType } from '../../../core/entity/OperActionType';
import { ISystemLogFactory } from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

declare let angular: any;


export interface IBusinessLibPersonService {
    findListByParams: (params: BusinessLibPersonListParams) => Promise<ResponseResult<PageResult<IBusinessPerson>>>;
    /** create by zxq
     * 根据id 查询 人员 辅助信息
     * @time: 2017-07-17 15:37:05
     * @params:
     * @return:
     */
    findPersonAssistById: (id: string) => Promise<ResponseResult<IPersonAssist>>;

    deleteById: (id: string) => Promise<ResponseResult<boolean>>;
    deleteByIds: (ids: Array<string>) => Promise<ResponseResult<boolean>>;
    addPerson: (params: Array<BusinessPersonEx>) => Promise<ResponseResult<any>>;
    updatePerson: (params: Array<BusinessPersonEx>) => Promise<ResponseResult<any>>;
    /** create by zxq
     *  图片人脸检查是否有人脸 接口路径
     * @time: 2017-07-15 15:02:18
     * @params:
     * @return:
     */
    getCheckFaceUrl: () => string;
    /** create by zxq
     *  有人脸图片 超期 特征值 重新获取功能
     * @time: 2017-07-15 15:02:18
     * @params: imgUrl 检查 有人脸 返回的图片路径
     * @return: 特征值数据
     */
    getDetectFace: (imgUrl: string) => any;
}

export class BusinessLibPersonUpdateModel {
    addFacePicPath: Array<string>;
    beginDate: string;
    birth: string;
    certifyingAuthority: string;
    createTime: string;
    deletePicPath: Array<string>;
    endDate: string;
    gender: string;
    homeAddress: string;
    id: string;
    idCardNumber: string;
    libID: string;
    name: string;
    nation: string;
    operType: string;
    pYCode: string;
    updateTime: string;

    constructor(businessPerson?: BusinessPersonEx) {
        if (businessPerson) {
            if (businessPerson.ID) {
                this.id = businessPerson.ID;
                this.operType = DataOperType.Update.value;

            } else {
                this.operType = DataOperType.Add.value;
            }

            this.libID = businessPerson.LibId;

            this.name = businessPerson.Name;

            this.deletePicPath = businessPerson.DeletePicPath;
            this.addFacePicPath = businessPerson.AddFacePicPath;

            this.birth = businessPerson.Birth;
            this.nation = businessPerson.Nation;

            this.certifyingAuthority = businessPerson.CertifyingAuthority;
            this.gender = businessPerson.Gender;
            this.idCardNumber = businessPerson.IDCardNumber;
            this.homeAddress = businessPerson.HomeAddress;

            this.beginDate = businessPerson.BeginDate;
            this.endDate = businessPerson.EndDate;
        }

    }
}

class BusinessLibPersonService implements IBusinessLibPersonService {

    static $inject: Array<string> = ['$http', 'notifyFactory', 'systemLogFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;
    private checkFaceUrl: string = "/db/resourceSearch/checkFace";
    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
    }

    findListByParams(params: BusinessLibPersonListParams) {
        let _params = params;
        return this.$http({
            method: 'post',
            data: _params,
            url: '/pdp/businesslib/person/list'
        })/*.then((resp:ResponseResult<Array<{LibName:string;PersonInfo:IBusinessPerson}>|Array<IBusinessPerson>>)=>{
            if(resp.code == 200 && resp.data ){
                let personList:Array<IBusinessPerson> = [];
                if(resp.count>0){
                    angular.forEach(resp.data,(val:{LibName:string;PersonInfo:IBusinessPerson})=>{
                        personList.push(val.PersonInfo);
                    });
                }

                resp.data = personList ;
            }

            return resp;
        });*/
    };

    findPersonAssistById(id: string) {
        let _params = {
            id: id
        };
        return this.$http({
            method: 'post',
            params: _params,
            url: '/pdp/businesslib/person/assist'
        }).then((resp: ResponseResult<Array<IPersonAssist>>) => {
            let newResult = angular.copy(resp) as ResponseResult<IPersonAssist>;
            if (resp && resp.code === 200 && resp.data.length > 0) {
                newResult.data = resp.data[0];
            }
            return newResult;
        });
    };

    addPerson(params: Array<BusinessPersonEx>) {
        angular.forEach(params, (val: BusinessPersonEx) => {
            val.OperType = DataOperType.Add.value;
        });
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json ;charset=utf-8' },
            url: '/pdp/businesslib/person/update',
            showLoad: true,
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Add.code
        }));
    };
    updatePerson(params: Array<BusinessPersonEx>) {
        angular.forEach(params, (val: BusinessPersonEx) => {
            val.OperType = DataOperType.Update.value;
        });
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json ;charset=utf-8' },
            url: '/pdp/businesslib/person/update',
            showLoad: true,
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Modify.code
        }));
    };


    deleteById(id: string) {
        let params = new Array<BusinessLibPersonUpdateModel>();
        let model = new BusinessLibPersonUpdateModel();
        model.id = id;
        model.operType = DataOperType.Delete.value;
        params.push(model);
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: '/pdp/businesslib/person/update',
            showLoad: true,
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds(ids: Array<string>) {
        let params = new Array<BusinessLibPersonUpdateModel>();
        ids.forEach((id: string, index: number) => {
            if (id) {
                params.push({ id: id, operType: DataOperType.Delete.value } as BusinessLibPersonUpdateModel);
            }
        })

        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: '/pdp/businesslib/person/update',
            showLoad: true,
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Del.code
        }));
    };

    getCheckFaceUrl(): string {
        return this.checkFaceUrl;
    }

    getDetectFace(imgUrl: string): any {
        let params = {
            imageurl: imgUrl
        };
        return this.$http({
            method: 'post',
            url: '/pdp/search/detectFace',
            showLoad: true,
            params: params
        })
    }
}

app
    .service('businessLibPersonService', BusinessLibPersonService);