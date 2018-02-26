import {ValueTextEnumType} from "../../enum/Enum";

/**
 * 特征提取类型.
 * create by zmp.
 * @time: 2017-09-01
 */
export const DetectType : ValueTextEnumType = {

    /**
     * 人脸.
     */
    Face: {value: "Face", text: "人脸"},
    /**
     * 身体.
     */
    Person: {value: "Face", text: "身体"},
    /**
     * 人像与身体.
     */
    FaceAndPerson: {value: "FaceAndPerson", text: "人像与身体"}

}