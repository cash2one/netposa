"use strict";
exports.__esModule = true;
var MatchingType = (function () {
    function MatchingType() {
    }
    //等于
    MatchingType.Equal = 'Equal';
    //不等于
    MatchingType.UnEqual = 'UnEqual';
    //大于
    MatchingType.Greater = 'Greater';
    //大于等于
    MatchingType.GreaterEqual = 'GreaterEqual';
    //小于
    MatchingType.Less = 'Less';
    //小于等于
    MatchingType.LessEqual = 'LessEqual';
    //Like
    MatchingType.Like = 'Like';
    //Include
    MatchingType.Include = 'Include';
    return MatchingType;
}());
exports["default"] = MatchingType;
