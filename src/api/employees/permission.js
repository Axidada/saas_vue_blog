import {createAPI, createFormAPI} from '@/utils/request'

const api = '/system/permission'
// 查找全部企业
export const permissionFindAll = data => createAPI(`${api}`, 'get', data)
// 通过ID查找权限
export const permissionFindById = data => createAPI(`${api}/${data.id}`, 'get', data)
// 保存权限
export const permissionAdd = data => createAPI(`${api}`, 'post', data)
// 更新权限
export const update = data => createAPI(`${api}/${data.id}`, 'put', data)
// 删除权限
export const permissionDelete = data => createAPI(`${api}/${data.id}`, 'delete', data)

// 通过ID查找权限
export const saveOrUpdate = data => {
  return data.id ? update(data) : permissionAdd(data)
}
