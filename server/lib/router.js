
const { resolve } = require('path')
const glob = require('glob')
const R = require('ramda')
const Router = require('koa-router')

const toArray = c => R.is(Array)(c) ? c : [c]
const prefixSymbol = Symbol('prefix')
const routerMap = new Map()
const normalizePath = path => path.startsWith('/') ? path : `\${path}`

export const prefix = path => target => (target.prototype[prefixSymbol] = path)

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init() {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

    for (let [config, method] of routerMap) {
      const methods = toArray(method)
      const prefixUrl = config.target[prefixSymbol]
      if (prefixUrl) {
        prefixUrl = normalizePath(prefixUrl)
      }
      const fullUrl = prefixUrl + config.path
      this.router[config.method](fullUrl, ...methods)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  routerMap.set({
    target: target,
    ...conf
  }, target[key])
}

export const get = path => router({
  method: 'get',
  path: path
})

export const post = path => router({
  method: 'post',
  path: path
})

export const put = path => router({
  method: 'put',
  path: path
})

export const update = path => router({
  method: 'update',
  path: path
})

export const del = path => router({
  method: 'del',
  path: path
})
