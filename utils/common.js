export function getPhoneFromServe() {
  const openid = wx.getStorageSync('openid')
  return post('/api/getUserFromOpenid', {openid}).then(res=> {
    if(res.data) {
      wx.setStorageSync('phoneNumber', res.data.userPhone)
      if(res.data.compId) {
        wx.setStorageSync('compId', res.data.compId)
      }
      return true
    }
    return false
  })
  .catch(() => false)
}