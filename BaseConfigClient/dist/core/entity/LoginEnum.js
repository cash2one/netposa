define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoginModule = {
        Login: {
            code: "Login",
            name: "登陆"
        },
        Logout: {
            code: "Logout",
            name: "登出"
        },
        ChangePwd: {
            code: "ChangePwd",
            name: "修改密码"
        },
        Resources: {
            code: "Resources",
            name: "资源态势"
        },
        ResourceRetrieval: {
            code: "ResourceRetrieval",
            name: "资源检索"
        },
        IntelligentAnalysis: {
            code: "IntelligentAnalysis",
            name: "智能分析"
        },
        DynamiControl: {
            code: "DynamiControl",
            name: "视图立方"
        },
        Maintain: {
            code: "Maintain",
            name: "运维管理"
        },
        BaseConfig: {
            code: "BaseConfig",
            name: "配置管理"
        },
        ToolOption: {
            code: "ToolOption",
            name: "选项"
        },
        MyCollect: {
            code: "MyCollect",
            name: "我的收藏"
        },
        MyCheck: {
            code: "MyCheck",
            name: "我的审核"
        },
        MyReport: {
            code: "MyReport",
            name: "我的报警"
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9Mb2dpbkVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQWEsUUFBQSxXQUFXLEdBQUc7UUFDdkIsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBQ0QsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsSUFBSTtTQUNiO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxNQUFNO1NBQ2Y7UUFDRCxpQkFBaUIsRUFBRTtZQUNmLElBQUksRUFBRSxtQkFBbUI7WUFDekIsSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELG1CQUFtQixFQUFFO1lBQ2pCLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELGFBQWEsRUFBRTtZQUNYLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxNQUFNO1NBQ2Y7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsVUFBVTtZQUNoQixJQUFJLEVBQUUsTUFBTTtTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxTQUFTLEVBQUU7WUFDUCxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsTUFBTTtTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsTUFBTTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFVBQVU7WUFDaEIsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUEiLCJmaWxlIjoiY29yZS9lbnRpdHkvTG9naW5FbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IExvZ2luTW9kdWxlID0ge1xyXG4gICAgTG9naW46IHtcclxuICAgICAgICBjb2RlOiBcIkxvZ2luXCIsXHJcbiAgICAgICAgbmFtZTogXCLnmbvpmYZcIlxyXG4gICAgfSxcclxuICAgIExvZ291dDoge1xyXG4gICAgICAgIGNvZGU6IFwiTG9nb3V0XCIsXHJcbiAgICAgICAgbmFtZTogXCLnmbvlh7pcIlxyXG4gICAgfSxcclxuICAgIENoYW5nZVB3ZDoge1xyXG4gICAgICAgIGNvZGU6IFwiQ2hhbmdlUHdkXCIsXHJcbiAgICAgICAgbmFtZTogXCLkv67mlLnlr4bnoIFcIlxyXG4gICAgfSxcclxuICAgIFJlc291cmNlczoge1xyXG4gICAgICAgIGNvZGU6IFwiUmVzb3VyY2VzXCIsXHJcbiAgICAgICAgbmFtZTogXCLotYTmupDmgIHlir9cIlxyXG4gICAgfSxcclxuICAgIFJlc291cmNlUmV0cmlldmFsOiB7XHJcbiAgICAgICAgY29kZTogXCJSZXNvdXJjZVJldHJpZXZhbFwiLFxyXG4gICAgICAgIG5hbWU6IFwi6LWE5rqQ5qOA57SiXCJcclxuICAgIH0sXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzOiB7XHJcbiAgICAgICAgY29kZTogXCJJbnRlbGxpZ2VudEFuYWx5c2lzXCIsXHJcbiAgICAgICAgbmFtZTogXCLmmbrog73liIbmnpBcIlxyXG4gICAgfSxcclxuICAgIER5bmFtaUNvbnRyb2w6IHtcclxuICAgICAgICBjb2RlOiBcIkR5bmFtaUNvbnRyb2xcIixcclxuICAgICAgICBuYW1lOiBcIuinhuWbvueri+aWuVwiXHJcbiAgICB9LFxyXG4gICAgTWFpbnRhaW46IHtcclxuICAgICAgICBjb2RlOiBcIk1haW50YWluXCIsXHJcbiAgICAgICAgbmFtZTogXCLov5Dnu7TnrqHnkIZcIlxyXG4gICAgfSxcclxuICAgIEJhc2VDb25maWc6IHtcclxuICAgICAgICBjb2RlOiBcIkJhc2VDb25maWdcIixcclxuICAgICAgICBuYW1lOiBcIumFjee9rueuoeeQhlwiXHJcbiAgICB9LFxyXG4gICAgVG9vbE9wdGlvbjoge1xyXG4gICAgICAgIGNvZGU6IFwiVG9vbE9wdGlvblwiLFxyXG4gICAgICAgIG5hbWU6IFwi6YCJ6aG5XCJcclxuICAgIH0sXHJcbiAgICBNeUNvbGxlY3Q6IHtcclxuICAgICAgICBjb2RlOiBcIk15Q29sbGVjdFwiLFxyXG4gICAgICAgIG5hbWU6IFwi5oiR55qE5pS26JePXCJcclxuICAgIH0sXHJcbiAgICBNeUNoZWNrOiB7XHJcbiAgICAgICAgY29kZTogXCJNeUNoZWNrXCIsXHJcbiAgICAgICAgbmFtZTogXCLmiJHnmoTlrqHmoLhcIlxyXG4gICAgfSxcclxuICAgIE15UmVwb3J0OiB7XHJcbiAgICAgICAgY29kZTogXCJNeVJlcG9ydFwiLFxyXG4gICAgICAgIG5hbWU6IFwi5oiR55qE5oql6K2mXCJcclxuICAgIH1cclxufSJdfQ==
