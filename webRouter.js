import Router from 'koa-router';
import User from './controllers/user';
import App from './controllers/app';
import auth from './middlewares/auth';

const router = new Router({
});

router.all('/login', User.login);
router.all('/app', auth.userRequired, App.index);


export default router;
