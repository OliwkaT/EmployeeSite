<template>
  <q-page class="flex flex-center login-view raleway-font">
    <div class="column">
      <div class="col text-center q-mb-sm text-h4">
        <div>Hey, good to see you again!</div>
      </div>
      <div class="col text-center q-mb-xl text-h6">
        <div>Log in to get going.</div>
      </div>
      <div class="col q-pa-sm">
        <q-card class="login-card">
          <q-card-section class="q-pa-lg">
            <div class="flex flex-center text-h4 q-pb-lg">Log in</div>
            <q-form class="q-gutter-md q-pa-sm">
              <q-input
                v-model="email"
                type="email"
                prefix="Email:"
                filled
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your email!']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                v-model="password"
                filled
                type="password"
                prefix="Password:"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your password']"
              />
              <div class="flex flex-center q-pt-xl">
                <q-btn rounded color="primary" size="lg" label="Log in" @click="login()" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('auth/login', payload)
    }
  }
}
</script>

<style lang='scss'>
@import "./css/loginPage.scss";
</style>
