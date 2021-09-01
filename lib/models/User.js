const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  userName;
  email;
  passwordHash;
  photoURL;

  constructor(row) {
    this.id = row.id;
    this.userName = row.user_name;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.photoURL = row.photo_url;
  }

  static async insert({ userName, email, passwordHash, photoURL }) {
    const { rows } = await pool.query(
      `
    INSERT INTO users (user_name, email, password_hash, photo_url) 
    VALUES($1, $2, $3, $4) RETURNING *
    `,
      [userName, email, passwordHash, photoURL]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [email]
    );

    if (!rows) throw new Error(`No user with email ${email}`);
    return new User(rows[0]);
  }

  auth() {
    // const json = { ...this };
    // delete json.passwordHash;
    return jwt.sign({ ...this }, process.env.APP_SECRET, {
      expiresIn: '24h',
    });
    // console.log('i am here', token);
    // return {
    //   jwt: token,
    // };
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }
};
