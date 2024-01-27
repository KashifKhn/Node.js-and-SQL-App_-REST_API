const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "279ook",
});

const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let sqlInsert = `INSERT INTO user (id, name, email, password) VALUES ?`;
let data = [];
for (let i = 0; i < 100; i++) {
 data.push(getRandomUser());
}

const sqlSelectAll = `SELECT * FROM user`;

try {
  connection.query(sqlInsert, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

connection.end();
