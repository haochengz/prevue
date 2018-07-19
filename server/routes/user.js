
const { prefix, post } = require('../lib/router')
const { checkPassword } = require('../controller/user')

@prefix('/api/user')
export class User {
  @post('/')
  async login(ctx, next) {
    const { username, password } = ctx.query
    try {
      const match = await checkPassword(username, password)
      ctx.body = {
        status: 'success'
      }
    } catch(error) {
    }
  }
}
