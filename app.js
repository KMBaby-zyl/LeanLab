import koa from 'koa';
let app = koa();


// router
import Api from './Api/router.js';

app.use(Api.routes());
app.use(function *(){
    this.body = 'Hello World 2';
});


app.listen(3000);

