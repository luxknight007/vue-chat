<template>
  <i
    :style="iconStyle"
    :class="[iconPack, iconPack !='material-icons' ? icon : '',iconClass,getBg,getBgSize,{'round':round}]"
    class="vl-icon notranslate icon-scale"
  >
    <slot>{{ iconPack == 'material-icons' ? icon : '' }}</slot>
  </i>
</template>
<script>

export default {
  name:'vlChatIcon',
  props:{
    icon: {
      default: null,
      type: String
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    color: {
      default: null,
      type: String
    },
    bg: {
      default: null,
      type: String
    },
    size: {
      default: null,
      type: String
    },
    round: {
      default: false,
      type: Boolean
    },
  },
  computed:{
    iconClass() {
      const classes = {}
      classes[this.size] = true
      if (this.isColor(this.color)) {
        classes[`vl-icon-${this.color}`] = true
      }
      return classes
    },
    iconStyle() {
      const style = {
        width: /(px)/.test(this.size) ? this.size : /(em)/.test(this.size) ? this.size : null,
        height: /(px)/.test(this.size) ? this.size : /(em)/.test(this.size) ? this.size : null,
        'font-size': /(px)/.test(this.size) ? this.size : /(em)/.test(this.size) ? this.size : null,
        color: this.getColor,
        background: this.getBgColor
      }
      return style
    },
    getBg() {
      const classes = {}

      if (this.isColor(this.bg)) {
        classes[`con-vl-icon-bg-${this.bg}`] = true
      }

      return classes
    },
    getBgSize() {
      const classes = {}
      if(['small','medium','large'].includes(this.size))  {
        classes[`bg-${this.size}`] = true;
        classes['vl-icon-bg'] = true;
      }

      return classes
    },
    getColor() {
      return this.isColor(this.color) ? this.color : this.color;
    },
    getBgColor() {
      return this.isColor(this.bg) ? this.bg : this.bg;
    },
  },
  methods: {
    isColor(colorx){
      let vlcolors = ['primary','secondary','success','danger','warning','dark', 'light']
      return vlcolors.includes(colorx)
    },
  }
}
</script>

<style lang="stylus" scoped>
.vl-icon
  color inherit
  text-align center
  font-size 1rem
  cursor pointer
  &.large
    font-size 3.125rem
    width 3.125rem
    height 3.125rem
  &.medium
    font-size 2.31rem
    width 2.31rem
    height 2.31rem
  &.small
    font-size 0.80rem
    width 1.5rem
    height 1.5rem

.vl-icon-bg
  width 1rem
  height 1rem
  &.bg-large
    width 3.125rem
    height 3.125rem
  &.bg-medium
    width 2.31rem
    height 2.31rem
  &.bg-small
    width 1.5rem
    height 1.5rem

.round
  border-radius 50%

for colorx, i in $vl-colors
  .con-vl-icon-bg-{colorx}
    background: var(colorx, 1)
  .dot-count-{colorx}
    background: var(colorx, 1)
  .vl-icon-{colorx}
    color: var(colorx, 1)
</style>
