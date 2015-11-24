var chai = require('chai'),
	expect = chai.expect,
	osrs = require('../index'),
	hiscore = osrs.hiscore;

describe('Hiscore API', function() {
	this.slow(800);

	it('can download standard hiscores', function(done) {
		hiscore.standard('king_karthas', function(err, data) {
			expect(err).to.be.a('null');
			expect(data).to.not.be.a('null');
			done();
		});
	});

	it('can download hiscores when username has a space', function(done) {
		hiscore.standard('king karthas', function(err, data) {
			expect(err).to.be.a('null');
			expect(data).to.not.be.a('null');
			done();
		});
	});

	it('parses hiscore data correctly', function(done) {
		hiscore.standard('king_karthas', function(err, data) {
			expect(err).to.be.a('null');
			expect(data['Overall'].level, 'overall level')
				.to.be.greaterThan(1450);
			expect(data['Overall'].rank, 'overall rank')
				.to.be.lessThan(100000);
			expect(data['Overall'].xp, 'overall xp')
				.to.be.greaterThan(30000000);
			done();
		});
	});

	it('throws an error when username does not exist', function(done) {
		var rsn = 'asdfj0r9bj';
		hiscore.standard(rsn, function(err, data) {
			expect(err).to.not.be.a('null');
			expect(err.message).to.equal('Player not found: ' + rsn);
			expect(data).to.be.a('undefined');
			done();
		});
	});

	it('can download ironman hiscores', function(done) {
		hiscore.ironman('lezley', function(err, data) {
			expect(err).to.be.a('null');
			expect(data).to.not.be.a('null');
			done();
		});
	});

	it('can download ultimate ironman hiscores', function(done) {
		hiscore.ultimate('lowlander', function(err, data) {
			expect(err).to.be.a('null');
			expect(data).to.not.be.a('null');
			done();
		});
	});

	it('can download deadman hiscores', function(done) {
		hiscore.deadman('iron hyger', function(err, data) {
			expect(err).to.be.a('null');
			expect(data).to.not.be.a('null');
			done();
		});
	});
});

