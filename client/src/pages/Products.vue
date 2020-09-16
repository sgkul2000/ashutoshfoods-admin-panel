<template>
  <div id="productsMain" class="scroll" style="height: 100%">
    <q-pull-to-refresh ref="pullToRefresh" @refresh="getProducts">
      <q-list>
        <q-item-label header>Recent orders</q-item-label>
        <q-separator spaced inset />
        <div class="" v-for="(item, index) in productsList" :key="index">
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
            <q-item-section avatar>
              <q-avatar v-if="item.isAvailable" text-color="positive" icon="check_circle" />
              <q-avatar v-else text-color="negative" icon="cancel" />
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </div>
      </q-list>
    </q-pull-to-refresh>
  </div>
</template>

<script>

import productSvgManager from 'components/productSvgManager'

export default {
    name:'Products',
    data(){
        return {
            productsList:[],
            
        }
    },
    components:{
      productSvgManager
    },
    methods:{
      async getProducts(done){
        try{
          var data = await this.$axios.get('/product')
          this.productsList = data.data.data
          console.log(this.productsList)
        }catch (err){
          console.error(err)
          this.$q.notify({
            message: "Data failed to load",
            type: "negative",
            actions: [{ icon: 'close', color: 'white' }]
          })
        }
        if(done){
          done()
        }
      }
    },
    created(){
      this.getProducts()
    }
}
</script>

<style>

</style>