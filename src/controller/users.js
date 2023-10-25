const  user = require('../service/users');

const findByEmail = async (email) => {
    try {
        //procura um usuário pelo email e retorna o resultado da busca
        const find = await user.findByEmail(email);
        return res.status(200).json({ find });
    } catch (error) {
        return res.status(400).json({ message: `Try again later ${error.message}` });
    }
};

const registerUser = async (req, res) => {
    const { email, name } = req.body;
    try {
        //busca um usuário pelo seu email por meio da função findUser
        const findUser = await user.findByEmail(email);
        //Se existir um usuário já cadastrado com este email, retorna um erro 400
        if (findUser) return res.status(400).json({ message: `User already exists in the platform` });
        //Caso não exista um usuário com este email, aciona a camada service para realizar o cadastro do mesmo
        const register  = await user.registerUser(req.body);
        //Se houver retorno no regristo, então o usuário foi registrado com sucesso
        if (register) return res.status(200).send(`User ${name} registered successfully`);
        //Caso não haja retorno no registro, logo ocorreu um problema ao realizá-lo. Sendo assim, se faz necessário retornar um erro 400 informando isto.
        return res.status(400).send(`An error occurred while registering the user ${name}. Please try again.`);
    } catch (error) {
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
};

const updateUser = async (req, res) => {
    const { email, name } = req.body;
    try {
        //busca um usuário pelo seu email por meio da função findUser
        const findUser = await user.findByEmail(email);
        //Se não existir um usuário já cadastrado com este email, retorna um erro 400
        if (!findUser) return res.status(400).json({ message: `User not found` });
        //Caso exista um usuário com este email, aciona a camada service para realizar a atualização do mesmo
        const update  = await user.updateUser(req.body);
        //Se houver retorno na função da camada service, então o usuário foi atualizado com sucesso
        if (update) return res.status(200).send(`User ${name} updated successfully`);
        //Caso não haja retorno na atualização, logo ocorreu um problema ao realizá-la. Sendo assim, se faz necessário retornar um erro 400 informando isto.
        return res.status(400).send(`An error occurred while updating the user ${name}. Please try again.`);
    } catch (error) {
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
};

const deleteUser = async (req, res) => {
    const { email, name } = req.body;
    try {
        //busca um usuário pelo seu email por meio da função findUser
        const findUser = await user.findByEmail(email);
        //Se não existir um usuário já cadastrado com este email, retorna um erro 400
        if (!findUser) return res.status(400).json({ message: `User not found` });
        //Caso exista um usuário com este email, aciona a camada service para realizar a exclusão do mesmo
        const deleteU  = await user.deleteUser(req.body);
        //realiza uma nova consulta por email para garantir que não existe mais um usuário com o email informado
        const findUserDeleted = await user.findByEmail(email);
        //Se houver retorno na função da camada service, então o usuário foi atualizado com sucesso
        if (!findUserDeleted) return res.status(200).send(`User ${name} deleted successfully`);
        //Caso o usuário seja encontrado pelo seu email, logo ocorreu um problema ao deletar o mesmo. Sendo assim, se faz necessário retornar um erro 400 informando isto.
        return res.status(400).send(`An error occurred while removing the user ${name}. Please try again.`);
    } catch (error) {
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
};

module.exports = {
    findByEmail,
    registerUser,
    updateUser,
    deleteUser,
};
