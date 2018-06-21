const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchDetail(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  let data = {}
  try {
    data = await rp(url)
    data = JSON.parse(data)
  } catch(error) {
    console.log('Network error when downloading: ' + url)
    // console.log(error)
  }
  return data
}

async function fetchAttr(item) {
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`
  let data = {}
  try {
    data = await rp(url)
    data = JSON.parse(data)
  } catch(error) {
    console.log('Network error when downloading: ' + url)
    // console.log(error)
  }
  return data
}

;(async () => {
  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false}},
      { summary: null },
      { title: '' },
      { summary: '' }
    ]
  })

  movies.forEach(async movie => {
    let data = {}
    try {
      data = await fetchDetail(movie)
    } catch(error) {
      console.log(error)
    }
    if (data) {
      movie.title = data.title || ''
      movie.summary = data.summary || ''
      movie.rate = data.rating.average || 0
      movie.year = data.year
      movie.rawTitle = data.originaltitle || ''
      movie.types = data.genres || []
    }
    try {
      data = await fetchAttr(movie)
    } catch(error) {
      console.log(error)
    }
    if (data) {
      // tags:
      if (data.tags && !movie.tags) {
        movie.tags = []
        data.tags.forEach(item => {
          movie.tags.push(item.name)
        })
      }
      // release date:
      let date = data.attr.pubDate || []
      date.map(item => {
        if (item && item.split('(').length > 0) {
          let parts = item.split('(')
          let date = parts[0]
          let country = 'Unknown'
          if(parts[1]) {
            country = parts[1].split(')')[0]
          }
          return {
            date: new Date(date),
            country
          }
        }
      })
      movie.pubDate = date
      // movie types:
      if (!movie.types) {
        movie.types = data.attr.movie_type
      }
      movie.types.forEach(async item => {
        let cat = await Category.findOne({
          name: item
        })
        if (!cat) {
          cat = new Category({
            name: item,
            movie: [movie._id]
          })
        } else {
          if (cat.movies.indexOf(movie._id) === -1) {
            cat.movies.push(movie._id)
          }
        }
        await cat.save()
        if (!movie.category) {
          movie.category.push(cat._id)
        } else {
          if (movie.category.indexOf(cat._id) === -1) {
            movie.category.push(cat._id)
          }
        }
      })
    }
    await movie.save()
  })
})()
