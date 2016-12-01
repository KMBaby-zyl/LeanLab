import App from '../Api/app';

exports.index = function* (next){
    let userId = this.request.session.user._id;

    let apps = App.getAppsByUser(this, apps);
    
    this.render('./app/index', {
        page_tag: 'app_index',
        apps: apps
    });
}
