const { wxLogin, wxGetToken } = require('../service/index')
const { post } = require('../utils/request')
// 获取openid，如果没有就重新获取
export async function getopenid() {
  try {
    let openid = wx.getStorageSync('openid')
    if (openid) {
      return openid
    }
    openid = await wechatLogin()
    return openid
  } catch (e) {
    console.log('getopenid fail', e)
    throw new Error(e)
  }
}
// 获取并存储openid
export function wechatLogin() {
  return new Promise((resolve, reject) => {
    checkLoginFromWechat().then((openid) => {
      resolve(openid)
    }).catch(() => {
      wx.login({
        success({ code }) {
          wxLogin(code).then(res => {
            const { openid, session_key } = res
            wx.setStorageSync('openid', openid)
            wx.setStorageSync('session_key', session_key)
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
// 检查微信session是否失效，失效或者本地没有openid 则为失败
export function checkLoginFromWechat() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        const openid = wx.getStorageSync('openid')
        if (openid) {
          resolve(openid)
        } else {
          reject()
        }
      },
      fail(err) {
        reject()
      }
    })
  })
}
// 通过openid获取用户信息，如果有返回，如果没有返回null
export async function getUserFromopenid() {
  try {
    // 获取openid
    const openid = await getopenid()
    // 通过openid获取用户信息
    if(openid) {
      const res = await post('/api/getUserFromopenid', { openid })
      if (res.data) {
        // 如果有存储本地信息
        wx.setStorageSync('currentUser', res.data)
      }
      return res.data || null
    }
    return null
  } catch (e) {
    console.log('getUserFromopenid fail', e)
    throw new Error(e)
  }
}

export async function getCurrentUser() {
  try {
    let user = wx.getStorageSync('currentUser')
    if(user) {
      return user
    }
    user = await getUserFromopenid()
    return user
  } catch(e) {
    console.log('getCurrentUser fail', e)
    throw new Error(e)
  }
}


// 获取用户手机号，如果本地没有则调取接口获取
export async function getPhoneNumber() {
  try {
    const user = await getCurrentUser()
    if(user) {
      return user.userPhone || null
    }
    return null
  } catch (e) {
    console.log('getPhoneNumber fail', e)
    throw new Error(e)
  }
}

export async function getCompid() {
  try {
    const user = await getCurrentUser()
    if(user) {
      return user.compId || null
    }
    return null
  } catch (e) {
    console.log('getCompid fail', e)
    throw new Error(e)
  }
}

// 判断用户是否授权（有openid）和绑定手机号（有phoneNumber）
export async function checkLoginFromLocal() {
  try {
    const { openid, phoneNumber } = await getopenidAndPhoneNumber()
    if (!openid) {
      wx.showToast({
        title: '请允许微信授权登录',
        icon: 'none'
      })
      return false
    }
    if (!phoneNumber) {
      wx.showToast({
        title: '请输入手机号完成登录',
        icon: 'none'
      })
      return false
    }
    return true
  } catch (e) {
    throw new Error(e)
  }
}

export async function getopenidAndPhoneNumber() {
  try {
    const pendingopenid = getopenid()
    const pendingPhoneNumber = getPhoneNumber()
    const openid = await pendingopenid
    const phoneNumber = await pendingPhoneNumber
    return { openid, phoneNumber }
  } catch (e) {
    console.log('getopenidAndPhoneNumber fail', e)
    throw new Error(e)
  }
}

// 通过openid和手机号获取登录token
export async function getToken() {
  try {
    const token = wx.getStorageSync('token')
    if (token) {
      return token
    }
    const { openid, phoneNumber } = await getopenidAndPhoneNumber()
    if(openid && phoneNumber) {
      const params = {
        userPhone: phoneNumber,
        openid
      }
      const res = await wxGetToken(params)
      if (res && res.token) {
        wx.setStorageSync('token', res.token)
        return res.token
      }
    }
    return null
  } catch (e) {
    console.log('getToken fail', e)
    throw new Error(e)
  }
}

