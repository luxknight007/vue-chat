<template>
  <Transition name="vl-messenger-animate">
    <div 
      v-show="staticPosition || value"
      ref="messengerbackground"
      class="vl-content-messenger">
      <div
        :class="[
          {
            'vl-messenger-parent': parent != 'body',
            'vl-messenger-staticPosition': staticPosition,
            'vl-messenger-position-right': positionRight,
            'vl-messenger-reduce': reduce,
            'vl-messenger-reduceNotRebound': reduceNotRebound,
            'vl-messenger-reduceNotHoverExpand': reduceNotHoverExpand
          }
        ]"
        class="vl-messenger"
      >
      <header
          class="vl-messenger--header"
          v-if="$slots.header"
        >
          <div class="vl-icon" @click="closeFn">
            <vl-chat-icon size="small" bg="small" color="primary" icon="cancel"/>
          </div>
          <slot name="header" />
        </header>

        <div class="vl-messenger--items">
          <div class="filler"></div>
          <slot />
        </div>

        
        <!-- <footer
          class="vl-messenger--footer"
          v-if="$slots.footer"
        >
          <slot name="footer" />
        </footer> -->
          <div class="vl-message-input">
            <textarea v-model="message" cols="35" rows="5"></textarea>
          </div>
          <div class="vl-messanger-control">
            <button @click="sendMsg">send</button>
          </div>
        </div>
        
    </div>
  </Transition>
</template>
<script>
import vlChatIcon from '../vlChatIcon/vlChatIcon'

export default {
  name: 'vlChatMessenger',
  data: () => ({
    message: ''
  }),
  components: {
    vlChatIcon
  },
  props:{
    value:{
      default: false
    },
    defaultIndex:{
      default: null,
      type: [String, Number]
    },
    color: {
      default:'primary',
      type: String
    },
    parent:{
      default: 'body',
      type: [String, Object]
    },
    spacer: {
      default: false,
      type: Boolean
    },
    staticPosition: {
      default: false,
      type: Boolean
    },
    positionRight: {
      default: false,
      type:Boolean
    },
    reduce: {
      default: false,
      type: Boolean
    },
    reduceNotRebound:{
      default: false,
      type: Boolean
    },
    reduceNotHoverExpand: {
      default: false,
      type: Boolean
    },
    hiddenBackground: {
      default:false,
      type: Boolean
    }
  },
  methods:{
    insertBody () {
      if(this.parent) {
        let elx = this.$refs.messengerbackground
        let parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent
        parentx.insertBefore(elx, parentx.firstChild)
      }
    },
    closeFn() {
      this.$emit('update:value', false)
    },
    sendMsg() {
      this.$emit('send', this.message)
      this.message = null
    }
  },
  mounted() {
    this.insertBody()
  }
}
</script>
<style lang="stylus" scoped>
.vl-message-input
  padding-top 10px

.vl-messanger-control
  text-align right
  padding-bottom 10px
  padding-right 10px

textarea 
  resize none
  font-family 'Avenir', Helvetica, Arial, sans-serif !important
  border-color rgb(224, 224, 224) !important

.vl-content-messenger
  display block

.vl-icon
  float right

.vl-messenger--header
  padding 5px
  background: rgb(224, 224, 224)
  padding-top 15px
  padding-left 15px

.vl-messenger--items
  overflow-x hidden
  display -webkit-box
  height -webkit-fill-available

.vl-messenger
  font-family 'Avenir', Helvetica, Arial, sans-serif
  background: rgb(255, 255, 255)
  z-index 3000
  position fixed
  height 400px
  width 100%
  max-width 300px
  display: flex
  flex-direction: column
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,.05)
  left 0px
  bottom 0px
  transition: all .25s ease
  &.vl-messenger-reduce
    max-width 50px

    h4
      display: block
      position relative
      overflow hidden
      white-space: nowrap
      text-overflow: ellipsis
      width: 100%
      font-size: .7rem

      i
        opacity 0

    ul
      padding-left: 0px !important
    &.vl-messenger-reduceNotHoverExpand
      h4
        text-align: center
        &:hover
          ~.vl-messenger--tooltip
            opacity 1
            visibility visible
            transform: translate(5px, -110%)
    &:hover:not(.vl-messenger-reduceNotRebound):not(.vl-messenger-reduceNotHoverExpand)
      animation: expand .4s ease .15s
    &:hover:not(.vl-messenger-reduceNotHoverExpand)
      max-width 260px
        i
          opacity 1
    .vl-messenger--item
      overflow hidden
      i
        padding: 10px
  &.vl-messenger-position-right
    left auto
    right 250px
    &.vl-messenger-reduce
    .vl-messenger-tooltip
      right 70px
      left auto
      &:after
        right -5px
        left auto
        box-shadow: 4px 0px 6px -3px rgba(0,0,0,.07)
  &.vl-messenger-parent
    position: absolute
  &.vl-messenger-staticPosition
    position: relative

.vl-messenger-animate-enter-active, .vl-messenger-animate-leave-active
  transition: all .25s ease
  .vl-messenger
    transition: all .25s ease

.vl-messenger-animate-enter:not(.vl-messenger-position-right), .vl-messenger-animate-leave-to:not(.vl-messenger-position-right)
  .vl-messenger
    transform translate(-100%)

.vl-messenger-animate-enter, .vl-messenger-animate-leave-to
  .vl-messenger-background
    opacity 0 !important
  .vl-messenger
    &.vl-messenger-position-right
      transform translate(100%)
</style>
