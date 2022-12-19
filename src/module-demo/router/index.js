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
    path: '/saas-clients',
    component: Layout,
    redirect: 'noredirect',
    name: 'saas-clients',
    meta: {
      title: 'xxx业务模块管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('demo/pages/index'),
        name: 'saas-clients-index',
        meta: {title: 'xxx业务模块', icon: 'component', noCache: true}
      },
    ]
  }
]
