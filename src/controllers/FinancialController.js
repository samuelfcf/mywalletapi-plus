import FinancialService from "../services/FinancialService.js";

class FinancialController {
  async createFinancialEvent(req, res) {
    const { value, type } = req.body;
    const { id } = req.user;

    try {
      if (!value || !type) {
        return res.sendStatus(400);
      }

      const finacialService = new FinancialService();
      await finacialService.createNewFinancialEvent({
        userId: id,
        value,
        type
      })

      return res.sendStatus(201);
    } catch (err) {
      if (err.message.includes('Invalid')) {
        return res.status(400).send({
          message: err.message,
        })
      }

      return res.status(500).send({
        message: `Cannot create event. Error: ${err.message}`
      });
    }
  }

  async getEvents(req, res) {
    const { id } = req.user;

    try {
      const financialService = new FinancialService();
      const events = await financialService.findEvents({
        userId: id,
      });

      return res.status(200).send(events);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async getTotalSum(req, res) {
    const { id } = req.user;

    try {
      const financialService = new FinancialService();
      const sum = await financialService.calculateTotalSum({
        userId: id,
      });
      
      return res.status(200).send({sum});
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}

export default new FinancialController();