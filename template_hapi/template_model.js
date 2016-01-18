const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

var {nameschema} = new Mongoose.Schema({fields});

{nameschema}.plugin(AutoIncrement.plugin, {
    model: '{namemodel}',
    field: '_id'
});

module.exports = mongoose.model('{name}', {nameschema});
