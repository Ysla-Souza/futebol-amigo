const MatchModel = require('../model/matches');
const UserModel = require('../model/users');

class MatchService {
  matchModel = new MatchModel();
  userModel = new UserModel();

  async findByName(matchName, phrase) {
    try {
      const findMatch = await this.matchModel.findByName(matchName);
      if (findMatch.length > 0) {
        const [findUser] = await this.userModel.findById(findMatch[0].adminId);
        console.log(findMatch);
        const findMatchInRelashionship = await this.matchModel.findMatchInUser_has_matches(findMatch[0].matches_id);
        console.log(findMatchInRelashionship);
        const arrayGuests = [];
        
        for(let i = 0; i < findMatchInRelashionship.length; i += 1) {
          const [guestUser] = await this.userModel.findById(findMatchInRelashionship[i]);
          arrayGuests.push(guestUser);
        }

        let message = phrase;
        if (!phrase) {
          message = `Match located successfully`;
        }

        const object = {
          message: message,
          id: await findMatch[0].matches_id,
          name: await findMatch[0].name,
          date: await findMatch[0].data_time.toISOString().split('T')[0], // Dividir a Data
          hours: await findMatch[0].data_time.toISOString().split('T')[1].slice(0, 8),
          userAdmin: await findUser.email,
          guests: arrayGuests,
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
        const findMatch = await this.findByName(body.name, `Match ${body.name} registered successfully`);
        return findMatch;
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

  async deleteMatch(body) {
    try {
      const findMatch = await this.findByName(body.name);
      await this.matchModel.deleteMatchInRelashionship(findMatch.id);
      const [remove] = await this.matchModel.deleteMatch(body);
      return (remove.affectedRows > 0);
    } catch (error) {
      throw new Error(`An error occurred while trying to delete for the user. Try again later (${error.message})`);
    }
  };
}

module.exports = MatchService;
