const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const rojakPoemSchema = new Schema ({
    projectName: {
        type: String, 
        required: true, 
    },
    author: {
        type: String, 
        required: true, 
    },
    rojakPoem: {
        type: Array, 
        required: true, 
    },
}, {
    timestamps: true,
})

const RojakPoem = mongoose.model('RojakPoem', rojakPoemSchema);

module.exports = RojakPoem;