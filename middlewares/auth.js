import config from '../config';
import uuid from 'node-uuid';
import UserP from '../api/user';
import App from '../api/App';

exports.authUser = function* (next){
    let req = this.request;
    let res = this.response;

    let ctx = this;
    req.session.user= null;
        
    // 如果是debug模式， 则user为admin
    //if (config.debug && req.cookies['mock_user']) {
        //var mockUser = JSON.parse(req.cookies['mock_user']);
        //req.session.user = new UserModel(mockUser);
        //if (mockUser.is_admin) {
            //req.session.user.is_admin = true;
        //}
        //return next(); 
    //}
    
    if(req){
            
    }
    
    function* getUser(token){
        if (!token) {
            yield next;
        }
        
        let user = req.session.user = yield UserP.getUserByToken(token);

        yield next;
    };

    let accessToken = this.cookies.get('accessToken');

    if(accessToken){
        yield getUser(accessToken);
    }

    yield next;
    
}

/**
 ** 需要登录
 **/
exports.userRequired = function* (next) {
    let req = this.request;
    let res = this.response;


    // 后端登录
    if (req.session && req.session.user && req.session.user._id) {
        yield next;
    }else{
        let appId = this.get('RIDER-APPID');
        let appKey = this.get('RIDER-APPKEY');
        let appUser = this.get('RIDER-APPUSER') || 0;
        let app = yield App.getAppByAppId(this, appId);
        
        if(app.appKey === appKey){
            req.session.appuser = {
                appId: appId,
                appKey: appKey,
                app_id: app._id,
                appUserId: appUser
            }
            yield next;
        }else{
            return res.status = 403;
        }
    }
};




