import request from '@/utils/request'

// 根据活动查询报名社团
export function listForActivity(data) {
  return request({
    url: '/activitysign/listforactivity',
    method: 'get',
    params: data
  })
}
