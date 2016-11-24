var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var AppSchema = new Schema({
    appId: {type: String},
    appKey: {type: String},
    masterKey: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date},
},{
    collection: 'app' 
});


AppSchema.plugin(BaseModel);
// TODO
//AppSchema.index({});

mongoose.model('App', AppSchema);

