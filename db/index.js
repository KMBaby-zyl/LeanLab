//import monk from 'monk';
//import config from '../config';

//let db = monk(config.mongodburl);


var mongoose = require('mongoose');
import config from '../config';


mongoose.connect('mongodb://' + config.mongodburl);
let db = mongoose.connection;

module.exports = db;
