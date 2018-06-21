
const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=%E7%BE%8E%E5%9B%BD,%E7%94%B5%E5%BD%B1'
// movie >> us >> rated(6 ~ 10) >> sort(newest) >> all

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

const getBrowser() => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })
  return browser
}

const unfoldListPage = (page) => {
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  await sleep(3000)

  await page.waitForSelector('.more')
  for(let i = 0; i < 2; i++) {
    await sleep(3000)
    await page.click('.more')
  }
  return page
}

const extractItems = (page) => {
  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var links = []
    if (items.length >= 1) {
      items.each((index, item) => {
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
  return result
}

;(async () => {
  const browser = getBrowser()

  // Open the movie list page and keep press more button until the page
  // contains 40 movies
  const page = unfoldListPage(await browser.newPage())
  const result = extractItems(page)
  browser.close()

  // this script is supposed to run as a sub-process created by master process
  // the master process monitoring and waiting for message event emit
  process.send({
    result
  })
  process.exit(0)
})()
