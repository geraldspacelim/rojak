const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const newSauceSchema = new Schema ({

    poetName: {
        type: String, 
        required: true,
    },
    poemTitle: {
        type: String, 
        required: true, 
    },
    poem: {
        type: String, 
        required: true, 
    },
    translation: {
        type: String, 
        required: true, 
    },
}, {
    timestamps: true,
})

const NewSauce = mongoose.model('NewSauce', newSauceSchema);

module.exports = NewSauce;