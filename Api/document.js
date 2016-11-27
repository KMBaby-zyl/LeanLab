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
