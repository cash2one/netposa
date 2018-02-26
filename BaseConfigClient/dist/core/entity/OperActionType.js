define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperActionType = {
        Add: {
            code: "Add",
            name: "新增"
        },
        Modify: {
            code: "Modify",
            name: "修改"
        },
        Del: {
            code: "Del",
            name: "删除"
        },
        BatchDel: {
            code: "BatchDel",
            name: "批量删除"
        },
        View: {
            code: "View",
            name: "查看"
        },
        Query: {
            code: "Query",
            name: "查询"
        },
        Sync: {
            code: "Sync",
            name: "设备同步"
        },
        Config: {
            code: "Config",
            name: "配置"
        },
        BatchConfig: {
            code: "BatchConfig",
            name: "批量配置"
        },
        Enable: {
            code: "Enable",
            name: "启用"
        },
        Disable: {
            code: "Disable",
            name: "禁用"
        },
        StartTask: {
            code: "StartTask",
            name: "启动任务"
        },
        BatchStartTask: {
            code: "BatchStartTask",
            name: "批量开启任务"
        },
        StopTask: {
            code: "StopTask",
            name: "暂停任务"
        },
        BatchStopTask: {
            code: "BatchStopTask",
            name: "批量停止任务"
        },
        Export: {
            code: "Export",
            name: "导出"
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBYSxRQUFBLGNBQWMsR0FBRztRQUM3QixHQUFHLEVBQUc7WUFDTCxJQUFJLEVBQUcsS0FBSztZQUNaLElBQUksRUFBRyxJQUFJO1NBQ1g7UUFDRCxNQUFNLEVBQUc7WUFDUixJQUFJLEVBQUcsUUFBUTtZQUNmLElBQUksRUFBRyxJQUFJO1NBQ1g7UUFDRCxHQUFHLEVBQUc7WUFDTCxJQUFJLEVBQUcsS0FBSztZQUNaLElBQUksRUFBRyxJQUFJO1NBQ1g7UUFDRCxRQUFRLEVBQUc7WUFDVixJQUFJLEVBQUcsVUFBVTtZQUNqQixJQUFJLEVBQUcsTUFBTTtTQUNiO1FBQ0QsSUFBSSxFQUFHO1lBQ04sSUFBSSxFQUFHLE1BQU07WUFDYixJQUFJLEVBQUcsSUFBSTtTQUNYO1FBQ0QsS0FBSyxFQUFHO1lBQ1AsSUFBSSxFQUFHLE9BQU87WUFDZCxJQUFJLEVBQUcsSUFBSTtTQUNYO1FBQ0QsSUFBSSxFQUFHO1lBQ04sSUFBSSxFQUFHLE1BQU07WUFDYixJQUFJLEVBQUcsTUFBTTtTQUNiO1FBQ0QsTUFBTSxFQUFHO1lBQ1IsSUFBSSxFQUFHLFFBQVE7WUFDZixJQUFJLEVBQUcsSUFBSTtTQUNYO1FBQ0QsV0FBVyxFQUFHO1lBQ2IsSUFBSSxFQUFHLGFBQWE7WUFDcEIsSUFBSSxFQUFHLE1BQU07U0FDYjtRQUNELE1BQU0sRUFBRztZQUNSLElBQUksRUFBRyxRQUFRO1lBQ2YsSUFBSSxFQUFHLElBQUk7U0FDWDtRQUNELE9BQU8sRUFBRztZQUNULElBQUksRUFBRyxTQUFTO1lBQ2hCLElBQUksRUFBRyxJQUFJO1NBQ1g7UUFDRCxTQUFTLEVBQUc7WUFDWCxJQUFJLEVBQUcsV0FBVztZQUNsQixJQUFJLEVBQUcsTUFBTTtTQUNiO1FBQ0QsY0FBYyxFQUFHO1lBQ2hCLElBQUksRUFBRyxnQkFBZ0I7WUFDdkIsSUFBSSxFQUFHLFFBQVE7U0FDZjtRQUNELFFBQVEsRUFBRztZQUNWLElBQUksRUFBRyxVQUFVO1lBQ2pCLElBQUksRUFBRyxNQUFNO1NBQ2I7UUFDRCxhQUFhLEVBQUc7WUFDZixJQUFJLEVBQUcsZUFBZTtZQUN0QixJQUFJLEVBQUcsUUFBUTtTQUNmO1FBQ0QsTUFBTSxFQUFHO1lBQ1IsSUFBSSxFQUFHLFFBQVE7WUFDZixJQUFJLEVBQUcsSUFBSTtTQUNYO0tBQ0QsQ0FBQSIsImZpbGUiOiJjb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBPcGVyQWN0aW9uVHlwZSA9IHtcclxuXHRBZGQgOiB7XHJcblx0XHRjb2RlIDogXCJBZGRcIixcclxuXHRcdG5hbWUgOiBcIuaWsOWinlwiXHJcblx0fSxcclxuXHRNb2RpZnkgOiB7XHJcblx0XHRjb2RlIDogXCJNb2RpZnlcIixcclxuXHRcdG5hbWUgOiBcIuS/ruaUuVwiXHJcblx0fSxcclxuXHREZWwgOiB7XHJcblx0XHRjb2RlIDogXCJEZWxcIixcclxuXHRcdG5hbWUgOiBcIuWIoOmZpFwiXHJcblx0fSxcclxuXHRCYXRjaERlbCA6IHtcclxuXHRcdGNvZGUgOiBcIkJhdGNoRGVsXCIsXHJcblx0XHRuYW1lIDogXCLmibnph4/liKDpmaRcIlxyXG5cdH0sXHJcblx0VmlldyA6IHtcclxuXHRcdGNvZGUgOiBcIlZpZXdcIixcclxuXHRcdG5hbWUgOiBcIuafpeeci1wiXHJcblx0fSxcclxuXHRRdWVyeSA6IHtcclxuXHRcdGNvZGUgOiBcIlF1ZXJ5XCIsXHJcblx0XHRuYW1lIDogXCLmn6Xor6JcIlxyXG5cdH0sXHJcblx0U3luYyA6IHtcclxuXHRcdGNvZGUgOiBcIlN5bmNcIixcclxuXHRcdG5hbWUgOiBcIuiuvuWkh+WQjOatpVwiXHJcblx0fSxcclxuXHRDb25maWcgOiB7XHJcblx0XHRjb2RlIDogXCJDb25maWdcIixcclxuXHRcdG5hbWUgOiBcIumFjee9rlwiXHJcblx0fSxcclxuXHRCYXRjaENvbmZpZyA6IHtcclxuXHRcdGNvZGUgOiBcIkJhdGNoQ29uZmlnXCIsXHJcblx0XHRuYW1lIDogXCLmibnph4/phY3nva5cIlxyXG5cdH0sXHJcblx0RW5hYmxlIDoge1xyXG5cdFx0Y29kZSA6IFwiRW5hYmxlXCIsXHJcblx0XHRuYW1lIDogXCLlkK/nlKhcIlxyXG5cdH0sXHJcblx0RGlzYWJsZSA6IHtcclxuXHRcdGNvZGUgOiBcIkRpc2FibGVcIixcclxuXHRcdG5hbWUgOiBcIuemgeeUqFwiXHJcblx0fSxcclxuXHRTdGFydFRhc2sgOiB7XHJcblx0XHRjb2RlIDogXCJTdGFydFRhc2tcIixcclxuXHRcdG5hbWUgOiBcIuWQr+WKqOS7u+WKoVwiXHJcblx0fSxcclxuXHRCYXRjaFN0YXJ0VGFzayA6IHtcclxuXHRcdGNvZGUgOiBcIkJhdGNoU3RhcnRUYXNrXCIsXHJcblx0XHRuYW1lIDogXCLmibnph4/lvIDlkK/ku7vliqFcIlxyXG5cdH0sXHJcblx0U3RvcFRhc2sgOiB7XHJcblx0XHRjb2RlIDogXCJTdG9wVGFza1wiLFxyXG5cdFx0bmFtZSA6IFwi5pqC5YGc5Lu75YqhXCJcclxuXHR9LFxyXG5cdEJhdGNoU3RvcFRhc2sgOiB7XHJcblx0XHRjb2RlIDogXCJCYXRjaFN0b3BUYXNrXCIsXHJcblx0XHRuYW1lIDogXCLmibnph4/lgZzmraLku7vliqFcIlxyXG5cdH0sXHJcblx0RXhwb3J0IDoge1xyXG5cdFx0Y29kZSA6IFwiRXhwb3J0XCIsXHJcblx0XHRuYW1lIDogXCLlr7zlh7pcIlxyXG5cdH1cclxufSJdfQ==
