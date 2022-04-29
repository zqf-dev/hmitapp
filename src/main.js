import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Lazyload, Tabbar, TabbarItem, NavBar, Tab, Tabs, Icon, Loading, Popup, PullRefresh, List, Row, Col, ActionSheet, Cell, Badge } from 'vant'

Vue.use(Lazyload, {
  preLoad: 0.8, // 屏幕高度的范围百分比0-1, 预加载范围
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F19%2F01%2F05%2F93bf94dfeaf09010234db46956e3e864.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641697127&t=b9a5b72127fb33b467af142f34fef841' // 懒加载图片失败, 使用错误提示图片
})
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Loading)
Vue.use(Popup)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Row)
Vue.use(Col)
Vue.use(ActionSheet)
Vue.use(Cell)
Vue.use(Badge)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
