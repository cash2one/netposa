/**
 * 任务权限枚举
 * @time: 2017-06-05 11:53:17
 * @params:
 * @return:
 */


interface IAuthStatus{
    EveryBody: {value:string, text:string};
    Self: {value:string, text:string};
    Part: {value:string, text:string};
}
export const AuthStatus:{[key: string]: {value:string, text:string}} & IAuthStatus = {
    EveryBody: {value: "EveryBody", text: "所有人可见"},
    Self: {value: "Self", text: "仅自己可见"},
    Part: {value: "Part", text: "部分人可见"},
};