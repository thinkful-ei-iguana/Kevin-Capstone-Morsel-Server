const xss = require ('xss');
const Treeize = require('treeize');

const IngredientsService = {
  getAllIngredients(db) {
    return db
      .from('morsel_ingredients')
      .select(
        'ingredient_name',
      );
  },

  getIngredientById(db, id) {
    return IngredientsService.getAllIngredients(db)
      .where('morsel_ingredients', id)
      .first();
  },

  serializeIngredients(ingredients) {
    return ingredients.map(this.serializeIngredients);
  },

  serializeIngredient(ingredient) {
    const ingredientTree = new Treeize();
    const ingredientData = ingredientTree.grow([ ingredient ]).getData()[0];

    return {
      id: ingredientData.id,
      ingredient_name: ingredientData.ingredient_name,
      recipe_id: ingredientData.recipe_id,
    };
  }
};

module.exports = IngredientsService;