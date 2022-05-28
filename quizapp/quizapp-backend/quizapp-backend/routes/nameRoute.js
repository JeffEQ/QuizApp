const {
  nameSaveController,
  editScoreController,
} = require("../controllers/nameController");
const router = require("express").Router();

router.post("/save", nameSaveController);
router.post("/editscore", editScoreController);
module.exports = router;
