import {Document} from '../models/';




let insert = function(ctx, appId, content){

    let doc = new Document({
        appId: appId,
        content: content
    });

    doc.save();

    return doc;
}

exports.insert = insert;



let query = function(ctx, appId, options){
        
    let docs = Document.find({
        appId: appId,
        content: options 
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
        content: options
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








