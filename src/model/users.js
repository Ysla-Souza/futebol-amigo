const  connection = require('../connection');

const findByEmail = async (email) => {
    try {
        //procura um usuário pelo email e retorna o resultado da busca
        const find = await model.findByEmail(email);
        return find;
    } catch (error) {
        throw new Error(`An error occurred while trying to search for the user. Try again later (${error.message})`);
    }
};

const registerUser = async (body) => {
    try {
        const register = await model.registerUser(body);
        return register;
    } catch (error) {
        throw new Error(`An error occurred while trying to register for the user. Try again later (${error.message})`);
    }
};

const updateUser = async (body) => {
    try {
        const update = await model.registerUser(body);
        return update;
    } catch (error) {
        throw new Error(`An error occurred while trying to update for the user. Try again later (${error.message})`);
    }
};

const deleteUser = async (body) => {
    try {
        const remove = await model.registerUser(body);
        return remove;
    } catch (error) {
        throw new Error(`An error occurred while trying to delete for the user. Try again later (${error.message})`);
    }
};

module.exports = {
    findByEmail,
    registerUser,
    updateUser,
    deleteUser,
};
