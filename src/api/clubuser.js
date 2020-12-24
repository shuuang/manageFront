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
