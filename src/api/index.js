import request from '@/utils/httpRequest'

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
    url: 'panorama/panorama-list',
    method: 'get',
    params:data
})
export const getTableList = (data) =>
request({
    url: 'panorama/panorama-able-list',
    method: 'get',
    params:data
})
export const getStatusList = () =>
request({
    url: 'panorama/status-list',
    method: 'get',
})