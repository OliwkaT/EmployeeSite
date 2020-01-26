<template>
  <q-page class="flex q-mt-xl">
    <!-- <div class="q-pa-md row items-start">
      <q-card class="chat-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Title</q-item-label>
            <q-item-label caption>Subhead</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4">col</div>
          <q-separator vertical />
          <div class="col-xs-12 col-sm-6 col-md-4">col</div>
        </div>
      </q-card>
    </div> -->
  </q-page>
</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {
    }
  },
  beforeCreate () {
    this.$store.dispatch('auth/getUsers')
  },
  methods: {
  },
  computed: {
    getUsers () {
      return this.$store.getters['auth/getUsers']
    }
  }
}
</script>

<style lang='scss'>
@import "./css/chatPage.scss";
</style>
