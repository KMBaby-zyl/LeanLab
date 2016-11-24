import Router from 'koa-router';
import CryptoJS from 'crypto-js';
const router = new Router();
import {App} from '../models/';

router.get('/create',function *(next){
    
    let ans = '';

    
    let appId = 1479976148232 + new Date().getTime(); 
    let appKey = CryptoJS.HmacSHA1('key', ''+appId).toString();
    ans = 'appId:' + appId + ' appKey:' + appKey;

    var app = new App({
        appId: appId,
        appKey: appKey, 
    });
    
    app.save();

    this.body = ans;
});

export default router;
