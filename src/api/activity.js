import request from '@/utils/request'

export function rootActivityList(data) {
  return request({
    url: '/activity/rootactivitylist',
    method: 'get',
    params: data
  })
}
export function delActivity(data) {
  return request({
    url: '/activity/delactivity',
    method: 'get',
    params: data
  })
}
export function checkActivity(data) {
  return request({
    url: '/activity/checkactivity',
    method: 'post',
    data: data
  })
}
