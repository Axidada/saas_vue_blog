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
    path: '/departments',
    component: Layout,
    redirect: 'noredirect',
    name: 'departments',
    meta: {
      title: '组织架构管理',
      icon: 'architecture'
    },
    children: [
      {
        path: 'index',
        component: _import('department/pages/index'),
        name: 'department',
        meta: {title: '组织架构', icon: 'architecture', noCache: true}
      }
    ]
  }
]
