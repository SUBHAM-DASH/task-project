const createClientQuery = `
    CREATE TABLE IF NOT EXISTS "client" (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        designation VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        industry VARCHAR(100) NOT NULL,
        emailId VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        website VARCHAR(255) NOT NULL,
        linkedin VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const insertClientQuery = `
    INSERT INTO "client" (id,name, designation, country, industry,emailId,phoneNumber,website,linkedin)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
`;

const updateClientQuery = `
    UPDATE "client" 
    SET 
        name = $2,
        designation = $3,
        country = $4,
        industry = $5,
        emailId = $6,
        phoneNumber = $7,
        website = $8,
        linkedin = $9
    WHERE id = $1;
`;

const searchClientDetailQuery = `
    SELECT * FROM "client"
    WHERE 
        designation = $1
        OR emailId = $2
        OR phoneNumber = $3
        OR name = $4;
`;

const clientDetailsMonthWise = `
    WITH month_series AS (
        SELECT generate_series(
                date_trunc('month', now()) - interval '11 months',
                date_trunc('month', now()),
                interval '1 month'
            )::date AS month
    )
    SELECT
        to_char(month_series.month, 'YYYY-MM') AS month,
        COALESCE(COUNT("client".id), 0) AS client_count
    FROM month_series
    LEFT JOIN "client" ON date_trunc('month', "client".created_at)::date = month_series.month
    GROUP BY month_series.month
    ORDER BY EXTRACT(MONTH FROM month_series.month) ASC;
`;

const clientDetailsDesignationWise = `
    WITH colors AS (
        SELECT
            designation,
            MAX('#' || substr(md5(random()::text), 1, 6)) AS color
        FROM
            (SELECT DISTINCT designation FROM "client") AS unique_designations
        GROUP BY
            designation
    )
    SELECT
        LEFT(c.designation, 9) AS label,
        COUNT(*) AS y,
        colors.color
    FROM
        "client" c
    JOIN
        colors ON c.designation = colors.designation
    GROUP BY
        c.designation, colors.color

    UNION ALL

    SELECT
        'total' AS label,
        COUNT(*) AS y,
        '#' || substr(md5(random()::text), 1, 6) AS color
    FROM
        "client";
`;

module.exports = {
  createClientQuery,
  insertClientQuery,
  updateClientQuery,
  searchClientDetailQuery,
  clientDetailsMonthWise,
  clientDetailsDesignationWise,
};
