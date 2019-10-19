<template>
  <div
    class="vl-chatroom--item"
    @click="setIndexActive"
  >
    <img :src="`${imagePath}${image}`"/>
    <div class="vl-chat-content">
      <div class="vl-name">
        <slot name="title"/>
      </div>
      <div class="vl-message">
        <slot name="message"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'vlChatMessage',
  props:{
    imagePath: {
      type: String,
      default: null
    },
    image: {
      default: null,
      type: String
    },
    icon: {
      default: null,
      type: String
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    href: {
      default:'#',
      type: String
    },
    to: {
      default:null,
      type: String
    },
    index: {
      default: null,
      type: [String, Number]
    },
  },
  methods:{
    setIndexActive () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
.vl-info
  display flex

.vl-chatroom--item
  color #808080
  transition all .25s ease
  display -webkit-box
  border-style none none solid none
  border-width thin
  border-color #dedede
  margin-left 10px
  margin-right 10px
  padding-top 5px
  &:hover
    color #000
    background rgb(248,248,248)
  .vl-chat-content
    text-align left
    white-space nowrap
    .vl-message
      font-size .75rem
      div
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        max-width 150px
    .vl-name
      font-size .85rem
      font-weight bold
      div
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        max-width 150px

img 
  width 40px
  height 40px
  border-radius 50%
  margin-left 10px
  margin-right 10px

</style>
