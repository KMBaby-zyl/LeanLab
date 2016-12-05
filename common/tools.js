//var bcrypt = require('bcryptjs');
var moment = require('moment');

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};

exports.validateId = function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

let isObject = function(val){
    return Object.prototype.toString.call(val) === "[object Object]";
}

exports.isObject = isObject;

let isString = function(val){
    return Object.prototype.toString.call(val) === "[object String]";
}

exports.isString = isString;

let isBoolean = function(val){
    return Object.prototype.toString.call(val) === "[object Boolean]";
}

exports.isBoolean = isBoolean;

let isNumber = function(val){
    return Object.prototype.toString.call(val) === "[object Number]";
}

exports.isNumber = isNumber;


let toString = function(obj){
    if( isString(obj) ) return obj;
    if( isBoolean(obj) ) return obj.toString();
    if( isNumber(obj) ) return ('' + obj);

    return JSON.stringify(obj);
}

exports.toString = toString;

//exports.bhash = function (str, callback) {
    //bcrypt.hash(str, 10, callback);
//};

//exports.bcompare = function (str, hash, callback) {
    //bcrypt.compare(str, hash, callback);
//};
