import {User} from '../models';


let regist = function(username, pwd, phone){
    let user = new User({
        username: username,
        pwd: pwd,
        phone: phone
    });    

    user.save();

    return user;
}


exports.regist = regist;
