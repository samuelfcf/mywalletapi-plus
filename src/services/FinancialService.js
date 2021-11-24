import FinancialRepository from "../repositories/FinancialRepository.js";

class FinancialService {
  async createNewFinancialEvent({userId, value, type}) {
    if (!['INCOME', 'OUTCOME'].includes(type)) {
      throw new Error('Invalid type');
    }

    if (value < 0) {
      throw new Error('Invalid value');
    }

    const financialRepository = new FinancialRepository();
    await financialRepository.create({
      userId,
      value,
      type
    });
  }

  async findEvents({userId}) {
    const financialRepository = new FinancialRepository();
    const events = await financialRepository.getEvents({userId});
    return events;
  }

  async calculateTotalSum({userId}){
    const financialRepository = new FinancialRepository();
    const events = await financialRepository.getEventsByOrderId({userId});

    const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    return sum;
  }
}

export default FinancialService;