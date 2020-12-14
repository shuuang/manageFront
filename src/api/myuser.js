import request from '@/utils/request'

export function usersList(data) {
  return request({
    url: '/users/userslist',
    method: 'get'
  })
}
export function delUser(data) {
  return request({
    url: '/users/deluser',
    method: 'post',
    data: data
  })
}
// 社联修改用户信息
export function rootUpdate(data) {
  return request({
    url: '/users/rootupdate',
    method: 'post',
    data: data
  })
}
// 社联查找某一用户信息
export function rootUser(data) {
  return request({
    url: '/users/rootuser',
    method: 'post',
    data: data
  })
}
// 社联搜索
export function searchUser(data) {
  return request({
    url: '/users/search',
    method: 'post',
    data: data
  })
}
