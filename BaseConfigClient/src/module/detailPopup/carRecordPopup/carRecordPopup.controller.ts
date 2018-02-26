import {app} from "../../common/app/main.app";

// 服务
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';

// 参数
interface CarDetailArchives {
    [propName: string]: any;
}

interface swichTitle {
    title: string;
    iconPath: string;
}

class carRecordController {
    static $inject = ["$scope", "$timeout", "mylayer", "resourceRetrievalService"];
    carDetailArchives: CarDetailArchives;

    constructor(private $scope: any,
                private $timeout: any,
                private mylayer: any) {
        this.carDetailArchives = $scope.carDetailArchives;
        this.initData($scope.id);
    }

    // 初始化查询数据
    private initData(id: string) {
        let self = this;
    }

    public closeLayer() {
        this.mylayer.close(this.$scope.index);
    }
}

app.controller("carRecordController", carRecordController);