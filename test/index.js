var chai = require('chai'),
    expect = chai.expect,
    hiscore = require('../index').hiscore,
    nock = require('nock');

describe('Mocked Hiscore API', function () {
    this.slow(100);
    var createNock = function (player) {
        return nock('http://services.runescape.com')
            .get('/m=hiscore_oldschool/index_lite.ws')
            .query({player: player});
    };

    it('can download standard hiscores', function (done) {
        var fakeApi = createNock('zezima').replyWithFile(200, __dirname + '/resources/hiscore.csv');
        hiscore.standard('zezima', function (err, data) {
            expect(err).to.be.a('null');
            expect(data).to.not.be.a('null');
            fakeApi.isDone();
            done();
        });
    });

    it('can download hiscores when username has a space', function (done) {
        var fakeApi = createNock('zezima_fan').replyWithFile(200, __dirname + '/resources/hiscore.csv');
        hiscore.standard('zezima fan', function (err, data) {
            expect(err).to.be.a('null');
            expect(data).to.not.be.a('null');
            fakeApi.isDone();
            done();
        });
    });

    it('parses hiscore data correctly', function (done) {
        var fakeApi = createNock('zezima').replyWithFile(200, __dirname + '/resources/hiscore.csv');
        hiscore.standard('zezima', function (err, data) {
            expect(err).to.be.a('null');
            expect(data['overall'].level, 'overall level').to.be.a('number');
            expect(data['overall'].level, 'overall level').to.equal(1474);
            expect(data['overall'].rank, 'overall rank').to.be.a('number');
            expect(data['overall'].rank, 'overall rank').to.equal(75593);
            expect(data['overall'].xp, 'overall xp').to.be.a('number');
            expect(data['overall'].xp, 'overall xp').to.equal(32472290);
            expect(data['woodcutting'].level, 'woodcutting level').to.be.a('number');
            expect(data['woodcutting'].level, 'woodcutting level').to.equal(96);
            expect(data['woodcutting'].rank, 'woodcutting rank').to.be.a('number');
            expect(data['woodcutting'].rank, 'woodcutting rank').to.equal(5866);
            expect(data['woodcutting'].xp, 'woodcutting xp').to.be.a('number');
            expect(data['woodcutting'].xp, 'woodcutting xp').to.equal(9938130);
            fakeApi.isDone();
            done();
        });
    });

    it('throws an error when username does not exist', function (done) {
        var fakeApi = createNock('zezima').reply(404);
        hiscore.standard('zezima', function (err, data) {
            expect(data).to.be.a('undefined');
            expect(err.message).to.equal('Player not found: zezima');
            fakeApi.isDone();
            done();
        });
    });

    it('does not blow up if server errors out', function(done) {
        var fakeApi = createNock('zezima').replyWithError('oh noes!');
        hiscore.standard('zezima', function(err, data) {
            expect(data).to.be.a('undefined');
            expect(err.message).to.contain('unknown error occurred');
            expect(err.message).to.contain('retrieve hiscores for zezima');
            expect(err.message).to.contain('Try again soon');
            fakeApi.isDone();
            done();
        });
    });

    it('does not blow up if server responds with nonsense', function(done) {
        var fakeApi = createNock('zezima').reply(200, 'this was unexpected');
        hiscore.standard('zezima', function(err, data) {
            expect(data).to.be.a('undefined');
            expect(err.message).to.contain('unknown error occurred while parsing');
            expect(err.message).to.contain('Try again soon');
            fakeApi.isDone();
            done();
        });
    });

    it('can communicate with Jagex servers', function(done) {
        this.slow(1000);
        nock.cleanAll();
        hiscore.standard('king_karthas', function(err, data) {
            expect(err).to.be.a('null');
            expect(data).to.not.be.a('null');
            done();
        });
    });
});
