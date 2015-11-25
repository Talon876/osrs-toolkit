var xpForLevel = function (level) {
    var value = 0;
    for (var i = 1; i < level; i++) {
        value += Math.floor(i + 300 * Math.pow(2, i / 7));
    }
    value = Math.floor(.25 * value);
    return value;
};

var levelFromXp = function (xp) {
    for (var i = 1; i < 126; i++) {
        if (xpForLevel(i) > xp) {
            return i - 1;
        }
    }
    return undefined;
};

var xpBetweenLevels = function (startLevel, endLevel) {
    return xpForLevel(endLevel) - xpForLevel(startLevel);
};

var xpFluent = function (startLevel) {
    return {
        to: function (endLevel) {
            return xpBetweenLevels(startLevel, endLevel);
        }
    };
};

var xpToNextLevel = function (currentXp) {
    var currentLevel = levelFromXp(currentXp);
    return xpForLevel(currentLevel++) - currentXp;
};

module.exports = {
    xpForLevel: xpForLevel,
    levelFromXp: levelFromXp,
    xpBetweenLevels: xpBetweenLevels,
    from: xpFluent,
    xpToNextLevel: xpToNextLevel
};
