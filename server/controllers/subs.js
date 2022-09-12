const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await new Sub({
      name,
      slug: slugify(name),
      parent,
    }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create category failed');
  }
};

exports.list = async (req, res) => {
  const list = await Sub.find({}).sort({ createdAt: -1 }).exec();
  res.json(list);
};
exports.read = async (req, res) => {
  const Sub = await Sub({ slug: req.params.slug }).exec();
  res.json(Sub);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  const update = await Sub.findOneAndUpdate(
    { slug: req.params.slug },
    { name, slug: slugify(name) },
    { new: true }
  ).exec();
  res.json(update);
  try {
  } catch (err) {
    res.json(400).send('Failed to update');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    json.status(400).send('Failed to delete');
  }
};
