import request from '@/utils/httpRequest'

export const getTopFive = () =>
request({
    url: 'customsTop',
    method: 'get',
    // params:data
})
export const getOrType = (data) =>
request({
    url: 'orgType',
    method: 'get',
    params:data
})
export const getPanoramaList = (data) =>
request({
    url: 'panorama_list',
    method: 'get',
    params:data
})