-- Tabela user

-- Tabela intrebari in relatie cu useri

-- Tabela comentarii intrebari in relatie cu intrebari

-- Tabela chat in relatie cu useri

-- Tabela efectiva chat

-- Tabela link melodii linistite cat timp rezolvi subiecte daca vrei(mod chill)

-- Tabela statistici teste( cat de bine te ai descurcat la tesrul respectiv, ce timp mediu are el de rezolvare si cat ai stat tu)

-- Tabela testele mele(teste date elevilor sau teste date de tine) in relatie cu useri

-- Tabela categorii teste pentru fiecare user

-- Tabela categorii intrebari pentru fiecare user

-- Teste pentru fiecare facultate, ecaluare nationala, bac, materie


-- Mod test necopiabil(face intrebarea png)

-- Mod examen: dai un test cu un model ca la un examen

-- Free mode: dai foarte multe intrebari care pot pica la examenul respectiv

-- pentru creare intri in psql si scrii \i models.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tests_solved INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    subjects VARCHAR(255) NOT NULL,
    tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id),
    question_id INTEGER REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS chat (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    initiator_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chat_id INTEGER REFERENCES chat(id)
);

-- CREATE TABLE IF NOT EXISTS test_statistics (
--     id SERIAL PRIMARY KEY,
--     score INTEGER NOT NULL,
--     time INTEGER NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     user_id INTEGER REFERENCES users(id),
--     test_id INTEGER REFERENCES tests(id)
-- );

CREATE TABLE IF NOT EXISTS tests (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);

