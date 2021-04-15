const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const termSchema = new Schema ({
    enTerm: {
        type: String, 
        required: true, 
    },
    definition: {
        type: String, 
        required: true,
    },
    sgTerm: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true,
})

const Term = mongoose.model('Term', termSchema);

module.exports = Term;