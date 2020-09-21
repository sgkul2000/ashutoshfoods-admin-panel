<template>
  <q-page class="scroll">
    <q-pull-to-refresh @refresh="getSales">
      <div class="row flex flex-center">
        <div class="col-12 col-md-8">
          <q-card class="card q-ma-md q-pa-none">
            <q-card-section class="q-pa-xs">
                  <line-chart :chart-data="getDataCollection" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import LineChart from '../components/sales.js'
import moment from 'moment'
export default {
  name: 'PageIndex',
  components: {
    LineChart
  },
  data () {
    return {
      dataCollection: null,
      options: {},
      loading: false
    }
  },
  methods: {
    async getSales (done) {
      this.loading = true
      await this.$axios.get('/order/sales/total').then((res) => {
        console.log(res.data)
        this.dataCollection = res.data.data
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Unable to load data!',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      if (done) {
        done()
      }
      this.loading = false
    }
  },
  computed: {
    getDataCollection () {
      if (this.dataCollection && this.dataCollection !== null) {
        var dataList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (var k = 0; k < this.dataCollection.length; k++) {
          dataList[this.dataCollection[k]._id - 1] = this.dataCollection[k].sales
        }
        var months = []
        var tempList = []
        console.log(dataList)
        for (var j = moment(new Date()).month(); j < 13; j--) {
          months.push(moment().month(j).format('MMM'))
          console.log(j, dataList[j])
          tempList.push(dataList[j] || 0)
          // console.log(j)
          if (j === 0) {
            // j = j - moment(new Date()).month()
            j = 12
          } else if (j === moment(new Date()).month() + 1) {
            months.reverse()
            console.log(months)
            break
          }
          // console.log(moment(new Date()).month())
        }
        var data = {
          labels: months,
          datasets: [{
            label: 'Sales',
            lineTension: 0.3,
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointBorderColor: 'rgba(78, 115, 223, 1)',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: tempList.reverse()
          }]
        }
        console.log(data)
        return data
      } else {
        return {}
      }
    }
  },
  created () {
    this.getSales()
  }
}
</script>
