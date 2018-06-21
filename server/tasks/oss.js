
const secret = require('../../secret')
const co = require('co')
const nanoid = require('nanoid')
const request = require('request')

data = {
  doubanId: '26416062',
  video: 'http://vt1.doubanio.com/201806211351/eb0771af65777fa20699d4f807527c20/view/movie/M/402300185.mp4',
  cover: 'https://img3.doubanio.com/img/trailer/medium/2523478805.jpg?1527608073)'
}

const OSS = require('ali-oss')

const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: secret.aliOss.accessKeyId,
  accessKeySecret: secret.aliOss.accessKeySecret
})

co(function *() {
  client.useBucket('prevue')
  let stream = request(data.video)
  let result = yield client.putStream(nanoid() + '.mp4', stream)
  console.log(result)
}).catch(err => {
  console.log(err)
})
