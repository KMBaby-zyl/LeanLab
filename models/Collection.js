var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var CollectionSchema = new Schema({
    appId: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    name: {type: String}
},{
    collection: 'collections' 
});

CollectionSchema.plugin(BaseModel);

// TODO
// AppSchema.index({});

mongoose.model('Collection', CollectionSchema);

