const connection = require('../connection');
const md5 = require('md5');

class UserModel {

  async loginUser(body) {
    const { email, password } = body;
    try {
        const [query] = await connection.execute('SELECT * FROM mydb.user WHERE email = ? AND password = ?', [email, md5(password)]);
        return query;
    } catch (error) {
        throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
  };

  async findByEmail(email) {
    try {
      const [query] = await connection.execute('SELECT * FROM mydb.user WHERE email = ?', [email]);
      return query;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
  }

  async registerUser(body) {
    const { name, nickname, phone, email, password } = body;
    try {
      const register = await connection.execute('INSERT INTO mydb.user (name, nickname, phone, email, password) VALUES (?, ?, ?, ?, ?)', [name, nickname, phone, email, md5(password)]);
      return register;
    } catch (error) {
      throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    }
  };

  async updateUser(body) {
    const { name, nickname, phone, email, password } = body;
    try {
      const update = await connection.execute(
        'UPDATE mydb.user SET name = ?, nickname = ?, phone = ?, password = ? WHERE email = ?',
        [name, nickname, phone, md5(password), email]
      );
      return update;
    } catch (error) {
      throw new Error(`An error occurred while trying to update the user. Try again later (${error.message})`);
    }
  };
  

  async deleteUser(body) {
    const { email } = body;
    try {
      const remove = await connection.execute('DELETE FROM mydb.user WHERE email = ?', [email]);
      return remove;
    } catch (error) {
      throw new Error(`An error occurred while trying to delete the user. Try again later (${error.message})`);
    }
  };
}

module.exports = UserModel;
