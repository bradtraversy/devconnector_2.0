const { body, validationResult } = require('express-validator');

//Register Form
const registerRules = () => [
  body('name', 'Name is required ').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({
    min: 6,
    max: 20
  })
];

//Login Form
const loginRules = () => [
  body('email', ' this feild require a valid mail').isEmail(),
  body('password', 'Password is required ').exists()
];

//Profile Form
const profileRules = () => [
  body('status', 'Status is required').notEmpty(),
  body('skills', 'Skills is required').notEmpty()
];

//Experience Form
const experienceRules = () => [
  body('title', 'Title is required').notEmpty(),
  body('company', 'Company is required').notEmpty(),
  body('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
];
//Education Form
const educationRules = () => [
  body('school', 'school is required').notEmpty(),
  body('degree', 'degree is required').notEmpty(),
  body('fieldofstudy', 'Field of study is required').notEmpty(),
  body('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
];

//Post Form
const postRules = () => [body('text', 'text is required ').notEmpty()];

//comment Form
const commentRules = () => [body('text', 'comment is required ').notEmpty()];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};

module.exports = validationForms = {
  validator,
  registerRules,
  loginRules,
  profileRules,
  experienceRules,
  educationRules,
  postRules,
  commentRules
};
