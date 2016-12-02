import Router from 'koa-router';
import User from './controllers/user';
import App from './controllers/app';
import auth from './middlewares/auth';

const router = new Router({
});

router.all('/login', User.login);
router.all('/app', auth.userRequired, App.index);
router.all('/app/:id', auth.userRequired, App.detail);
router.all('/app/:id/data', auth.userRequired, App.detail);


export default router;
