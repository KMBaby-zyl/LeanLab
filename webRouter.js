import Router from 'koa-router';
const router = new Router({
    prefix: '/'
});

router.all('*', function* (next){
    this.render('./login/index', {}, true);
});


export default router;
