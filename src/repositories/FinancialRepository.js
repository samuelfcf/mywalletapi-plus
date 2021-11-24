import connection from "../database.js";

class FinancialRepository {
  async create({userId, value, type}) {
    await connection.query(
      `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
      [userId, value, type]
    );
  }

  async getEvents({userId}) {
    const events = await connection.query(
      `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
      [userId]
    );
    return events.rows;
  }

  async getEventsByOrderId({userId}) {
    const events = await connection.query(
      `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
      [userId]
    );

    return events.rows;
  }
}

export default FinancialRepository;