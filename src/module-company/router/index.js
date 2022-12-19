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
    path: '/companies',
    component: Layout,
    redirect: '/',
    name: 'companies',
    meta: {
      title: '企业管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('company/pages/index'),
        // component: resolve => require(['@/company/pages/index.vue'], resolve),
        name: 'company',
        meta: {title: '企业管理', icon: 'component', noCache: true}
      },
      {
        path: 'children',
        component: _import('company/pages/indexChildren'),
        name: 'company',
        meta: {title: '企业管理子类', icon: 'component', noCache: true}
      },
      {
        path: 'details/:id',
        component: _import('company/pages/details'),
        name: 'company-page',
        meta: {title: '企业详情', icon: 'component', noCache: true}
      }
    ]
  }
]
