import App from '../Api/app';
//import AppList from '../public/app/List';
import ReactDom from 'react-dom';

exports.index = function* (next){
    let userId = this.request.session.user._id;

    let apps = App.getAppsByUser(this, apps);
    
    //let html = ReactDom.renderToString(React.createElement(AppList, {
        //number: num
    //}));

    this.render('./app/index', {
        page_tag: 'app_index',
        //apps: apps,
        //list_html: html
    });
}
