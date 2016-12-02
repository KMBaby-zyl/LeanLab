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
 * create collection
 *
 * */
router.post('/collection', function *(next){
    let body = this.request.body;
    let appId = body.appId;
    let ACL = body.ACL;
    let keys = body.keys;
    let name = body.name;

    let ans = Collection.create(this, appId, name, keys, ACL);
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

/*
 * create document
 * 
 * */
router.post('/document', auth.userRequired, function *(next){
    let body = this.request.body;
    let appId = body.appId;
    let appKey = body.appKey;
    let collectionId = body.collectionId;
    let document = JSON.stringify(body.document);
    

    let ans = Document.create(this, appId, collectionId, document);

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
    let document = body.document;

    let ans = yield Document.update(this, id, document);

    this.body = ans;
});



export default router;

