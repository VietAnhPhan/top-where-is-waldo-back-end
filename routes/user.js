const { Router } = require("express");
const { param, validationResult, body } = require("express-validator");
const passport = require("passport");

const userController = require("../controllers/userController");

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

const validateName = (req, res, next) => {
  const validations = validationResult(req);
  if (!validations.isEmpty()) {
    res.status(400).json(validations.array());
  }
  next();
};

router.use(
  "/:id",
  param("id").isNumeric().withMessage("User Id should be a number"),
  sendValidationResults
);

router.post("/", userController.createUser);

router.get("/:id", userController.getUser);

router.put(
  "/:id",
  body("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name should not be empty and at minimum 3 character length"),
  validateName,
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

router.get("/", userController.getAllUser);

module.exports = router;
