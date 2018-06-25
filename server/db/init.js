
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
const dbConn = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  if (await User.findOne({ username: 'dev' })) return
  const admin = new User({
    username: 'dev',
    email: 'hczhao@gamil.com',
    password: '123abc'
  })
  await admin.save()
}

exports.connect = () => {
  let maxConnectAttemps = 10
  let connectAttemps = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(dbConn)

    mongoose.connection.on('disconnection', () => {
      connectAttemps++
      console.log('DB was disconnected')
      if (connectAttemps >= maxConnectAttemps) {
        reject('Cannot reach db')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('DB was disconnected because: ')
      console.log(err)
      connectAttemps++
      if (connectAttemps >= maxConnectAttemps) {
        reject('Cannot reach db')
      }
    })

    mongoose.connection.once('open', () => {
      connectAttemps = 0
      resolve('DB was connected')
    })
  })
}
