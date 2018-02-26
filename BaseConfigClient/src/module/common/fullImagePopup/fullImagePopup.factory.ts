/// <amd-dependency path="text!./fullImagePopup.html" name="popupHtml" />
import "./fullImagePopup.controller";
import { app } from '../app/main.app';
import { AngularScope } from '../types/baseAngularScope';
import { CommonFullImagePopupParams } from './fullImagePopup.controller';
declare let popupHtml:string;

export class CommonFullImagePopupFactory{
    static $inject = ["layer"];
    constructor(private layer: any){

    }

    showPopup(parentScope: AngularScope, imgUrl: string){
        let scope: CommonFullImagePopupParams = parentScope.$new();
        scope.imagePath = imgUrl;
        this.layer.open({
            type: 1,
            btn: null,
            title: null,
            content: popupHtml,
            scope: scope,
            area: ["800px", "600px"],
            end: ()=>{
                scope.$destroy();
                scope = null;
            }
        });
        parentScope = null;
    }
}

app.service("commonFullImagePopup", CommonFullImagePopupFactory);