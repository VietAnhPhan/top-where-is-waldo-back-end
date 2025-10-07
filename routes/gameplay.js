const { Router } = require("express");
const { param, validationResult } = require("express-validator");
const passport = require("passport");

const gameplayController = require("../controllers/gameplayController");

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

router.post("/", gameplayController.createGameplay);

router.get("/:id", gameplayController.getGameplay);

// router.put("/:id", gameplayController.updateCharacter);

// router.delete("/:id", gameplayController.deleteCharacter);

router.get("/", gameplayController.getGameplays);

module.exports = router;
