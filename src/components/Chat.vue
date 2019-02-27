<template>
  <div>
    chat here
    {{chat}}
  </div>
</template>

<script>
import openSocket from 'socket.io-client';

export default {
  data() {
    return {
      chat: []
    }
  },
  mounted() {
    const socket = openSocket(`http://localhost:3005`)
    socket.on('posts', data => {
      console.log(data.action)
      this.chat.push(data.post)
    })

  }
}
</script>

<style lang="stylus" scoped>

</style>
