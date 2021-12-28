<template>
  <q-layout view="lHh Lpr lFf">
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
        <div class="text-h3">{{ title }}</div>
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
        <q-scroll-area class="list-wrapper">
          <q-list padding>
            <q-item
              to="/"
              exact
              @click="updateTitle('Личные')"
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon
                  color="green"
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
                  color="red"
                  name="work" />
              </q-item-section>
              <q-item-section>
                Работа
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
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
import { date } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },
  data () {
    return {
      title: 'Личные'
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now()
      return  date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },
  methods: {
    updateTitle (label) {
      this.title = label
    }
  }
})
</script>

<style>
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
</style>
