const pool = require("../config/db");

exports.list = () => {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM users';
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  });
};