CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pet (
    id SERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    owner_id INTEGER REFERENCES users
);

INSERT INTO users(username) VALUES ('lalder');

INSERT INTO pet(name, type, owner_id) VALUES
    ('Darryl', 'CAT', (SELECT id FROM users WHERE username = 'lalder')),
    ('George', 'CAT', (SELECT id FROM users WHERE username = 'lalder')),
    ('Buddy', 'DOG', (SELECT id FROM users WHERE username = 'lalder')); 