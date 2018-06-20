
const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  ctx.type = 'html'
  ctx.body = '<h1>电影预告片</h1>'
})

app.listen(3000, () => {
  console.log('Listening')
})
