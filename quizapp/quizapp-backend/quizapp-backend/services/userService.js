const User = require("../models/userModel");
const { translateError } = require("./mongo_helper");

const saveUser = async ({ name }) => {
  try {
    let newUser = new User({ name });
    if (await newUser.save()) {
      return [true, newUser];
    }
  } catch (err) {
    return [false, translateError(err)];
  }
};

const updateUserScore = async (id, score) =>
  await User.findByIdAndUpdate(id, { score }, { new: true });

module.exports = {
  saveUser,
  updateUserScore,
};
