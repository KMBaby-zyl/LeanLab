import {User} from '../models';
import uuid from 'node-uuid';

let regist = function* (username, pwd, phone, email){
    let user = new User({
        username: username,
        pwd: pwd,
        phone: phone,
        email: email,
        accessToken: uuid.v4()
    });    

    user.save();

    return user;
}

exports.regist = regist;

let login = function* (ctx, username, pwd){
    let user = yield User.findOne({username: username}).exec();
    ctx.cookies.set('accessToken', user.accessToken);
    ctx.cookies.set('username', user.username);
    return user.username;
}

exports.login = login;

let getUserByToken = function* (token){
    let user = yield User.findOne({accessToken: token}).exec();

    return user;
}

exports.getUserByToken = getUserByToken;
