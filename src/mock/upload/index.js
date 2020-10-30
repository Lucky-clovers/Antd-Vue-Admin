import Mock from 'mockjs'
import '@/mock/extend'

const welcome = Mock.mock({
  url: '/01.jpg'
})

Mock.mock('/uploadImage', 'post', ({body}) => {
  console.log(body)
  return welcome
})
