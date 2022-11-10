const {ApiError} = require('../errors');

module.exports = {
    checkIsBodyValid: async (req, res, next) => {
        try {
            const {category, level, japaneseRequired} = req.body;

            if (category !== 'nodejs' && category !== 'angular' && category !== 'javascript' && category !== 'react') {
                throw new ApiError('category is invalid');
            }

            if (level !== 'junior' && level !== 'middle' && level !== 'senior') {
                throw new ApiError('level is invalid');
            }

            if (japaneseRequired !== true && japaneseRequired !== false) {
                throw new ApiError('japaneseRequired should be true or false');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}