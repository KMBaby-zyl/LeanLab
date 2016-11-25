var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 



var DocumentSchema = new Schema({
    appId: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date},
    content: {type: String}
},{
    collection: 'app' 
});

DocumentSchema.plugin(BaseModel);

// TODO
// AppSchema.index({});

mongoose.model('Document', DocumentSchema);

