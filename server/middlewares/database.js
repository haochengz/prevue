
const { connect, initSchema, initAdmin } = require('../db/init')

module.exports = async app => {
  console.log('Initialization of database')
  connect()
  initSchema()
  await initAdmin()
}
