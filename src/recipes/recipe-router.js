const express = require('express');
const path = require('path')
const RecipeService = require('./recipe-service');

const recipeRouter = express.Router();
const jsonBodyParser = express.json();

recipeRouter
  .route('/recipes')
  .get((req, res, next) => {
    RecipeService.getAllRecipes(req.app.get('db'))
      .then(recipes => {
        res.json(RecipeService.serializeRecipes(recipes));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, estimated_time, ingredients, directions } = req.body;
    const newRecipe = { title, estimated_time, ingredients, directions };

    for (const [key, value] of Object.entries(newRecipe))
      if(value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    RecipeService.insertRecipe(
      req.app.get('db'),
      newRecipe
    )
      .then(recipe => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${recipe.id}`))
          .json(RecipeService.serializeRecipe(recipe));
      })
      .catch(next);
  });

recipeRouter
  .route('/recipes/:id')
  .all(checkRecipeExists)
  .get((req, res) => {
    res.json(RecipeService.serializeRecipe(res.recipe));
  })
  .delete((req, res, next) => {
    RecipeService.deleteRecipeById(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { title, estimated_time, ingredients, directions } = req.body;
    const recipeToUpdate = { title, estimated_time, ingredients, directions };

    const numberOfValues = Object.values(recipeToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: 'Request body must contain either \'title\', \'estimated_time\', \'ingredients\', or \'directions\''
        }
      })

    RecipeService.patchRecipeById(
      req.app.get('db'),
      req.params.id,
      recipeToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })

async function checkRecipeExists(req, res, next) {
  try {
    const recipe = await RecipeService.getRecipeById(
      req.app.get('db'),
      req.params.id
    );

    if(!recipe)
      return res.status(404).json({
        error: 'Recipe does not exist'
      });

    res.recipe = recipe;
    next();
  } catch(error) {
    next(error);
  }
}

module.exports = recipeRouter;