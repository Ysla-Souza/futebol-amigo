const UserService = require('../service/users');

class UserController {
  userService = new UserService();

  async findByEmail(req, res) {
    const { email } = req.body;
    try {
      // Procura um usuário pelo email e retorna o resultado da busca
      const find = await this.userService.findByEmail(email);
      if (find) return res.status(200).json(find);
      return res.status(200).json({ message: 'Nenhum usuário com o e-mail informado foi encontrado' });
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Try again later ${error.message}` });
    }
  };

  async registerUser(req, res) {
    const { email, name } = req.body;
    try {
      // Busca um usuário pelo seu email por meio da função findUser
      const findUser = await this.userService.findByEmail(email);
      // Se existir um usuário já cadastrado com este email, retorna um erro 400
      if (findUser) return res.status(400).json({ message: `User already exists in the platform` });
      // Caso não exista um usuário com este email, aciona a camada de serviço para realizar o cadastro do mesmo
      const register = await this.userService.registerUser(req.body);
      // Se houver retorno no registro, então o usuário foi registrado com sucesso
      if (register) return res.status(200).json(register);
      // Caso não haja retorno no registro, logo ocorreu um problema ao realizá-lo. Sendo assim, se faz necessário retornar um erro 400 informando isto.
      return res.status(400).send(`An error occurred while registering the user ${name}. Please try again.`);
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
  };

  async updateUser(req, res) {
    const { email, name } = req.body;
    try {
      // Busca um usuário pelo seu email por meio da função findUser
      const findUser = await this.userService.findByEmail(email);
      // Se não existir um usuário já cadastrado com este email, retorna um erro 400
      if (!findUser) return res.status(400).json({ message: `User not found` });
      // Caso exista um usuário com este email, aciona a camada de serviço para realizar a atualização do mesmo
      const update = await this.userService.updateUser(req.body);
      // Se houver retorno na função da camada de serviço, então o usuário foi atualizado com sucesso
      if (update) return res.status(200).json(update);
      // Caso não haja retorno na atualização, logo ocorreu um problema ao realizá-la. Sendo assim, se faz necessário retornar um erro 400 informando isto.
      return res.status(400).send(`An error occurred while updating the user ${name}. Please try again.`);
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
  };

  async deleteUser(req, res) {
    const { email, name } = req.body;
    try {
      // Busca um usuário pelo seu email por meio da função findUser
      const findUser = await this.userService.findByEmail(email);
      // Se não existir um usuário já cadastrado com este email, retorna um erro 400
      if (!findUser) return res.status(400).json({ message: `User not found` });
      // Caso exista um usuário com este email, aciona a camada de serviço para realizar a exclusão do mesmo
      const deleteU = await this.userService.deleteUser(req.body);
      // Realiza uma nova consulta por email para garantir que não existe mais um usuário com o email informado
      if (deleteU) return res.status(200).send(`User ${name} deleted successfully`);
      // Caso o usuário seja encontrado pelo seu email, logo ocorreu um problema ao deletar o mesmo. Sendo assim, se faz necessário retornar um erro 400 informando isto.
      return res.status(400).send(`An error occurred while removing the user ${name}. Please try again.`);
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
  };
}

module.exports = UserController;
