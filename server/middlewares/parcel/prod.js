
const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

const dev = async app => {
  await bundler.bundle()
  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })
  app.use(async ctx => {
    await ctx.render('index.html')
  })
}

module.exports = dev
