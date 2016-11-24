/**
 ** 给所有的 Model 扩展功能
 ** http://mongoosejs.com/docs/plugins.html
 **/
var tools = require('../common/tools');

module.exports = function (schema) {
    schema.methods.createAt_ago = function () {
        return tools.formatDate(this.createAt, true);
    };
    
    schema.methods.updateAt_ago = function () {
        return tools.formatDate(this.updateAt, true);
    };
};
