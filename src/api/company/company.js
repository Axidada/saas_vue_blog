import {createAPI, createFormAPI} from '@/utils/request'

// 查找全部企业
export const comFindAll = data => createAPI('/company', 'get', data)
// 查找指定ID企业
export const comFindById = data => createAPI(`/company/${data.id}`, 'get', data)
// 保存企业
export const comSave = data => createAPI('/company', 'post', data)
// 更新企业
export const comUpdate = data => createAPI(`/company/${data.id}`, 'put', data)
// 删除企业
export const comDeleteById = data => createAPI(`/company/${data.id}`, 'delete', data)

// 保存and更新
export const comSaveOrUpdate = data => {
  return data.id ? comUpdate(data) : comSave(data)
}
