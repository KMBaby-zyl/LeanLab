import Router from 'koa-router';
const router = new Router({
    prefix: '/'
});

router.all('*', function* (next){
    this.render('./login/index', {
        page_tag: 'login',
        name: '123'
    });
});


export default router;
