
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Router = require('koa-router')
const router = new Router()

router.get('/movies', async (ctx, next) => {
  let movies = await Movie.find({}).sort({
    'meta.createAt': -1
  })

  ctx.body = movies
})

router.get('/movies/:mid', async (ctx, next) => {
  let movie = await Movie.findOne({
    _id: ctx.params.mid
  })

  ctx.body = movie
})

module.exports = router
