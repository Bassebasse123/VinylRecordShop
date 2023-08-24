import { check, validationResult } from "express-validator";

const validateInput = [
  check("firstName")
    .notEmpty()
    .withMessage("First Name is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be between 3 and 50 character"),

  check("lastName")
    .notEmpty()
    .withMessage("Last Name is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Last name must be between 3 and 50 character"),

  // check("age")
  //   .notEmpty()
  //   .withMessage("Age is Required")
  //   .isInt({ min: 18 })
  //   .withMessage("Age must be at least 18 years"),

  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email Address"),

  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  // check("passwordConfirm")
  //   .notEmpty()
  //   .withMessage("Password Confirm is Required")
  //   .isLength({ min: 8 })
  //   .withMessage("Password must be at least 8 characters")
  //   .custom((value, { req }) => {
  //     if (value == req.body.password) {
  //       return true;
  //     }
  //     throw new Error("Password do not match");
  //   }),

  (req, res, next) => {
    const results = validationResult(req);

    results.isEmpty()
      ? next()
      : res.status(422).json({ errors: results.errors });
  },
];

export default validateInput;
