/**
 * Created by dell on 2017/5/17.
 */
export default class SearchLibPersonModel{
    libId: string;
    /**
     *  民族
     */
    nation: string;
    /**
     *  性别
     */
    gender: string;
    /**
     *  最大年龄年龄
     */
    maxAge: number;
    /**
     *  最小年龄年龄
     */
    minAge: number;
    /**
     *  身份证号
     */
    idCardNumber: string;
    /**
     *  页码
     */
    currentPage: number;
    /**
     *  每页的结果数
     */
    pageSize :number;
}