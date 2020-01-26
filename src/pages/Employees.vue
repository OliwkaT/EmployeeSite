<template>
  <q-page class="flex q-ma-xl employees-view">
    <q-dialog v-model="addUserDialog">
      <q-card flat bordered class="add-user">
        <q-card-section>
          <q-input
            v-model="firstName"
            label="First Name"
          />
          <q-input
            v-model="lastName"
            label="Last Name"
          />
          <q-input v-model="email" label="Email"/>
          <q-input
            v-model="password"
            label="Password"
          />
          <q-input v-model="city" label="City"/>
          <q-input
            v-model="department"
            label="Department"
          />
          <q-input v-model="position" label="Position"/>
          <q-checkbox v-model="isAdmin" label="Is Admin?" />
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn color="primary" label="Add new Employee" @click="addUser()"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="row">
      <div
        class="col-xs-12 col-sm-12 col-md-6 col-lg-4 q-pa-sm"
        v-for="employee in getAllEmployees()"
        :key="employee._id"
      >
        <q-card>
            <q-card-section>
                <q-badge outline color="secondary" label="ONLINE" v-if="employee.status === 'ONLINE'"/>
                <q-badge outline color="negative" label="OFFLINE" v-else/>
            </q-card-section>
          <img
            src="https://s3-ap-southeast-1.amazonaws.com/images.humanresourcesonline.net/wp-content/uploads/2019/02/08121400/Aditi-Feb-2019-happy-employee-istock.jpg"
          />

          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="account_circle" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{employee.firstName + ' ' + employee.lastName}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="red" name="mail" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{employee.email}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="amber" name="card_travel" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{employee.position}}</q-item-label>
                <q-item-label caption>{{employee.department}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="amber" name="map" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{employee.city}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 q-pa-sm" v-if="user.role === 'ADMIN'">
        <q-card class="add-employee-card">
          <img src="https://www.webtree.com.pl/grafika/pracownicy.jpg" />
          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="add"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="addUserDialog = true"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">Add Employee</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Employees',
  data () {
    return {
      user: this.$store.getters['auth/getUser'],
      email: '',
      firstName: '',
      lastName: '',
      isAdmin: false,
      password: '',
      city: '',
      department: '',
      position: '',
      status: '',
      addUserDialog: false
    }
  },
  beforeCreate () {
    this.$store.dispatch('auth/getUsers')
  },
  methods: {
    getAllEmployees () {
      return this.getUsers.filter(user => user._id !== this.user._id)
    },
    addUser () {
      const payload = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.isAdmin ? 'ADMIN' : 'EMPLOYEE',
        password: this.password,
        city: this.city,
        department: this.department,
        position: this.position,
        status: 'OFFLINE'
      }
      this.$store.dispatch('auth/addUser', payload).then(() => {
        this.$store.dispatch('auth/getUsers')
        this.addUserDialog = false
        this.email = ''
        this.firstName = ''
        this.lastName = ''
        this.role = false
        this.password = ''
        this.city = ''
        this.department = ''
        this.position = ''
        this.status = ''
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
@import "./css/employeesPage.scss";
</style>
