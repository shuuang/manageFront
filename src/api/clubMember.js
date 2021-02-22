import request from '@/utils/request'

export function memberList(data) {
  return request({
    url: '/clubmember/memberlist',
    method: 'get',
    params: data
  })
}

export function addMember(data) {
  return request({
    url: '/clubmember/addmember',
    method: 'get',
    params: data
  })
}
