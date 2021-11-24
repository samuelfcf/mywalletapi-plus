import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersRepository from "../repositories/UsersRepository.js";

class AuthService {
  async authenticate({ email, password}) {
    const userRepository = new UsersRepository();

    const userExists = await userRepository.find({ email });
    if (!userExists) {
      throw new Error('Invalid credentials');
    }

    const passMatch = bcrypt.compareSync(password, userExists.password);
    if (!passMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({
      id: userExists.id
    }, process.env.JWT_SECRET);

    return token;
  }
}

export default AuthService;