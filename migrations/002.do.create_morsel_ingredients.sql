CREATE TABLE morsel_ingredients (
    id SERIAL PRIMARY KEY,
    ingredient_name TEXT NOT NULL,
    recipe_id INTEGER
        REFERENCES morsel_recipes(id) ON DELETE CASCADE NOT NULL
);