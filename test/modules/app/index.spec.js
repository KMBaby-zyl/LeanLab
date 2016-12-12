import App from '../../../Api/app';
import User from '../../../Api/user';


describe('App', function() {

    beforeEach(function* (done) {
        var self = this;
        let name = 'test';
        let user = yield User.getUserByName(this, name);
        self.request = {session: {
            user: user
        }};

    });


    it('should create without error', function* () {
        let name = 'test1';
        let app = yield App.createApp(this, name);
        this.app = app.appId;

        let nName = 'test_new';
        let up = yield App.update(this, this.app._id, {name: nName});

        let de = yield App.deleteApp(this, this.app._id);
        expect(app.name).toEqual(name);
    
        expect(up.ok).toEqual(1);

        expect(de.result.ok).toEqual(1);
    });

    describe('#find by user', function() {
        it('should create without error', function* () {
            let userId = this.request.session.user._id;
            let name = 'test';
            let app = yield App.getAppsByUser(this, userId);
            expect(app[0].name).toEqual(name);
        });
    });

});
