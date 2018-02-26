
import {app} from "../app/main.app";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {RmpGateEx} from '../../../core/entity/ex/RmpGateEx';
import {WifiEx} from '../../../core/entity/ex/WifiEx';
import {ElectronicFenceEx} from '../../../core/entity/ex/ElectronicFenceEx';
import {LampEx} from '../../../core/entity/ex/LampEx';
import {PersonTreeEx} from "../../../core/entity/ex/PersonTreeEx";
import {UserTreeEx} from "../../../core/entity/ex/UserTreeEx";

export interface IConnectTreeService {
    findAreaCamera(searchInput?: string): Promise<Array<AreaEx | CameraEx>>;

    findAreaWithWifi(searchInput?: string): Promise<Array<AreaEx | WifiEx>>;

    findAreaWithRmpgate (searchInput?: string): Promise<Array<AreaEx | RmpGateEx>>;

    findAreaWithElectronicfence (searchInput?: string): Promise<Array<AreaEx | ElectronicFenceEx>>;

    findAreaWithLamp (searchInput?: string): Promise<Array<AreaEx | LampEx>>;

    findAreaWithPerson(searchInput?: string): Promise<Array<AreaEx | PersonTreeEx>>;

    findAreaWithUser(searchInput?:string):Promise<Array<AreaEx | UserTreeEx>>;

    findLampTreeWithCamera (searchInput?: string): Promise<Array<AreaEx | CameraEx | LampEx>>;

    findLampTreeWithElectronicfence (searchInput?: string): Promise<Array<AreaEx | ElectronicFenceEx | LampEx>>;

    findLampTreeWithWifi (searchInput?: string): Promise<Array<AreaEx | WifiEx | LampEx>>;

    findLampTreeWithRmpGate(searchInput?: string): Promise<Array<AreaEx | RmpGateEx | LampEx>>;

}

class ConnectTreeService implements IConnectTreeService {
    findAreaCamera(searchInput?: string): Promise<Array<AreaEx | CameraEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findAreaCamera",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | CameraEx>>) {
            let arr = [] as Array<AreaEx | CameraEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findAreaWithPerson(keyWord?:string) :Promise<Array<AreaEx | PersonTreeEx>>{
        return this.$http({
            method: 'get',
            url: '/db/tree/findAreaWithPersion',
            params: {keyword: keyWord} as TreeParams
        }).then(complete);
        function complete(res: ResponseResult<Array<AreaEx | PersonTreeEx>>) {
            let arr = [] as Array<AreaEx | PersonTreeEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    };
    findAreaWithUser(keyWord?:string) :Promise<Array<AreaEx | UserTreeEx>>{
        return this.$http({
            method: 'get',
            url: '/db/tree/findAreaWithUser',
            params: {keyword: keyWord} as TreeParams
        }).then(complete);
        function complete(res: ResponseResult<Array<AreaEx | UserTreeEx>>) {
            let arr = [] as Array<AreaEx | UserTreeEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    };
    findAreaWithWifi(searchInput?: string): Promise<Array<AreaEx | WifiEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findAreaWithWifi",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | WifiEx>>) {
            let arr = [] as Array<AreaEx | WifiEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findAreaWithRmpgate(searchInput?: string): Promise<Array<AreaEx | RmpGateEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({

            method: "GET",
            url: "/db/tree/findAreaWithRmpgate",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | RmpGateEx>>) {
            let arr = [] as Array<AreaEx | RmpGateEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findAreaWithElectronicfence(searchInput?: string): Promise<Array<AreaEx | ElectronicFenceEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findAreaWithElectronicfence",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | ElectronicFenceEx>>) {
            let arr = [] as Array<AreaEx | ElectronicFenceEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findAreaWithLamp(searchInput?: string): Promise<Array<AreaEx | LampEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findAreaWithLamp",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | LampEx>>) {
            let arr = [] as Array<AreaEx | LampEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }


    findLampTreeWithCamera(searchInput?: string): Promise<Array<AreaEx | CameraEx | LampEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findLampTreeWithCamera",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | CameraEx | LampEx>>) {
            let arr = [] as Array<AreaEx | CameraEx | LampEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findLampTreeWithElectronicfence(searchInput?: string): Promise<Array<AreaEx | ElectronicFenceEx | LampEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findLampTreeWithElectronicfence",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | ElectronicFenceEx | LampEx>>) {
            let arr = [] as Array<AreaEx | ElectronicFenceEx | LampEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findLampTreeWithWifi(searchInput?: string): Promise<Array<AreaEx | WifiEx | LampEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findLampTreeWithWifi",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | WifiEx | LampEx>>) {
            let arr = [] as Array<AreaEx | WifiEx | LampEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findLampTreeWithRmpGate(searchInput?: string): Promise<Array<AreaEx | RmpGateEx | LampEx>> {
        let keyWord;
        if (searchInput) {
            keyWord = searchInput;
        }
        return this.$http({
            method: "GET",
            url: "/db/tree/findLampTreeWithRmpGate",
            params: {keyword: keyWord} as TreeParams
        }).then(complete);

        function complete(res: ResponseResult<Array<AreaEx | RmpGateEx | LampEx>>) {
            let arr = [] as Array<AreaEx | RmpGateEx | LampEx>;
            if (res && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    private $http: any;
    static $inject: Array<string> = ['$http', 'notifyFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    }
}

app
    .service('connectTreeService', ConnectTreeService);