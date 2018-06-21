
const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/subject/`
const doubanId = `26416062`
const videoPage = `https://movie.douban.com/trailer/230185/`
const videoCoverUrl = `https://img3.doubanio.com/img/trailer/medium/2523478805.jpg`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Crawling started')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url + doubanId, {
    waitUntil: 'networkidle2'
  })
  await sleep(3000)

  const result = await page.evaluate(() => {
    var $ = window.$
    var videoCover = $('.related-pic-video').attr('style')
    videoCover = videoCover.split('background-image:url(')[1]
    var videoPage = $('.related-pic-video').attr('href')

    return {
      videoPage,
      videoCover
    }
  })

  if(result.videoPage) {
    await page.goto(result.videoPage, {
      waitUntil: 'networkidle2'
    })
    await sleep(3000)

    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')

      if (it && it.length > 0) {
        return it.attr('src')
      }
      return ''
    })
  }

  const data = {
    doubanId,
    video,
    cover: result.videoCover
  }
  browser.close()
  process.send(data)
  process.exit(0)
})()
