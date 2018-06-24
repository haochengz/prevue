
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

const getAllMovies = async () => {
  let movies = await Movie.find({}).sort({
    'meta.createdAt': -1
  })
  return movies
}

const getMovie = async id => {
  let movie = await Movie.findOne({
    _id: id
  })
  return movie
}

module.exports = {
  getAllMovies,
  getMovie
}
