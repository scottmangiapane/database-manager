const dotenv = window.require('dotenv');
const pg = window.require('pg');

pg.types.setTypeParser(1082, 'text', (val) => val); // date
pg.types.setTypeParser(1114, 'text', (val) => val); // timestamp without timezone
pg.types.setTypeParser(1184, 'text', (val) => val); // timestamp

dotenv.load();

const args = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true'
};

let client = new pg.Client(args);

// TODO use
export const getColumns = (name, schema, callback) => {
    const statement = `
        SELECT column_name,
               data_type
        FROM   information_schema.columns
        WHERE  table_schema = '${schema}'
               AND table_name = '${name}';
        `;
    query(statement, callback);
};

export const getTables = (callback) => {
    const statement = `
        SELECT table_schema AS schema,
               table_type   AS type,
               table_name   AS name
        FROM   information_schema.tables
        ORDER  BY table_schema,
                  table_name;
        `;
    query(statement, callback);
}

export const query = (statement, callback) => {
    client
        .end()
        .catch(() => { });
    client = new pg.Client(args);
    client.connect();
    client
        .query({
            text: statement,
            rowMode: 'array'
        })
        .then((res) => {
            client.end();
            callback(undefined, res);
        })
        .catch((err) => {
            console.log('Couldn\'t execute query:');
            console.log(err);
        });
}