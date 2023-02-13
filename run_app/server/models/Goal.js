const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {

    }
);

const Goal = model('Goal', goalSchema);

module.exports = Goal;