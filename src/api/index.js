import request from '@/utils/httpRequest'

export const getFruitAllData = (data) =>
request({
    url: 'nncustoms/fruit/page',
    method: 'get',
    params:data
})