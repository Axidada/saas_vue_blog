import {createAPI, createFormAPI} from '@/utils/request'

//查找全部企业
export const userFindAll = data => createAPI('/system/user', 'get', data)
//查找指定ID企业
export const userFindById = data => createAPI(`/system/user/${data.id}`, 'get', data)
//保存企业
export const userSave = data => createAPI('/system/user', 'post', data)
//更新企业
export const userUpdate = data => createAPI(`/system/user/${data.id}`, 'put', data)
//删除企业
export const userDeleteById = data => createAPI(`/system/user/${data.id}`, 'delete', data)
//保存企业
export const assignRoles = data => createAPI('/system/user/assignRoles', 'put', data)

//保存and更新
export const userSaveOrUpdate = data => {
  return data.id ? comUpdate(data) : comSave(data)
}
