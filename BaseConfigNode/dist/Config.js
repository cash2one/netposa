"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
Config.port = 3000;
Config.NODE_SERVER_URL = "/BaseConfigNodeServer/db";
Config.BASE_CONFIG_SERVER_URL = 'http://172.16.91.99:8080/BaseConfigServer';
Config.POSA_CONFIG_SERVER_URL = 'http://172.16.91.99:8080/PosaDPServer';
Config.USER_ID_KEY = "UserIDKey";
Config.RDS_PORT = 6379;
Config.IS_DEV = false;
Config.RDS_HOST = '192.192.11.90';
exports.default = Config;
