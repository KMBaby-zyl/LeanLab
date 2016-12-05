import {Collection} from '../models/';
import utils from '../common/tools';

let create = function(ctx, appId, name, keys, ACL){

    if(!keys) keys = {};
    if(!ACL) ACL = { '*': { write: true, read: true}};


    keys = utils.toString(keys);
    ACL = utils.toString(ACL);

    let col = new Collection({
        appId: appId,
        name: name,
        keys: keys,
        ACL: ACL
    });
   
    col.save();

    return col;
}

exports.create = create;



let queryALl = function(ctx, appId){
        
    let cols = Collection.find({
        appId: appId
    })
    .exec();

    //let docs = Document.find().exec();
    return cols;
}


exports.queryAll = queryALl;


let update = function(ctx, collectionId, name, keys, ACL){

    let col = Collection.findOne({
        _id: collectionId
    })
    .update({
        keys: keys,
        name: name,
        ACL: ACL
    })
    .exec();


    return col;
}

exports.update = update;

let deleteById = function(ctx, collectionId){
    console.log(collectionId);

    let col = Collection.find({_id: collectionId}).remove().exec();

    return col;
}
exports.deleteById = deleteById;















































