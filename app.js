import koa from 'koa';
//import session from 'koa-session';

let app = koa();

import auth from './middlewares/auth';

// router
import Api from './Api/router';

var CONFIG = {
    key: 'leanlab', // [>* (string) cookie key (default is koa:sess) <]
    maxAge: 86400000, //[>* (number) maxAge in ms (default is 1 days) <]
    overwrite: true, //[>* (boolean) can overwrite or not (default true) <]
    httpOnly: true, //[>* (boolean) httpOnly or not (default true) <]
    signed: true, //[>* (boolean) signed or not (default true) <]
};

//yield var a;
app.keys = ['some secret hurr']
//app.use(session(CONFIG, app))

app.use(function* (next){
    this.locals = {};
    yield next;
});

app.use(auth.authUser);
app.use(Api.routes());
app.use(function* (){
    this.body = 'Hello World 2';
});


app.listen(3000);

