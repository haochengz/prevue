
const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

;(async () => {
  let movies = await Movie.find({
    $or: [
      { video: { $exists: false }},
      { video:  null }
    ]
  })
  const scriptPath = resolve(__dirname, '../crawler/trailer-video.js')
  const child = cp.fork(scriptPath, [])
  let invoked = false

  child.on('err', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code: ' + code)
    console.log(err)
  })

  child.on('message', async data => {
    const doubanId = data.doubanId
    let movie = await Movie.findOne({
      doubanId: doubanId
    })

    if (data.video) {
      movie.video = data.video
      movie.cover = data.cover
      await movie.save()
    } else {
      console.log('REMOVING DATA WARNING')
      // await.movie.remove()
    }
  })

  child.send(movies)
  // child.send([movies[0]])
})()
