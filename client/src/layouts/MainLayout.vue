<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          Ashutosh Foods
        </q-toolbar-title>

        <!-- <div>Logout</div> -->
        <q-btn flat color="white" label="Logout"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
    <div class="welcomeUser">
      Welcome,
      <span>{{currentUser}}</span>
    </div>
      <q-list>
        <!-- <q-item-label
          class="text-grey-8"
        >
          Essential Links
        </q-item-label> -->
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-ajax-bar ref="bar" :delay="delay" />
      <router-view  v-on:startAjaxBar="onStartAjaxBar" v-on:stopAjaxBar="onStopAjaxBar"  />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters } from 'vuex'

const linksData = [
  {
    title: 'Analytics',
    // caption: '@quasarframework',
    icon: 'show_chart',
    link: 'Home'
  },
  {
    title: 'Manage products',
    // caption: 'quasar.dev',
    icon: 'category',
    link: 'Products'
  },
  {
    title: 'Manage orders',
    // caption: 'github.com/quasarframework',
    icon: 'shopping_bag',
    link: 'Orders'
  },
  {
    title: 'Manage admins',
    // caption: 'chat.quasar.dev',
    icon: 'account_circle',
    link: 'Admin'
  },
  {
    title: 'Completed orders',
    // caption: 'forum.quasar.dev',
    icon: 'assignment_turned_in',
    link: 'Completed'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      delay: 0
    }
  },
  methods: {
    onStartAjaxBar () {
      this.$refs.bar.start()
    },
    onStopAjaxBar () {
      this.$refs.bar.stop()
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'mainStore/getUsername'
    })
  },
  created () {
    var user = JSON.parse(localStorage.getItem('user'))
    this.$store.commit('mainStore/updateAuth', user)
  }
}
</script>

<style lang="scss" scoped src="src/css/layout.scss"></style>
