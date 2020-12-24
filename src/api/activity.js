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
// 查询活动信息
export function activityInfo(data) {
  return request({
    url: '/activity/detailactivity',
    method: 'get',
    params: data
  })
}
export function updateActivity(data) {
  return request({
    url: '/activity/updateactivity',
    method: 'post',
    data: data
  })
}
export function addActivity(data) {
  return request({
    url: '/activity/addactivity',
    method: 'post',
    data: data
  })
}
// 查询社联发布的
export function publishActivity(data) {
  return request({
    url: '/activity/activitylist',
    method: 'get',
    params: data
  })
}

