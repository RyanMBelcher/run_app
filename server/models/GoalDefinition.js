const { Schema, model } = require('mongoose');
const Goal = require('./Goal');

const goalDefinitionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        start: {
            type: [Number]
        },
        end: {
            type: [Number]
        },
        coordinates: {
            type: [Array]
        },
        distance: {
            type: Number
        }
    }
);


const GoalDefinition = model('GoalDefinition', goalDefinitionSchema);

module.exports = GoalDefinition;