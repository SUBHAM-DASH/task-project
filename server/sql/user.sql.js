const createUserQuery = `
    CREATE TABLE IF NOT EXISTS "user" (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const insertUserQuery = `
    INSERT INTO "user" (id,name, email, password, mobile_number)
    VALUES ($1, $2, $3, $4, $5);
`;

module.exports = { createUserQuery, insertUserQuery };
