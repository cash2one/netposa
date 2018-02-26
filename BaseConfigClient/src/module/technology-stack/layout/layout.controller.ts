import {app} from "../../common/app/main.app";
import "css!./technology-stack-layout.css";

class LayoutController{
    static $inject = ["$scope"];

    constructor(){
        console.log("加载LayoutController");
    }
}

app.controller("layoutController", LayoutController);