/**
 * 文章请求模块
 */
import request from "@/utils/request"

/**
 * 
 * @returns 请求获取文章数据
 */
export const getArtical = (params) => {
    return request({
        method: 'GET',
        url: 'app/v1_1/articles',
        params
    })
}