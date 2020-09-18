<template>
  <div id="orderMain" class="scroll" style="height: 100%;">
      <q-pull-to-refresh >
        <div v-if="!loading" class="content">
        <q-card class="card">
          <q-card-section>
            <q-list>
              <q-item-label header>General info:</q-item-label>
              <!-- <q-separator spaced inset /> -->
                  <div class="row full-width">
                    <div class="col-12 col-md-6 justify-end justify-sm-center generalMoney q-py-md q-px-md">
                      Status : {{currentOrder.status}}
                    </div>
                    <div class="col-12 col-md-6 justify-end justify-sm-center generalMoney q-py-md q-px-md">
                      Amount : ₹{{currentOrder.amount}}
                    </div>
                    <div class="col-12 col-md-6 justify-start generalDate q-py-md  q-px-md">
                      Date of order : {{getDate(currentOrder.createdAt)}}
                    </div>
                    <div class="col-12 col-md-12 justify-start justify-sm-center generayDelivery q-py-md q-px-md">
                      Estimated Delivery :
                    </div>
                    <div class="col-12 col-sm-6 q-py-xs q-py-sm-md q-px-md">
                      <q-btn :push="isPending?true:false" :flat="!isPending?true:false" class="full-width" :color="isPending ? 'positive' : 'negative'" :label="isPending?'Mark as completed' : 'Mark as pending'" @click="toggleComplete" />
                    </div>
                    <div class="col-12 col-sm-6 q-py-xs q-py-sm-md q-px-md">
                      <q-btn flat class="full-width" color="negative" label="Delete order" @click="toggleDelete" />
                    </div>
                  </div>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="card">
          <q-card-section>
            <q-list>
              <q-item-label header>User info:</q-item-label>
              <!-- <q-separator spaced inset /> -->
                <div class="row full-width">
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    Name : {{currentOrder.user ? currentOrder.user.fullname : ""}}
                  </div>
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    Email : {{currentOrder.user ? currentOrder.user.email : ""}}
                  </div>
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    Phone number : {{currentOrder.user ? currentOrder.user.phone : ""}}
                  </div>
                </div>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="card">
          <q-card-section>
            <q-list>
              <q-item-label header>Products :</q-item-label>
              <!-- <q-separator spaced inset /> -->
                <q-separator spaced inset />
                  <div class="" v-for="(item, index) in currentOrder.cart" :key="index">
                    <q-item  clickable v-ripple  >
                      <q-item-section avatar>
                        <!-- <q-avatar color="primary" text-color="white" icon="bluetooth" /> -->
                        <productSvgManager :item="item" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{item.name}}</q-item-label>
                        <q-item-label caption lines="2">{{item.description}}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label class="itemAmount">₹{{item.price}} / {{item.per}}</q-item-label>
                        <!-- <q-item-label caption>{{getTime(item.createdAt)}}</q-item-label> -->
                        <!-- <q-icon name="star" color="yellow" /> -->
                      </q-item-section>
                    </q-item>
                    <q-separator spaced inset />
                  </div>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="card">
          <q-card-section>
            <q-list>
              <q-item-label header>User info:</q-item-label>
              <!-- <q-separator spaced inset /> -->
                <div class="row full-width">
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    Flat No. : {{currentOrder.address.flat}}
                  </div>
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    Building name : {{currentOrder.address.buildingName}}
                  </div>
                  <div class="col-12 q-py-sm q-px-md">
                    Area : {{currentOrder.address.area}}
                  </div>
                  <div v-if="currentOrder.address.landmark" class="col-12 col-sm-6 q-py-sm q-px-md">
                    Landmark : {{currentOrder.address.landmark}}
                  </div>
                  <div class="col-12 q-py-sm q-px-md">
                    City : {{currentOrder.address.cityName}}
                  </div>
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    State : {{currentOrder.address.stateName}}
                  </div>
                  <div class="col-12 col-sm-6 q-py-sm q-px-md">
                    Pincode : {{currentOrder.address.pincode}}
                  </div>
                  <!-- <div class="col-12 col-sm-6 q-py-sm q-py-sm-md q-px-md q-mx-auto">
                    <iframe v-if="mapUrl" frameborder="0" style="border:0" :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyCSKZBWFskppgK-yXcJO9t-_W8DKM0Xack&q=${mapUrl}`" allowfullscreen>
                    </iframe>
                  </div> -->
                </div>
            </q-list>
          </q-card-section>
        </q-card>
        </div>
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
          <q-btn push label="Yes" class="q-px-md q-mx-sm q-my-sm" color="positive" v-close-popup @click="markCompleted" />
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
import productSvgManager from 'components/productSvgManager'
import moment from 'moment'
export default {
  name: 'Order',
  data () {
    return {
      currentOrder: {},
      loading: true,
      url: 'https://goo.gl/maps/w5jpxthMEFhL9rvz9',
      mapUrl: null,
      confirmDelete: false,
      confirmComplete: false
    }
  },
  props: ['id'],
  components: {
    productSvgManager
  },
  created () {
    this.getOrder()
    this.getUrl()
  },
  methods: {
    async getOrder (done) {
      try {
        var data = await this.$axios.get('order', { params: { id: this.id } })
        this.currentOrder = data.data.data[0]
        console.log(this.currentOrder)
      } catch (err) {
        console.error(err)
        this.$q.notify({
          type: 'negative',
          message: 'Data failed to load.',
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
      if (done) {
        done()
      }
      this.loading = false
    },
    getDate (date) {
      var m = moment(date)
      return `${m.format('MMM Do YY')} (${m.fromNow()})`
    },
    async getUrl () {
      const data = await this.$axios.get('https://url-expander1.p.rapidapi.com/url_expander', {
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'url-expander1.p.rapidapi.com',
          'x-rapidapi-key': '2e2241a047mshec02dbda7a8d95ap1cbce3jsn8b4c3f750c17',
          useQueryString: true
        },
        params: {
          short_url: this.url
        }
      })
      // const regex = /(?<=place\/)[a-zA-Z0-9\+\,]*/g
      // const found = await data.data.target_url.toString().match(regex)
      // console.log(found[0])
      // this.mapUrl = found[0]
      var newUrl = data.data.target_url.toString()
      this.mapUrl = newUrl.split('/')[5]
      console.log(this.mapUrl)
    },
    toggleComplete () {
      this.confirmComplete = !this.confirmDelete
    },
    toggleDelete () {
      this.confirmDelete = !this.confirmDelete
    },
    async markCompleted () {
      this.loading = true
      await this.$axios.put('/order/' + this.id, { status: this.currentOrder.status === 'complete' ? 'pending' : 'complete' }).then((res) => {
        console.log(res)
        this.$q.notify({
          message: `Marked as ${this.currentOrder.status === 'complete' ? 'pending' : 'complete'} successfully!`,
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
        this.confirmComplete = false
        this.getOrder()
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
      await this.$axios.delete('/order/' + this.id, { params: { forcedelete: 1 } }).then((res) => {
        console.log(res)
        this.$q.notify({
          message: 'Order deleted successfully!',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
        this.confirmDelete = false
        this.getOrder()
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
  computed: {
    isPending () {
      try {
        if (this.currentOrder.status === 'pending') {
          return true
        } else {
          return false
        }
      } catch (err) {
        this.$q.notify({
          message: 'Data was not loaded properly',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
        return null
      }
    }
  }
}
</script>

<style lang="scss" src="src/css/order.scss"></style>
