const db = require("../models/config");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password; 
};


// Create a new user
User.create = (newUser) => {
  return new Promise((resolve, reject) => {
    db.mysqlConnection.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("Error creating user: ", err);
        reject(err); 
      } else {
        console.log("Created user: ", res);
        resolve(res);
      }
    });
  });
};




User.findByEmail = async (email) => {
  try {
    const [rows] = await db.mysqlConnection.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length) {
      return rows[0];
    }
    throw { kind: "not_found" }; 
  } catch (err) {
    throw err;
  }
};

User.findOne = async (id) => {
  try {
    const [rows] = await db.mysqlConnection.promise().query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (rows.length) {
      return rows[0];
    }
    throw { kind: "not_found" }; 
  } catch (err) {
    throw err; 
  }
};



module.exports = User;
