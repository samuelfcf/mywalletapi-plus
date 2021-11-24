import UserServices from "../services/UserServices.js";

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.sendStatus(400);
      }

      const userService = new UserServices();
      const user = await userService.create({name, email, password});

      return res.status(201).send({
        message: 'User successfully created',
      });
    } catch (err) {
      if(err.message.includes('already')) {
        return res.status(409).send({
          message: err.message,
        });
      }

      return res.status(500).send({
        message: `Cannot create user. Error: ${err.message}`,
      });
    }
  }
}

export default new UserController();