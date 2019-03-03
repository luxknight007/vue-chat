import vlComponent from './vlChatMessage'
import vlComponent2 from './vlChatRoom'

export default Vue => {
  Vue.component(vlComponent.name, vlComponent)
  Vue.component(vlComponent2.name, vlComponent2)
}