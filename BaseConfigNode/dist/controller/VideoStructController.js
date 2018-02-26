"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const VideoStructService_1 = require("../service/VideoStructService");
const log4js = require("log4js");
class VideoStructController {
    static findFaceList(req, res, next) {
        VideoStructController.VideoStructService.FindFaceList(req.query).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static findFaceById(req, res, next) {
        VideoStructController.VideoStructService.GetFaceDetail(req.query.id).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
}
VideoStructController.LOGGER = log4js.getLogger("VideoStructController");
VideoStructController.VideoStructService = new VideoStructService_1.VideoStructService();
exports.default = VideoStructController;
