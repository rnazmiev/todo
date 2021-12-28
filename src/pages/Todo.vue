<template>
  <q-page class="bg-grey-3 column todo-wrapper">
    <div class="row q-pa-sm bg-primary input-row">
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
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import { Dialog } from 'quasar'

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
  mounted() {
    if (localStorage.getItem('localTodo')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('localTodo'));
      } catch(e) {
        localStorage.removeItem('localTodo');
      }
    }
  },
  methods: {
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
          Dialog.create({
          title: 'Укажите приоритет:',
          ok: {
            push: true
          },
          cancel: {
            push: true,
          },
          options: {
              type: 'radio',
              model: 'v1',
              items: [
                { label: 'Низкий', value: 'v1', color: 'positive' },
                { label: 'Высокий', value: 'v2', color: 'negative' }
              ]
            },
            cancel: true,
            persistent: true
        }).onOk(data => {
            this.tasks.push({
              title: this.newTask,
              important: data,
              done: false
            })
            this.newTask = ''
            this.addToLocalStorage()
          })
      }
    },
    addToLocalStorage() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('localTodo', parsed);
    }
  }
})
</script>

<style lang="scss">
.todo-wrapper {
  .input-row {
    z-index: 9;
  }
  .q-list {
    overflow-y: auto;
    height: calc(100vh - 201px);
    .todo-item {
      border-top: none !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
