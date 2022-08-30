CREATE TYPE unit AS ENUM ('GRAMS', 'MILLILITERS', 'PIECES');
CREATE TABLE ingredients (
    ingredient_id   SERIAL PRIMARY KEY,
    designation     TEXT NOT NULL,
    unit            unit NOT NULL,
    is_stable       BOOLEAN NOT NULL
);
