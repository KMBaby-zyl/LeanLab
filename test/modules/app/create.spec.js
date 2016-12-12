import App from '../../../Api/app';


describe('App', function() {

    beforeEach(function(done) {
        var self = this;
        console.log(self.session);
        done();
    });

    describe('#create()', function() {
        it('should create without error', function* () {
            let name = 'test';
            let app = yield App.createApp(this, name);
            expect(app.name).toEqual(name);
        });
    });

    describe('#delete', function() {
        it('should create without error', function* () {
            let name = 'test';
            let app = yield App.createApp(this, name);
            expect(app.name).toEqual(name);
        });
    });

    describe('#find by user', function() {
        it('should create without error', function* () {
            let userId = 'test';
            let name = 'test';
            let app = yield App.getAppsByUser(this, userId);
            expect(app[0].name).toEqual(name);
        });
    });

    describe('#update',  function() {
        it('should create without error', function* () {
            let appId = 'test';
            let name = 'test';
            let app = yield App.update(this, appId, {name: name});
            expect(app.name).toEqual(name);
        });
    });
});
