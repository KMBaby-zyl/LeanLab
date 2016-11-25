var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var UserSchema = new Schema({
    username: {type: String},
    pwd: {type: String},
    phone: {type: Number},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date},
}, {
    collection: 'user' 
});


UserSchema.plugin(BaseModel);

// TODO
//AppSchema.index({});

mongoose.model('User', UserSchema);

