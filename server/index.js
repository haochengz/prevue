
const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const mongoose = require('mongoose')
const R = require('ramda')
const { connect, initSchema, initAdmin } = require('./db/init')

const MIDDLEWARES = [
  "database",
  "routers",
  "parcel"
]

const loadMiddlewares = app => {
  R.map(
    R.compose(
      middleware => middleware(app),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  const app = new Koa()
  await connect()
  await initSchema()
  loadMiddlewares(app)
  app.listen(3000, () => {
    console.log('Listening')
  })
})()
