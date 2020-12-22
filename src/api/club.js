import request from '@/utils/request'

export function clubList(data) {
  return request({
    url: '/club/clublist',
    method: 'post',
    data: data
  })
}
export function delClub(data) {
  return request({
    url: '/club/delclub',
    method: 'get',
    params: data
  })
}
export function rootUpdateClub(data) {
  return request({
    url: '/club/rootupdateclub',
    method: 'post',
    data: data
  })
}
// 社联搜索
export function searchClub(data) {
  return request({
    url: '/club/search',
    method: 'post',
    data: data
  })
}
export function clubInfo(data) {
  return request({
    url: '/club/clubinfo',
    method: 'post',
    data: data
  })
}
export function checkAppClub(data) {
  return request({
    url: '/club/checkappclub',
    method: 'get',
    params: data
  })
}
// 添加社团add
export function addClub(data) {
  return request({
    url: '/club/rootaddclub',
    method: 'post',
    data: data
  })
}
export function upload(data) {
  return request({
    url: '/club/upload',
    method: 'post',
    data: data,
    uploadFile: true
  })
}
