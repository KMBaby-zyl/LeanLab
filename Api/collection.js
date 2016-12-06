import {Collection} from '../models/';
import utils from '../common/tools';

let create = function* (ctx, appId, name, keys, ACL){

    if(!keys) keys = [] 
    if(!ACL) ACL = { '*': { write: true, read: true}};


    let col = new Collection({
        appId: appId,
        name: name,
        keys: keys,
        ACL: ACL
    });
   
    yield col.save();

    return col;
}

exports.create = create;



let queryALl = function* (ctx, appId){
        
    let cols = yield Collection.find({
        appId: appId
    })
    .lean()
    .exec();


    cols.forEach(function(item){
        let keyArr = [];
        keyArr.push('ObjectId');

        item.keys.map(function(i){
            keyArr.push(i.name);
        });
        keyArr.push('ACL');
        keyArr.push('createAt');
        keyArr.push('updateAt');
        item.keyArr = keyArr;
    });

    return cols;
}


exports.queryAll = queryALl;


let update = function(ctx, collectionId, name, keys, ACL){

    let ndata = {};
    name && (ndata.name = name);
    keys && (ndata.keys = keys);
    ACL && (ndata.ACL = ACL);

    let col = Collection.findOne({
        _id: collectionId
    })
    .update(ndata)
    .exec();


    return col;
}

exports.update = update;

let deleteById = function(ctx, collectionId){

    let col = Collection.find({_id: collectionId}).remove().exec();

    return col;
}
exports.deleteById = deleteById;















































