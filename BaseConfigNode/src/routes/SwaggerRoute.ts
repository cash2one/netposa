/**
 * Created by dell on 2017/5/8.
 */
import * as express from 'express';
import Config from '../Config';
import SwaggerController from "../controller/SwaggerController";
export default class SwaggerRoute{

    public static SWAGGER_URL = Config.NODE_SERVER_URL + "/swagger"

    public static activate(app: express.Express): void{
        SwaggerController.init();

        app.route(SwaggerRoute.SWAGGER_URL + "/getSwaggerConfig")
            .get(SwaggerController.getSwaggerConfig);
    };
}