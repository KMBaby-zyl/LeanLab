import Router from 'koa-router';
const router = new Router();


import App from './app.js';
import User from './user.js';

/*
 * create an app
 * */
router.get('/create/:id', function *(next){
    
    let ans = App.createApp(); 

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

    let ans = User.regist(name, pwd);

    this.body = ans;
}); 

export default router;
