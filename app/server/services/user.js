const { User } = require('../models/user');
const helper = require('../models/mongo_helper');

/* Creates new user */
const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      matricNumber,
      program,
      graduationYear
    });
    user.setPassword(password);
    const validUser = await user.save();
    if (validUser) {
      return [true, user];
    }
  } catch (error) {
    return [false, helper.translateError(error)]
  }
};

/* Authenticate a user */
const authenticate = async (email, password) => {
  const user = await User.findOne({ email })
  if (user && user.validPassword(password, user.salt)) {
    return [true, user];
  } else {
    return [false, ["Invalid email/password"]];
  }
};

/* Return user with specified id */
const getById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    return helper.translateError(error)
  }
};

/* Return all users */
const getAll = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    return helper.translateError(error);
  }
};



module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};