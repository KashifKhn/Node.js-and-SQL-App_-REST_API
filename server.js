const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const { v4: uuid } = require("uuid");
const { faker } = require("@faker-js/faker");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

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

app.get("/", (req, res) => {
  const sqlSelectAllCount = `SELECT count(*) FROM user;`;
  try {
    connection.query(sqlSelectAllCount, (error, result) => {
      if (error) throw error;
      const count = result[0]["count(*)"];
      res.render("home", { count });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error ");
  }
});

app.get("/users/insert/random", (req, res) => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push(getRandomUser());
  }
  let sqlInsert = `INSERT INTO user (id, name, email, password) VALUES ?`;
  try {
    connection.query(sqlInsert, [data], (error, result) => {
      if (error) throw error;
      console.log(result);

      res.redirect("http://localhost:3000/");
    });
  } catch (error) {
    console.log(error);
    res.send("error Occurred");
  }
});

app.get("/users", (req, res) => {
  const sqlSelectAllUser = `SELECT id, name, email FROM user;`;
  try {
    connection.query(sqlSelectAllUser, (err, result) => {
      if (err) throw err;
      console.log(result);
      const users = result;
      res.render("users", { users });
    });
  } catch (error) {
    console.log(err);
    res.send("Error Occurred");
  }
});

app.get("/users/new", (req, res) => {
  res.render("createNew");
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const id = uuid();
  const newData = [id, name, email, password];
  const sqlInsert =
    "INSERT INTO user (id, name, email, password) VALUES (?,?,?,?)";
  try {
    connection.query(sqlInsert, newData, (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    });
  } catch (error) {
    console.log(error);
    res.send("error Occurred");
  }
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sqlSelectUser = `SELECT id, name, email FROM user WHERE id = ?`;
  try {
    connection.query(sqlSelectUser, [id], (error, result) => {
      if (error) throw error;
      const user = result[0];
      res.render("user", { user });
    });
  } catch (error) {
    console.log(error);
    res.send("error Occurred");
  }
});

app.get("/users/:id/delete", (req, res) => {
  const { id } = req.params;
  res.render("delete", { id });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const { password, email } = req.body;
  const sqlSelectUser = `SELECT email, password FROM user WHERE id = '${id}'`;
  const sqlDeleteUser = `DELETE FROM user WHERE id = ?`;
  try {
    connection.query(sqlSelectUser, (err, result) => {
      if (err) throw err;
      const { email: uEmail, password: uPass } = result[0];
      if (uEmail !== email || uPass !== password) {
        res.send("Wrong Email or Password");
      }
    });
  } catch (error) {
    console.log(error);
  }
  try {
    connection.query(sqlDeleteUser, [id], (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    });
  } catch (error) {
    console.log(error);
    res.send("error Occurred");
  }
});

app.get("/users/:id/edit", (req, res) => {
  const { id } = req.params;
  res.render("edit", { id });
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, password, email } = req.body;
  const sqlSelectUser = `SELECT email, password FROM user WHERE id = '${id}'`;
  const sqlUpdateUser = `UPDATE user SET name = '${name}'  WHERE id = '${id}'`;
  try {
    connection.query(sqlSelectUser, (err, result) => {
      if (err) throw err;
      const { email: uEmail, password: uPass } = result[0];
      if (uEmail !== email || uPass !== password) {
        res.send("Wrong Email or Password");
      }
    });
  } catch (error) {
    console.log(error);
  }
  try {
    connection.query(sqlUpdateUser, (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    });
  } catch (error) {
    console.log(error);
    res.send("error Occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
