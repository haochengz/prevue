
const Router = require('koa-router')
const router = new Router()
const { getAllMovies, getMovie } = require('../controller/movie')

router.get('/movies', async (ctx, next) => {
  const movies = await getAllMovies()
  ctx.body = {
    count: movies.length,
    movies,
    status: 0,
    msg: 'success'
  }
})

router.get('/movies/:mid', async (ctx, next) => {
  const movie = await getMovie(ctx.params.mid)
  ctx.body = {
    count: 1,
    movie,
    status: 0,
    msg: 'success'
  }
})

module.exports = router
