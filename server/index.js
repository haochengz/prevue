
const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const mongoose = require('mongoose')
const R = require('ramda')
// const { connect, initSchema, initAdmin } = require('./db/init')

const DEV_MIDDLEWARES = [
  'parcel'
]
const PROD_MIDDLEWARES = []
const COMMON_MIDDLEWARES = [
  'database',
  'routers'
]

if (process.env.NODE_ENV === 'production') {
  var MIDDLEWARES = [
    ...PROD_MIDDLEWARES,
    ...COMMON_MIDDLEWARES
  ]
} else {
  var MIDDLEWARES = [
    ...DEV_MIDDLEWARES,
    ...COMMON_MIDDLEWARES
  ]
}

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
  loadMiddlewares(app)
  app.listen(3000, () => {
    console.log('Listening')
  })
})()
