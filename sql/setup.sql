DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL, 
    password_hash TEXT NOT NULL,
    photo_url TEXT NUll
)
