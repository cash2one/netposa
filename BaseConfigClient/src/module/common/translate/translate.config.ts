import {app} from "../app/main.app";

class AngularTranslateConfig {
    static $inject = ['$translateProvider'];

    $translateProvider: any;

    constructor($translateProvider: any) {
        let times = new Date().getTime();
        $translateProvider.useStaticFilesLoader({
            files: [
                {
                    prefix: "/language/common/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/dynamic/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/facesearch/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/maintain/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/systemconfig/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/total/language-",
                    suffix: ".json?v=" + times
                }
                , {
                    prefix: "/language/resources/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/resourceRetrieval/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/area/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/unit/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/person/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/camera/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/lamp/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/rmpgate/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/wifi/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/electronicFence/language-",
                    suffix: ".json?v=" + times
                },
                {
                    prefix: "/language/baseConfig/role/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/iodServer/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/ivsServer/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/engineServer/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/proxyServer/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/videoServer/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/faceLib/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/runplan/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/taskconfig/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/systemproperties/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/videoStructure/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/common/language-",
                    suffix: ".json?v=" + times
                }, {
                    prefix: "/language/baseConfig/mapResource/language-",
                    suffix: ".json?v=" + times
                }]
        });

        $translateProvider.preferredLanguage('cn');
        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    }
}


app.config(AngularTranslateConfig);