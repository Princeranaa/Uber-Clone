const userModel = require("../model/user_model");

exports.createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields must be required");
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
