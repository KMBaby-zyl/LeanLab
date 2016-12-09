var assert = require('assert');
let expect = require('chai').expect;

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        expect(add(1, 1)).to.be.equal(2);
    });
});

describe('User', function() {
      describe('#save()', function() {
              it('should save without error', function(done) {
                        var user = new User('Luna');
                        user.save(done);
                      });
            });
});
