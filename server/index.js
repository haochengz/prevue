
const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchema, initAdmin } = require('./db/init')
const mongoose = require('mongoose')

initSchema()

;(async () => {
  const status = await connect()
  initAdmin()
})()

const app = new Koa()
const router = require('./routes/movies')
app.use(router.routes())
app.use(router.allowedMethods())

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
