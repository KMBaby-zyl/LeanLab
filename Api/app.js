import CryptoJS from 'crypto-js';
import {App} from '../models/';



exports.createApp = function* (ctx, name){

    let appId = 1479976148232 + new Date().getTime(); 
    let appKey = CryptoJS.HmacSHA1('key', ''+appId).toString();

    let app = new App({
        appId: appId,
        appKey: appKey, 
        name: name,
        userId: ctx.request.session.user._id 
    });
    
    yield app.save();

    return app;
}

exports.deleteApp = function* (ctx, id){

    let app = App.findOne({
        _id: id 
    })
    .remove()
    .exec();
    

    return app;
}

exports.getAppsByUser = function(ctx, userId){
    
    let apps = App.find({
        userId: userId
    })
    .exec();

    return apps;
}

exports.getAppById = function(ctx, id){
    
    let app = App.findOne({
        _id: id 
    })
    .exec();

    return app;
}

exports.getAppByAppId = function(ctx, appId){
    
    let app = App.findOne({
        appId: appId 
    })
    .exec();

    return app;
}

exports.update = function(ctx, appId, options){
    
    let app = App.findOne({
        _id: appId 
    })
    .update(options)
    .exec();

    return app;
}
