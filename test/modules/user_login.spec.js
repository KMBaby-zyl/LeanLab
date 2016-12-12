import User from '../../Api/user';

describe('User', function() {
    describe('#login()', function() {
        it('should save without error', function* () {
            let name = 'test';
            let pwd = 'test';
            let user = yield User.getUserByName(this, name);
            expect(user.pwd).toEqual(pwd);
        });
    });
});
