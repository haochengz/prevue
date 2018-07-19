
const Router = require('koa-router')
const router = new Router()
const { getAllMovies, getMovie } = require('../controller/movie')

router.get('/api/movies', async (ctx, next) => {
  const movies = await getAllMovies()
  ctx.body = {
    success: true,
    data: movies,
    code: 0,
    err: ''
  }
})

router.get('/api/movies/:mid', async (ctx, next) => {
  const movie = await getMovie(ctx.params.mid)
  ctx.body = {
    success: true,
    data: {
      movie,
      relativeMovies: []
    },
    code: 0,
    err: ''
  }
})

router.get('/fetch/list', (ctx, next) => {
  console.log('start fetching movie list')
  require('../tasks/fetch-list')
})

router.get('/fetch/detail', (ctx, next) => {
  console.log('start fetching details')
  require('../tasks/fetch-detail')
})

router.get('/fetch/trailer', (ctx, next) => {
  console.log('start fetching medias')
  require('../tasks/fetch-trailer')
})

router.get('/fetch/oss', (ctx, next) => {
  console.log('start uploading medias')
  require('../tasks/oss')
})
module.exports = router
