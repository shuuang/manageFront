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
