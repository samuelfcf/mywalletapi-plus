import connection from "../database.js";

class UsersRepository { 
  async create({ name, email, password}) {
    await connection.query(
      `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3);`,
      [name, email, password]
    );
  }

  async find({ email }) {
    const result = await connection.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email]
    );
    const existingUserWithGivenEmail = result.rows[0];
    return existingUserWithGivenEmail;
  }
}

export default UsersRepository;