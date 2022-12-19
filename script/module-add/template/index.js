/*
 * @Author: {{author}} 
 * @Description: {{description}} 
 * @Date: 2021-05-01 16:13:27 
 * @Last Modified by: Easy
 * @Last Modified time: 2021-05-01 16:15:04
 */

// vue-router
import {asyncRouterMap} from '@/router'
import routerMaps from './router'
// vuex
import app from './store/app'

export default {
  install(module, store) {
    // 注册路由
    asyncRouterMap.push(routerMaps[0])
    // 注册状态管理
    if (store !== undefined) {
      // store.registerModule('app', app)
    }
  }
}
