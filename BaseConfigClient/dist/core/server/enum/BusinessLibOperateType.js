define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BusinessLibOperateType = {
        Search: { value: "Search", text: "查看人员" },
        Update: { value: "Update", text: "人员操作" },
        Export: { value: "Export", text: "导出人员" },
        Name: { value: "Name", text: "姓名脱敏" },
        NamePart: { value: "Name.Part", text: "姓名脱敏:部分" },
        NameNone: { value: "Name.None", text: "姓名脱敏:全部" },
        IdCard: { value: "IdCard", text: "身份证脱敏" },
        IdCardPart: { value: "IdCard.Part", text: "身份证脱敏:部分" },
        IdCardNone: { value: "IdCard.None", text: "身份证脱敏:全部" }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9lbnVtL0J1c2luZXNzTGliT3BlcmF0ZVR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTWEsUUFBQSxzQkFBc0IsR0FBaUQ7UUFFaEYsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDO1FBQ3ZDLE1BQU0sRUFBRyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQztRQUN4QyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUM7UUFHdkMsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDO1FBRW5DLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUMvQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7UUFFL0MsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO1FBRXhDLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQztRQUNwRCxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7S0FDdkQsQ0FBQyIsImZpbGUiOiJjb3JlL3NlcnZlci9lbnVtL0J1c2luZXNzTGliT3BlcmF0ZVR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiDkurrlg4/lupPmk43kvZznsbvlnovmnprkuL5cclxuICogQHRpbWU6IDIwMTctMDYtMDUgMTk6MjM6MDVcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmV4cG9ydCBjb25zdCBCdXNpbmVzc0xpYk9wZXJhdGVUeXBlOntba2V5OiBzdHJpbmddOiB7dmFsdWU6c3RyaW5nLCB0ZXh0OnN0cmluZ319ICA9IHtcclxuXHJcbiAgICBTZWFyY2g6IHt2YWx1ZTogXCJTZWFyY2hcIiwgdGV4dDogXCLmn6XnnIvkurrlkZhcIn0sXHJcbiAgICBVcGRhdGUgOiB7dmFsdWU6IFwiVXBkYXRlXCIsIHRleHQ6IFwi5Lq65ZGY5pON5L2cXCJ9LFxyXG4gICAgRXhwb3J0OiB7dmFsdWU6IFwiRXhwb3J0XCIsIHRleHQ6IFwi5a+85Ye65Lq65ZGYXCJ9LFxyXG5cclxuXHJcbiAgICBOYW1lOiB7dmFsdWU6IFwiTmFtZVwiLCB0ZXh0OiBcIuWnk+WQjeiEseaVj1wifSxcclxuXHJcbiAgICBOYW1lUGFydDoge3ZhbHVlOiBcIk5hbWUuUGFydFwiLCB0ZXh0OiBcIuWnk+WQjeiEseaVjzrpg6jliIZcIn0sXHJcbiAgICBOYW1lTm9uZToge3ZhbHVlOiBcIk5hbWUuTm9uZVwiLCB0ZXh0OiBcIuWnk+WQjeiEseaVjzrlhajpg6hcIn0sXHJcblxyXG4gICAgSWRDYXJkOiB7dmFsdWU6IFwiSWRDYXJkXCIsIHRleHQ6IFwi6Lqr5Lu96K+B6ISx5pWPXCJ9LFxyXG5cclxuICAgIElkQ2FyZFBhcnQ6IHt2YWx1ZTogXCJJZENhcmQuUGFydFwiLCB0ZXh0OiBcIui6q+S7veivgeiEseaVjzrpg6jliIZcIn0sXHJcbiAgICBJZENhcmROb25lOiB7dmFsdWU6IFwiSWRDYXJkLk5vbmVcIiwgdGV4dDogXCLouqvku73or4HohLHmlY865YWo6YOoXCJ9XHJcbn07XHJcblxyXG4iXX0=