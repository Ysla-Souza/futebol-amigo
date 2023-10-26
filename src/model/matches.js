const mysql = require('mysql2/promise');
const md5 = require('md5');
require('dotenv').config();

class MatchModel {
  constructor() {
    this.connectionConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };
  }

  async findByName(name) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const [query] = await connection.execute('SELECT * FROM mydb.matches WHERE name = ?', [name]);
      return query;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async findMatchInUser_has_matches(id) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const query = await connection.execute('SELECT user_id FROM mydb.user_has_matches WHERE matches_matches_id = ?', [id]);
      return query[0].map((item) => item.user_id);
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  };

  async findById(id) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const [query] = await connection.execute('SELECT * FROM mydb.matches WHERE matches_id = ?', [id]);
      return query;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async findAllByUser(id) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      const query = await connection.execute('SELECT matches_matches_id FROM mydb.user_has_matches WHERE user_id = ?', [id]);
      return query[0].map((item) => item.matches_matches_id);
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the Match. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async registerMatch(body) {
    const { name, adminId, date, hours, guests } = body;
    const dateTime = `${date} ${hours}`;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const register = await connection.execute(
        'INSERT INTO mydb.matches (name, adminId, data_time) VALUES (?, ?, ?)',
        [name, adminId, dateTime]
      );
      await connection.commit();
      return register;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to register for the Match. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  };

  async registerRelashionship(body) {
    const { name, guests } = body;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const [match_id] = await this.findByName(name);

      for (let i = 0; i < guests.length; i += 1) {
        await connection.execute('INSERT INTO mydb.user_has_matches (user_id, matches_matches_id, invitation) VALUES (?, ?, ?)', [guests[i], match_id.matches_id]);
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to register for the Match. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  };

  async updateMatch(body) {
    const { name, adminId, date, hours } = body;
    const dateTime = `${date} ${hours}`;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const update = await connection.execute(
        'UPDATE mydb.matches SET name = ?, adminId = ?, data_time = ? WHERE name = ?',
        [name, adminId, dateTime, name]
      );
      await connection.commit();
      return update;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to update the Match. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async deleteMatch(body) {
    const { name } = body;
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const remove = await connection.execute('DELETE FROM mydb.matches WHERE name = ?', [name]);
      await connection.commit();
      return remove;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to delete the Match. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }

  async deleteMatchInRelashionship(id) {
    const connection = await mysql.createConnection(this.connectionConfig);
    try {
      await connection.beginTransaction();
      const remove = await connection.execute('DELETE FROM mydb.user_has_matches WHERE matches_matches_id = ?', [id]);
      await connection.commit();
      return remove;
    } catch (error) {
      await connection.rollback();
      throw new Error(`An error occurred while trying to delete the Match. Try again later (${error.message})`);
    } finally {
      connection.end();
    }
  }
}

module.exports = MatchModel;
