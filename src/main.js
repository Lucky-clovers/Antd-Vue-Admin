import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './theme/index.less'
import Antd from 'ant-design-vue';
import Viser from 'viser-vue'
import 'animate.css/source/animate.css'
import '@/mock'
import {initRouter} from './router'
import Plugins from '@/plugins'
import {initI18n} from '@/utils/i18n'
import bootstrap from '@/bootstrap'

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')

Vue.use(Antd)
Vue.use(Viser)
Vue.use(Plugins)

bootstrap({router, store, i18n, message: Vue.prototype.$message})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
