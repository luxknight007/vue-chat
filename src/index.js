import * as vlComponents from './components'

const Vuechat = {
  install(Vue) {
    Object.values(vlComponents).forEach((vlComponent) => {
      Vue.use(vlComponent)
    })
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuechat)
}
export default Vuechat
