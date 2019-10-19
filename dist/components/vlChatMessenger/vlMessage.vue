<template>
  <div
    class="vl-chatroom--item"
    @click="setIndexActive"
  >
    <div class="vl-image-container">
      <img :src="`${imagePath}${image}`"/>
    </div>
    
    <div class="vl-chat-content">
      <div class="vl-name">
        <slot name="title"/>
      </div>
      <div class="vl-date">
        <slot name="dateTime"/>
      </div>
      <div class="vl-message">
        <slot name="message"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'vlMessage',
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
    .vl-date
      font-size .65rem
    .vl-message
      font-size .75rem
      padding-top 5px
      padding-bottom 5px
      div
        max-width 210px
    .vl-name
      font-size .85rem
      font-weight bold
      div
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        max-width 210px

.vl-image-container
  width 40px
  height 40px
  overflow hidden
  margin 10px
  
img 
  width 100%
  height 100%
  border-radius 50%


</style>
