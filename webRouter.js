import Router from 'koa-router';
const router = new Router({
    prefix: '/'
});

router.all('*', function* (){
    this.body = 'hello';
});


export default router;
