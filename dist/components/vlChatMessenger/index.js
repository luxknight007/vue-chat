import vlComponent from './vlChatMessenger'
import vlComponent2 from './vlMessage'

export default Vue => {
  Vue.component(vlComponent.name, vlComponent)
  Vue.component(vlComponent2.name, vlComponent2)
}