const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const actualPoemSchema = new Schema ({

    title: {
        type: String, 
        required: true,
    },
    author: {
        type: String, 
        required: true, 
    },
    actualPoem: {
        type: Array, 
        required: true, 
    },
}, {
    timestamps: true,
})

const ActualPoem = mongoose.model('ActualPoem', actualPoemSchema);

module.exports = ActualPoem;