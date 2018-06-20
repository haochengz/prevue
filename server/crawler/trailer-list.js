
const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=%E7%BE%8E%E5%9B%BD,%E7%94%B5%E5%BD%B1'

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
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  await sleep(3000)

  await page.waitForSelector('.more')
  for(let i = 0; i < 2; i++) {
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var links = []
    if (items.length >= 1) {
      items.each((index, item) => {
        console.log('Start to collecting data')
        var it = $(item)
        var doubanId = it.find('div').attr('data-id')
        var title = it.find('.title').text()
        var rate = Number(it.find('.rate').text())
        var poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })
  browser.close()
  console.log(result)
})()
