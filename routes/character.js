const { Router } = require("express");
const { param, validationResult } = require("express-validator");
const passport = require("passport");

const characterController = require("../controllers/characterController");

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
  param("id").isNumeric().withMessage("Character Id should be a number"),
  sendValidationResults
);

router.post("/", characterController.createCharacter);

router.get("/:id", characterController.getCharacter);

router.put("/:id", characterController.updateCharacter);

router.delete("/:id", characterController.deleteCharacter);

router.get("/", characterController.getCharacters);

module.exports = router;
