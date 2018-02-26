/**
 * Created by dell on 2017/4/24.
 */
import "css!../css/maintain.css";
import { app } from "../../common/app/main.app";
import { IRouterConfig } from "../../common/router/router";
import RouterService from "../../common/router/router.service";

class MainTainController {
    static $inject = ['$scope', '$state'];

    moduleItems: Array<any>;
    others: Array<any>;
    isCollapse: boolean;
    currentRouter: string;
    expanderTitle: string;
    constructor(
        private $scope: any,
        private $state: any) {
        let moduleItems = RouterService.getInstance().getModuleItemsWithGroup('maintain');

        // console.log(moduleItems);
        // 取出不包含children的
        let others: Array<IRouterConfig> = [];
        let i, len;
        for (i = 0, len = moduleItems.length; i < len; i++) {
            if (!moduleItems[i].children) {
                others = others.concat(moduleItems.splice(i, 1));
                i--;
                len--;
            }
        }
        this.others = others;
        this.moduleItems = moduleItems;
        this.currentRouter = this.$state.$current.name;
        this.isCollapse = false;
        $scope.isCollapse = this.isCollapse;

        // $scope.$watch('isCollapse', () => {
        //     this.initPage();
        // })
    }
    public initPage() {
        this.$scope.$broadcast('initChart', true)
    }
}

app.controller('maintainController', MainTainController);