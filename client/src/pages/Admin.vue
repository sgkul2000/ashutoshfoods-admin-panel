<template>
  <div id="adminMain" class="scroll" style="height:100%;">
      <q-pull-to-refresh ref="pullToRefresh" @refresh="getAdmins">
        <div class="content">
      <q-list>
        <div class="full-width q-py-sm q-px-md q-mt-sm q-px-md-xl">
          <q-btn push class="full-width" color="positive" label="Add admin" @click="toggleVisible" />
          <q-slide-transition>
            <div v-show="visible">
              <q-card class="card q-pa-md q-my-md q-mx-xs">
                 <q-input class="q-my-sm"  v-model="newAdmin" label="Enter email / username" type="email" :error="validateForm()" error-message="Email Invalid" />
                <q-btn push class="full-width q-my-sm" color="positive" label="add" @click="addAdmin" />
                <q-btn flat class="full-width q-my-sm" color="negative" label="reset" @click="resetForm" />
              </q-card>
            </div>
          </q-slide-transition>
        </div>
        <q-item-label header>All admin</q-item-label>
        <!-- <q-separator spaced inset /> -->
        <div class="" v-for="(item, index) in adminList" :key="index">
          <q-item  >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="account_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.fullname}}</q-item-label>
              <q-item-label caption lines="2">{{item.email}}</q-item-label>
            </q-item-section>

            <q-item-section  side>
              <!-- <q-avatar color="primary" text-color="white" icon="bin" /> -->
              <!-- <q-item-label class="itemAmount">₹{{item.amount}}</q-item-label> -->
              <!-- <q-item-label caption>{{getTime(item.createdAt)}}</q-item-label> -->
              <q-icon class="cursor-pointer" name="delete" color="negative" @click="toggleConfirm(item)" />
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </div>
      </q-list>
      </div>
    </q-pull-to-refresh>
    <q-dialog v-model="confirm">
      <q-card style="width:400px;">
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <!-- <span class="q-ml-sm">You are currently not connected to any network.</span> -->
          <div class="text-h6">Are you sure?</div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" class="q-px-md q-mx-sm q-my-sm" color="primary" v-close-popup @click="toggleConfirm" />
          <q-btn push label="Delete" class="q-px-md q-mx-sm q-my-sm" color="negative" v-close-popup @click="deleteAdmin" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      adminList: [],
      loading: true,
      visible: false,
      newAdmin: '',
      confirm: false,
      delete: {}
    }
  },
  methods: {
    async getAdmins (done) {
      await this.$axios.get('/auth/admin').then((res) => {
        this.adminList = res.data.data
      }).catch((err) => {
        console.error(err)
        this.$q.notify({
          message: 'Data failed to',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      if (done) {
        done()
      }
      console.log(this.adminList)
      this.loading = false
    },
    toggleVisible () {
      this.visible = !this.visible
    },
    resetForm () {
      this.newAdmin = ''
    },
    toggleConfirm (item) {
      this.visible = false
      if (item) {
        this.delete = item
      } else {
        this.delete = {}
      }
      this.confirm = !this.confirm
    },
    async addAdmin () {
      this.loading = true
      await this.$axios.post('/auth/admin', { email: this.newAdmin }).then((res) => {
        console.log(res)
        this.$q.notify({
          message: `Admin access granted to ${this.newAdmin} successfully!`,
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.getAdmins()
        this.newAdmin = ''
        this.visible = false
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: `Failed to add ${this.newAdmin} as admin`,
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }],
          caption: err
        })
      })
      this.loading = false
    },
    async deleteAdmin (item) {
      this.loading = true
      await this.$axios.delete('/auth/admin/', { params: { id: this.delete._id } }).then((res) => {
        console.log(res)
        this.$q.notify({
          message: 'Admin deleted successfully!',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.getAdmins()
        this.visible = false
        this.delete = {}
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Failed to delete admin',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }],
          caption: err
        })
      })
      this.loading = false
    },
    validateForm () {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !(re.test(String(this.newAdmin).toLowerCase()))
    }
  },
  created () {
    this.getAdmins()
  }
}
</script>
