const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    hrEmail: {
      type: String,
      required: true,
      trim: true,
    },
    candidates: {
      type: [String],
      default: [],
    },
    approves: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    salary: {
      type: String,
    },
    expireDate: {
      type: String,
    },
    type: {
      type: String,
    },
    quantity: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
    },
    exp: {
      type: String,
    },
    description: {
      type: String,
    },
    requirement: {
      type: String,
    },
    benefit: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyLocation: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    website: {
      type: String,
    },
    companyIntro: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
