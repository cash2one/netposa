import PortraitTool from '../../../common/portrait-tool';
let dt = new Date();
let y = (dt.getFullYear()).toString();
let m = (dt.getMonth() + 1).toString();
let d = (dt.getDate()).toString();
let hh = (dt.getHours()).toString();
let mm = (dt.getMinutes()).toString();
let ss = (dt.getSeconds()).toString();
parseInt(m) < 10 ? m = `0${m}` : m;
parseInt(d) < 10 ? d = `0${d}` : d;
parseInt(hh) < 10 ? hh = `0${hh}` : hh;
parseInt(mm) < 10 ? mm = `0${mm}` : mm;
parseInt(ss) < 10 ? ss = `0${ss}` : ss;
export interface TimeLength {
    startTime: string;
    endTime: string;
}
export function GetNDayTime(n: number): TimeLength {
    let time = {} as TimeLength;
    let dd = new Date();
    dd.setDate(dd.getDate() + n);
    let year = dd.getFullYear();
    let month = (dd.getMonth() + 1).toString();
    let day = (dd.getDate()).toString();
    parseInt(month) < 10 ? month = `0${month}` : month;
    parseInt(day) < 10 ? day = `0${day}` : day;
    time.startTime = `${year}-${month}-${day} 00:00:00`;
    time.endTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    return time
}

export interface Enum <T>{
    key: string;
    value: T;
    text: string;
}

interface EnumEx {
    all: Enum<string>;
    oneDay: Enum<TimeLength>;
    threeDay: Enum<TimeLength>;
    weekDay: Enum<TimeLength>;
    selectDay: Enum<string>;
}

export const FastData: { [key: string]: Enum<TimeLength | string> } & EnumEx = {
    all: {key: 'all', value: 'all', text: '全部'},
    oneDay: {key: 'oneDay', value: GetNDayTime(-1), text: '近一天'},
    threeDay: {key: 'threeDay', value: GetNDayTime(-3), text: '近三天'},
    weekDay: {key: 'weekDay', value: GetNDayTime(-7), text: '近一周'},
    selectDay: {key: 'selectDay', value: 'select', text: '自定义'}
};

export function getFastDataList(): Array<Enum<TimeLength | string>> {
    let arr = [] as Array<Enum<TimeLength | string>>;
    for (let k in FastData) {
        arr.push({key: FastData[k].key, value: FastData[k].value, text: FastData[k].text})
    }
    return arr
}

interface ModelDataEnumEx{
    all:Enum<string>;
    face:Enum<string>;
    body:Enum<string>;
    portrait:Enum<string>;
}
export const ModelData: {[key: string]: Enum<string>} & ModelDataEnumEx = {
    all:{key:'all',value:'all',text:'全部'},
    face:{key:'face',value:'face',text:'人脸'},
    body:{key:'body',value:'body',text:'人体'},
    portrait:{key:'portrait',value:'portrait',text:'人像检索'}
}
export function getModelDataList(): Array<Enum<string>>{
    let arr = [] as Array<Enum<string>>;
    for (let k in ModelData) {
        arr.push({key: ModelData[k].key, value: ModelData[k].value, text: ModelData[k].text})
    }
    return arr
}

interface SexDataEnumEx{
    all:Enum<string>;
    man:Enum<string>;
    women:Enum<string>;
    unknown:Enum<string>;
}

export const SexData: { [key: string]: Enum<string> } & SexDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    man:{key:'man',value:'man',text:'男'},
    women:{key:'women',value:'women',text:'女'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getSexDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in SexData) {
        arr.push({key: SexData[k].key, value: SexData[k].value, text: SexData[k].text})
    }
    return arr
}

interface GlassesDataEnumEx{
    all:Enum<string>;
    yes:Enum<string>;
    no:Enum<string>;
    unknown:Enum<string>;
}
export const GlassesData: { [key: string]: Enum<string> } & GlassesDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    yes:{key:'yes',value:'yes',text:'戴眼镜'},
    no:{key:'no',value:'no',text:'不戴眼镜'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getGlassesDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in GlassesData) {
        arr.push({key: GlassesData[k].key, value: GlassesData[k].value, text: GlassesData[k].text})
    }
    return arr
}

interface CapDataEnumEx{
    all:Enum<string>;
    yes:Enum<string>;
    no:Enum<string>;
    unknown:Enum<string>;
}
export const CapData: { [key: string]: Enum<string> } & CapDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    yes:{key:'yes',value:'yes',text:'戴帽子'},
    no:{key:'no',value:'no',text:'不戴帽子'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getCapDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in CapData) {
        arr.push({key: CapData[k].key, value: CapData[k].value, text: CapData[k].text})
    }
    return arr
}

interface MaskDataEnumEx{
    all:Enum<string>;
    yes:Enum<string>;
    no:Enum<string>;
    unknown:Enum<string>;
}
export const MaskData: { [key: string]: Enum<string> } & MaskDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    yes:{key:'yes',value:'yes',text:'戴口罩'},
    no:{key:'no',value:'no',text:'不戴口罩'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getMaskDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in MaskData) {
        arr.push({key: MaskData[k].key, value: MaskData[k].value, text: MaskData[k].text})
    }
    return arr
}

interface ToteDataEnumEx{
    all:Enum<string>;
    bag:Enum<string>;
    box:Enum<string>;
    cart:Enum<string>;
    child:Enum<string>;
    umbrella:Enum<string>;
    unknown:Enum<string>
}
export const ToteData: { [key: string]: Enum<string> } & ToteDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    bag:{key:'bag',value:'bag',text:'包'},
    box:{key:'box',value:'box',text:'拉杆箱'},
    cart:{key:'cart',value:'cart',text:'推车'},
    child:{key:'child',value:'child',text:'抱小孩'},
    umbrella:{key:'umbrella',value:'umbrella',text:'打伞'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getToteDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in ToteData) {
        arr.push({key: ToteData[k].key, value: ToteData[k].value, text: ToteData[k].text})
    }
    return arr
}

interface AgeDataEnumEx{
    all:Enum<string>;
    teenager:Enum<string>;
    young:Enum<string>;
    old:Enum<string>;
    unknown:Enum<string>;
}
export const AgeData: { [key: string]: Enum<string> } & AgeDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    teenager:{key:'teenager',value:'teenager',text:'少年'},
    young:{key:'young',value:'young',text:'青年'},
    old:{key:'old',value:'old',text:'老年'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getAgeDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in AgeData) {
        arr.push({key: AgeData[k].key, value: AgeData[k].value, text: AgeData[k].text})
    }
    return arr
}

interface ClothesDataEnumEx{
    all:Enum<string>;
    longsleeve:Enum<string>;
    shortsleeve:Enum<string>;
    vest:Enum<string>;
    longs:Enum<string>;
    shorts:Enum<string>;
    skirt:Enum<string>;
    unknown:Enum<string>;
}
export const ClothesData: { [key: string]: Enum<string> } & ClothesDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    longsleeve:{key:'longsleeve',value:'longsleeve',text:'长袖'},
    shortsleeve:{key:'shortsleeve',value:'shortsleeve',text:'短袖'},
    vest:{key:'vest',value:'vest',text:'背心'},
    longs:{key:'longs',value:'longs',text:'长裤'},
    shorts:{key:'shorts',value:'shorts',text:'短裤'},
    skirt:{key:'skirt',value:'skirt',text:'裙子'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getClothesDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in ClothesData) {
        arr.push({key: ClothesData[k].key, value: ClothesData[k].value, text: ClothesData[k].text})
    }
    return arr
}

interface HairDataEnumEx{
    all:Enum<string>;
    long:Enum<string>;
    mid:Enum<string>;
    short:Enum<string>;
    bald:Enum<string>;
    haido:Enum<string>;
    unknown:Enum<string>;
}
export const HairData: { [key: string]: Enum<string> } & HairDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    long:{key:'long',value:'long',text:'长发'},
    mid:{key:'mid',value:'mid',text:'中长发'},
    short:{key:'short',value:'short',text:'短发'},
    bald:{key:'bald',value:'bald',text:'秃头'},
    haido:{key:'haido',value:'haido',text:'束发'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getHairDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in HairData) {
        arr.push({key: HairData[k].key, value: HairData[k].value, text: HairData[k].text})
    }
    return arr
}

interface ShoesDataEnumEx{
    all:Enum<string>;
    sneaker:Enum<string>;
    leather:Enum<string>;
    slippers:Enum<string>;
    sandal:Enum<string>;
    boot:Enum<string>;
    unknown:Enum<string>;
}
export const ShoesData: { [key: string]: Enum<string> } & ShoesDataEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    sneaker:{key:'sneaker',value:'sneaker',text:'运动鞋'},
    leather:{key:'leather',value:'leather',text:'皮鞋'},
    slippers:{key:'slippers',value:'slippers',text:'拖鞋'},
    sandal:{key:'sandal',value:'sandal',text:'凉鞋'},
    boot:{key:'boot',value:'boot',text:'靴子'},
    unknown:{key:'unknown',value:'unknown',text:'未知'}
};

export function getShoesDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in ShoesData) {
        arr.push({key: ShoesData[k].key, value: ShoesData[k].value, text: ShoesData[k].text})
    }
    return arr
}

interface VehicleTypeEnumEx{
    all:Enum<string>;
    car:Enum<string>;
    SUV:Enum<string>;
    MPV:Enum<string>;
    roadster:Enum<string>;
    minivan:Enum<string>;
    microcalorie:Enum<string>;
    light:Enum<string>;
    pickup:Enum<string>;
}
export const VehicleTypeData: { [key: string]: Enum<string> } & VehicleTypeEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    car:{key:'car',value:'car',text:'轿车'},
    SUV:{key:'SUV',value:'SUV',text:'SUV'},
    MPV:{key:'MPV',value:'MPV',text:'MPV'},
    roadster:{key:'roadster',value:'roadster',text:'跑车'},
    minivan:{key:'minivan',value:'minivan',text:'微面'},
    microcalorie:{key:'microcalorie',value:'microcalorie',text:'微卡'},
    light:{key:'light',value:'light',text:'轻客'},
    pickup:{key:'pickup',value:'pickup',text:'皮卡'}
};

export function getVehicleTypeDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in VehicleTypeData) {
        arr.push({key: VehicleTypeData[k].key, value: VehicleTypeData[k].value, text: VehicleTypeData[k].text})
    }
    return arr
}

interface BrandEnumEx{
    all:Enum<string>;
    hot:Enum<string>;
    A:Enum<string>;
    B:Enum<string>;
    C:Enum<string>;
    D:Enum<string>;
    E:Enum<string>;
    F:Enum<string>;
    G:Enum<string>;
    H:Enum<string>;
    I:Enum<string>;
    J:Enum<string>;
    K:Enum<string>;
    L:Enum<string>;
    M:Enum<string>;
    N:Enum<string>;
    O:Enum<string>;
    P:Enum<string>;
    Q:Enum<string>;
    R:Enum<string>;
    S:Enum<string>;
    T:Enum<string>;
    U:Enum<string>;
    V:Enum<string>;
    W:Enum<string>;
    X:Enum<string>;
    Y:Enum<string>;
    Z:Enum<string>;
}
export const BrandData: { [key: string]: Enum<string> } & BrandEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    hot:{key:'hot',value:'hot',text:'热门'},
    A:{key:'A',value:'A',text:'A'},
    B:{key:'B',value:'B',text:'B'},
    C:{key:'C',value:'C',text:'C'},
    D:{key:'D',value:'D',text:'D'},
    E:{key:'E',value:'E',text:'E'},
    F:{key:'F',value:'F',text:'F'},
    G:{key:'G',value:'G',text:'G'},
    H:{key:'H',value:'H',text:'H'},
    I:{key:'I',value:'I',text:'I'},
    J:{key:'J',value:'J',text:'J'},
    K:{key:'K',value:'K',text:'K'},
    L:{key:'L',value:'L',text:'L'},
    M:{key:'M',value:'M',text:'M'},
    N:{key:'N',value:'N',text:'N'},
    O:{key:'O',value:'O',text:'O'},
    P:{key:'P',value:'P',text:'P'},
    Q:{key:'Q',value:'Q',text:'Q'},
    R:{key:'R',value:'R',text:'R'},
    S:{key:'S',value:'S',text:'S'},
    T:{key:'T',value:'T',text:'T'},
    U:{key:'U',value:'U',text:'U'},
    V:{key:'V',value:'V',text:'V'},
    W:{key:'W',value:'W',text:'W'},
    X:{key:'X',value:'X',text:'X'},
    Y:{key:'Y',value:'Y',text:'Y'},
    Z:{key:'Z',value:'Z',text:'Z'},
};

export function getBrandDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in BrandData) {
        arr.push({key: BrandData[k].key, value: BrandData[k].value, text: BrandData[k].text})
    }
    return arr
}

interface ColorEnumEx{
    all:Enum<string>;
    blue:Enum<string>;
    yellow:Enum<string>;
    black:Enum<string>;
    green:Enum<string>;
    pink:Enum<string>;
    red:Enum<string>;
    gray:Enum<string>;
    purple:Enum<string>;
}
export const ColorData: { [key: string]: Enum<string> } & ColorEnumEx= {
    all:{key:'all',value:'all',text:'全部'},
    blue:{key:'blue',value:'blue',text:'blue'},
    yellow:{key:'yellow',value:'yellow',text:'yellow'},
    black:{key:'black',value:'black',text:'black'},
    green:{key:'green',value:'green',text:'green'},
    pink:{key:'pink',value:'pink',text:'pink'},
    red:{key:'red',value:'red',text:'red'},
    gray:{key:'gray',value:'liggrayht',text:'gray'},
    purple:{key:'purple',value:'purple',text:'purple'}
};

export function getColorDataList(): Array<Enum<string>> {
    let arr = [] as Array<Enum<string>>;
    for (let k in ColorData) {
        arr.push({key: ColorData[k].key, value: ColorData[k].value, text: ColorData[k].text})
    }
    return arr
}

// 多选参数
export interface multipleChoice{
    status: boolean;
    name: string;
    val: any;
    other?: string;
}

// 性别列表
export function SexList(): Array<multipleChoice>{
   let data:Array<multipleChoice> = [
       {
           status: false,
           name: '全部',
           val: 'all'
       },{
           status: false,
           name: '男',
           val: 'Men'
       },{
           status: false,
           name: '女',
           val: 'Women'
       },{
           status: false,
           name: '未知',
           val: 'unknown'
       }];
    return data
}

// 时段
export function CrossTrainTimeList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: false,
            name: '全部',
            val: 0
        },{
            status: false,
            name: '近一天',
            val: 1
        },{
            status: false,
            name: '近一周',
            val: 2
        },{
            status: true,
            name: '近一月',
            val: 3
        },{
            status: false,
            name: '自定义',
            val: 4
        }];
    return data
}

// 模式
export function PatternList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: ' 人脸',
            val: '1'
        },{
            status: false,
            name: '人体',
            val: '2'
        },{
            status: false,
            name: '人像检索',
            val: '3'
        }];
    return data
}

// 携带物
export function EquipmentList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '包',
            val: 1
        },{
            status: false,
            name: '拉杆箱',
            val: 2
        },{
            status: false,
            name: '推车',
            val: 3
        },{
            status: false,
            name: '抱小孩',
            val: 4
        },{
            status: false,
            name: '打伞',
            val: 5
        },{
            status: false,
            name: '未知',
            val: 6
        }];
    return data
}

// 年龄段
export function AgeList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '少年',
            val: 1
        },{
            status: false,
            name: '青年',
            val: 2
        },{
            status: false,
            name: '中年',
            val: 3
        },{
            status: false,
            name: '老年',
            val: 3
        }];
    return data
}
// 衣帽特征
export function ClothesList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '长袖',
            val: 1
        },{
            status: false,
            name: '短袖',
            val: 2
        },{
            status: false,
            name: '背心',
            val: 3
        },{
            status: false,
            name: '长裤',
            val: 4
        },{
            status: false,
            name: '短裤',
            val: 5
        },{
            status: false,
            name: '裙子',
            val: 6
        },{
            status: false,
            name: '未知',
            val: 7
        }];
    return data
}

// 发型
export function HairList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '长发',
            val: 1
        },{
            status: false,
            name: '中长发',
            val: 2
        },{
            status: false,
            name: '短发',
            val: 3
        },{
            status: false,
            name: '秃头',
            val: 4
        },{
            status: false,
            name: '束发',
            val: 5
        },{
            status: false,
            name: '未知',
            val: 6
        }];
    return data
}

// 鞋子
export function ShoeList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '运动鞋',
            val: 1
        },{
            status: false,
            name: '皮鞋',
            val: 2
        },{
            status: false,
            name: '拖鞋',
            val: 3
        },{
            status: false,
            name: '凉鞋',
            val: 4
        },{
            status: false,
            name: '靴子',
            val: 5
        },{
            status: false,
            name: '未知',
            val: 6
        }];
    return data
}

// 眼镜
export function GlassesList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '普通眼镜',
            val: 1
        },{
            status: false,
            name: '太阳眼镜',
            val: 0
        },{
            status: false,
            name: '未知',
            val: -1
        }];
    return data
}

// 口罩
export function MaskList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '戴口罩',
            val: 1
        },{
            status: false,
            name: '不戴口罩',
            val: 0
        },{
            status: false,
            name: '未知',
            val: -1
        }];
    return data
}

// 帽子
export function CapList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: 'all'
        },{
            status: false,
            name: '戴帽子',
            val: 1
        },{
            status: false,
            name: '不戴帽子',
            val: 0
        },{
            status: false,
            name: '未知',
            val: -1
        }];
    return data
}

// 车辆高级检索参数
export interface CarSearchParams{
    searchKeyWords: string;
    featureSimilarity: number;
    carSimilarity: number;
    startTime?: string;
    endTime?: string;
}

// 人脸高级检索参数
export interface FaceSearchParams{
    currentPage: number;
    keyWord: any;
    orderBy: {
        fieldName?: string;
        isAsc: boolean;
    };
    pageSize: number;
    taskId?: string;
    isFirstSearch?: boolean;
    imagePath?: string;
    threshold?: number;
    startTime?: string;
    endTime?: string;
    arrType?: Array<string>;
    arrCameraId?: Array<string>;
    arrGender?: Array<string>;
    minAge?: number;
    maxAge?: number;
    arrEyeGlasses?: Array<number>;
    arrSunGlasses?: Array<number>;
    arrSmile?: Array<number>;
    arrMask?: Array<number>;
    arrIsPants?: Array<number>;
    arrIsSleeve?: Array<number>;
    arrCarryThings?: Array<string>;
    arrHat?: Array<string>;
    arrHairType?: Array<string>;
    arrShoes?: Array<string>;
    arrAreaID?: Array<string>;
    featureSearchExt?: any;
    fetureTaskParam?: any;
    userId: string;
}

// Wifi高级检索参数
export interface WifiSearchParams{
    currentPage: number;
    keyWord: string;
    orderBy: {
        fieldName?: string;
        isAsc: boolean;
    };
    pageSize: number;
    isFirstSearch?: boolean;
    taskId?: string;
    startTime?: string;
    endTime?: string;
    ArObjectID?: Array<string>;
    area?: Array<string>;
    userId: string;
}

// 电围高级检索参数
export interface ElectronicSearchParams{
    currentPage: number;
    keyWord: string;
    orderBy: {
        fieldName?: string;
        isAsc: boolean;
    };
    pageSize: number;
    isFirstSearch?: boolean;
    taskId?: string;
    startTime?: string;
    endTime?: string;
    ArObjectID?: Array<string>;
    area?: Array<string>;
    userId: string;
}

// 车辆类型
export function CarTypeList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: false,
            name: '全部',
            val: 0
        }, {
            status: false,
            name: '轿车',
            val: 1
        }, {
            status: false,
            name: 'SUV',
            val: 2
        }, {
            status: false,
            name: 'MPV',
            val: 3
        }, {
            status: false,
            name: '跑车',
            val: 4
        }, {
            status: false,
            name: '微面',
            val: 5
        }, {
            status: false,
            name: '微卡',
            val: 6
        }, {
            status: false,
            name: '轻客',
            val: 7
        }, {
            status: false,
            name: '皮卡',
            val: 8
        }];
    return data
}

// 车牌颜色
export function LicencePlateList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: -1,
            other: "transparent"
        },
        {
            status: false,
            name: '白色',
            val: 0,
            other: "#ffffff"
        }, {
            status: false,
            name: '黄色',
            val: 1,
            other: "#ffff00"
        }, {
            status: false,
            name: '蓝色',
            val: 2,
            other: "#0000ff"
        }, {
            status: false,
            name: '黑色',
            val: 3,
            other: "#000000"
        }, {
            status: false,
            name: '绿色',
            val: 101,
            other: "#008000"
        }, {
            status: false,
            name: '其它',
            val: 4,
            other: "transparent"
        }];
    return data
}

// 车辆品牌
export function VehicleBrandList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: false,
            name: '全部',
            val: 0
        },
        {
            status: false,
            name: '热门',
            val: 1
        }, {
            status: false,
            name: 'A',
            val: 2
        }, {
            status: false,
            name: 'B',
            val: 3
        }, {
            status: false,
            name: 'C',
            val: 4
        }, {
            status: false,
            name: 'D',
            val: 5
        }, {
            status: false,
            name: 'E',
            val: 6
        }, {
            status: false,
            name: 'F',
            val: 7
        }, {
            status: false,
            name: 'G',
            val: 8
        }, {
            status: false,
            name: 'H',
            val: 9
        }, {
            status: false,
            name: 'I',
            val: 10
        }, {
            status: false,
            name: 'J',
            val: 11
        }, {
            status: false,
            name: 'K',
            val: 12
        }, {
            status: false,
            name: 'L',
            val: 13
        }, {
            status: false,
            name: 'M',
            val: 14
        }, {
            status: false,
            name: 'N',
            val: 15
        }, {
            status: false,
            name: 'O',
            val: 16
        }, {
            status: false,
            name: 'P',
            val: 17
        }, {
            status: false,
            name: 'Q',
            val: 18
        }, {
            status: false,
            name: 'R',
            val: 19
        }, {
            status: false,
            name: 'S',
            val: 20
        }, {
            status: false,
            name: 'T',
            val: 21
        }, {
            status: false,
            name: 'U',
            val: 22
        }, {
            status: false,
            name: 'V',
            val: 23
        }, {
            status: false,
            name: 'W',
            val: 24
        }, {
            status: false,
            name: 'X',
            val: 25
        }, {
            status: false,
            name: 'Y',
            val: 26
        }, {
            status: false,
            name: 'Z',
            val: 27
        }];
    return data
}

// 车辆颜色
export function CarColorList(): Array<multipleChoice>{
    let data:Array<multipleChoice> = [
        {
            status: true,
            name: '全部',
            val: "",
            other: "transparent"
        },
        {
            status: false,
            name: '白色',
            val: "A",
            other: "#ffffff"
        }, {
            status: false,
            name: '灰色',
            val: "B",
            other: "#d9d9d9"
        }, {
            status: false,
            name: '黄色',
            val: "C",
            other: "#ffff00"
        }, {
            status: false,
            name: '粉色',
            val: "D",
            other: "#e8a1b7"
        }, {
            status: false,
            name: '红色',
            val: "E",
            other: "#ff0000"
        }, {
            status: false,
            name: '紫色',
            val: "F",
            other: "#942092"
        }, {
            status: false,
            name: '绿色',
            val: "G",
            other: "#008000"
        }, {
            status: false,
            name: '蓝色',
            val: "H",
            other: "#0000ff"
        }, {
            status: false,
            name: '棕色',
            val: "I",
            other: "#bf9000"
        }, {
            status: false,
            name: '黑色',
            val: "J",
            other: "#000000"
        }, {
            status: false,
            name: '其它',
            val: "Z",
            other: "transparent"
        }];
    return data
}