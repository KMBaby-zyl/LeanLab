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

let getUserByName = function* (ctx, username){
    let user = yield User.findOne({username: username}).exec();

    return user;
}

exports.getUserByName= getUserByName;

let getUserByToken = function* (token){
    let user = yield User.findOne({accessToken: token}).exec();

    return user;
}

exports.getUserByToken = getUserByToken;
