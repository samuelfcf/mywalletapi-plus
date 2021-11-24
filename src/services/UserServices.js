import bcrypt from "bcrypt";
import UsersRepository from "../repositories/UsersRepository.js";

class UserServices {
  async create({ name, email, password}) {
    const userRepository = new UsersRepository();

    const userExists = await userRepository.find({ email });
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = await userRepository.create({ 
      name, 
      email, 
      password: hashedPassword,
    });

    return user;
  }
}

export default UserServices;