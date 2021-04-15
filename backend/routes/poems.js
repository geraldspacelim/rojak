const router = require('express').Router();
let RojakPoem = require('../models/rojakPoem.model'); 
let ActualPoem = require('../models/actualPoem.model'); 

router.route('/getRojakPoems').get((req, res) => {
    RojakPoem.find()
        .then(poems => res.json(poems))
        .catch(err => res.status(400).json('Error: ' + err));
}); 


router.route('/getActualPoem').get((req, res) => {
    ActualPoem.find()
        .then(poems => res.json(poems))
        .catch(err => res.status(400).json('Error: ' + err));
}); 


router.route('/addRojakPoem').post((req, res) => {
    const projectName = req.body.projectName; 
    const author = req.body.author; 
    const rojakPoem = req.body.author;

    const newRojakPoem = new RojakPoem({
        projectName, 
        author, 
        rojakPoem, 
    })

    newRojakPoem.save()
        .then(() => res.json('Poem added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/addActualPoem').post((req, res) => {
    const title = req.body.title
    const author = req.body.author; 
    const actualPoem = req.body.actualPoem;

    const newActualPoem = new ActualPoem({ 
        title,
        author, 
        actualPoem, 
    })

    newActualPoem.save()
        .then(() => res.json('Poem added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router;

