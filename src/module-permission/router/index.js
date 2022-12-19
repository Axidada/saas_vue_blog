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
    path: '/permission',
    component: Layout,
    redirect: 'noredirect',
    name: 'permissions',
    meta: {
      title: '权限设置',
      icon: 'set'
    },
    children: [
      {
        path: 'index',
        component: _import('permission/pages/index'),
        name: 'permission',
        meta: {title: '权限设置', icon: 'set', noCache: true}
      },
    ]
  }
]
