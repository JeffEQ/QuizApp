const { saveUser, updateUserScore } = require("../services/userService");
const { responseHandler } = require("../utils/responseHandler");

const nameSaveController = async (req, res) => {
  const newName = await saveUser(req.body);

  if (newName[0]) {
    return responseHandler(
      res,
      "User registered successfully",
      201,
      true,
      newName[1]
    );
  }
  return responseHandler(
    res,
    "Unable to register User",
    400,
    false,
    newName[1]
  );
};

const editScoreController = async (req, res) => {
  const { id, score } = req.body;
  let check = await updateUserScore(id, score);

  if (check) {
    return responseHandler(res, "User score updated", 200, true, check);
  }
  return responseHandler(
    res,
    "User score was unable to update",
    400,
    false,
    ""
  );
};

module.exports = { nameSaveController, editScoreController };
