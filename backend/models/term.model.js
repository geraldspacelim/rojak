const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const termSchema = new Schema ({
    englishTerm: {
        type: String, 
        required: true, 
    },
    definition: {
        type: String, 
        required: true,
    },
    singlishTerm: {
        type: Array,
        required: true,
    },
    lineNum: {
        type: Number, 
        require:true
    }
}, {
    timestamps: true,
})

const Term = mongoose.model('Term', termSchema);

module.exports = Term;