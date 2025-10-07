const { Router } = require("express");
const { param, validationResult } = require("express-validator");
const passport = require("passport");

const gamerecordController = require("../controllers/gamerecordController");

const router = Router();

// router.use(passport.authenticate("jwt", { session: false }));

const sendValidationResults = (req, res, next) => {
  const validations = validationResult(req);
  if (!validations.isEmpty()) {
    res.status(400).json({
      errors: validations.array(),
    });
  }
  next();
};

router.use(
  "/:id",
  param("id").isNumeric().withMessage("Gameplay Id should be a number"),
  sendValidationResults
);

router.post("/", gamerecordController.createGamerecord);

router.get("/:id", gamerecordController.getGamerecord);

// router.put("/:id", gamerecordController.updateCharacter);

// router.delete("/:id", gamerecordController.deleteCharacter);

router.get("/", gamerecordController.getGamerecords);

module.exports = router;
