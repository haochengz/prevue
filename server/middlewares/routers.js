
const R = require('ramda')
const { resolve } = require('path')

const ROUTES = [
  'movies'
]

module.exports = app => {
  console.log('Initialization of routers')
  R.map(
    R.compose(
      router => app.use(router.routes(), router.allowedMethods()),
      require,
      name => resolve(__dirname, `../routes/${name}`)
    )
  )(ROUTES)
}
