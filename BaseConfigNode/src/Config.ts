/**
 * Created by lg on 2017/10/13 0013.
 */

export default class Config {
    public static port: number = 3000;

    public static NODE_SERVER_URL = "/BaseConfigNodeServer/db";

    public static BASE_CONFIG_SERVER_URL = 'http://192.192.11.83:9090/BaseConfigServer';
    public static POSA_CONFIG_SERVER_URL = 'http://192.192.11.83:9090/PosaDPServer';


    public static USER_ID_KEY = "UserIDKey";

    public static RDS_PORT = 6379;

    public static IS_DEV = false;

    public static RDS_HOST = '192.192.11.90';
}
