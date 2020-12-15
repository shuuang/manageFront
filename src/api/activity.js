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
