import {createAPI, createFormAPI} from '@/utils/request'

export const findAll = data => createAPI('/company/department', 'get', data)

export const findAllNoCompanyId = data => createAPI('/company/department', 'get', data)

export const save = data => createAPI('/company/department', 'post', data)

export const findById = data => createAPI(`/company/department/${data.id}`, 'get', data)

export const deleteById = data => createAPI(`/company/department/${data.id}`, 'delete', data)

export const update = data => createAPI(`/company/department/${data.id}`, 'put', data)

// 保存或更新的方法
export const saveOrUpdate = data => {
  return data.id ? update(data) : save(data)
}
// 带有CompanyId查询或不带有CompanyId查询
export const findallOrfindAllNo = data => {
  return data.id ? findAll(data) : findAllNoCompanyId(data)
}
