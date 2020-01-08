CREATE TABLE morsel_recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    estimated_time TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    directions TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
);