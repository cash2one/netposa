/**
 * Created by dell on 2017/6/29.
 */

import {app} from "../../common/app/main.app";
import {IWebUploaderFactory} from "../../common/factory/webUploader.factory"
import  "../../common/factory/webUploader.factory"

import {IToolOptionService} from "../../common/services/toolOption.service"
import  "../../common/services/toolOption.service"

declare let angular: any;

class ComparisonController {
    static $inject = ['$scope','webUploaderFactory','toolOptionService','$timeout'];



    constructor($scope: any,webUploaderFactory:IWebUploaderFactory,toolOptionService:IToolOptionService,$timeout:any) {
        let vm = this;
        console.error("比对");


    }
}

app.controller('comparisonController', ComparisonController);