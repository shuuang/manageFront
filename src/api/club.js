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
