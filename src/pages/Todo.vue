<template>
  <q-page class="column todo-wrapper">
    <div class="row q-pa-sm input-row">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        autofocus="true"
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
        v-for="(task,index) in sorteredItems"
        :key="index"
        @click="doneTask(task,index)"
        clickable
        class="todo-item"
        :class="{
          'done bg-blue-1': task.done,
          'bg-v1': task.important === 'v1',
          'bg-v2': task.important === 'v2'}"
        v-ripple>
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            class="no-pointer-events todo-checkbox"
            color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <span class="date">{{ showDate(task.date) }}</span>
        </q-item-section>
        <q-item-section
          v-if="task.done"
          side>
          <q-btn
            @click.stop="deleteTask(index)"
            flat
            class="todo-delete-icon"
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
      <!-- <q-icon
        name="check"
        size="100px"
        color="primary"/> -->
      <div class="text-h5 text-primary text-center">
        Какие нибудь задачи из личной жизни
      </div>
      <span class="w-50">Оплатить коммунальные платежи, спланировать семейную поездку,
        посмотреть кино...все дела в жизни можно вспомнить здесь</span>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
// import { Dialog } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const tasks = ref([])
    const sorteredItems = ref([])
    const newTask = ref('')
    return {
      tasks,
      newTask,
      sorteredItems,
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
          this.sorteredItems.splice(index, 1)
          this.tasks = this.sorteredItems
          this.addToLocalStorage()
          this.sorteredFunction()
          $q.notify('Задача удалена')
        })
      }
    }
  },
  mounted () {
    if (localStorage.getItem('localTodo')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('localTodo'))
      } catch(e) {
        localStorage.removeItem('localTodo');
      }
    }
    this.sorteredFunction()
  },
  methods: {
    sorteredFunction() {
      console.log(this.tasks)
      const sortArray = [...this.tasks].sort((a,b) => {
        if(a.date > b.date) return -1
        if(a.date < b.date) return 1
        // return a.id - b.id
      })
      this.sorteredItems = sortArray
      console.log(sortArray)
    },
    doneTask(task,index) {
      task.done = !task.done
      const localTodo = localStorage.getItem('localTodo')
      const parseLocalTodo = JSON.parse(localTodo)
      parseLocalTodo[index].done = task.done 
      this.tasks = parseLocalTodo
      this.addToLocalStorage()
    },
    addTask() {
      if (this.newTask) {
        this.tasks.push({
          title: this.newTask,
          important: 'v1',
          done: false,
          date: Date.now()
        })
        this.newTask = ''
        this.sorteredFunction()
        this.addToLocalStorage()
      }
    },
    addToLocalStorage() {
      const parsed = JSON.stringify(this.sorteredItems);
      localStorage.setItem('localTodo', parsed);
    },
    showDate (createdAt) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(createdAt)
      const formattedDate = date.toLocaleDateString("ru", options)
      return formattedDate
    },
  }
})
</script>

<style lang="scss">
.q-field--filled .q-field__control {
  background: rgba(0, 0, 0, 0.0);
}
.q-field--filled .q-field__control:before {
  content: none !important;
}
.todo-wrapper {
  background: #4f7fd5;
  .input-row {
    z-index: 9;
    .q-field {
      background: #fff;
      border-radius: 8px;
      &:focus {
        background: #fff;
      }
    }
  }
  .q-list {
    // background: #F5F5FA !important;
    background-image: url('~assets/bg2.png');
    overflow-y: auto;
    height: calc(100vh - 183px);
    border-radius: 24px 24px 0px 0px;
    padding: 0px 10px;
    .todo-item {
      background: #F5F5FA;
      box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 5px 5px 10px rgba(170, 170, 204, 0.25), 10px 10px 20px rgba(170, 170, 204, 0.5), -10px -10px 20px #FFFFFF;
      border-radius: 16px;
      border-top: none !important;
      margin-top: 20px;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      .date {
        font-size: 11px;
        opacity: .5;
      }
    }
    .q-item {
      .q-checkbox__bg {
        border-radius: 50%;
        // color: #006CFF !important;
        .q-checkbox__svg {
          left: 10%;
          width: 80% !important;
        }
      }
      // .text-primary {
      //   .q-checkbox__bg {
      //     color: #006CFF !important;
      //   }
      // }
      // .todo-delete-icon {
      //   i {
      //     color: #006CFF;
      //   }
      // }
    }
    .done {
      .q-item__label {
        text-decoration: line-through;
        color: #bbb;
      }
    }
    .bg-v1 {
      .q-checkbox__inner {
        color: #61DEA4;
      }
    }
    .bg-v2 {
      .q-checkbox__inner {
        color: #F45E6D;
      }
    }
  }
  .no-tasks {
    opacity: .5;
    text-align: center;
    width: 70%;
    span {
      display: block;
      margin-top: 20px;
    }
  }
} 
</style>
