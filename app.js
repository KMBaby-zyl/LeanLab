import koa from 'koa';
//import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import auth from './middlewares/auth';
import Pug from 'koa-pug';

// router
import Api from './Api/router';
import webRouter from './webRouter';


let app = koa();
let CONFIG = {
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
    this.request.session = {};
    yield next;
});

const pug = new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    locals: {}, //global_locals_for_all_pages,
    basedir: './views/',
    helperPath: [
        { _: require('underscore') }
    ],
    app: app
});


app.use(auth.authUser);

app.use(bodyParser());

app.use(Api.routes());
app.use(webRouter.routes());


app.listen(3000);

