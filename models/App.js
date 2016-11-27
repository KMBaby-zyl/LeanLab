var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var AppSchema = new Schema({
    appId: {type: String},
    appKey: {type: String},
    name: {type: String},
    masterKey: {type: String},
    userId: {type: Schema.Types.ObjectId},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
},{
    collection: 'app' 
});


AppSchema.plugin(BaseModel);
// TODO
//AppSchema.index({});

mongoose.model('App', AppSchema);

