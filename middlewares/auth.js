
exports.authUser = function* (next){
    let req = this.request;
    let res = this.response;

    console.log(this.session);
    this.locals.current_user = null;
        
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
    
    function* getUser(user){
        if (!user) {
            yield next;
        }
        
        user = this.locals.current_user = req.session.user = new UserModel(user);

        //if (config.admins.hasOwnProperty(user.loginname)) {
            //user.is_admin = true;
        //}
        
        yield next;
    };


    if(req.session.user){
        getUser(req.session.user);
    }else{
        let auth_token = req.signedCookies[config.auth_cookie_name];
        console.log(auth_token);
        if (!auth_token) {
           yield next; 
        }

        let auth = auth_token.split('$$$$');
        let user_id = auth[0];
        yield UserProxy.getUserById(user_id);
    }
    
}
