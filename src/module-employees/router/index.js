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
    path: '/employees',
    component: Layout,
    redirect: 'noredirect',
    name: 'employees',
    meta: {
      title: '员工',
      icon: 'people'
    },
    children: [
      {
        path: 'index',
        component: _import('employees/pages/index'),
        name: 'index',
        meta: {title: '员工', icon: 'people', noCache: true}
      },
      {
        path: 'details/:id',
        component: _import('employees/pages/details'),
        name: 'employee-details',
        meta: {title: '详情', noCache: true}
      },
    ]
  }
]
