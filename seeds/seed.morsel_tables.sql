BEGIN;

TRUNCATE
    morsel_recipes
    RESTART IDENTITY CASCADE;

TRUNCATE
    morsel_ingredients
    RESTART IDENTITY CASCADE;

TRUNCATE
    morsel_pantry
    RESTART IDENTITY CASCADE;

INSERT INTO morsel_recipes (title, estimated_time, ingredients, directions)
VALUES
    ('PB&J', '2 minutes', 'peanut butter, jelly, sliced bread', 'Put two slices of bread on a plate.  Using a kife, spread peanut butter on one slice and jelly on the other.  Put the slathered sides of the bread together.  Enjoy!'),
    ('Guacamole', '10 minutes', '2 avocados, 1/2 onion, lime juice, chili powder', 'Peel and mash the avocados in a medium bowl.  Dice the onion and mix the pieces into the avocado mash.  Add a splash of lime juice.  Stir thoroughly, adding chili powder to taste.  Enjoy!'),
    ('Pizza Rolls', '4 minutes', '1 bag Totino''s Pizza Rolls',  'Put mizza rolls in microwave for 4 minutes.');

INSERT INTO morsel_ingredients (ingredient_name, recipe_id)
VALUES
    ('peanut butter', 1),
    ('jelly', 1),
    ('sliced bread', 1),
    ('avocado', 2),
    ('onion', 2),
    ('lime juice', 2),
    ('chili powder', 2),
    ('pizza rolls', 3);

INSERT INTO morsel_pantry (item_name, quantity)
VALUES
    ('peanut butter', 1),
    ('jelly', 1),
    ('avocado', 2),
    ('onion', 2),
    ('lime juice', 1),
    ('pizza rolls', 1);

COMMIT;