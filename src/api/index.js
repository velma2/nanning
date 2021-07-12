import request from '@/utils/httpRequest'
import qs from 'qs'
export const getTopFive = () =>
request({
    url: 'panorama/customs-top',
    method: 'get',
    // params:data
})
export const getOrType = (data) =>
request({
    url: 'panorama/org-type',
    method: 'get',
    params:data
})
export const getPanoramaList = (data) =>
request({
    url: `panorama/panorama-list?${qs.stringify(data)}`,
    method: 'get',
    // params:data
})
export const getTableList = (data) =>
request({
    url: `panorama/panorama-able-list?${qs.stringify(data)}`,
    method: 'get',
    // params: qs.stringify(data)
})
export const getStatusList = () =>
request({
    url: 'panorama/status-list',
    method: 'get',
})