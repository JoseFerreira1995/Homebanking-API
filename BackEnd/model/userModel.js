const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const userfilePath = path.join(__dirname, "../data", "users.json");

const getUsers = async () => {
  try {
    const data = await fs.readFile(userfilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Failed to read user");
  }
};
const createUser = async ({ email, password }) => {
  try {
    const users = await getUsers();
    const user = {
      id: uuidv4(),
      email,
      password,
      balance: 0,
      transactions: [],
    };

    users.push(user);
    await saveUsers(users);

    return user;
  } catch (err) {
    throw new Error("Couldn't create user");
  }
};

const getUserByEmail = async (email) => {
  try {
    const users = await getUsers();
    return users.find((user) => user.email === email);
  } catch (err) {
    throw new Error(" Failed to get user from email");
  }
};

const getUserById = async (id) => {
  try {
    const users = await getUsers();
    return users.find((user) => user.id === id);
  } catch (err) {
    throw new Error("Couldn't find user with id ");
  }
};

const updateUser = async (user) => {
  try {
    const users = await getUsers();
    const updateUsers = users.map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });
    await saveUsers(updateUsers);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update user");
  }
};

const saveUsers = async (users) => {
  try {
    const data = JSON.stringify(users);
    await fs.writeFile(userfilePath, data, "utf-8");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to save user");
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
};
