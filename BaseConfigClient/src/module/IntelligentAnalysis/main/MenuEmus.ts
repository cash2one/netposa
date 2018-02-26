export class MenuEmus {
    value: string;
    text: string;
    path: string;
    icon: string;
    type?:string;
}

export class CarInterFace {
    CarDriveTrack: MenuEmus;
    TrackFindCar: MenuEmus;
    HiddenDigging: MenuEmus;
    DayAndNightOut: MenuEmus;
    FollowCarAnalysis: MenuEmus;
    FirstIntoCity: MenuEmus;
    CollisionAnalysis: MenuEmus;
    FrequencyAnalysis: MenuEmus;
    SettledAnalysis: MenuEmus;
    FrequentCar: MenuEmus;
    FrequentViolation: MenuEmus;
    DeckAnalysis: MenuEmus;
    SeatBeltAnalysis: MenuEmus;
    DriveCall: MenuEmus;
    SunVisorDetection: MenuEmus;
    UnlicensedAnalysis: MenuEmus
}

export class FaceInterFace {
    FaceTrack: MenuEmus;
    AccompanyingAnalysis: MenuEmus;
    //SimilarityAnalysis: MenuEmus;
    FaceAnalysis: MenuEmus;
    PersonAlarm: MenuEmus;
    FrequencyAnalysis: MenuEmus;
    FrequencyAppear: MenuEmus;
    FaceCollisionAnalysis: MenuEmus;
}

export class MacInterFace {
    MacCollision: MenuEmus;
    MacTrack: MenuEmus;
    MacAccompany: MenuEmus;
    MacFrequency: MenuEmus;
    MacAlarm: MenuEmus;
}
export class MultiInterFace{
    FaceMacCrash: MenuEmus;
    MacCarCrash: MenuEmus;
}

export const MacMenu: { [key: string]: { [key: string]: string } } & MacInterFace = {
    MacCollision: {
        value: 'MacCollision',
        text: 'Mac碰撞',
        path: 'IntelligentAnalysis.MacCrash',
        icon: 'mac-crash'
    },

    MacTrack: {
        value: 'MacTrack',
        text: 'Mac轨迹',
        path: 'IntelligentAnalysis.MacTrack',
        icon: 'mac-track'
    },
    MacAccompany: {
        value: 'MacAccompany',
        text: 'MAC伴随',
        path: 'IntelligentAnalysis.MacAccompany',
        icon: 'mac-accompany'
    },
    MacFrequency: {
        value: 'MacFrequency',
        text: 'MAC频次',
        path: 'IntelligentAnalysis.MacFrequency',
        icon: 'mac-frequency'
    },
    MacAlarm: {
        value: 'MacAlarm',
        text: 'MAC报警',
        path: 'IntelligentAnalysis.MacAlarm',
        icon: 'mac-alarm'
    }
};
export const FaceMenu: { [key: string]: { [key: string]: string } } & FaceInterFace = {
    FaceTrack: {
        value: 'FaceTrack',
        text: '人脸轨迹',
        path: 'IntelligentAnalysis.FaceTrack',
        icon: 'face-track'
    },
    FrequencyAnalysis: {
        value: 'FrequencyAnalysis',
        text: '频次分析',
        path: 'IntelligentAnalysis.FrequencyAnalysis',
        icon: 'frequency-analysis'
    },
    AccompanyingAnalysis: {
        value: 'AccompanyingAnalysis',
        text: '伴随分析',
        path: 'IntelligentAnalysis.AccompanyingAnalysis',
        icon: 'accompanying-analysis'
    },
    // SimilarityAnalysis: {
    //     value: 'SimilarityAnalysis',
    //     text: '相似度分析',
    //     path: '',
    //     icon: 'similarity-analysis'
    // },
    FaceAnalysis: {
        value: 'FaceAnalysis',
        text: '人脸分析',
        path: 'IntelligentAnalysis.FaceAnalysis',
        icon: 'face-analysis'
    },
    PersonAlarm: {
        value: 'PersonAlarm',
        text: '报警分析',
        path: 'IntelligentAnalysis.AlarmAnalysis',
        icon: 'alarm-analysis'
    }, FrequencyAppear: {
        value: 'FrequencyAppear',
        text: '频繁出没',
        path: 'IntelligentAnalysis.FrequencyAppear',
        icon: 'frequency-appear'
    }, FaceCollisionAnalysis: {
        value: 'FaceCollisionAnalysis',
        text: '碰撞分析',
        path: 'IntelligentAnalysis.FaceCollisionAnalysis',
        icon: 'face-collision-analysis'
    },


};

function setUrlForCar(modelName:string){
    return `http://172.16.90.206:8886/html/?isPvp=1&nomenu=1&module=${modelName}&userName=admin&password=e59cf56e33f978124da804b7e12c0d53#c`
}
export const CarMenu: { [key: string]: { [key: string]: string } } & CarInterFace = {
    CarDriveTrack: {
        value: 'CarDriveTrack',
        type:'Car',
        text: '行车轨迹',
        path: setUrlForCar('track'),
        icon: 'car-track'
    },
    TrackFindCar: {
        value: 'TrackFindCar',
        text: '轨迹查车',
        type:'Car',
        path: setUrlForCar('checkCar'),
        icon: 'car-check-car'
    },
    HiddenDigging: {
        value: 'HiddenDigging',
        text: '隐匿挖掘',
        type:'Car',
        path: setUrlForCar('hidden'),
        icon: 'car-hidden'

    },
    DayAndNightOut: {
        value: 'DayAndNightOut',
        text: '昼伏夜出',
        type:'Car',
        path: setUrlForCar('nocturnal'),
        icon: 'car-nocturnal'

    },
    FollowCarAnalysis: {
        value: 'FollowCarAnalysis',
        text: '跟车分析',
        type:'Car',
        path: setUrlForCar('carfollow'),
        icon: 'car-carfollow'

    },
    FirstIntoCity: {
        value: 'FirstIntoCity',
        text: '首次入城',
        type:'Car',
        path: setUrlForCar('ftic'),
        icon: 'car-ftic'

    },
    CollisionAnalysis: {
        value: 'CollisionAnalysis',
        text: '碰撞分析',
        type:'Car',
        path: setUrlForCar('collide'),
        icon: 'car-collide'

    },
    FrequencyAnalysis: {
        value: 'FrequencyAnalysis',
        text: '频次分析',
        type:'Car',
        path: setUrlForCar('frequency'),
        icon: 'car-frequency'
    },
    SettledAnalysis: {
        value: 'SettledAnalysis',
        text: '落脚分析',
        type:'Car',
        path: setUrlForCar('foothold'),
        icon: 'car-foothold'
    },
    FrequentCar: {
        value: 'FrequentCar',
        text: '频繁过车',
        type:'Car',
        path: setUrlForCar('continual'),
        icon: 'car-continual'
    },
    FrequentViolation: {
        value: 'FrequentViolation',
        text: '频繁违章',
        type:'Car',
        path: setUrlForCar('frequentviolations'),
        icon: 'car-frequentviolations'
    },
    DeckAnalysis: {
        value: 'DeckAnalysis',
        text: '套牌分析',
        type:'Car',
        path: setUrlForCar('fakelicensed'),
        icon: 'car-fakelicensed'
    },
    SeatBeltAnalysis: {
        value: 'SeatBeltAnalysis',
        text: '安全带分析',
        type:'Car',
        path: setUrlForCar('searchbynoseatbelt'),
        icon: 'car-searchbynoseatbelt'
    },
    DriveCall: {
        value: 'DriveCall',
        text: '开车打电话',
        type:'Car',
        path: setUrlForCar('searchbyphoneondriving'),
        icon: 'car-searchbyphoneondriving'
    },
    SunVisorDetection: {
        value: 'SunVisorDetection',
        text: '遮阳板检测',
        type:'Car',
        path: setUrlForCar('searchbynightvisor'),
        icon: 'car-searchbynightvisor'
    },
    UnlicensedAnalysis: {
        value: 'UnlicensedAnalysis',
        text: '无牌分析',
        type:'Car',
        path: setUrlForCar('searchbynoplate'),
        icon: 'car-searchbynoplate'
    }
};

export const MultiMenu:{ [key: string]: { [key: string]: string } } & MultiInterFace = {
    FaceMacCrash: {
        value: 'FaceMacCrash',
        text: '人脸MAC碰撞',
        path: 'IntelligentAnalysis.FaceMacCrash',
        icon: 'face-mac-crash'
    },
    MacCarCrash: {
        value: 'MacCarCrash',
        text: '车辆MAC碰撞',
        path: 'IntelligentAnalysis.MacCarCrash',
        icon: 'mac-car-crash'
    }
};

export function initCarMenu(): Array<MenuEmus> {
    let arr = [] as Array<MenuEmus>;
    let Menus = CarMenu as  { [key: string]: { value: string, text: string, path: string, icon: string,type:string } } & CarInterFace;

    Object.keys(Menus).forEach((key: string) => {
        arr.push({
            value: Menus[key].value,
            text: Menus[key].text,
            path: Menus[key].path,
            icon: Menus[key].icon,
            type: Menus[key].type
        } as MenuEmus)
    });
    return arr;
}

export function initFaceMenu(): Array<MenuEmus> {
    let arr = [] as Array<MenuEmus>;
    let Menus = FaceMenu as  { [key: string]: { value: string, text: string, path: string, icon: string } } & FaceInterFace;

    Object.keys(Menus).forEach((key: string) => {
        arr.push({
            value: Menus[key].value,
            text: Menus[key].text,
            path: Menus[key].path,
            icon: Menus[key].icon
        } as MenuEmus)
    });
    return arr;
}

export function initMacMenu(): Array<MenuEmus> {
    let arr = [] as Array<MenuEmus>;
    let Menus = MacMenu as  { [key: string]: { value: string, text: string, path: string, icon: string } } & MacInterFace;

    Object.keys(Menus).forEach((key: string) => {
        arr.push({
            value: Menus[key].value,
            text: Menus[key].text,
            path: Menus[key].path,
            icon: Menus[key].icon
        } as MenuEmus)
    });
    return arr;
}

export function initMultiMenu(): Array<MenuEmus> {
    let arr = [] as Array<MenuEmus>;
    let Menus = MultiMenu as  { [key: string]: { value: string, text: string, path: string, icon: string } } & MultiInterFace;
    Object.keys(Menus).forEach((key: string) => {
        arr.push({
            value: Menus[key].value,
            text: Menus[key].text,
            path: Menus[key].path,
            icon: Menus[key].icon
        } as MenuEmus)
    });
    return arr;
}