import request from '@/utils/request'
/**
 * 用户请求模块
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    });
};
/**
 * 发送手机验证码接口
 * 携带参数 mobile
 */
export const sendsms = mobile => {
    return request({
        method: 'GET',
        url: '/app/v1_0/sms/code/${mobile}'
    });
}

/**
 * 获取用户的信息 如头像 名称 粉丝数等
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        // headers: {
        //     Authroization: `Bearer ${store.state.user.token}`
        // },
        url: '/app/v1_0/user'
    });
}

/**
 * 获取频道列表
 */
export const getChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    });
}