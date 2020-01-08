CREATE TABLE morsel_pantry (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL
);