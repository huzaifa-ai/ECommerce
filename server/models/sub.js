const mongoose = require('mongoose');
const SubSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [3, 'too short'],
    maxlength: [32, 'too long'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
});
module.exports = mongoose.model('Sub', SubSchema);
