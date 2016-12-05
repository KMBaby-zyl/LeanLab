import App from '../Api/app';
import Collection from '../Api/collection';

//router.all('/app', auth.userRequired, App.index);
exports.index = function* (next){
    let userId = this.request.session.user._id;

    let apps = yield App.getAppsByUser(this, userId);
    
    let react_data = {};
    react_data.AppList = {
        apps: apps,
    };

    this.render('./app/index', {
        page_tag: 'app_index',
        react_data: JSON.stringify(react_data)
    });
}


//router.all('/app/:id', auth.userRequired, App.detail);
exports.detail = function* (next){
    let appId = this.params.id;

    let app = yield App.getAppById(this, appId);

    let react_data = {
        Detail: {
            appId: appId,
            app: app
        }
    };

    this.render('./app/detail', {
        page_tag: 'app_detail',
        react_data: JSON.stringify(react_data)
    });
}

//router.all('/app/:id/data', auth.userRequired, App.data);
exports.data = function* (next){
    let appId = this.params.id;

    let collections = yield Collection.queryAll(this, appId); 

    let react_data = {
        Detail: {
            appId: appId,
            collections: collections
            //app: app
        }
    };

    this.render('./app/data', {
        page_tag: 'app_data',
        react_data: JSON.stringify(react_data)
    });
}






