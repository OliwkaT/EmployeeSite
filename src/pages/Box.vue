<template>
  <q-page class="flex justify-center q-mt-xl">
    <div class="justify-center">
      <q-card class="chat-card">
        <div class="chat-box">
          <q-scroll-area class="chat-card">
            <q-chat-message
              v-for="message in this.getMessages"
              :key="message._id"
              :name="getUserById(message.receiverId)"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="[`${message.text}`]"
              :sent="!!message.sent"
              stamp="4 minutes ago"
            />
          </q-scroll-area>
        </div>
      </q-card>
      <q-input v-model="text" autogrow class="q-mb-xl" />
      <q-btn color="primary" label="Send Message" @click="sendMessage()" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Box',
  data () {
    return {
      text: '',
      user: this.$store.getters['auth/getUser']
    }
  },
  beforeCreate () {
    this.$store.dispatch('chat/getMessages', { senderId: this.$route.params.senderId })
    this.$store.dispatch('auth/getUsers')
  },
  methods: {
    getUserById (userId) {
      const user = this.getUsers.find(user => user._id === userId)
      if (!user) return null
      return `${user.firstName} ${user.lastName}`
    },
    sendMessage () {
      const payload = {
        receiverId: this.$route.params.senderId,
        text: this.text
      }
      this.$store.dispatch('chat/createMessage', payload).then(() => {
        this.$store.dispatch('chat/getMessages', { senderId: this.$route.params.senderId })
        this.text = ''
      })
    }
  },
  computed: {
    getMessages () {
      return this.$store.getters['chat/getMessages']
    },
    getUsers () {
      return this.$store.getters['auth/getUsers']
    }
  }
}
</script>

<style lang='scss'>
@import "../css/boxPage.scss";
</style>
