const UserModel = require('../model/users');

class UserService {
  userModel = new UserModel();

  async updateInvitation(body) {
    try {
        const updt = await this.userModel.updateInvitation(body.match_id, body.user_id, body.choice);
        return updt;
    } catch (error) {
        throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
  };

  async loginUser(body) {
    try {
        const [login] = await this.userModel.loginUser(body);
        return login;
    } catch (error) {
        throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
  };

  async findByEmail(email) {
    try {
      const find = await this.userModel.findByEmail(email);
      if (find.length > 0) {
        const object = {
          message: `User located successfully`,
          email: await find[0].email,
          name: await find[0].name,
          nickname: await find[0].nickname,
          phone: await find[0].phone,
        };
        return object;
      } 
      return null;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
  };

  async registerUser(body) {
    try {
      const register = await this.userModel.registerUser(body);
      if (register[0].affectedRows > 0) {
        const [registeredUser] = await this.userModel.findByEmail(body.email);
        const object = {
          message: `User ${body.name} registered successfully`,
          email: await registeredUser.email,
          name: await registeredUser.name,
          nickname: await registeredUser.nickname,
          phone: await registeredUser.phone,
        }
        return object;
      } 
      throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    } catch (error) {
      throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    }
  };

  async updateUser(body) {
    try {
      const update = await this.userModel.updateUser(body);
      if (update[0].affectedRows > 0) {
        const [updatedUser] = await this.userModel.findByEmail(body.email);
        const object = {
          message: `User ${body.name} registered successfully`,
          email: await updatedUser.email,
          name: await updatedUser.name,
          nickname: await updatedUser.nickname,
          phone: await updatedUser.phone,
        }
        return object;
      } throw new Error(`An error occurred while trying to update for the user. Try again later (${error.message})`);
    } catch (error) {
      throw new Error(`An error occurred while trying to update for the user. Try again later (${error.message})`);
    }
  };

  async deleteUser(body) {
    try {
      const [remove] = await this.userModel.deleteUser(body);
      return (remove.affectedRows > 0);
    } catch (error) {
      throw new Error(`An error occurred while trying to delete for the user. Try again later (${error.message})`);
    }
  };
}

module.exports = UserService;
