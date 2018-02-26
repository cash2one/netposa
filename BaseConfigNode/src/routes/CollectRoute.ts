import * as express from "express";
import CollectController from "../controller/CollectController";

// 收藏
export default class CollectRoute {
    constructor(app: express.Express) {
        CollectRoute.activate(app);
    }

    public static activate(app: express.Express): void {

        // 查找
        app.route("/BaseConfigNodeServer/db/collect/findListByPage")
            .post(CollectController.findListByPage);

        // 删除
        app.route("/BaseConfigNodeServer/db/collect/delete")
            .post(CollectController.delete);

        // 通过结果记录id查询收藏状态
        app.route("/BaseConfigNodeServer/db/collect/findCollectStatus")
            .post(CollectController.findCollectStatus);

        // 通过结果记录objectID删除
        app.route("/BaseConfigNodeServer/db/collect/deleteByObjectId")
            .post(CollectController.deleteByObjectId);

        // 添加
        app.route("/BaseConfigNodeServer/db/collect/add")
            .post(CollectController.add);
    }
}