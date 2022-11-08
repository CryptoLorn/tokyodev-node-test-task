const {Position} = require('../models/position.model');
const {Applicant} = require('../models/applicant.model');
const {sendEmail} = require("../services/email.service");

module.exports = {
    create: async (req, res) => {
        try {
            const {category, level, company, description, japaneseRequired} = req.body;
            let position;

            // if (description) {
            //     position = await Position.create({category, level, company, description, japaneseRequired});
            // } else {
            //     position = await Position.create({category, level, company, japaneseRequired});
            // }

            const applicants = await Applicant.findAll();

            applicants.forEach(applicant => {
                applicant.categories.forEach(el => {
                    if (applicant.japaneseKnowledge === true && applicant.level === level && el === category) {
                        sendEmail(applicant.email, 'order_arrived');
                    }

                    if (applicant.japaneseKnowledge === false && japaneseRequired === false && applicant.level === level && el === category) {
                        sendEmail(applicant.email, 'order_arrived');
                    }
                })
            })

            return res.json('ok');
        } catch (e) {
            console.log(e);
        }
    },

    getWithParams: async (req, res) => {
        try {
            const {category, level, tag} = req.query;
            let positions;

            if (!category && !level && !tag) {
                positions = await Position.findAndCountAll();
            }

            if (category && level && tag) {
                let positionsWithCategoryAndLevel = await Position.findAndCountAll({where: {category, level}});

                positions = positionsWithCategoryAndLevel.rows.filter(it => JSON.stringify(it).includes(tag));
            }

            if (category && level && !tag) {
                positions = await Position.findAndCountAll({where: {category, level}});
            }

            if (category && tag && !level) {
                let positionsWithCategory = await Position.findAndCountAll({where: {category}});

                positions = positionsWithCategory.rows.filter(it => JSON.stringify(it).includes(tag));
            }

            if (level && tag && !category) {
                let positionsWithLevel = await Position.findAndCountAll({where: {level}});

                positions = positionsWithLevel.rows.filter(it => JSON.stringify(it).includes(tag));
            }

            if (category && !level && !tag) {
                positions = await Position.findAndCountAll({where: {category}});
            }

            if (level && !category && !tag) {
                positions = await Position.findAndCountAll({where: {level}});
            }

            if (tag && !level && !category) {
                let allPositions = await Position.findAll();

                positions = allPositions.filter(it => JSON.stringify(it).includes(tag));
            }

            return res.json(positions);
        } catch (e) {
            console.log(e);
        }
    },

    getById: async (req, res) => {
        try {
            const {id} = req.params;

            const position = await Position.findByPk(id);

            return res.json(position);
        } catch (e) {
            console.log(e);
        }
    },

    updateById: async (req, res) => {
        try {
            const {id} = req.params;
            const {category, level, company, description, japaneseRequired} = req.body;

            const position = await Position.update({category, level, company, description, japaneseRequired}, {where: {id}});

            return res.json(position);
        } catch (e) {
            console.log(e);
        }
    },

    deleteById: async (req, res) => {
        try {
            const {id} = req.params;

            await Position.destroy({where: {id}});

            return res.json('204 No Content');
        } catch (e) {
            console.log(e);
        }
    }
}