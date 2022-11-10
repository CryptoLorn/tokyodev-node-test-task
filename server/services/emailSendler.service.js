const {Applicant} = require("../models/applicant.model");
const {sendEmail} = require("./email.service");
const {Position} = require("../models/position.model");

const sendLetterIfAddPosition = async (category, level, company, japaneseRequired) => {
    const applicants = await Applicant.findAll();

    applicants.forEach(applicant => {
        applicant.categories.forEach(el => {
            if (applicant.japaneseKnowledge === true && applicant.level === level && el === category) {
                sendEmail(applicant.email,
                    'new_position',
                    {
                        category,
                        level,
                        company,
                        japaneseRequired
                    });
            }

            if (applicant.japaneseKnowledge === false && japaneseRequired === false && applicant.level === level && el === category) {
                sendEmail(applicant.email,
                    'new_position',
                    {
                        category,
                        level,
                        company,
                        japaneseRequired
                    });
            }
        })
    })
}

const sendLetterIfPositionDelete = async (id) => {
    const position = await Position.findByPk(id);
    const applicants = await Applicant.findAll();

    applicants.forEach(applicant => {
        applicant.categories.forEach(el => {
            if (applicant.japaneseKnowledge === true && applicant.level === position.level && el === position.category) {
                sendEmail(applicant.email,
                    'remove_position',
                    {
                        category: position.category,
                        level: position.level,
                        company: position.company,
                        japaneseRequired: position.japaneseRequired
                    });
            }

            if (applicant.japaneseKnowledge === false && position.japaneseRequired === false && applicant.level === position.level && el === position.category) {
                sendEmail(applicant.email,
                    'remove_position',
                    {
                        category: position.category,
                        level: position.level,
                        company: position.company,
                        japaneseRequired: position.japaneseRequired
                    });
            }
        })
    })
}

module.exports = {sendLetterIfAddPosition, sendLetterIfPositionDelete};