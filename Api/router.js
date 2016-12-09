import Router from 'koa-router';
import consts from '../const.js';
const router = new Router({
    prefix: '/api'
});

import App from './app.js';
import User from './user.js';
import Document from './document.js';
import Collection from './collection.js';
import auth from '../middlewares/auth';

router.use(function* (next){
    let ctx = this;
    this.set('Access-Control-Allow-Origin', '*');
    this.ans = {
        status: 1
    };
    this.setError = function(errorCode, errorMessage='系统错误'){
        ctx.ans.status = -1;
        ctx.ans.errorCode = errorCode;
        ctx.ans.errorMessage = errorMessage;
    }

    this.body = this.ans;
    yield next;
});

/*
 * create an app
 * */
router.post('/app', auth.userRequired, function *(next){
    let body = this.request.body; 
    let name = body.name;

    let ans = App.createApp(this, name); 

    this.body = ans;
});

/*
 * update an app
 * */
router.put('/app', auth.userRequired, function *(next){
    let body = this.request.body; 
    let name = body.name;
    let _id = body._id;

    let ans = App.update(this, _id, {name: name}); 

    this.body = ans;
});

/*
 * user regist
 *
 * */
router.post('/user', function *(next){
    let body = this.request.body;
    let name = body.name;
    let pwd = body.pwd;

    let ans = yield User.regist(name, pwd);

    this.body = ans;
}); 

/*
 * user login 
 *
 * */
router.post('/user/login', function *(next){
    let body = this.request.body;
    let name = body.name;
    let pwd = body.pwd;

    let user = yield User.getUserByName(this, name, pwd);

    // 用户不存在
    if(!user){
        this.setError(consts.NO_USER, '找不到该用户');
        return ;
    }

    // 密码错误
    if(user.pwd != pwd){
        this.setError(consts.PASSWORD_ERROR, '密码错误');
        return ;
    }

    this.cookies.set('accessToken', user.accessToken);
    this.cookies.set('username', user.username);

    this.ans.data = '登录成功';
    this.body = this.ans;
}); 

/*
 * Appkey loginIn
 *
 * */
router.post('/checkApp', function *(next){
    let body = this.request.body;
    let appId = body.appId;
    let appKey = body.appKey;

    let app = yield App.getAppByAppId(this, appId);

    // appId错误 
    if(!app){
        this.setError(consts.NO_APPID, 'appId不存在');
        return ;
    }

    // appKey错误 
    if(app.appKey != appKey){
        this.setError(consts.APPKEY_ERROR, 'appKey不正确');
        return ;
    }

    this.ans.data = 'appId 通过验证';
    this.body = this.ans;
}); 

/*
 * create collection
 *
 * */
router.post('/collection', function *(next){
    let body = this.request.body;
    let appId = body.appId;
    let ACL = body.ACL || null;
    let keys = body.keys || null; 
    let name = body.name;

    let ans = yield Collection.create(this, appId, name, keys, ACL);
    this.body = ans;
});


/*
 * update collection
 *
 * */
router.put('/collection', function *(next){
    let body = this.request.body;
    let collectionId = body.collectionId;
    let ACL = body.ACL;
    let keys = body.keys;
    let name = body.name;

    let ans = yield Collection.update(this, collectionId, name, keys, ACL);
    this.body = ans;
});

/*
 * delete collection
 *
 * */
router.delete('/collection', function *(next){
    let body = this.request.body;
    let collectionId = body.collectionId;

    let ans = yield Collection.deleteById(this, collectionId);

    this.body = ans;

});

/*****************document 暂时只有appuser可以操作*************************/
/*
 * create document
 * 
 * */

router.options('/document', function *(next){
    let res = this.response;
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.set('Access-Control-Max-Age', 1000);
    this.set('Access-Control-Allow-Headers', 'RIDER-APPID, RIDER-APPKEY, RIDER-APPUSER');
});

router.post('/document', auth.userRequired, function *(next){
    let req = this.request;
    let body = req.body;

    let appuser = req.session.appuser;
    let appId = appuser.app_id;
    let appKey = appuser.appKey;

    let name = body.collection;
    let collection = yield Collection.getByName(this, appId, name);
    let collectionId = collection._id;
    let docbody = body.body;
    
    let ans = yield Document.create(this, appId, collectionId, docbody);

    this.body = ans; 
});

/*
 * query document
 *
 * */
router.get('/document/:collectionId/:options', auth.userRequired, function *(next){
    let collectionId = this.params.collectionId;
    let options = this.params.options;

    let ans = yield Document.query(this, collectionId, options);

    this.body = ans;
});

/*
 * delete document by id
 *
 * */
router.delete('/document', auth.userRequired, function *(next){
    let body = this.request.body;
    let id = body.collectionId;
    
    let ans = yield Document.deleteById(this, id);

    this.body = ans;
});

/*
 * delete document by options
 *
 * */
router.delete('/document', auth.userRequired, function *(next){
    let body = this.request.body;
    let collectionId = body.collectionId;
    let options = body.options;
    
    let ans = yield Document.deleteByOptions(this, collectionId, options);

    this.body = ans;
});

/*
 * update document by options
 *
 * */
router.put('/document', auth.userRequired, function* (next){
    let body = this.request.body;
    let id = body.documentId;
    let docbody = body.body;

    let ans = yield Document.update(this, id, docbody);

    this.body = ans;
});



export default router;

