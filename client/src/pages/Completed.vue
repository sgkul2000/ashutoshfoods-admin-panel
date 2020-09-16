<template>
  <div id="ordersMain" class="scroll" style="height: 100%">
    <q-pull-to-refresh ref="pullToRefresh" @refresh="getOrders">
      <q-list>
        <q-item-label header>Recent orders</q-item-label>
        <!-- <q-separator spaced inset /> -->
        <div class="" v-for="(item, index) in ordersList" :key="index">
          <q-item  clickable v-ripple  >
            <!-- <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section> -->
            <q-item-section>
              <q-item-label>{{item.user.fullname}}</q-item-label>
              <q-item-label caption lines="2">{{getCart(item.cart)}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="itemAmount">₹{{item.amount}}</q-item-label>
              <q-item-label caption>{{getTime(item.createdAt)}}</q-item-label>
              <!-- <q-icon name="star" color="yellow" /> -->
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </div>
      </q-list>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'Completed',
    data(){
        return {
            ordersList: [],
            loading:false
        }
    },
    methods:{
      async getOrders(done){
        try{
          var data = await this.$axios.get('/order', {
            params: {
              all:1,
              completed:1
            }
          })
          var orders = data.data.data
          this.ordersList = orders
        } catch(err) {
          console.error(err)
          this.$q.notify({
            message: "Data failed to load.",
            type: "negative",
            actions: [{ icon: 'close', color: 'white' }]
          })
        }
        console.log(data)
        if(done){
          done()
        }
      },
      getTime(time){
        var m = moment(time)
        return m.fromNow()
      },
      getCart(cart){
        return cart.map((item) => {
          return item.name
        }).join(", ")
      }
    },
    created(){
      this.getOrders()
    }
}
</script>

<style lang="scss" scoped src="src/css/orders.scss"></style>