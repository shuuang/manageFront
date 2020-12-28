import request from '@/utils/request'

export function allClubUser(data) {
  return request({
    url: '/clubuser/allclubuser',
    method: 'get',
    params: data
  })
}
export function setPre(data) {
  return request({
    url: '/clubuser/setpresident',
    method: 'get',
    params: data
  })
}

export function userClub(data) {
  return request({
    url: '/clubuser/userclublist',
    method: 'get',
    params: data
  })
}

export function prsClubUserList(data) {
  return request({
    url: '/clubuser/prsclubuserlist',
    method: 'get',
    params: data
  })
}

// 社长提升普通用户为部长
export function upPrivilege(data) {
  return request({
    url: '/clubuser/upprivilege',
    method: 'get',
    params: data
  })
}

// 社长审核
export function checkUser(data) {
  return request({
    url: '/clubuser/checkuser',
    method: 'get',
    params: data
  })
}
