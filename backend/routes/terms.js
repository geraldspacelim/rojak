const router = require('express').Router();
let Term = require('../models/term.model'); 

router.route('/addTerm').post((req, res) => {
    const englishTerm = req.body.englishTerm; 
    const definition = req.body.definition; 
    const singlishTerm = req.body.singlishTerm;

    const newTerm = new Term({
        englishTerm, 
        definition, 
        singlishTerm, 
    })

    newTerm.save()
        .then(() => res.json('Term added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/getTerms').get((req, res) => {
    Term.find()
        .then(terms => res.json(terms))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/getTerm/:id').get((req, res) => {
    Term.findById(req.params.id)
        .then(terms => res.json(terms))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Term.findById(req.params.id)
      .then(term => {
        term.englishTerm = req.body.englishTerm;
        term.definition = req.body.definition;
        term.singlishTerm = req.body.singlishTerm;
        term.lineNum = req.body.lineNum
  
        term.save()
          .then(() => res.json('Term updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });  


module.exports = router;
