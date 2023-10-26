const MatchService = require('../service/matches');

class MatchController {
  matchService = new MatchService();

    async findByName(req, res) {
        const matchName = req.params.name;
        try {
        // Procura uma partida pelo nome e retorna o resultado da busca
        const find = await this.matchService.findByName(matchName);
        if (find) return res.status(200).json(find);
        return res.status(200).json({ message: 'No match with the provided name was found.' });
        } catch (error) {
        // Se ocorrer um erro, retorna uma resposta de erro
        return res.status(400).json({ message: `Try again later ${error.message}` });
        }
    };

  async findAllByUser(req, res) {
    const { email } = req.body;
    try {
      // Procura um usuário pelo email e retorna o resultado da busca
      const find = await this.matchService.findAllByUser(email);
      if (find) return res.status(200).json(find);
      return res.status(200).json({ message: 'Nenhum usuário com o e-mail informado foi encontrado' });
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Try again later ${error.message}` });
    }
  };

  async registerMatch(req, res) {
    const { name } = req.body;
    try {
      // Busca um usuário pelo seu email por meio da função findUser
      const findUser = await this.matchService.findByName(name);
      // Se existir um usuário já cadastrado com este email, retorna um erro 400
      if (findUser) return res.status(400).json({ message: `Match already exists in the platform` });
      // Caso não exista um usuário com este email, aciona a camada de serviço para realizar o cadastro do mesmo
      const register = await this.matchService.registerMatch(req.body);
      // Se houver retorno no registro, então o usuário foi registrado com sucesso
      if (register) return res.status(200).json(register);
      // Caso não haja retorno no registro, logo ocorreu um problema ao realizá-lo. Sendo assim, se faz necessário retornar um erro 400 informando isto.
      return res.status(400).send(`An error occurred while registering the user ${name}. Please try again.`);
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
  };

  async updateMatch(req, res) {
    const { name } = req.body;
    try {
      // Busca um usuário pelo seu email por meio da função findUser
      const findMatch = await this.matchService.findByName(name);
      // Se não existir um usuário já cadastrado com este email, retorna um erro 400
      if (!findMatch) return res.status(400).json({ message: `Match not found` });
      // Caso exista um usuário com este email, aciona a camada de serviço para realizar a atualização do mesmo
      const update = await this.matchService.updateMatch(req.body);
      // Se houver retorno na função da camada de serviço, então o usuário foi atualizado com sucesso
      if (update) return res.status(200).json(update);
      // Caso não haja retorno na atualização, logo ocorreu um problema ao realizá-la. Sendo assim, se faz necessário retornar um erro 400 informando isto.
      return res.status(400).send(`An error occurred while updating the Match ${name}. Please try again.`);
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
  };

  async deleteMatch(req, res) {
    const { name } = req.body;
    try {
      // Busca um usuário pelo seu email por meio da função findUser
      const findUser = await this.matchService.findByName(name);
      // Se não existir um usuário já cadastrado com este email, retorna um erro 400
      if (!findUser) return res.status(400).json({ message: `User not found` });
      // Caso exista um usuário com este email, aciona a camada de serviço para realizar a exclusão do mesmo
      const deleteU = await this.matchService.deleteMatch(req.body);
      // Realiza uma nova consulta por email para garantir que não existe mais um usuário com o email informado
      if (deleteU) return res.status(200).json({ message: `User ${name} deleted successfully` });
      // Caso o usuário seja encontrado pelo seu email, logo ocorreu um problema ao deletar o mesmo. Sendo assim, se faz necessário retornar um erro 400 informando isto.
      return res.status(400).send(`An error occurred while removing the user ${name}. Please try again.`);
    } catch (error) {
      // Se ocorrer um erro, retorna uma resposta de erro
      return res.status(400).json({ message: `Please, try again (${error.message})` });
    }
  };
}

module.exports = MatchController;
