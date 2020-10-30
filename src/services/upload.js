import { UPLOADIMAGE } from './api'
import {METHOD, request} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function uploadImage(file) {
  return request(UPLOADIMAGE, METHOD.POST, {
    file: file,
  })
}


export default {uploadImage}
