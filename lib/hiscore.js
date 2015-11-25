var request = require('request'),
    skills = require('./skills');

var gameTypes = {
    NORMAL: 'normal',
    IRONMAN: 'ironman',
    ULTIMATE: 'ultimate',
    DEADMAN: 'deadman'
};

var hiscoreUrls = {
    'normal': 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=',
    'ironman': 'http://services.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws?player=',
    'ultimate': 'http://services.runescape.com/m=hiscore_oldschool_ultimate/index_lite.ws?player=',
    'deadman': 'http://services.runescape.com/m=hiscore_oldschool_deadman/index_lite.ws?player='
};

var buildUrl = function (rsn, gameType) {
    return hiscoreUrls[gameType] + rsn.replace(' ', '_');
};

var getHiscore = function (rsn, gameType, callback) {
    request(buildUrl(rsn, gameType), function (err, response, body) {
        if (err || response === undefined) {
            err = new Error('An unknown error occurred while attempting to ' +
                'retrieve hiscores for ' + rsn + '. Jagex\'s servers may be ' +
                'unresponsive. Try again soon.');
            callback(err);
            return;
        }
        if (response.statusCode === 404) {
            callback(new Error('Player not found: ' + rsn));
            return;
        }
        try {
            var csv = body.trim().split('\n');
            var hiscoreData = {};
            skills.forEach(function (skill, idx) {
                var rle = csv[idx].split(',');
                hiscoreData[skill] = {
                    rank: parseInt(rle[0]),
                    level: parseInt(rle[1]),
                    xp: parseInt(rle[2])
                };
            });
        } catch (ex) {
            err = new Error('An unknown error occurred while parsing the hiscore data. Try again soon.');
            callback(err);
            return;
        }
        callback(null, hiscoreData);
    });
};

module.exports = {
    standard: function (rsn, cb) {
        return getHiscore(rsn, gameTypes.NORMAL, cb);
    },
    ironman: function (rsn, cb) {
        return getHiscore(rsn, gameTypes.IRONMAN, cb);
    },
    ultimate: function (rsn, cb) {
        return getHiscore(rsn, gameTypes.ULTIMATE, cb);
    },
    deadman: function (rsn, cb) {
        return getHiscore(rsn, gameTypes.DEADMAN, cb);
    }
};

