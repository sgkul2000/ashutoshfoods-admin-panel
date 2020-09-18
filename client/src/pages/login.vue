<template>
  <div class="loginMain">
    <h4>Ashutosh Foods</h4>
    <h6>Admin Panel</h6>
    <div class="inputWrapper q-px-lg">
      <!-- <input type="text" v-model="email"> -->
      <q-input
        v-model="email"
        label="Enter email"
        :dense="true"
        type="email"
        :disable="loading"
        :error="validateForm()"
        error-message="Email Invalid"
      >
        <template v-slot:prepend>
          <q-icon name="account_circle" />
        </template>
      </q-input>
      <q-input
        @keydown.enter="login()"
        v-model="password"
        label="Enter password"
        :dense="true"
        :type="isPwd ? 'password' : 'text'"
        :disable="loading"
        :rules="[val => !!val || 'Password Required']"
      >
        <template v-slot:prepend>
          <q-icon name="vpn_key" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <!-- <input type="password" v-model="password"> -->
      <!-- <button @click="login()">Submin</button> -->
      <q-btn
        :disable="loading"
        id="loginSubmit"
        class="full-width"
        color="primary"
        label="Login"
        padding="20px auto"
        @click="login()"
      />
      <q-btn
        flat
        :disable="loading"
        id="loginSubmit"
        class="full-width"
        color="primary"
        label="Forgot Password"
        padding="20px auto"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      isPwd: true,
      loading: false,
      delay: 0,
      isEmailValid: false
    }
  },
  watch: {
    email (val) {
      this.isEmailValid = false
    }
  },
  methods: {
    login () {
      this.loading = true
      // this.$refs.ajaxBar.start()
      this.$q.loadingBar.start()
      this.$axios.post('/auth/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        var data = res.data
        console.log(data)
        if (data.auth) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('jwt', data.token)
          this.$store.commit('mainStore/updateAuth', data.user)
          this.$router.push({ name: 'Home' })
          this.$q.notify({
            type: 'positive',
            message: `Welcome ${data.user.username}`
          })
        } else {
          throw data.error
        }
        // this.$refs.ajaxBar.stop()
      }).catch((err) => {
        console.error(err)
        this.$q.notify({
          message: 'Login unsuccessful, please try again.',
          type: 'negative',
          caption: err,
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      this.$q.loadingBar.stop()
      this.loading = false
    },
    validateForm () {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !(re.test(String(this.email).toLowerCase()))
    }
  }
}
</script>
<style lang="scss" scoped src="src/css/app.scss"></style>
