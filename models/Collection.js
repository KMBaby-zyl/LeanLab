var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var CollectionSchema = new Schema({
    appId: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    name: {type: String, required: true},
    keys: {type: Array, default: []},
    ACL: {type: Object, required: true}
},{
    collection: 'collections' 
});

CollectionSchema.plugin(BaseModel);

// TODO
// AppSchema.index({});

mongoose.model('Collection', CollectionSchema);

