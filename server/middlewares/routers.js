
const { resolve } = require('path')
const { Route } = require('./../lib/router')

module.exports = app => {
  const apiPath = resolve(__dirname, '../routes')
  const route = new Route(app, apiPath)

  route.init()
}
