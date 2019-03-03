<template>
  <div>
    chat here
    {{chat}}
    <button @click="joinFn">Join</button>
    <button @click="viewChatFn">View</button>
    <button @click="msgChatFn">Messenger</button>
    <vl-chat-room :reduce="reduce" 
    position-right
    :reduce-not-hover-expand="notExpand"
    v-model="isActive"
    :hidden-background="isActive">
    <div slot="header">Messaging</div>
      <vl-chat-message v-for="(route, index) in routes" 
        :key="index"
        :index="index"
        :image="route.image"
        :image-path="imgPath"
        @click="viewFn(route)">
        <!-- <div slot="room">
          {{route.title}}
        </div> -->
        <div slot="title">
          {{route.title}}
        </div>
        <div slot="message">
          {{route.message}}
        </div>
      </vl-chat-message>
    </vl-chat-room>
    <div class='messenger'>
     
    </div>
    <vl-chat-messenger
      :value.sync="isMsgActive"
      position-right
        :reduce="reduce" 
        :reduce-not-hover-expand="notExpand"
        :hidden-background="isMsgActive"
        @send="messageFn"
      >
      <div slot="header">
        {{messenger.title}}
      </div>
      <div>
        <!-- {{messenger.message}} -->
        <vl-message v-for="(message, index) in messages" 
        :key="index"
        :index="index"
        :image="message.defaultImage"
        :image-path="imgPath">
          <div slot="title">{{message.fullName}}</div>
          <div slot="dateTime">{{message.created}}</div>
          <div slot="message">
            {{message.text}}
          </div>
        </vl-message>
      </div>
    </vl-chat-messenger>
  </div>
</template>

<script>
import vlChatRoom from './vlChatRoom/vlChatRoom'
import vlChatMessage from './vlChatRoom/vlChatMessage'
import vlChatMessenger from './vlChatMessenger/vlChatMessenger'
import vlMessage from './vlChatMessenger/vlMessage'

import openSocket from 'socket.io-client';
// const socket = openSocket(`http://localhost:3005`, {test: 'hello'})

export default {
  data: () => ({
      chat: [],
      socket: '',
      isActive: true,
      isMsgActive: true,
      reduce: false,
      notExpand: true,
      routes: [
        {title: 'Marjorie Dela Cruz', 
          image:'zoilo.dela.cruz1_2252104462789355.jpg',
          message: 'Marjorie: Hi! how are you? Who is there?'},
        {title: 'Zoilo Dela Cruz', 
          image:'zoilo.dela.cruz1_1627222312857295.jpg',
          message: 'You: Can I call you'}
      ],
      imgPath: '/doc/attachments/picture/download/',
      messenger: {},
      messages: [
        {
          text: ` is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining
          essentially unchanged.`,
          roomId: 'string',
          defaultImage: 'zoilo.dela.cruz1_2252104462789355.jpg',
          fullName: 'Marjorie Dela Cruz',
          created: '2019-02-28T15:48:27.594Z'
        },
        {
          text: ` is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining
          essentially unchanged.`,
          roomId: 'string',
          defaultImage: 'zoilo.dela.cruz1_1627222312857295.jpg',
          fullName: 'Zoilo Dela Cruz',
          created: '2019-02-28T15:48:27.594Z'
        },
        {
          text: ` is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining
          essentially unchanged.`,
          roomId: 'string',
          defaultImage: 'pepeng.agimat23_2724597272135856.jpg',
          fullName: 'Pepeng Agimat',
          created: '2019-02-28T15:48:27.594Z'
        }
      ]
   
  }),
  components: {
    vlChatRoom,
    vlChatMessage,
    vlChatMessenger,
    vlMessage
  },
  methods: {
    messageFn(data) {
      console.log(data)
    },
    msgChatFn() {
      this.isMsgActive = !this.isMsgActive
    },
    viewFn(data) {
      this.isMsgActive = false
      setTimeout(() => {
        this.messenger = data
        this.isMsgActive = true
      }, 500)
      console.log('room selected ', data)
    },
    viewChatFn() {
      this.isActive = !this.isActive
    },
    joinFn() {
      let user = {id:'1'}
      this.socket.emit('join', 'test', user)
    }
  },
  mounted() {
    this.socket = openSocket(`http://192.168.254.100:3005`)
    this.socket.on('posts', data => {
      console.log(data.action)
      let dd = {title: data.post, 
        image:'zoilo.dela.cruz1_1627222312857295.jpg',
        message: 'I just call'}
      this.chat.push(dd)
      this.routes.push(dd)
    })

  }
}
</script>

<style lang="stylus" scoped>
.messenger
  text-align left
</style>
