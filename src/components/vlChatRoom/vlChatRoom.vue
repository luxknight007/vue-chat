<template>
  <transition name="vl-chatroom-animate">
    <div 
      v-show="staticPosition || value"
      ref="sidebarbackground"
      class="vl-content-chatroom">

      <div
        v-if="!hiddenBackground"
        class="vl-chatroom--background"
      />

        <div
        :class="[
          {
            'vl-chatroom-parent': parent != 'body',
            'vl-chatroom-staticPosition': staticPosition,
            'vl-chatroom-position-right': positionRight,
            'vl-chatroom-reduce': reduce,
            'vl-chatroom-reduceNotRebound': reduceNotRebound,
            'vl-chatroom-reduceNotHoverExpand': reduceNotHoverExpand
          }
        ]"
        class="vl-chatroom"
      >
      <header
          class="vl-chatroom--header"
          v-if="$slots.header"
        >
          <slot name="header" />
        </header>

        <div class="vl-chatroom--items">
          <div class="filler"></div>
          <slot />
        </div>

        <VlSpacer v-if="spacer" />

        <footer
          class="vl-chatroom--footer"
          v-if="$slots.footer"
        >
          <slot name="footer" />
        </footer>

        </div>
    </div>
    
  </transition>
</template>

<script>
export default {
  name: 'vlChatRoom',
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
    clickNotClose: {
      default: false,
      type: Boolean
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
  data: () => ({
    currentIndex: 0
  }),
  methods:{
    getActive () {
      return this.currentIndex
    },
    insertBody () {
      if(this.parent) {
        let elx = this.$refs.sidebarbackground
        let parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent
        parentx.insertBefore(elx, parentx.firstChild)
      }
    },
  },
  mounted() {
    this.insertBody()
  }
}
</script>

<style lang="stylus" scoped>
.vl-chatroom--items
  overflow-x hidden

.vl-content-chatroom
  font-family 'Avenir', Helvetica, Arial, sans-serif

.vl-chatroom--header
  padding 8px
  background: rgb(224, 224, 224)

.filler
  margin-top 10px

.vl-chatroom
  background: rgb(255, 255, 255)
  z-index 3000
  position fixed
  height 100vh
  width: 100%
  max-width 220px
  top: 0px
  display: flex
  flex-direction: column
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,.05)
  left 0px
  transition: all .25s ease
  &.vl-chatroom-reduce
    max-width 50px
    // border-radius: 0px 10px 10px 0px

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
    .con-vl-avatar
      width: 40px !important
      height 40px !important
    &.vl-chatroom-reduceNotHoverExpand
      h4
        text-align: center
        &:hover
          ~.vl-chatroom--tooltip
            opacity 1
            visibility visible
            transform: translate(5px, -110%)
    &:hover:not(.vl-chatroom-reduceNotRebound):not(.vl-chatroom-reduceNotHoverExpand)
      animation: expand .4s ease .15s
    &:hover:not(.vl-chatroom-reduceNotHoverExpand)
      max-width 260px
      h4
        // display: flex
        // align-items: center
        // justify-content: space-between
        i
          opacity 1
    .vl-chatroom--item
      overflow hidden
      i
        padding: 10px
  &.vl-chatroom-position-right
    left auto
    right 0px
    &.vl-chatroom-reduce
      // border-radius: 10px 0px 0px 10px
    .vl-chatroom-tooltip
      right 70px
      left auto
      &:after
        right -5px
        left auto
        box-shadow: 4px 0px 6px -3px rgba(0,0,0,.07)
  &.vl-chatroom-parent
    position: absolute
    height: 100% !important
    top: 0px
  &.vl-chatroom-staticPosition
    position: relative

.vl-chatroom-animate-enter-active, .vl-chatroom-animate-leave-active
  transition: all .25s ease
  .vl-chatroom
    transition: all .25s ease

.vl-chatroom-animate-enter:not(.vl-chatroom-position-right), .vl-chatroom-animate-leave-to:not(.vl-chatroom-position-right)
  .vl-chatroom
    transform translate(-100%)

.vl-chatroom-animate-enter, .vl-chatroom-animate-leave-to
  .vl-chatroom-background
    opacity 0 !important
  .vl-chatroom
    &.vl-chatroom-position-right
      transform translate(100%)
</style>
