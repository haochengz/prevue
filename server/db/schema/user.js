
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Mixed = mongoose.Schema.Types.Mixed
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_LOGIN_TIME = 2 * 60 * 60 * 1000

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type:String
  },
  password: {
    unique: true,
    required: true,
    type: String
  },
  lockUntil: Number,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (!err) {
        bcrypt.hash(this.password, salt, (error, hash) => {
          if (!err) {
            this.password = hash
            return next()
          } else {
            console.log('Saving password failed')
            return
          }
        })
      } else {
        console.log('Generate salt failed')
        return
      }
    })
  } else {
    return
  }
})

userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

userSchema.methods = {
  comparePassword: (password, _password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, _password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttempts: user => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, (err) => {
          if (err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts > MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_LOGIN_TIME
          }
          this.update(updates, err => {
            if (!err) resolve(true)
            else reject(err)
          })
        }
      }

    })
  }
}

mongoose.model('User', userSchema)
