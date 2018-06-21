const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

const detailApiPrefix = 'http://api.douban.com/v2/movie/subject/'
const AttrApiPrefix = 'http://api.douban.com/v2/movie/subject/'

async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

async function fetch(item, prefix) {
  const url = prefix + item.doubanId
  let data = {}

  try {
    data = await rp(url)
  } catch(error) {
    console.log('Network error when downloading: ' + url)
  }

  data = await verify(data)
}

async function verify(data) {
  if (!data) {
    return {}
  } else {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch(error) {
        console.log('Error occurs when parsing to JSON')
        console.log(error)
        return {}
      }
    }
  }
  return checkStatus(data)
}

function checkStatus(data) {
  if (data && data.code) {
    console.log('request error')
    console.log(`${data.code}: ${data.msg}`)
    return {}
  } else {
    return data
  }
}

async function fetchDetail(item) {
  return fetch(item, detailApiPrefix)
}

async function fetchAttr(item) {
  return fetch(item, AttrApiPrefix)
}

async function getMoviesUncomplete() {
  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false}},
      { summary: null },
      { title: '' },
      { summary: '' }
    ]
  })
  return movies
}

function extractDetailsTo(data, movie) {
  if (data) {
    movie.title = data.title || ''
    movie.summary = data.summary || ''
    movie.rate = data.rating.average || 0
    movie.year = data.year
    movie.rawTitle = data.originaltitle || ''
    movie.types = data.genres || []
  }
}

function buildTags(data, movie) {
  if (data.tags && !movie.tags) {
    movie.tags = []
    data.tags.forEach(item => {
      movie.tags.push(item.name)
    })
  }
}

function buildPubdate() {
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
}

async function buildTypes(movie) {
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

async function extractAttrsTo(data, movie) {
  if (data) {
    buildTags(data, movie)
    // release date:
    let date = data.attr.pubDate || []
    movie.pubDate = buildPubdate(data)
    // movie types:
    if (!movie.types) {
      movie.types = data.attr.movie_type
    }
    await buildTypes(movie)
  }
}

;(async () => {
  let movies = await getMoviesUncomplete()
  movies.forEach(async movie => {
    let data = await fetchDetail(movie)
    if (data) {
      extractDetailsTo(data, movie)
      data = await fetchAttr(movie)
      await extractAttrsTo(data, movie)
      await movie.save()
      await sleep(2000)
    } else {
      console.log('Empty data')
    }
  })
})()
