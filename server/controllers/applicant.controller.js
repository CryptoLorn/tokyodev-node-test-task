const {Applicant} = require('../models/applicant.model');

module.exports = {
    create: async (req, res) => {
        try {
            const {email, categories, japaneseKnowledge, level} = req.body;

            const applicant = await Applicant.create({email, categories, japaneseKnowledge, level});

            return res.json(applicant);
        } catch (e) {
            console.log(e);
        }
    },

    getAll: async (req, res) => {
        try {
            const applicants = await Applicant.findAll();

            return res.json(applicants);
        } catch (e) {
            console.log(e);
        }
    },

    updateById: async (req, res) => {
        try {
            const {id} = req.params;
            const {email, categories, japaneseKnowledge, level} = req.body;

            const applicant = await Applicant.update({email, categories, japaneseKnowledge, level}, {where: {id}});

            return res.json(applicant);
        } catch (e) {
            console.log(e);
        }
    },

    deleteById: async (req, res) => {
        try {
            const {id} = req.params;

            await Applicant.destroy({where: {id}});

            return res.json('204 No Content');
        } catch (e) {
            console.log(e);
        }
    }
}