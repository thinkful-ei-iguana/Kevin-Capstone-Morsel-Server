const xss = require('xss');
const Treeize = require('treeize');

const RecipeService = {
  getAllRecipes(db) {
    return db
      .from('morsel_recipes')
      .select(
        'id',
        'title',
        'estimated_time',
        'ingredients',
        'directions',
      );
  },

  getRecipeById(db, id) {
    return RecipeService.getAllRecipes(db)
      .where({ id })
      .first();
  },

  insertRecipe(db, newRecipe) {
    return db
      .insert(newRecipe)
      .into('morsel_recipes')
      .returning('*')
      .from('morsel_recipes')
  },

  deleteRecipeById(db, id) {
    return db
      .from('morsel_recipes')
      .where({ id })
      .delete()
  },

  patchRecipeById(db, id, newRecipeFields) {
    return db
      .from('morsel_recipes')
      .where({ id })
      .update(newRecipeFields)
  },

  serializeRecipes(recipes) {
    return recipes.map(this.serializeRecipe);
  },

  serializeRecipe(recipe) {
    //const recipeTree = new Treeize();
    //const recipeData = recipeTree.grow([ recipe ]).getData()[0];

    return {
      id: recipe.id,
      title: xss(recipe.title),
      estimated_time: xss(recipe.estimated_time),
      ingredients: xss(recipe.ingredients),
      directions: xss(recipe.directions),
      date_created: recipe.date_created,
    };
  },
};

module.exports = RecipeService;