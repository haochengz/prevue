
const mongoose = require('mongoose')
let secret = null
if (process.env.NODE_ENV === 'production') {
  secret = require('/root/var/secret')
} else {
  secret = require('../../secret')
}
const glob = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise

const db = secret.db
const admin = secret.admin
const dbConn = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  console.log(admin)
  if (await User.findOne({ username: admin.username })) return
  const administrator = new User({
    username: admin.username,
    email: admin.email,
    password: admin.password
  })
  await administrator.save()
}

exports.connect = () => {
  let maxConnectAttempts = 10
  let connectAttempts = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(dbConn)

    mongoose.connection.on('disconnection', () => {
      connectAttempts++
      if (connectAttempts >= maxConnectAttempts) {
        reject('REJ-FAIL: DB connect is reaching max attempts.')
      }
      mongoose.connect(dbConn)
    })

    mongoose.connection.on('error', err => {
      connectAttempts++
      if (connectAttempts >= maxConnectAttempts) {
        reject('REJ-FAIL: DB connect is reaching max attempts.')
      }
      mongoose.connect(dbConn)
    })

    mongoose.connection.once('open', () => {
      connectAttempts = 0
      resolve('RES-OK: DB was connected')
    })
  })
}
