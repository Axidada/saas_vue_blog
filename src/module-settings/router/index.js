/*
 * @Author: easy
 * @Description: xxx业务模块
 * @Date: 2021-05-01 16:13:27
 * @Last Modified by: Easy
 * @Last Modified time: 2021-05-01 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'

const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/saas-settings',
    component: Layout,
    redirect: 'noredirect',
    name: 'settings',
    meta: {
      title: '公司设置',
      icon: 'set'
    },
    children: [
      {
        path: 'index',
        component: _import('settings/pages/index'),
        name: 'settings-index',
        meta: {title: '公司设置', icon: 'set', noCache: true}
      },
    ]
  }
]
