

exports.login = function* (next){
    this.render('./login/index', {
        page_tag: 'login',
    });
}
