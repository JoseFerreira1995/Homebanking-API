const fs = require("fs/promises");
const path = require("path");

const userfilePath = path.join(__dirname, "../Data/users.jason");

const createUser = async ({ email, password }) => {
  try {
    const users = await getUsers();
    const user = {
      id: users.length + 1,
      email,
      password,
      balance: 0,
      transactions: [],
    };
    users.push(user);
    await saveUsers(users);
    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Couldn't create user");
  }
};

const getUserByEmail = async (email) => {
  try {
    const users = await getUsers();
    return users.find((user) => user.email === email);
  } catch (err) {
    console.log(err);
    throw new Error("Couldn't find user with email " + email);
  }
};

const getUserById = async (id) => {
  try {
    const users = await getUser();
    return users.find((user) => user.id === id);
  } catch (err) {
    console.log(err);
    throw new Error("Couldn't find user with id ");
  }
};

const updateUser = async (user) => {
  try {
    const users = await getUser();
    const updateUsers = users.map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });
    await saveUseres(updateUsers);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update user");
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
};
