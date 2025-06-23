const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_CONNECTION_STRING;
const db = new Pool({
    connectionString: connectionString,
});

exports.checkIfEmailExists = async (email) => {
    const userEmails = await db.query("SELECT * FROM users");
    console.log(userEmails.rows);
};
exports.checkIfNameExists = (userName) => {
    const userIdList = "";
};
