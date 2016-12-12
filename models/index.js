var mongoose = require('mongoose');
import config from '../config';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongodburl, {
    server: {poolSize: 20}
}, function(err){
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

require('./App');
require('./Collection');
require('./Document');
require('./User');

exports.App = mongoose.model('App');
exports.Collection = mongoose.model('Collection');
exports.Document = mongoose.model('Document');
exports.User = mongoose.model('User');

