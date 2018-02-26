/**
 * 服务配置modal 页面数据传递格式
 * @time: 2017-05-08 11:28:20
 * @params:
 * @return:
 */
export class UpdateModalParams<T>{
    isUpdate:boolean;
    updateModel?:T;
    defaultDatas?:{
        areaId?:string;

    };
    emitName?:string;
    constructor(){
        this.defaultDatas = {
        };
    }
}

