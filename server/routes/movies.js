
const { prefix, get } = require('../lib/router')
const { getAllMovies, getMovie } = require('../controller/movie')

@prefix('/api/movies')
export class Movie {
  @get('/')
  async getAllMovies(ctx, next) {
    const movies = await getAllMovies()
    ctx.body = {
      success: true,
      data: movies,
      code: 0,
      err: ''
    }
  }

  @get('/:mid')
  async getOneMovie(ctx, next) {
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
  }
}

// router.get('/fetch/list', (ctx, next) => {
//   console.log('start fetching movie list')
//   require('../tasks/fetch-list')
// })
//
// router.get('/fetch/detail', (ctx, next) => {
//   console.log('start fetching details')
//   require('../tasks/fetch-detail')
// })
//
// router.get('/fetch/trailer', (ctx, next) => {
//   console.log('start fetching medias')
//   require('../tasks/fetch-trailer')
// })
//
// router.get('/fetch/oss', (ctx, next) => {
//   console.log('start uploading medias')
//   require('../tasks/oss')
// })
