/** create by cdm
 * 属性转换
 * @time: 2017-09-27
 */
interface IAttributeFactory {
    getAttributeSex: (Status: string) => string;
    getAttributeFeature: (Glass: number, IsPants: number, IsSleeve: number, Mask: number, Smile: number) => string;
    getAttributeAge: (num: number) => string;
    getAttributeHairStyle: () => string;
    getAttributeGlasses: (num: number) => string;
    getAttributeEquipment: (num: string) => string;
    getAttributeClothing: (param: any) => string;
    getAttributeCap: (param: any) => string;
    getAttributeMask: (param: any) => string;
    getAttributeBelongings: (param: any) => string;
    getAttributeShoe: (param: any) => string; // 获取鞋子属性
    getCrossTrainTime: (num: number) => string; // 获取时段
    numTransform: (num: number) => string; // 数字格式转换成千分位
}

function getTime(timestamp: number): string {
    let time:any = new Date(timestamp);
    let year:any = time.getFullYear();
    let month:any = time.getMonth() + 1;
    if(month < 10) {
        month = '0' + month;
    }
    let date:any = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();

    let hour:any = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    let minute:any = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    let second:any = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();

    let currentTime = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;

    return currentTime;
}

export class AttributeFactory implements IAttributeFactory {
    getAttributeSex = (Status: string) => {
        let sex: string = "";
        switch (Status) {
            case "0":
                sex = "未知";
                break;
            case "1":
                sex = "男";
                break;
            case "2":
                sex = "女";
                break;
        }
        return sex;
    };

    getAttributeFeature = (Glass: number, IsPants: number, IsSleeve: number, Mask: number, Smile: number) => {
        let feature: string = "";
        switch (Glass) {
            case 0:
                feature += "太阳镜 ";
                break;
            case 1:
                feature += "普通眼镜 ";
                break;
            default:
                break;
        }
        switch (IsPants) {
            case 1:
                feature += "穿短裤 ";
                break;
            default:
                break;
        }
        switch (IsSleeve) {
            case 1:
                feature += "穿短袖 ";
                break;
            default:
                break;
        }
        switch (Mask) {
            case 1:
                feature += "戴面具 ";
                break;
            default:
                break;
        }
        switch (Smile) {
            case 1:
                feature += "微笑 ";
                break;
            default:
                break;
        }
        return feature;
    };

    getAttributeAge = (num: number) => {
        let ageName: string = "";
        if ((num <= 20) && (num >= 1)) {
            ageName = "少年";
        } else if ((num <= 40) && (num >= 21)) {
            ageName = "青年";
        } else if ((num <= 60) && (num >= 41)) {
            ageName = "壮年";
        } else if (num > 60) {
            ageName = "老年";
        }

        return ageName;
    };

    getAttributeHairStyle = () => {
        return "未知";
    };

    getAttributeGlasses = (num: number) => {
        let name: string = "";
        switch (num) {
            case 0:
                name = "太阳镜";
                break;
            case 1:
                name = "普通眼镜";
                break;
            default:
                break;
        }

        return name;
    };

    getAttributeEquipment = (num: string) => {
        let name: string = "";

        return name;
    };

    getAttributeClothing = (param: any) => {
        let name: string = "";
        // 判断上衣
        switch (param.IsSleeve) {
            case 0:
                name += "穿长袖 ";
                break;
            case 1:
                name += "穿短袖 ";
                break;
            default:
                break;
        }
        // 判断下衣
        switch (param.IsPants) {
            case 0:
                name += "穿长袖 ";
                break;
            case 1:
                name += "穿短裤 ";
                break;
            default:
                break;
        }

        return name;
    };

    getAttributeCap = () => {
        let name: string = "";

        return name;
    };

    getAttributeMask = (num: number) => {
        let name: string = "";
        switch (num) {
            case 0:
                name = "没戴口罩";
                break;
            case 1:
                name = "戴口罩";
                break;
            default:
                name = "未知";
                break;
        }

        return name;
    };

    getAttributeBelongings = () => {
        let name: string = "";

        return name;
    };

    getAttributeShoe = () => {
        let name: string = "";

        return name;
    };

    getCrossTrainTime = (num: number) => {
        let timestamp: number = (new Date()).valueOf();
        let time:any = {
            startTime: "",
            endTime: ""
        };
        time.endTime = getTime(timestamp);
        if (num === 1) {
            timestamp = timestamp - 1 * 24 * 60 * 60 * 1000;
        } else if (num === 2) {
            timestamp = timestamp - 7 * 24 * 60 * 60 * 1000;
        } else if (num === 3) {
            timestamp = timestamp - 30 * 24 * 60 * 60 * 1000;
        } else if (num === 0) {
            timestamp = timestamp - 365 * 24 * 60 * 60 * 1000;
        }
        time.startTime = getTime(timestamp);

        return time;
    };

    numTransform = (num: number) => {
        if(num>0){
            let reg=/(?=(?!\b)(\d{3})+$)/g;
            return String(num).replace(reg, ',');
        }else{
            return "0";
        }
    }
}