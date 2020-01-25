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

        <q-btn dense flat round icon="menu" @click="right = !right" />
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
        <q-item clickable>
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
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Chat</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
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
      <q-item>
        <q-item-section avatar>
          <q-avatar size="100px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label></q-item-label>
          <q-item-label caption></q-item-label>
        </q-item-section>
      </q-item>

      <div class="q-px-lg q-pb-md">
    <q-timeline color="primary">
      <q-timeline-entry heading>
        Timeline heading
      </q-timeline-entry>

      <q-timeline-entry
        :subtitle="`${notificationDate}`"
      >
        <div>Message received</div>
      </q-timeline-entry>

      <q-timeline-entry
        :subtitle="`${notificationDate}`"
        icon="delete"
      >
        <div>Post deleted</div>
      </q-timeline-entry>
    </q-timeline>
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
import moment from 'moment'
export default {
  data () {
    return {
      left: false,
      right: false,
      user: this.$store.getters['auth/getUser'],
      notificationDate: moment().format('DD.MM.YYYY')
    }
  }
}
</script>

<style lang='scss'>
@import "./css/mainLayout.scss";
</style>
