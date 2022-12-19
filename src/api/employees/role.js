import {createAPI, createFormAPI} from '@/utils/request'

//查找全部
export const roleFindAll = data => createAPI('/system/role/list', 'get', data)
//查找分页全部
export const roleFindPage = data => createAPI('/system/role', 'get', data)
//ID查找
export const roleFindById = data => createAPI(`/system/role/${data.id}`, 'get', data)
//添加
export const roleAdd = data => createAPI('/system/role', 'post', data)
//修改
export const roleUpdate = data => createAPI(`/system/role/${data.id}`, 'put', data)
//删除
export const roleDelete = data => createAPI(`/system/role/${data.id}`, 'delete', data)
//权限
export const assignPrem = data => createAPI('/system/role/assignPrem', 'put', data)
