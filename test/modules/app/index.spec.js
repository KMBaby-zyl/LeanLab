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
        let name = 'test';
        let app = yield App.createApp(this, name);
        expect(app.name).toEqual(name);
    });

    //describe('#delete', function() {
        //it('should create without error', function* () {
            //let name = 'test';
            //let app = yield App.createApp(this, name);
            //expect(app.name).toEqual(name);
        //});
    //});

    describe('#find by user', function() {
        it('should create without error', function* () {
            let userId = this.request.session.user._id;
            let name = 'test';
            let app = yield App.getAppsByUser(this, userId);
            this.appId = app[0].appId;
            expect(app[0].name).toEqual(name);
        });
    });

    describe('#update',  function() {
        it('should create without error', function* () {
            let appId = this.appId;
            let name = 'test';
            let app = yield App.update(this, appId, {name: name});
            expect(app.name).toEqual(name);
        });
    });
});
