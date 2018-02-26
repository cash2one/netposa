import * as http from "http";
import * as log4js from "log4js";
import * as util from "util";
import * as SocketIO from 'socket.io';
export class SocketMain{

    private static LOGGER = log4js.getLogger("SocketMain");

    static io: SocketIO.Server;
    static init(server: http.Server){
        SocketMain.io = require("socket.io")(server);

        // socket.io
        SocketMain.io.on('connection', function(socket: SocketIO.Socket){
            console.warn("a user connected");
            socket.on('msg', (data: string)=>{
                SocketMain.LOGGER.debug(util.format("客户端回传回的消息为: %s", data));
            });
        });

        SocketMain.startInterval();
        SocketMain.log();
    }

    static startInterval(){
        // 循环给连接的对象发送消息
        setInterval(()=>{
            SocketMain.LOGGER.debug("给指定的客户端发送消息");
            SocketMain.io.sockets.emit("msg", "一串文本信息");
        }, 1000);
    }

    static log(){
        setInterval(()=>{
            SocketMain.LOGGER.debug(util.format("当前连接的socket数量为: %j", SocketMain.io.sockets));
        }, 5000);
    }


}