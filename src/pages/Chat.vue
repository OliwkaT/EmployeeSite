<template>
  <q-page class="flex justify-center q-mt-xl">
<div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Choose who you want to have a conversations</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Click on the name on the right side -->
      </q-card-section>
    </q-card>
  </div>
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

// <style lang='scss'>
// @import "./css/chatPage.scss";
//
</style>
