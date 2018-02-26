/**
 * Created by dell on 2017/6/29.
 */

import {app} from "../../common/app/main.app";

class SuggestionsController {
    static $inject = ['$scope'];

    moduleItems: Array<any>;
    constructor($scope: any) {
        let vm = this;

        console.error("意见反馈");


    }
}

app.controller('suggestionsController', SuggestionsController);
