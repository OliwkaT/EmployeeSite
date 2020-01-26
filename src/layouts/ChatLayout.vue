<template>
  <q-layout view="hHh lpR fFf" class="main-view">
    <q-header elevated class="main-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-h4">
          <q-avatar size="xl" class="logo-size">
            <img
              src="https://pngimage.net/wp-content/uploads/2018/05/c-logo-png-2.png?fbclid=IwAR2dXHGJf7Dx_hk5E-yX2M88aDZU_kfanN4uMrKdO4UyrXp3bHuHH9-HwFQ"
            />
          </q-avatar>Cartero
        </q-toolbar-title>

        <q-btn round @click="right = !right" class="q-mr-sm">
          <q-avatar size="40px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left">
      <q-list class="q-mt-xl nav-drawer">
        <q-item clickable to="/dashboard" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>See whats's new! >></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/tasks" exact>
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tasks</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Calendar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/chat" exact>
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Chat</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/employees" exact>
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Employees</q-item-label>
          </q-item-section>
        </q-item>
        <div class="q-mt-xl">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right">
      <q-card class="q-ma-md q-mt-xl">
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar size="60px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{user.firstName + ' ' + user.lastName}}</q-item-label>
              <q-item-label caption>{{user.email}}</q-item-label>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section class="text-center cursor-pointer">
              <div @click="logout()">Log Out</div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <div class="q-px-lg q-pb-md q-mt-md text-left">
          <q-list bordered separator v-for="user in getFilteredUsers()" :key="user._id">
      <q-item clickable>
        <q-item-section>{{user.firstName + ' ' + user.lastName}}</q-item-section>
      </q-item>
    </q-list>
        </div>
      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white"></q-footer>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false,
      user: this.$store.getters['auth/getUser']
    }
  },
  beforeCreate () {
    this.$store.dispatch('auth/getUsers')
  },
  methods: {
    getFilteredUsers () {
      return this.getUsers.filter(user => user._id !== this.user._id)
    },
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/user/login')
      })
    }
  },
  computed: {
    getUsers () {
      return this.$store.getters['auth/getUsers']
    }
  }
}
</script>

<style lang='scss'>
@import "./css/mainLayout.scss";
</style>
