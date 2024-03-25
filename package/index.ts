import CustomEditor from './Editor'
import type { App } from 'vue'
let components = [CustomEditor]
const install = (Vue: App) => {
  components.map((component: any) => {
    Vue.component(component.__name as string, component)
  })
}
//使用import.meta.globEager遍历获取文件，会丢失icon图标和style样式
//获取文件
// const components:any = import.meta.globEager('./**/*.vue');
// const install = (Vue:any) =>{
//     for(let i in components) {
//         let component = components[i].default;
//         //注册组件
//         Vue.component(component.__name, component);
//     }
// }

let windowObj = window as any
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
  const vm = windowObj.Vue.createApp({})
  install(vm)
}

export default install
