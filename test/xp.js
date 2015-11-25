var chai = require('chai'),
    expect = chai.expect,
    xp = require('../index').xp;

describe('XP API', function () {
    this.slow(75);

    it('can calculate xp for level', function () {
		var levels = [1, 2, 5, 8, 15, 60, 70, 99];
		var xpForLevels = levels.map(function(level) {
			return {
				level: level,
				xp: xp.xpForLevel(level)
			};
		});

		var expectedXp = [
			0, //level 1
			83, //level 2
			388, //level 5
			801, //level 8
			2411, //level 15
			273742, //level 60
			737627, //level 70
			13034431, //level 99
		];
		xpForLevels.forEach(function(xfl, idx) {
			expect(xfl.xp, 'xp for level ' + xfl.level)
				.to.equal(expectedXp[idx]);
		});
    });

	it('can calculate xp for virtual levels');

	it('can calculate level from xp');

	it('can calculate virtual levels from xp');

	it('can calculate xp for level range');

	it('can fluently calculate xp for level range', function() {
		var xpFrom1to99 = xp.from(1).to(99);
		expect(xpFrom1to99).to.equal(13034431);
	});

	it('can calculate xp remaining to next level');

});

