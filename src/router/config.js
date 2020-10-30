import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'
import UserLayout from '@/layouts/header/UserLayout'
// 路由配置
const options = {
  base: '/Antd-Vue-Admin',
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '*',
      name: '404',
      component: () => import('@/views/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/exception/403'),
    },
    {
      path: '/user',
      component: UserLayout,
      children: [
        //{ path: '/user', redirect: '/user/dashboard' },
        { path: '/login', name: '登录', component: () => import('@/views/login/Login') },
        //{ path: '/register', name: '注册', component: () => import('@/views/login/Register') },
      ],
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children:[
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/views/dashboard/workplace'),
            },
            {
              path: 'analysis',
              name: '分析页',
              component: () => import('@/views/About'),
            }
          ]
        },
        {
          path: 'form',
          name: '表单页',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'basic',
              name: '基础表单',
              component: () => import('@/views/form/basic'),
            },
            {
              path: 'step',
              name: '分步表单',
              component: () => import('@/views/form/step'),
            },
            {
              path: 'advance',
              name: '高级表单',
              component: () => import('@/views/form/advance'),
            }
          ]
        },
        {
          path: 'editor',
          name: '编辑器',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'Editor',
              name: '富文本编辑器',
              component: () => import('@/views/editor'),
            },
          ]
        },
        {
          name: '验权表单',
          path: 'authForm',
          meta: {
            icon: 'file-excel',
            authority: {
              //role: 'admin'
              permission: 'queryForm'
            }
          },
          component: () => import('@/views/Home')
        },
        {
          name: 'Ant Design Vue',
          path: 'antdv',
          meta: {
            icon: 'ant-design',
            link: 'https://www.antdv.com/docs/vue/introduce-cn/',
            authority: {
              permission: 'user'
            }
          }
        },
        {
          name: '使用文档',
          path: 'document',
          meta: {
            icon: 'file-word',
            link: 'https://iczer.gitee.io/vue-antd-admin-docs/',
            authority: {
              permission: 'user'
            }
          }
        }
      ]
    }
  ]
}

export default options
