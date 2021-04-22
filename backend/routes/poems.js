const router = require('express').Router();
let RojakPoem = require('../models/rojakPoem.model'); 
let ActualPoem = require('../models/actualPoem.model'); 
let NewSauce = require('../models/newSauce.model'); 

router.route('/getRojakPoems').get((req, res) => {
    RojakPoem.find().sort({ _id: -1 })
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
    const rojakPoem = req.body.rojakPoem;
    const projectDescription = req.body.projectDescription

    const newRojakPoem = new RojakPoem({
        projectName, 
        author, 
        rojakPoem, 
        projectDescription
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

router.route('/addSauce').post((req, res) => {
    const poetName = req.body.poetName
    const poemTitle = req.body.poemTitle; 
    const poem = req.body.poem;
    const translation = req.body.translation

    const newSauce  = new NewSauce({ 
        poetName,
        poemTitle, 
        poem, 
        translation,
    })

    newSauce.save()
        .then(() => res.json('Saunce uploaded!'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/view/:id').get((req, res) => {
    RojakPoem.findById(req.params.id)
      .then(rojakPoem => res.json(rojakPoem))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;


