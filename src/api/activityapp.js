import request from '@/utils/request'

// 根据活动查询报名社团
export function listForActivity(data) {
  return request({
    url: '/activitysign/listforactivity',
    method: 'get',
    params: data
  })
}

// 根据活动和社团查询报名社团
export function appStatusList(data) {
  return request({
    url: '/activitysign/activityappstatus',
    method: 'get',
    params: data
  })
}

// 社长报名活动
export function signActivity(data) {
  return request({
    url: '/activitysign/signactivity',
    method: 'post',
    data: data
  })
}

// 社长取消报名
export function delSign(data) {
  return request({
    url: '/activitysign/delsign',
    method: 'get',
    params: data
  })
}
