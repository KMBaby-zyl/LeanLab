import App from '../Api/app';

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
        appname: '123',
        react_data: JSON.stringify(react_data)
    });
}
