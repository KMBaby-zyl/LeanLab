var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var AppSchema = new Schema({
    appId: {type: String, required: true},
    appKey: {type: String, required: true},
    name: {type: String, required: true},
    masterKey: {type: String},
    userId: {type: Schema.Types.ObjectId, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
},{
    collection: 'app' 
});


AppSchema.plugin(BaseModel);
// TODO
//AppSchema.index({});

mongoose.model('App', AppSchema);

