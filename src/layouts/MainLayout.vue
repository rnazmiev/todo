<template>
  <q-layout view="lHh Lpr lFf" class="todo-layout">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-sm q-mb-md">
        <!-- <div
          class="title-wrap"
          :class="{
            'home' : $route.fullPath == '/',
            'work' : $route.fullPath == '/work'
          }"
          > -->
        <div class="title-wrap">
          <span class="text-h5">{{ title }}</span>
        </div>
        <div class="text-subtitle">{{ todaysDate }}</div>
      </div>
      <q-img
        src="~assets/bg.jpg"
        class="header-image absolute-top"/>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
        class="q-drawer-bg"
      >
        <q-scroll-area class="list-wrapper" style="height: calc(100% - 120px); margin-top: 120px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
              to="/"
              exact
              @click="updateTitle('Личные')"
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon
                  color="green-13"
                  name="home" />
              </q-item-section>
              <q-item-section>
                Личные
              </q-item-section>
            </q-item>

            <q-item
              to="/work"
              exact
              @click="updateTitle('Работа')"
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon
                  color="red-13"
                  name="work" />
              </q-item-section>
              <q-item-section>
                Работа
              </q-item-section>
            </q-item>

            <q-item
              class="about-item"
              to="/about"
              exact
              @click="updateTitle('О программе')"
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon
                  color="blue-13"
                  name="info" />
              </q-item-section>
              <q-item-section>
                О программе
              </q-item-section>
            </q-item>

            <q-item
              to="/policy"
              exact
              @click="updateTitle('Политика конфиденциальности')"
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon
                  color="grey"
                  name="policy" />
              </q-item-section>
              <q-item-section>
                Политика конфиденциальности
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-img class="absolute-top sidebar-img" src="~assets/material.png" style="height: 120px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="~assets/logo.png">
            </q-avatar>
            <div class="text-weight-bold">Список задач</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      title: ''
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  mounted() {
    this.changeTitle()
  },
  computed: {
    todaysDate() {
      const options = {weekday: 'long', month: 'long', day: 'numeric' }
      const date = new Date(Date.now())
      return  date.toLocaleDateString("ru", options)
    }
  },
  watch: {
    '$route.params': function () {
      this.changeTitle()
    }
  },
  methods: {
    updateTitle (label) {
      this.title = label
    },
    changeTitle () {
      switch (this.$route.fullPath) {
        case '/' :
          this.title = 'Личные'
          break
        case '/work' :
          this.title = 'Работа'
          break
        case '/about' :
          this.title = 'О программе'
          break
        case '/policy' :
          this.title = 'Политика конфиденциальности'
          break
      }
    }
  }
})
</script>

<style lang="scss">
.todo-layout {
  .q-header {
    background-color: #4f7fd5 !important;
    .text-subtitle {
      opacity: .5;
    }
    .title-wrap {
      position: relative;
      display: inline-block;
    }
    .home {
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: #63dea5;
        bottom: 0;
      }
    }
    .work {
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: #F45E6D;
        bottom: 0;
      }
    }
  }
    .header-image {
      height: 100%;
      z-index: -2;
      opacity: .2;
      filter: grayscale(100%);
    }
    .list-wrapper {
      height: calc(100% - 185px);
      /* border-right: 1px solid #ddd */
    }
    .q-drawer-bg {
      background-image: url('~assets/bg2.png');
    }
    .about-item {
      border-top: 1px solid #ccc;
      margin-top: 100%;
    }
    .sidebar-img {
      background: #4f7fd5;
      .q-img__image {
        opacity: .1;
      }
    }
    .q-item__section {
      line-height: normal;
    }
    .q-item__section--avatar {
      min-width: 32px;
    }
}
</style>
