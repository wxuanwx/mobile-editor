import Editor from './Editor'
import type { App } from 'vue'
let components = [Editor]
const install = (Vue: App) => {
  components.map((component: any) => {
    Vue.component(component.__name as string, component)
  })
}

let windowObj = window as any
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
  const vm = windowObj.Vue.createApp({})
  install(vm)
}

export { Editor }
export default { install }
