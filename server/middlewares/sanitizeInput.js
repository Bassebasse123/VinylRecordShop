import { check, validationResult } from "express-validator";

const sanitizeInput = [
  check("firstName").trim().escape(),
  check("lastName").trim().escape(),
  // check("age").trim().escape(),
  check("email").trim().escape().normalizeEmail(),
  // check("avatarUrl").trim().escape(),
  check("password").trim().escape(),
  // check("passwordConfirm").trim().escape(),

  (req, res, next) => {
    const results = validationResult(req);

    results.isEmpty()
      ? next()
      : res.status(422).json({ errors: results.errors });
  },
];

export default sanitizeInput;
