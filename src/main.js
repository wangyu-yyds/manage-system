import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  Option,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'
import router from './router/index'
import store from './store'
import http from 'axios'
import '@/api/mock'


Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;




//按需引入element-ui
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)


router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (token && to.name === 'login') {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')