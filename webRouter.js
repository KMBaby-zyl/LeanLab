import Router from 'koa-router';
const router = new Router({
    prefix: '/'
});

router.all('*', function* (next){
    this.render('./login/index', {name: '123'});
});


export default router;
