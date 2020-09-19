<template>
  <div id="ordersMain" class="scroll" style="height: 100%">
    <q-pull-to-refresh ref="pullToRefresh" @refresh="getOrders">
      <q-list>
        <q-item-label header>Completed orders</q-item-label>
        <!-- <q-separator spaced inset /> -->
        <div class="" v-for="(item, index) in ordersList" :key="index" @click="redirectToOrder(item)">
          <q-slide-item @left="(reset) => { toggleComplete(reset, item) }" @right="(reset) => { toggleDelete(reset, item) }" left-color="orange" right-color="red">
            <template v-slot:left>
              <q-icon name="update" />
            </template>
            <template v-slot:right>
              <q-icon name="delete" />
            </template>
            <q-item  clickable v-ripple  >
              <!-- <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section> -->
              <q-item-section>
                <q-item-label>{{item.user.fullname}}</q-item-label>
                <q-item-label caption lines="2">{{getCart(item.cart)}}</q-item-label>
                <q-item-label caption lines="1"># {{item._id}}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label class="itemAmount">₹{{item.amount}}</q-item-label>
                <q-item-label caption>{{getTime(item.createdAt)}}</q-item-label>
                <!-- <q-icon name="star" color="yellow" /> -->
              </q-item-section>
            </q-item>
          </q-slide-item>
          <q-separator spaced inset />
        </div>
      </q-list>
    </q-pull-to-refresh>
     <q-dialog v-model="confirmComplete">
      <q-card style="width:400px;">
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <!-- <span class="q-ml-sm">You are currently not connected to any network.</span> -->
          <div class="text-h8">Are you sure?</div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" class="q-px-md q-mx-sm q-my-sm" color="negative" v-close-popup @click="toggleComplete" />
          <q-btn push label="Yes" class="q-px-md q-mx-sm q-my-sm" color="positive" v-close-popup @click="markPending" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete">
      <q-card style="width:400px;">
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <!-- <span class="q-ml-sm">You are currently not connected to any network.</span> -->
          <div class="text-h8">Are you sure?</div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" class="q-px-md q-mx-sm q-my-sm" color="primary" v-close-popup @click="toggleDelete" />
          <q-btn push label="Delete" class="q-px-md q-mx-sm q-my-sm" color="negative" v-close-popup @click="deleteOrderAction" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Completed',
  data () {
    return {
      ordersList: [],
      loading: false,
      confirmComplete: false,
      confirmDelete: false,
      deleteOrder: {},
      completeOrder: {}
    }
  },
  methods: {
    async getOrders (done) {
      try {
        var data = await this.$axios.get('/order', {
          params: {
            completed: 1
          }
        })
        var orders = data.data.data
        this.ordersList = orders
      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: 'Data failed to load.',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
      console.log(data)
      if (done) {
        done()
      }
    },
    getTime (time) {
      var m = moment(time)
      return m.fromNow()
    },
    getCart (cart) {
      return cart.map((item) => {
        return item.name
      }).join(', ')
    },
    toggleDelete ({ reset }, item) {
      if (item) {
        this.deleteOrder = item
      } else {
        this.deleteOrder = {}
      }
      this.confirmDelete = !this.confirmDelete
      if (reset) {
        reset()
      }
    },
    toggleComplete ({ reset }, item) {
      if (item) {
        this.completeOrder = item
      } else {
        this.completeOrder = {}
      }
      this.confirmComplete = !this.confirmComplete
      if (reset) {
        reset()
      }
    },
    redirectToOrder (item) {
      this.$router.push({
        name: 'Order',
        params: {
          id: item._id
        }
      })
    },
    async markPending () {
      this.loading = true
      await this.$axios.put('/order/' + this.completeOrder._id, { status: 'pending' }).then((res) => {
        console.log(res)
        this.$q.notify({
          message: 'Marked as pending successfully!',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
        this.confirmComplete = false
        this.completeOrder = {}
        this.getOrders()
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Status change unsuccessful!',
          caption: err,
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      this.loading = false
    },
    async deleteOrderAction () {
      this.loading = true
      await this.$axios.delete('/order/' + this.deleteOrder._id, { params: { forcedelete: 1 } }).then((res) => {
        console.log(res)
        this.$q.notify({
          message: 'Order deleted successfully!',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
        this.confirmDelete = false
        this.deleteOrder = {}
        this.getOrders()
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Order deletion unsuccessful!',
          caption: err,
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      this.loading = false
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped src="src/css/orders.scss"></style>
