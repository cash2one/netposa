define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemLog = (function () {
        function SystemLog() {
        }
        return SystemLog;
    }());
    exports.SystemLog = SystemLog;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9TeXN0ZW1Mb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0NBO1FBQUE7UUE2QkEsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0E3QkEsQUE2QkMsSUFBQTtJQTdCWSw4QkFBUyIsImZpbGUiOiJjb3JlL2VudGl0eS9TeXN0ZW1Mb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIOWumuS5ieS4gOS4quaOpeWPoywg5Zug5Li655WM6Z2i5LiK5L2/55So5pe2LCDmnInkupvlj4LmlbDlj6/loavlj6/kuI3loassIOS4uuS6hnRz5Zyo6Z2e5b+F5aGr55qE5oOF5Ya15LiL5LiN5oqx6ZSZLCDkuJTkuI3lvbHlk43kuJrliqHku6PnoIHnmoTmg4XlhrXkuIssIOWcqOi/memHjOWinuWKoOS4gOS4qklTeXN0ZW1Mb2dcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5c3RlbUxvZ3tcclxuICAgIC8v57yW5Y+3XHJcbiAgICBJRD86IHN0cmluZztcclxuICAgIC8v5pON5L2c55So5oi3SWRcclxuICAgIE9wZXJhdG9yVXNlcj86c3RyaW5nO1xyXG4gICAgLy/mk43kvZxJcFxyXG4gICAgT3BlcmF0b3JJUD86c3RyaW5nO1xyXG4gICAgLy/mk43kvZzmqKHlnZdcclxuICAgIE9wZXJNb2R1bGU/OnN0cmluZztcclxuICAgIC8v5LqM57qn5pON5L2c5qih5Z2XXHJcbiAgICBPcGVyU2Vjb25kTW9kdWxlPzpzdHJpbmc7XHJcbiAgICAvL+S4iee6p+WKn+iDvVxyXG4gICAgT3BlclRoaXJkTW9kdWxlPzpzdHJpbmc7XHJcbiAgICAvL+aTjeS9nOaXtumXtFxyXG4gICAgT3BlcmF0b3JUaW1lPzpzdHJpbmc7XHJcbiAgICAvL+ivpuaDhVxyXG4gICAgRGVzY3JwdGlvbj86c3RyaW5nO1xyXG4gICAgLy/liqjkvZznsbvlnotcclxuICAgIEFjdGlvblR5cGU/OnN0cmluZztcclxuICAgIC8v5a+56LGh57G75Z6LXHJcbiAgICBPYmplY3RUeXBlPzpzdHJpbmc7XHJcbiAgICAvL+WvueixoUlkXHJcbiAgICBPYmplY3RJRD86c3RyaW5nO1xyXG4gICAgLy/lr7nosaHlkI3np7BcclxuICAgIE9iamVjdE5hbWU/OnN0cmluZztcclxuICAgIC8v6K+35rGC6L+U5Zue5YC8XHJcbiAgICBPcGVyUmVzdWx0PzpzdHJpbmc7XHJcbiAgICAvL+aJqeWxleWtl+autVxyXG4gICAgRXh0PzpzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN5c3RlbUxvZyBpbXBsZW1lbnRzIElTeXN0ZW1Mb2d7XHJcbiAgICAvL+e8luWPt1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIC8v5pON5L2c55So5oi3SWRcclxuICAgIE9wZXJhdG9yVXNlcjpzdHJpbmc7XHJcbiAgICAvL+aTjeS9nElwXHJcbiAgICBPcGVyYXRvcklQOnN0cmluZztcclxuICAgIC8v5pON5L2c5qih5Z2XXHJcbiAgICBPcGVyTW9kdWxlOnN0cmluZztcclxuICAgIC8v5LqM57qn5pON5L2c5qih5Z2XXHJcbiAgICBPcGVyU2Vjb25kTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAvL+S4iee6p+WKn+iDvVxyXG4gICAgT3BlclRoaXJkTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAvL+aTjeS9nOaXtumXtFxyXG4gICAgT3BlcmF0b3JUaW1lOnN0cmluZztcclxuICAgIC8v6K+m5oOFXHJcbiAgICBEZXNjcnB0aW9uOnN0cmluZztcclxuICAgIC8v5Yqo5L2c57G75Z6LXHJcbiAgICBBY3Rpb25UeXBlOnN0cmluZztcclxuICAgIC8v5a+56LGh57G75Z6LXHJcbiAgICBPYmplY3RUeXBlOnN0cmluZztcclxuICAgIC8v5a+56LGhSWRcclxuICAgIE9iamVjdElEOnN0cmluZztcclxuICAgIC8v5a+56LGh5ZCN56ewXHJcbiAgICBPYmplY3ROYW1lOnN0cmluZztcclxuICAgIC8v6K+35rGC6L+U5Zue5YC8XHJcbiAgICBPcGVyUmVzdWx0Pzogc3RyaW5nO1xyXG4gICAgLy/mianlsZXlrZfmrrVcclxuICAgIEV4dDpzdHJpbmc7XHJcbn1cclxuIl19
