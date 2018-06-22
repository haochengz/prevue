
const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchema } = require('./db/init')
const mongoose = require('mongoose')

;(async () => {
  const status = await connect()
  initSchema()
  require('./tasks/oss')
})()

const app = new Koa()
app.use(views(resolve(__dirname, './templates'), { extension: 'pug' }))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'Superman'
  })
})

app.listen(3000, () => {
  console.log('Listening')
})
