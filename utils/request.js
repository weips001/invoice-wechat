// const baseUrl = 'http://192.168.3.10:7001'
const baseUrl = 'http://39.101.205.84:7001'

function request (method) {
  return function (url, data = {}) {
    return new Promise((resolve, reject) => {
      const header = {
        compid: ''
      }
      const compid = wx.getStorageSync('compId')
      if(compid) {
        header.compid = compid
      }
      wx.request({
        url: baseUrl + url, //仅为示例，并非真实的接口地址
        method,
        data,
        header,
        success (res) {
          if(res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}

const post = request('POST')
const get = request('GET')


module.exports = {
  post,
  get
}