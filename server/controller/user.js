
const mongoose = require('mongoose')
const User = mongoose.model('User')

function checkPassword(username, password) {
  const user = User.findOne({
    username: username
  })
  try {
    return user.compare(user.password, password)
  } catch(error) {
    console.log(error)
    return false
  }
}

module.exports = {
  checkPassword
}
