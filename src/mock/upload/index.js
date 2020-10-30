import Mock from 'mockjs'
import '@/mock/extend'

const welcome = Mock.mock({
  url: '/01.jpg'
})

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/uploadImage`, 'post', ({body}) => {
  console.log(body)
  return welcome
})
