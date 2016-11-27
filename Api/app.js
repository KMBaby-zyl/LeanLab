import CryptoJS from 'crypto-js';
import {App} from '../models/';



let createApp = function(ctx, name){

    let appId = 1479976148232 + new Date().getTime(); 
    let appKey = CryptoJS.HmacSHA1('key', ''+appId).toString();

    var app = new App({
        appId: appId,
        appKey: appKey, 
        name: name,
        userId: ctx.request.session.user._id 
    });
    
    app.save();

    return app;
}

exports.createApp = createApp;
