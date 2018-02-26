import * as path from "path";
import * as Promise from "promise";
import * as fs from "fs";
import * as log4js from "log4js";
import * as util from "util";
/**
 * Created by dell on 2017/8/1.
 */
export class PathHelper{
    private static LOGGER = log4js.getLogger("PathHelper");

    public static FILE_SEPERATE = path.sep;
    /**
     * 缓存当前node工程的根路径
     * 注意: 当此文件位置变化时, 需要修改下面的固定配置, 以定位到项目根路径
     */
    private static PROJECT_PATH = path.join(__dirname, ".." + PathHelper.FILE_SEPERATE + ".." + PathHelper.FILE_SEPERATE);

    /**
     * @param relativeDirPath 相对于整个项目工程 src 下的相对路径
     * @return 绝对路径(只返回文件夹路径)
     */
    static getDirPath(relativeDirPath: string){
        return path.join(PathHelper.PROJECT_PATH, relativeDirPath);
    }

    /**
     * 获取目标文件夹下的所有子文件路径
     * 此方法是同步方法
     * 此方法会过滤目标文件夹下的子文件夹, 只读取目标文件下的子文件
     * @param absoluteDirPath
     * @returns Array<string> 返回数组
     * @exception 返回空数组
     */
    static getFilesPathSync(absoluteDirPath: string){
        let result:Array<string> = [];
        try{
            // 判断路径是否存在 若路径不存在, 则直接在此抛出异常
            fs.accessSync(absoluteDirPath);
            // 同步读取文件路径
            let filePaths = fs.readdirSync(absoluteDirPath) || [];
            filePaths.forEach((path: string)=>{
                // 判断文件是否是文件，而非文件夹
                let stats = fs.lstatSync(absoluteDirPath + path);
                if(stats.isFile()){
                    result.push(absoluteDirPath + path);
                }
            });
        }catch(err){
            PathHelper.LOGGER.error(util.format("PathHelper.getFilesPath Error %s %s", err && err.message, err && err.stack));
        }
        return result;
    }

    /**
     * 获取目标文件夹下的所有子文件路径
     * 此方法是异步方法
     * 此方法会过滤目标文件夹下的子文件夹, 只读取目标文件下的子文件
     * @param absoluteDirPath
     * @returns Array<string> | null 返回字符串数组或者空值
     */
    static getFilesPath(absoluteDirPath: string){
        return Promise.resolve(null)
            .then(()=>{
                // 判断路径是否存在 若路径不存在, 则直接在此抛出异常
                fs.accessSync(absoluteDirPath);
                return null;
            })
            .then(()=>{
                // 同步读取文件路径
                let filePaths = fs.readdirSync(absoluteDirPath) || [];
                let result:Array<string> = [];
                filePaths.forEach((path: string)=>{
                    // 判断文件是否是文件，而非文件夹
                    let stats = fs.lstatSync(absoluteDirPath + path);
                    if(stats.isFile()){
                        result.push(absoluteDirPath + path);
                    }
                });
                return result;
            })
            .catch((err: Error)=>{
                PathHelper.LOGGER.error(util.format("PathHelper.getFilesPath Error %s %s", err && err.message, err && err.stack));
                return Promise.resolve([]);
            });
    }
}
