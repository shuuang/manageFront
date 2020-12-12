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
export function rootUser(data) {
  return request({
    url: '/users/rootuser',
    method: 'post',
    data: data
  })
}
export function rootUpdate(data) {
  return request({
    url: '/users/rootupdate',
    method: 'post',
    data: data
  })
}
