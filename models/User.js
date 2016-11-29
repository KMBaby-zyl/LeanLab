var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId; 


var UserSchema = new Schema({
    username: {type: String, required: true},
    pwd: {type: String, required: true},
    phone: {type: Number},
    email: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    accessToken: {type: String, required: true}
}, {
    collection: 'user' 
});


UserSchema.plugin(BaseModel);

// TODO
//AppSchema.index({});

mongoose.model('User', UserSchema);

