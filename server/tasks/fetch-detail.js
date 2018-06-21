// http://api.douban.com/v2/movie/subject/:doubanId

const rp = require('request-promise-native')

async function fetch(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const data = await rp(url)
  return data
}

tmp = [
  {
    doubanId: '26660063',
    title: '淘气大侦探',
    rate: 6.4,
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2506862357.jpg'
  },
  { doubanId: '26654498',
    title: '爱你，西蒙',
    rate: 8.3,
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2523592367.jpg'
  }
]

;(async (movies) => {
  movies.map(async movie => {
    let movieDetail = await fetch(movie)
    try {
      movieDetail = JSON.parse(movieDetail)
      console.log(movieDetail.title)
      console.log(movieDetail.summary)
    } catch(err) {
      console.log(err)
    }
  })
})(tmp)
