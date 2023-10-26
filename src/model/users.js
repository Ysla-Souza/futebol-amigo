const mysql = require('mysql2/promise');
const md5 = require('md5');
require('dotenv').config();

class UserModel {
  constructor() {
    this.connectionConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };
  }

  async loginUser(body) {
    const { email, password } = body;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const [query] = await connection.execute('SELECT * FROM mydb.user WHERE email = ? AND password = ?', [email, md5(password)]);
      return query;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async findByEmail(email) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const [query] = await connection.execute('SELECT * FROM mydb.user WHERE email = ?', [email]);
      return query;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async findById(id) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const [query] = await connection.execute('SELECT * FROM mydb.user WHERE id = ?', [id]);
      return query;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async registerUser(body) {
    const { name, nickname, phone, email, password } = body;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const register = await connection.execute(
        'INSERT INTO mydb.user (name, nickname, phone, email, password) VALUES (?, ?, ?, ?, ?)',
        [name, nickname, phone, email, md5(password)]
      );
      await connection.commit();
      return register;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async updateUser(body) {
    const { name, nickname, phone, email, password } = body;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const update = await connection.execute(
        'UPDATE mydb.user SET name = ?, nickname = ?, phone = ?, password = ? WHERE email = ?',
        [name, nickname, phone, md5(password), email]
      );
      await connection.commit();
      return update;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to update the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async deleteUser(body) {
    const { email } = body;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const [findUser] = await this.findByEmail(email);
      await connection.execute('DELETE FROM mydb.user_has_matches WHERE user_id = ?', [findUser.id]);
      const remove = await connection.execute('DELETE FROM mydb.user WHERE email = ?', [email]);
      await connection.commit();
      return remove;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to delete the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }
}

module.exports = UserModel;
