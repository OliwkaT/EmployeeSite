<template>
  <q-page class="flex q-mt-xl">
    <q-dialog v-model="addTaskDialog">
      <q-card flat bordered class="edit-post">
        <q-card-section>
          <q-input v-model="newTask" label="Task" :rules="[val => !!val || 'Field is required']" />
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            color="primary"
            label="Add Task"
            @click="addTask()"
            :disable="newTask !== '' ? false:true"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="task-view q-mb-xl">
      <div class="row q-mb-xl">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 q-pa-md">
          <p class="text-center">
            <q-btn
              round
              color="positive"
              icon="add"
              size="10px"
              class="q-mr-md"
              @click="addTaskDialog = true"
            />TO DO
          </p>
          <q-list v-for="task in getCurrentUserTask()" :key="task._id">
            <q-card>
              <q-expansion-item
                v-if="task.status === 'TO DO'"
                group="somegroup"
                icon="playlist_add"
                :label="[`${task.text}`]"
                header-class="text-pink-13"
                @click="getActiveTaskId(task)"
              >
                <q-card>
                  <q-card-section>
                    <q-select
                      v-model="status"
                      :options="statusOptions"
                      option-value="text"
                      option-label="text"
                      emit-value
                      label="Change status"
                    />
                    <q-input v-model="text" label="Change text" />
                    <div class="q-pa-md q-gutter-sm">
                      <q-btn
                        color="primary"
                        icon="create"
                        label="Edit"
                        class="btn-styles"
                        @click="editTask()"
                      />
                      <q-btn
                        color="negative"
                        icon="delete"
                        label="delete"
                        class="btn-styles"
                        @click="deleteTask()"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
          </q-list>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 q-pa-md">
          <p class="text-center">TASKS IN PROGRESS</p>
          <q-list v-for="task in getCurrentUserTask()" :key="task._id">
            <q-card>
              <q-expansion-item
                v-if="task.status === 'IN PROGRESS'"
                group="somegroup"
                expand-separator
                icon="playlist_play"
                :label="[`${task.text}`]"
                header-class="text-pink-13"
                @click="getActiveTaskId(task)"
              >
                <q-card>
                  <q-card-section>
                    <q-select
                      v-model="status"
                      :options="statusOptions"
                      option-value="text"
                      option-label="text"
                      emit-value
                      label="Change status"
                    />
                    <q-input v-model="text" label="Change text" />
                    <div class="q-pa-md q-gutter-sm">
                      <q-btn
                        color="primary"
                        icon="create"
                        label="Edit"
                        class="btn-styles text-left"
                        @click="editTask()"
                      />
                      <q-btn
                        color="negative"
                        icon="delete"
                        label="delete"
                        class="btn-styles"
                        @click="deleteTask()"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
          </q-list>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 q-pa-md">
          <p class="text-center">DONE TASKS</p>
          <q-list v-for="task in getCurrentUserTask()" :key="task._id">
            <q-card>
              <q-expansion-item
                v-if="task.status === 'DONE'"
                group="somegroup"
                icon="playlist_add_check"
                :label="[`${task.text}`]"
                header-class="text-pink-13"
                @click="getActiveTaskId(task)"
              >
                <q-card>
                  <q-card-section>
                    <q-select
                      v-model="status"
                      :options="statusOptions"
                      option-value="text"
                      option-label="text"
                      emit-value
                      label="Change status"
                    />
                    <q-input v-model="text" label="Change text" />
                    <div class="q-pa-md q-gutter-sm">
                      <q-btn
                        color="primary"
                        icon="create"
                        label="Edit"
                        class="btn-styles text-left"
                        @click="editTask()"
                      />
                      <q-btn
                        color="negative"
                        icon="delete"
                        label="delete"
                        class="btn-styles"
                        @click="deleteTask()"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Tasks',
  data () {
    return {
      user: this.$store.getters['auth/getUser'],
      activeTaskId: '',
      status: '',
      text: '',
      statusOptions: [
        { text: 'IN PROGRESS' },
        { text: 'DONE' },
        { text: 'TO DO' }
      ],
      addTaskDialog: false,
      newTask: ''
    }
  },
  beforeCreate () {
    this.$store.dispatch('tasks/getTasks')
  },
  methods: {
    getCurrentUserTask () {
      return this.getTasks.filter(task => task.creatorId === this.user._id)
    },
    getActiveTaskId (task) {
      this.activeTaskId = task._id
      this.text = task.text
      this.status = task.status
    },
    deleteTask () {
      return this.$store.dispatch('tasks/deleteTask', { taskId: this.activeTaskId }).then(() => {
        this.$store.dispatch('tasks/getTasks')
      })
    },
    addTask () {
      const payload = {
        text: this.newTask,
        status: 'TO DO'
      }
      this.$store.dispatch('tasks/addTask', payload).then(() => {
        this.$store.dispatch('tasks/getTasks')
        this.addTaskDialog = false
        this.newTask = ''
      })
    },
    editTask () {
      const payload = {
        taskId: this.activeTaskId,
        text: this.text,
        status: this.status
      }
      this.$store.dispatch('tasks/editTask', payload).then(() => {
        this.$store.dispatch('tasks/getTasks')
      })
    }
  },
  computed: {
    getTasks () {
      return this.$store.getters['tasks/getTasks']
    }
  }
}
</script>

<style lang='scss'>
@import "./css/taskPage.scss";
</style>
