<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        bg-color="white"
        square
        filled 
        placeholder="Добавить задачу"
        dense>
        <template v-slot:append>
          <q-btn
            @click="addTask"
            round
            dense
            flat
            icon="add" />
        </template>
      </q-input>
    </div>
    <q-list
      class="bg-white"
      separator
      bordered>
      <q-item
        v-for="(task,index) in tasks"
        :key="index"
        @click="doneTask(task,index)"
        clickable
        class="todo-item"
        :class="{
          'done bg-blue-1': task.done,
          'bg-v2': task.important === 'v2'}"
        v-ripple>
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            class="no-pointer-events"
            color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="task.done"
          side>
          <q-btn
            @click.stop="deleteTask(index)"
            flat
            round
            dense
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="!tasks.length"
      class="no-tasks absolute-center">
      <q-icon
        name="check"
        size="100px"
        color="primary"/>
      <div class="text-h5 text-primary text-center">
        Нет задач
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    return {
      deleteTask(index) {
        $q.dialog({
          title: 'Подтверждение',
          message: 'Хочешь удалить?',
          ok: {
            push: true
          },
          cancel: {
            push: true,
          },
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.tasks.splice(index, 1);
          this.addToLocalStorage();
          $q.notify('Задача удалена')
        })
      }
    }
  },
  data() {
    return {
      newTask: '',
      tasks: [],
    }
  },
  beforeMount() {
    if (localStorage.getItem('jobList')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('jobList'))
        console.log('moun', this.storeList)
      } catch(e) {
        localStorage.removeItem('jobList');
      }
    }
  },
  methods: {
    doneTask(task,index) {
      task.done = !task.done
      const localTodo = localStorage.getItem('jobList')
      const parseLocalTodo = JSON.parse(localTodo)
      parseLocalTodo[index].done = task.done 
      this.tasks = parseLocalTodo
      this.addToLocalStorage()
    },
    addTask() {
      this.tasks.push({
        title: this.newTask,
        important: 'v2',
        done: false
      })
      this.newTask = ''
      this.addToLocalStorage()
    },
    addToLocalStorage() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('jobList', parsed);
    }
  },
  
})
</script>

<style lang="scss">
  .q-list {
    overflow-y: auto;
    height: calc(100vh - 241px);
    .todo-item {
      border-top: none !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    .q-item {
      .q-checkbox__bg {
        border-radius: 50%;
        .q-checkbox__svg {
          left: 10%;
          width: 80% !important;
        }
      }
    }
    .done {
      .q-item__label {
        text-decoration: line-through;
        color: #bbb;
      }
    }
    .bg-v2 {
      .q-checkbox__inner {
        color: #F45E6D;
      }
    }
  }
</style>
