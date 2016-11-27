import Router from 'koa-router';
const router = new Router();


import App from './app.js';
import User from './user.js';
import auth from '../middlewares/auth';

/*
 * create an app
 * */
router.get('/create/:id', auth.userRequired, function *(next){
     
    //let ans = App.createApp(); 

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

    console.log('insert');

    this.body = 'ss';
});







export default router;

