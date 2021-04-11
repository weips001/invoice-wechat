// app.js
const { wechatLogin, getToken, getCurrentUser } = require('./utils/common')
App({
  async onLaunch() {
    // 展示本地存储能力
    try {
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      await wechatLogin()
      await getCurrentUser(true)
      await getToken()
    } catch(e) {
      console.log('onLaunch fail', e)
    }
    
  },
  globalData: {
    userInfo: null
  }
})
