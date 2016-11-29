import Router from 'koa-router';
const router = new Router({
    prefix: '/api'
});

import App from './app.js';
import User from './user.js';
import Document from './document.js';
import Collection from './collection.js';
import auth from '../middlewares/auth';


router.use(function* (next){
    this.set('Access-Control-Allow-Origin', '*');
    yield next;
});

/*
 * create an app
 * */
router.get('/create/:name', auth.userRequired, function *(next){
     
    let ans = App.createApp(this, this.params.name); 

    this.body = ans;
});

/*
 * user regist
 *
 * */
router.get('/user/regist/:name/:pwd', function *(next){
    console.log('regist');
    let name = this.params.name;
    let pwd = this.params.pwd;

    let ans = yield User.regist(name, pwd);

    this.body = ans;
}); 

/*
 * user login 
 *
 * */
router.get('/user/login/:name/:pwd', function *(next){
    console.log('login');
    let name = this.params.name;
    let pwd = this.params.pwd;

    let ans = yield User.login(this, name, pwd);

    this.body = ans;
}); 

/*
 * create app
 *
 * */
router.get('/insert/:app/:json', auth.userRequired, function *(next){
    let appId = this.params.app;
    let json = this.params.json;
    
    let ans = Document.insert(this, appId, json);

    this.body = ans; 
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
    console.log(body);

    let ans = yield Collection.deleteById(this, collectionId);

    this.body = ans;

});


router.post('/create', function *(next){
    let body = this.request.body;
    let appId = body.appId;
    let appKey = body.appKey;
    let collection = body.collection;
    let document = JSON.stringify(body.document);
    
    let ans = Document.create(this, appId, document);

    this.body = ans; 
});


router.get('/find/:app/:options', auth.userRequired, function *(next){
    let appId = this.params.app;
    let options = this.params.options;

    let ans = yield Document.query(this, appId, options);

    this.body = ans;
});

router.get('/delete/:id', auth.userRequired, function *(next){
    let id = this.params.id;
    
    let ans = yield Document.deleteById(this, id);

    this.body = ans;
});


router.get('/delete/:app/:options', auth.userRequired, function *(next){
    let appId = this.params.app;
    let options = this.params.options;
    
    let ans = yield Document.deleteByOptions(this, appId, options);

    this.body = ans;
});

router.get('/update/:id/:options', auth.userRequired, function* (next){
    let id = this.params.id;
    let options = this.params.options;

    let ans = yield Document.update(this, id, options);

    this.body = ans;
});



export default router;

