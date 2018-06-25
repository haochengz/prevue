
let secret = null
if (process.NODE_ENV === 'production') {
  secret = require('/root/var/secret')
} else {
  secret = require('../../secret')
}
const co = require('co')
const nanoid = require('nanoid')
const request = require('request')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

const OSS = require('ali-oss')
const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: secret.aliOss.accessKeyId,
  accessKeySecret: secret.aliOss.accessKeySecret
})

function upload(url, extension) {
  return co(function *() {
    client.useBucket('prevue')
    console.log('start a ' + url + ' upload')
    let stream = request(url)
    let result = yield client.putStream(nanoid() + extension, stream)
    return result
  })
}

;(async () => {
  let movies = await Movie.find({
    $or: [
      { videoKey: { $exists: false }},
      { videoKey: null },
      { videoKey: '' },
      { posterKey: { $exists: false }},
      { posterKey: null },
      { posterKey: '' }
    ]
  })

  console.log('Find ' + movies.length + ' movies to upload')
  for(let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    if (movie && movie.video && !movie.videoKey) {
      let result = await upload(movie.video, '.mp4')
      if (result && result.name) {
        movie.videoKey = result.name
      }
    }

    if (movie && movie.cover && !movie.coverKey) {
      result = await upload(movie.cover, '.jpg')
      if (result && result.name) {
        movie.coverKey = result.name
      }
    }

    if (movie && movie.poster && !movie.posterKey) {
      result = await upload(movie.poster, '.jpg')
      if (result && result.name) {
        movie.posterKey = result.name
      }
    }
    await movie.save()
  }
  console.log('End upload')
})()
