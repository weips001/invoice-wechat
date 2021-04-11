const { get, post } = require('../utils/request')
const api = require('../api/index')

export function getBillList() {
  return get(api.bill)
}

export function saveBill(data) {
  return post(api.bill, data)
}

export function getUserList() {
  return get(api.user)
}

export function saveUser(data) {
  return post(api.user, data)
}

export function getUserFromOpenid(openid) {
  return post(api.getUserFromOpenid, {openid})
}

export function addUserByCode(data) {
  return post(api.addUserByCode, data)
}

export function billIsExit(billNumber) {
  return get(api.billIsExit, {billNumber})
}

export function createCompany(data) {
  return post(api.company, data)
}

export function wxLogin(js_code) {
  return post(api.wxLogin, {js_code})
}

export function wxGetToken(data) {
  return post(api.wxGetToken, data)
}

export function getWeInfo(data) {
  return post(api.getWeInfo, data)
}