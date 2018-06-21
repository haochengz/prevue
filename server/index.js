
const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect } = require('./db/init')

;(async () => {
  const status = await connect()
  console.log(status)
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
