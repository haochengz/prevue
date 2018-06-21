
const mongoose = require('mongoose')
const secret = require('../../secret')
mongoose.Promise = global.Promise

const db = secret.db
const dbConn = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`

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
