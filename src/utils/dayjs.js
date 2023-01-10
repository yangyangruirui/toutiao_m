import Vue from 'vue'
import dayjs from 'dayjs'

//dayjs 默认语言是英文  我们需要设置成中文
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'


//配置使用相对时间的插件
dayjs.extend(relativeTime)

// use locale globally
dayjs.locale('zh-cn')
    //dayjs()获取当前的最新时间
    // dayjs().format('YYYY-MM-DD')
    // dayjs().from(dayjs('2022')) //一年以内
    // dayjs().to(dayjs('2015')) //...以前

//定义一个全局过滤器,然后就可以在任何组件的模版中使用了
//其实过滤器就相当于一个全局可用的方法（仅供模版使用）
//参数1:过滤器名称
//参数2: 过滤器函数
//使用方式：{{表达式 ｜ 过滤器名称}}\
//表达式的结果会作为参数传到过滤器函数中
//过滤器的返回值会渲染到使用过滤器的模版位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})