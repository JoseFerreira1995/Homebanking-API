const userModel = require("../model/userModel");

const getUserTransactions = async (request, h) => {
  try {
    const { id } = request.auth.credentials;

    const user = await userModel.getUserById(id);

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    return h
      .response({ balance: user.balance, transactions: user.transactions })
      .code(200);
  } catch (err) {
    return h.response({ message: "Failed to get transactions" }).code(500);
  }
};

const addMoneyToAccount = async (request, h) => {
  try {
    const { id } = request.auth.credentials;
    const { amount } = request.payload;

    const user = await userModel.getUserById(id);
    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    user.balance += amount;
    user.transactions.push({ type: "deposit", amount });

    await userModel.updateUser(user);

    return h
      .response({
        message: "You added successfully `${amount}` to your account",
      })
      .code(200);
  } catch (err) {
    return h.response({ message: "Failed to add money to account" }).code(500);
  }
};

const withdrawMoney = async (request, h) => {
  try {
    const { id } = request.auth.credentials;
    const { amount } = request.payload;

    const user = await userModel.getUserById(id);
    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    if (user.balance < amount) {
      return h
        .response({ message: "You do not have enough funds to withdraw" })
        .code(400);
    }

    user.balance -= amount;
    user.transactions.push({ type: "withdraw", amount });

    await userModel.updateUser(user);

    return h
      .response({
        message: "You successfully withdrew `${amount}` from your account",
      })
      .code(200);
  } catch (err) {
    return h.response({ message: "Failed to withdraw from account" }).code(500);
  }
};

module.exports = {
  getUserTransactions,
  addMoneyToAccount,
  withdrawMoney,
};
