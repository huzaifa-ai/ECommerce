const { connect } = require('mongoose');
const User = require('../models/user');

exports.createupdateUser = async (req, res) => {
  const { name, email, picture } = req.user;

  const user = await User.findOneAndUpdate(
    {
      email,
    },
    {
      name,
      picture,
    },
    {
      new: true,
    }
  );
  if (user) {
    console.log('user updated');
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log('New user added');
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
      console.log(user);
    }
  });
};
