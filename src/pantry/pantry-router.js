const express = require('express');
const PantryService = require('./pantry-service');

const pantryRouter = express.Router();

pantryRouter
  .route('/pantry')
  .get((req, res) => {
    PantryService.getPantry(req.app.get('db'))
      .then(pantry => {
        res.json(PantryService.serializePantry(res.pantry));
      });
  });

module.exports = pantryRouter;