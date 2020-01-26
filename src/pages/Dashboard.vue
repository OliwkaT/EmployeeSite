<template>
  <q-page class="flex justify-center dashboard-view">
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-card class="add-post-card" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Write something!</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-card-section>
              <q-input rounded filled v-model="title" label="Title" />
            </q-card-section>

            <q-card-section horizontal>
              <q-input v-model="content" filled type="textarea" label="Content" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-mt-xl" v-for="post in getPosts" :key="post._id">
        <div class="col">
          <q-card class="add-post-card" flat bordered>
            <q-item>
              <q-item-section class="text-center">
                <q-item-label>{{post.title}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-card-section horizontal>
              <div class="q-pa-md">{{post.content}}</div>
              <q-separator />
              <q-card-actions horizontal class="justify-around q-px-sm">
                <q-btn flat round color="red" icon="favorite" />
                <q-btn flat round color="accent" icon="bookmark" />
                <q-btn flat round color="primary" icon="share" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      title: '',
      content: '',
      user: this.$store.getters['auth/getUser']
    }
  },
  beforeCreate () {
    this.$store.dispatch('posts/getPosts')
  },
  methods: {},
  computed: {
    getPosts () {
      return this.$store.getters['posts/getPosts']
    }
  }
}
</script>

<style lang='scss'>
@import "./css/dashboardPage.scss"
</style>
