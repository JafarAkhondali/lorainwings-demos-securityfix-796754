// Vue 实例是挂载在元素的 `__vue__` 属性上的
app = document.querySelector('#app').__vue__

// 获取此实例的构造函数
Vue = app.constructor

// 获取 `Vue` 基类，只有基类上有 `Vue.config` 属性
while (Vue.super) {
  Vue = Vue.super
}

// 尝试打印 Vue.config
console.log(Vue.config)
