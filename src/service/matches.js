const MatchModel = require('../model/matches');
const UserModel = require('../model/users');

class MatchService {
  matchModel = new MatchModel();
  userModel = new UserModel();

  async findByName(matchName) {
    try {
      const findMatch = await this.matchModel.findByName(matchName);
      if (findMatch.length > 0) {
        const [findUser] = await this.userModel.findById(findMatch[0].adminId);
        const object = {
          message: `Match located successfully`,
          name: await findMatch[0].name,
          date: await findMatch[0].data,
          hours: await findMatch[0].hours,
          userAdmin: await findUser.email,
        };
        return object;
      } 
      return null;
    } catch (error) {
      throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
  };

//   async findAllByUser(email) {
//     try {
//       const find = await this.matchModel.findByEmail(email);
//       if (find.length > 0) {
//         const object = {
//           message: `User located successfully`,
//           email: await find[0].email,
//           name: await find[0].name,
//           nickname: await find[0].nickname,
//           phone: await find[0].phone,
//         };
//         return object;
//       } 
//       return null;
//     } catch (error) {
//       throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
//     }
//   };

  async registerMatch(body) {
    try {
      const [register] = await this.matchModel.registerMatch(body);
      console.log(register);
      if (register) {
        const registerRel = await this.matchModel.registerRelashionship(body);
        const [registeredMatch] = await this.matchModel.findById(register.insertId);
        const [findUser] = await this.userModel.findById(registeredMatch.adminId);
        const object = {
          message: `Match ${body.name} registered successfully`,
          name: await registeredMatch.name,
          date: await registeredMatch.date,
          hours: await registeredMatch.hours,
          userAdmin: await findUser.email,
        }
        return object;
      } 
      throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    } catch (error) {
      throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    }
  };

//   async updateMatch(body) {
//     try {
//       const update = await this.matchModel.updateUser(body);
//       if (update[0].affectedRows > 0) {
//         const [updatedUser] = await this.matchModel.findByEmail(body.email);
//         const object = {
//           message: `User ${body.name} registered successfully`,
//           email: await updatedUser.email,
//           name: await updatedUser.name,
//           nickname: await updatedUser.nickname,
//           phone: await updatedUser.phone,
//         }
//         return object;
//       } throw new Error(`An error occurred while trying to update for the user. Try again later (${error.message})`);
//     } catch (error) {
//       throw new Error(`An error occurred while trying to update for the user. Try again later (${error.message})`);
//     }
//   };

//   async deleteMatch(body) {
//     try {
//       const [remove] = await this.matchModel.deleteUser(body);
//       return (remove.affectedRows > 0);
//     } catch (error) {
//       throw new Error(`An error occurred while trying to delete for the user. Try again later (${error.message})`);
//     }
//   };
}

module.exports = MatchService;
