const xss = require('xss');
const Treeize = require('treeize');

const PantryService = {
  getPantry(db) {
    return db
      .from('morsel_pantry')
      .select(
        'item_name',
        'quantity',
      );
  },

  serializePantry(pantry) {
    const pantryTree = new Treeize();
    const pantryData = pantryTree.grow([ pantry ]).getData();

    return {
      id: pantryData.id,
      item_name: xss(pantryData.item_name),
      quantity: xss(pantryData.quantity),
      date_added: pantryData.date_added,
    };
  }
};