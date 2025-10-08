const { Router } = require("express");
const { param, validationResult } = require("express-validator");
const passport = require("passport");

const moveController = require("../controllers/moveController");

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

router.post("/", moveController.createMove);

router.get("/:id", moveController.getMove);

// router.put("/:id", moveController.updateMove);

// router.delete("/:id", moveController.deleteMove);

router.get("{gameplayId=:gameplayId&userId=:userId}", moveController.getMoves);

module.exports = router;
