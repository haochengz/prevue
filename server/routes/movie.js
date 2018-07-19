
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
