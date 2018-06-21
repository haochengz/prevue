
const mongoose = require('mongoose')
const { Mixed, ObjectId } = mongoose.Schema.Types

const movieSchema = new mongoose.Schema({
  doubanId: {
    unique: true,
    required: true,
    type: String
  },
  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
  title: String,
  rate: Number,
  summary: String,
  video: String,
  videoKey: String,
  posterKey: String,
  coverKey: String,
  poster: String,
  cover: String,
  rawTitle: String,
  types: [String],
  pubDate: Mixed,
  year: Number,
  tags: Array,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

movieSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Movie', movieSchema)
