import request from '@/utils/request'

export function logList(data) {
  return request({
    url: '/activitylog/loglist',
    method: 'get',
    params: data
  })
}

export function delLog(data) {
  return request({
    url: '/activitylog/dellog',
    method: 'get',
    params: data
  })
}

export function addLog(data) {
  return request({
    url: '/activitylog/addlog',
    method: 'post',
    data: data
  })
}

// 总评论数量
export function commentNum(data) {
  return request({
    url: '/logcomment/allcomment',
    method: 'get',
    params: data
  })
}
