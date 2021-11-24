import AuthService from "../services/AuthService.js";

class AuthController {
  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.sendStatus(400);
      }

      const authService = new AuthService();
      const token = await authService.authenticate({
        email,
        password,
      });
      
      return res.status(200).send({
        token
      });
    } catch (err) {
      if (err.message.includes('Invalid')) {
        return res.status(401).send({
          message: err.message,
        });
      }

      return res.status(500).send({
        message: 'Cannot authenticate user. Error: ' + err.message,
      });
    }
  }
}

export default new AuthController();