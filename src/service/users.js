
const findByEmail = async (email) => {
    try {
        //procura um usuário pelo email e retorna o resultado da busca
        const find = await findUserByEmail(email);
        return find;
    } catch (error) {
        throw new console.error();
    }
};

const registerUser = async (body) => {
    return null;
};

const updateUser = async (body) => {
    const { email, name } = body;
    try {
        return null;
    } catch (error) {
        throw new console.error();
    }
};

const deleteUser = async (body) => {
    const { email, name } = body;
    try {
        return null;
    } catch (error) {
        throw new console.error();
    }
};

module.exports = {
    findByEmail,
    registerUser,
    updateUser,
    deleteUser,
};
