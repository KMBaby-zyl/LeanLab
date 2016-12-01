import CryptoJS from 'crypto-js';
import {App} from '../models/';



exports.createApp = function(ctx, name){

    let appId = 1479976148232 + new Date().getTime(); 
    let appKey = CryptoJS.HmacSHA1('key', ''+appId).toString();

    let app = new App({
        appId: appId,
        appKey: appKey, 
        name: name,
        userId: ctx.request.session.user._id 
    });
    
    app.save();

    return app;
}

exports.getAppsByUser = function(ctx, userId){
    
    let apps = App.find({
        userId: userId
    });

    return apps;
}

