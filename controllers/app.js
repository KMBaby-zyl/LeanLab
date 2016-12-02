import App from '../Api/app';
//import AppList from '../public/app/List';
//import ReactDom from 'react-dom/server';
//import React from 'react';

exports.index = function* (next){
    let userId = this.request.session.user._id;

    let apps = yield App.getAppsByUser(this, userId);
    
    let react_data = {};
    react_data.AppList = {
        apps: apps,
    };
    //let html = ReactDom.renderToString(React.createElement(AppList, react_data.AppList));

    this.render('./app/index', {
        page_tag: 'app_index',
        //list_html: html,
        react_data: JSON.stringify(react_data)
    });
}
