"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const util = require("util");
class SocketMain {
    static init(server) {
        SocketMain.io = require("socket.io")(server);
        SocketMain.io.on('connection', function (socket) {
            console.warn("a user connected");
            socket.on('msg', (data) => {
                SocketMain.LOGGER.debug(util.format("客户端回传回的消息为: %s", data));
            });
        });
        SocketMain.startInterval();
        SocketMain.log();
    }
    static startInterval() {
        setInterval(() => {
            SocketMain.LOGGER.debug("给指定的客户端发送消息");
            SocketMain.io.sockets.emit("msg", "一串文本信息");
        }, 1000);
    }
    static log() {
        setInterval(() => {
            SocketMain.LOGGER.debug(util.format("当前连接的socket数量为: %j", SocketMain.io.sockets));
        }, 5000);
    }
}
SocketMain.LOGGER = log4js.getLogger("SocketMain");
exports.SocketMain = SocketMain;
