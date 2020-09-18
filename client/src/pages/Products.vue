<template>
  <div id="productsMain" class="scroll" style="height: 100%">
    <q-pull-to-refresh ref="pullToRefresh" @refresh="getProducts">
      <q-list>
        <div class="row">
          <div class="col-6">
            <q-item-label header>Products :</q-item-label>
          </div>
          <div class="col-6">
            <q-select outlined class="q-ma-sm" dense v-model="categoryFilter" :options="categoryOptions" label="Category" >
              <template v-slot:append>
                <q-icon v-if="categoryFilter" name="close" @click.stop="categoryFilter = ''" class="cursor-pointer" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="q-mx-md">
          <q-btn push color="positive" class="full-width q-my-xs q-mx-md" label="add product" @click="isForm = !isForm" />
        </div>
        <q-separator spaced inset />
        <div class="" v-for="(item, index) in getFilteredList" :key="index" @click="redirectToProduct(item)">
          <q-slide-item @right="(reset) => { toggleDelete(reset, item) }" right-color="red">
            <template v-slot:right>
              <q-icon name="delete" />
            </template>
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
          </q-slide-item>
          <q-separator spaced inset />
        </div>
      </q-list>
    </q-pull-to-refresh>
    <q-dialog v-model="confirmDelete">
      <q-card style="width:400px;">
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <!-- <span class="q-ml-sm">You are currently not connected to any network.</span> -->
          <div class="text-h8">Are you sure?</div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" class="q-px-md q-mx-sm q-my-sm" color="primary" :loading="loading" v-close-popup @click="toggleDelete" />
          <q-btn push label="Delete" class="q-px-md q-mx-sm q-my-sm" color="negative" v-close-popup @click="deleteProductAction" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isForm" persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="">
          <div class="">
                <!-- <q-btn :flat="newProduct.isAvailable" :push="!newProduct.isAvailable" :color="newProduct.isAvailable ? 'negative' : 'positive'" class="full-width" :label="newProduct.isAvailable ? 'Mark as unavailable' : 'Mark as available'" /> -->
                <q-input v-model="newProduct.name" label="Name" newProduct. :loading="loading"/>
                <q-input v-model="newProduct.description" autogrow type="textarea" label="Description" newProduct. :loading="loading"/>
                <q-input v-model="newProduct.price" type="number" label="Price" newProduct. :loading="loading"/>
                <q-select v-model="newProduct.per" :options="perOptions" label="Price per" newProduct. :loading="loading"/>
                <q-select v-model="newProduct.category" :options="categoryOptions" label="Category" newProduct. :loading="loading"/>
                <q-input v-for="(item, index) in newProduct.images" :key="index"  v-model="newProduct.images[index]" type:="url" :label="'Image '+(index+1) + ' link'" newProduct. :loading="loading"/>
                <q-btn push color="primary" class="full-width q-my-md" label="add image" @click="addImage" />
            <q-btn push color="positive" class="full-width q-my-xs" label="Confirm" @click="createProduct" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import productSvgManager from 'components/productSvgManager'

export default {
  name: 'Products',
  data: function () {
    return {
      productsList: [],
      categoryFilter: '',
      categoryOptions: ['bakery', 'dryfruits', 'vegitables'],
      perOptions: ['KG', 'halfKG', 'quarterKG'],
      confirmDelete: false,
      deleteProduct: {},
      isForm: false,
      loading: false,
      newProduct: {
        name: '',
        description: '',
        images: [],
        price: null,
        per: '',
        category: ''

      }
    }
  },
  components: {
    productSvgManager
  },
  methods: {
    async getProducts (done) {
      this.loading = true
      try {
        var data = await this.$axios.get('/product')
        this.productsList = data.data.data
        console.log(this.productsList)
      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: 'Data failed to load',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
      if (done) {
        done()
      }
      this.loading = false
    },
    async createProduct () {
      this.loading = true
      this.newProduct.images = this.newProduct.images.filter((element) => {
        return !(element === '')
      })
      await this.$axios.post('product/', this.newProduct).then((res) => {
        console.log(res)
        this.isForm = false
        this.getProducts()
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Unable to create product!',
          caption: err,
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      this.newProduct = {
        name: '',
        description: '',
        category: '',
        per: '',
        price: '',
        images: []
      }
      this.loading = false
    },
    deleteProductAction () {
      this.loading = true
      this.$axios.delete('/product/' + this.deleteProduct._id).then((res) => {
        console.log(res)
        this.confirmDelete = false
        this.$q.notify({
          message: 'Deleted product successfully!',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.deleteProduct = {}
        this.getProducts()
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Delete unsuccessful!',
          caption: err,
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
      this.loading = false
    },
    redirectToProduct (item) {
      this.$router.push({ name: 'Product', params: { id: item._id } })
    },
    toggleDelete ({ reset }, item) {
      if (item) {
        this.deleteProduct = item
      } else {
        this.deleteProduct = {}
      }
      this.confirmDelete = !this.confirmDelete
      if (reset) {
        reset()
      }
    },
    addImage () {
      if (this.newProduct.images.length === 3) {
        this.$q.notify({
          message: 'Maximum image limit reached',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
        return null
      }
      this.newProduct.images.push('')
    }
  },
  created () {
    this.getProducts()
  },
  computed: {
    getFilteredList: function () {
      if (this.categoryFilter === '') {
        return this.productsList
      } else {
        return this.productsList.filter((element) => {
          return element.category === this.categoryFilter
        })
      }
    }
  }
}
</script>

<style>

</style>
