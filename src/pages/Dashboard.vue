<template>
  <q-page class="flex justify-center dashboard-view">
    <div class="q-pa-md">
      <q-dialog v-model="editPostDialog">
        <q-card flat bordered class="edit-post">
          <q-card-section>
            <q-input
              rounded
              filled
              v-model="editedTitle"
              label="Title"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>

          <q-card-section horizontal>
            <q-input
              v-model="editedContent"
              filled
              type="textarea"
              label="Content"
              :rules="[val => !!val || 'Field is required']"
            />
          </q-card-section>
          <q-card-section class="text-right">
            <q-btn
              color="primary"
              label="Edit Post"
              @click="editPost()"
              :disable="editedTitle !== '' && editedContent !== '' ? false:true"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="row">
        <div class="col">
          <q-card class="add-post-card" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-btn round dense color="primary" icon="create" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Write something!</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-card-section>
              <q-input
                rounded
                filled
                v-model="title"
                label="Title"
                :rules="[val => !!val || 'Field is required']"
              />
            </q-card-section>

            <q-card-section horizontal>
              <q-input
                v-model="content"
                filled
                type="textarea"
                label="Content"
                :rules="[val => !!val || 'Field is required']"
              />
            </q-card-section>
            <q-card-section class="text-right">
              <q-btn
                color="primary"
                label="Add Post"
                @click="addPost()"
                :disable="title !== '' && content !== '' ? false:true"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-mt-xl" v-for="post in getPosts" :key="post._id">
        <div class="col">
          <q-card class="add-post-card" flat bordered>
            <q-item>
              <q-item-section class="text-center">
                <q-expansion-item v-if="post.creatorId === user._id">
                  <template v-slot:header>
                    <q-item-section class="q-ml-xl">
                      <q-item-label>{{post.title}}</q-item-label>
                      <q-item-label caption>by you</q-item-label>
                    </q-item-section>

                    <q-item-section side></q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      <q-list separator>
                        <q-item clickable>
                          <q-item-section
                            class="status-color"
                            @click="deletePost(post._id)"
                          >Delete post</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section @click="openEditDialog(post)">Edit post</q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <div v-else>
                  <q-item-section>
                    <q-item-label lines="1">{{post.title}}</q-item-label>
                    <q-item-label caption lines="2">
                      <span>{{'by ' + getUserById(post.creatorId)}}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <small
                      v-if="getPostTime(post) < 60"
                      class="text-grey activity-e-time"
                    >{{getPostTime(post)}} minutes ago</small>
                    <small
                      v-if="getPostTime(post) >= 60 && getPostTime(post) < 1440"
                      class="text-grey activity-e-time"
                    >{{Math.floor(getPostTime(post)/60)}} hours ago</small>
                    <small
                      v-if="getPostTime(post) >= 1440 && getPostTime(post)"
                      class="text-grey activity-e-time"
                    >{{Math.floor(getPostTime(post)/1440)}} days ago</small>
                  </q-item-section>
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-card-section horizontal>
              <div class="q-pa-md">{{post.content}}</div>
              <q-separator v-if="post.creatorId !== user._id" />
              <q-card-actions
                horizontal
                class="justify-around q-px-sm"
                v-if="post.creatorId !== user._id"
              >
                <q-btn flat round color="red" icon="favorite">
                  <q-tooltip>Like post!</q-tooltip>
                </q-btn>
                <q-btn flat round color="primary" icon="share">
                  <q-tooltip>Share post!</q-tooltip>
                </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Dashboard',
  data () {
    return {
      title: '',
      content: '',
      user: this.$store.getters['auth/getUser'],
      editPostDialog: false,
      editedTitle: '',
      editedContent: '',
      activePostId: ''
    }
  },
  beforeCreate () {
    this.$store.dispatch('posts/getPosts')
    this.$store.dispatch('auth/getUsers')
  },
  methods: {
    getPostTime (post) {
      return moment().diff(moment(post.createdAt), 'minutes')
    },
    getUserById (userId) {
      const user = this.getUsers.find(user => user._id === userId)
      if (!user) return null
      return `${user.firstName} ${user.lastName}`
    },
    deletePost (postId) {
      return this.$store.dispatch('posts/deletePost', { postId: postId }).then(() => {
        this.$store.dispatch('posts/getPosts')
      })
    },
    addPost () {
      const payload = {
        title: this.title,
        content: this.content
      }
      this.$store.dispatch('posts/addPost', payload).then(() => {
        this.$store.dispatch('posts/getPosts')
        this.title = ''
        this.content = ''
      })
    },
    openEditDialog (post) {
      this.editPostDialog = true
      this.editedTitle = post.title
      this.editedContent = post.content
      this.activePostId = post._id
    },
    editPost () {
      const payload = {
        postId: this.activePostId,
        title: this.editedTitle,
        content: this.editedContent
      }
      this.$store.dispatch('posts/editPost', payload).then(() => {
        this.$store.dispatch('posts/getPosts')
        this.activePostId = ''
        this.editedTitle = ''
        this.editedContent = ''
        this.editPostDialog = false
      })
    }
  },
  computed: {
    getPosts () {
      return this.$store.getters['posts/getPosts']
    },
    getUsers () {
      return this.$store.getters['auth/getUsers']
    }
  }
}
</script>

<style lang='scss'>
@import "./css/dashboardPage.scss";
</style>
