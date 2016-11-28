import Router from 'koa-router';
const router = new Router();


import App from './app.js';
import User from './user.js';
import Document from './document.js';
import auth from '../middlewares/auth';

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


router.get('/insert/:app/:json', auth.userRequired, function *(next){
    let appId = this.params.app;
    let json = this.params.json;
    
    let ans = Document.insert(this, appId, json);

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






export default router;

