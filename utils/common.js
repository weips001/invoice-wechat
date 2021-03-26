const {post} = require('./request')
export function wechatLogin() {
  return new Promise((resolve, reject) => {
    checkLoginFromWechat().then((openid) => {
      resolve(openid)
    }).catch(() => {
      wx.login({
        success({code}) {
          post('/api/wxLogin', {js_code: code}).then(res => {
            const openid = res.openid
            console.log('2', openid)
            wx.setStorageSync('openid', openid)
            resolve(openid)
          }).catch(() => {
            reject()
          })
        },
        fail() {
          reject()
        }
      })
    })
  })
}
export function checkLoginFromWechat() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success () {
        const openid = wx.getStorageSync('openid')
        if(openid) {
          resolve(openid)
        } else {
          reject()
        }
      },
      fail (err) {
        reject()
      }
    })
  })
}

export function getUserFromOpenid() {
  const openid = wx.getStorageSync('openid')
  if(openid) {
    return post('/api/getUserFromOpenid', {openid}).then(res=> {
      if(res.data) {
        wx.setStorageSync('phoneNumber', res.data.userPhone)
        if(res.data.compId) {
          wx.setStorageSync('compId', res.data.compId)
        }
        return res.data
      }
      return null
    })
    .catch(() => null)
  }
  return wechatLogin().then(() => {
    return getUserFromOpenid()
  }).catch(() => {
    return null
  })
  // return Promise.resolve(null)
}

export function checkLoginFromLocal() {
  const openid = wx.getStorageSync('openid')
  const phoneNumber = wx.getStorageSync('phoneNumber')
  if(!openid) {
    wx.showToast({
      title: '请允许登录授权登录',
      icon: 'none'
    })
    return false
  }
  if(!phoneNumber) {
    wx.showToast({
      title: '请输入手机号完成登录',
      icon: 'none'
    })
    return false
  }
  return true
}