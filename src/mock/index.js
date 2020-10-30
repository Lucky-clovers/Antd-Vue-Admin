import Mock from 'mockjs'
import '@/mock/user/current'
import '@/mock/project'
import '@/mock/upload'
import '@/mock/user/login'  //登录接口
// import '@/mock/user/register'  //注册接口
// import "@/mock/user/phoneCode" //发送验证码
import '@/mock/workplace'
import '@/mock/user/routes'
import '@/mock/goods'

// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
