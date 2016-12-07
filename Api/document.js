import {Document} from '../models/';

let create = function* (ctx, appId, collectionId, body){

    let doc = new Document({
        appId: appId,
        collectionId, collectionId,
        body: body 
    });

    yield doc.save();

    return doc;
}

exports.create = create;

let query = function(ctx, appId, options){
        
    let docs = Document.find({
        appId: appId,
        body: options 
    })
    .exec();

    //let docs = Document.find().exec();
    return docs;
}

exports.query = query;


let update = function(ctx, documentId, options){
    let docs = Document.findOne({
        _id: documentId
    })
    .update({content: options})
    .exec();


    return docs;
}

exports.update = update;


let deleteByOptions = function(ctx, appId, options){
    let docs = Document.find({
        appId: appId,
        body: options
    })
    .remove()
    .exec();
    
    return docs;
}

exports.deleteByOptions = deleteByOptions;


let deleteById = function(ctx, documentId){
    let docs = Document.find({_id: documentId}).remove().exec();

    return docs;
}
exports.deleteById = deleteById;








