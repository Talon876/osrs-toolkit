var chai = require('chai'),
    expect = chai.expect,
    xp = require('../index').xp;

describe('XP API', function () {
    this.slow(75);

    it('can calculate xp for level', function () {
        var levels = [1, 2, 5, 8, 15, 60, 70, 99];
        var xpForLevels = levels.map(function (level) {
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
            13034431 //level 99
        ];
        xpForLevels.forEach(function (xfl, idx) {
            expect(xfl.xp, 'xp for level ' + xfl.level)
                .to.equal(expectedXp[idx]);
        });
    });

    it('can calculate xp for virtual levels', function () {
        var levels = [100, 110, 126, 127, 150];
        var xpForLevels = levels.map(function (level) {
            return {
                level: level,
                xp: xp.xpForLevel(level)
            };
        });

        var expectedXp = [
            14391160, //level 100
            38737661, //level 110
            188884740, //level 126
            200000000, //level 127
            200000000 //level 150
        ];
        xpForLevels.forEach(function (xfl, idx) {
            expect(xfl.xp, 'xp for level ' + xfl.level)
                .to.equal(expectedXp[idx]);
        });
    });

    it('can calculate level from xp', function () {
        var testCases = [
            {
                xp: 159875,
                expectedLevel: 54
            },
            {
                xp: 12,
                expectedLevel: 1
            },
            {
                xp: 200000000,
                expectedLevel: 126
            },
            {
                xp: 800000,
                expectedLevel: 70
            }
        ];
        testCases.map(function (testCase) {
            return {
                expected: testCase.expected,
                actual: xp.levelFromXp(testCase.xp)
            }
        });
        testCases.forEach(function (testCase) {
            expect(testCase.expected).to.equal(testCase.actual);
        });
    });

    it('can calculate xp for level range', function () {
        var testCases = [
            {
                start: 1,
                end: 99,
                expectedAmount: 13034431
            },
            {
                start: 7,
                end: 8,
                expectedAmount: 138
            },
            {
                start: 15,
                end: 80,
                expectedAmount: 1980657
            },
            {
                start: 70,
                end: 90,
                expectedAmount: 4608705
            },
            {
                start: 80,
                end: 70,
                expectedAmount: -1248441
            }
        ];

        testCases.map(function (testCase) {
            return {
                expected: testCase.expectedAmount,
                actual: xp.xpBetweenLevels(testCase.start, testCase.end)
            };
        });

        testCases.forEach(function (testCase) {
            expect(testCase.expected).to.equal(testCase.actual);
        });
    });

    it('can fluently calculate xp for level range', function () {
        var xpFrom1to99 = xp.from(1).to(99);
        expect(xpFrom1to99).to.equal(13034431);
    });

    it('can calculate xp remaining to next level', function() {
        var testCases = [
            {
                xp: 80,
                expectedXp: 3
            },
            {
                xp: 368599,
                expectedXp: 38416
            },
            {
                xp: 550014,
                expectedXp: 55018
            },
            {
                xp: 24000000,
                expectedXp: 2068632
            }
        ];
        testCases.map(function(testCase) {
            return {
                expected: testCase.expectedXp,
                actual: xp.xpToNextLevel(testCase.xp)
            };
        });

        testCases.forEach(function(testCase) {
            expect(testCase.expected).to.equal(testCase.actual);
        });
    });

});

