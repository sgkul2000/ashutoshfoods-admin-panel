<template>
  <div id="productMain" class="scroll" style="height:100%;width:100%;overflow-x:hidden">
      <q-pull-to-refresh @refresh="getProduct">
        <q-carousel
            v-if="isImage"
            swipeable
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            autoplay
          >
            <q-carousel-slide v-for="(item, index) in getImages" :key="index" :name="index" :img-src="item" />
          </q-carousel>
          <q-card class="card q-mx-sm-md q-px-sm-md q-py-sm-md">
              <q-card-section>
                <q-btn :flat="product.isAvailable" :push="!product.isAvailable" :color="product.isAvailable ? 'negative' : 'positive'" class="full-width" :label="product.isAvailable ? 'Mark as unavailable' : 'Mark as available'" />
                <q-input v-model="product.name" label="Name" :readonly="!editMode" :loading="loading"/>
                <q-input v-model="product.description" autogrow type="textarea" label="Description" :readonly="!editMode" :loading="loading"/>
                <q-input v-model="product.price" type="number" label="Price" :readonly="!editMode" :loading="loading"/>
                <q-select v-model="product.per" :options="perOptions" label="Price per" :readonly="!editMode" :loading="loading"/>
                <q-select v-model="product.category" :options="categoryOptions" label="Category" :readonly="!editMode" :loading="loading"/>
                <q-input v-for="(item, index) in product.images" :key="index"  v-model="product.images[index]" type:="url" :label="'Image '+(index+1) + ' link'" :readonly="!editMode" :loading="loading"/>
                <q-btn push color="positive" v-if="editMode" class="full-width q-my-md" label="add image" @click="addImage" />
              </q-card-section>
          </q-card>
      </q-pull-to-refresh>
      <q-dialog v-model="confirmDelete">
        <q-card style="width:400px;">
          <q-card-section class="row items-center">
            <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
            <!-- <span class="q-ml-sm">You are currently not connected to any network.</span> -->
            <div class="text-h8">Are you sure?</div>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" class="q-px-md q-mx-sm q-my-sm" color="primary" v-close-popup @click="toggleDelete" />
            <q-btn push label="Delete" class="q-px-md q-mx-sm q-my-sm" color="negative" v-close-popup @click="deleteProduct" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-btn push color="negative" v-if="!editMode" class="cancelBtn fixed-bottom-right q-ma-md q-ma-md-xl" round icon="delete" @click="toggleDelete" />
      <q-btn push color="negative" v-if="editMode" class="cancelBtn fixed-bottom-right q-ma-md q-ma-md-xl" round icon="close" @click="cancelEdit" />
      <q-btn push v-if="editMode" :loading="loading" color="primary" class="editBtn fixed-bottom-right q-ma-md q-ma-md-xl" round icon="done" @click="applyChanges" />
      <q-btn push v-else color="primary" class="editBtn fixed-bottom-right q-ma-md q-ma-md-xl" round icon="create" @click="activateEditMode" />
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      loading: true,
      product: {},
      editMode: false,
      currentProduct: {},
      categoryOptions: ['bakery', 'dryfruits', 'vegitables'],
      perOptions: ['KG', 'halfKG', 'quarterKG'],
      slide: 1,
      confirmDelete: false,
      imageList: [
        'https://cdn.quasar.dev/img/quasar.jpg',
        'https://cdn.quasar.dev/img/parallax2.jpg',
        'https://cdn.quasar.dev/img/parallax1.jpg',
        'https://cdn.quasar.dev/img/mountains.jpg'
      ]

    }
  },
  props: ['id'],
  methods: {
    addImage () {
      if (this.product.images.length === 3) {
        this.$q.notify({
          message: 'Maximum image limit reached',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
        return null
      }
      this.product.images.push('')
    },
    async getProduct (done) {
      if (this.editMode) {
        if (done) {
          done()
        }
        this.$q.notify({
          message: 'Quit edit mode to refresh.',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
        return
      }
      this.loading = true
      try {
        var data = await this.$axios.get('/product', { params: { id: this.id } })
        this.product = data.data.data[0]
        this.currentProduct = JSON.parse(JSON.stringify(this.product))
        console.log(this.product)
      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: 'Data failed to load',
          type: 'negative',
          caption: err,
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
      if (done) {
        done()
      }
      this.loading = false
    },
    activateEditMode () {
      this.editMode = true
    },
    cancelEdit () {
      this.product = this.currentProduct
      this.editMode = false
    },
    async applyChanges () {
      if (this.product.images) {
        for (var i = 0; i < this.product.images.length; i++) {
          if (this.product.images[i] === '') {
            await this.product.images.splice(0, 1)
          }
        }
      }
      await this.$axios.put('product/' + this.id, {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        category: this.product.category,
        per: this.product.per,
        isAvailable: this.product.isAvailable,
        images: this.product.images
      }).then((res) => {
        this.product = res.data.data
        this.currentProduct = JSON.parse(JSON.stringify(this.product))
        this.editMode = false
        console.log(this.product)
      }).catch((err) => {
        console.error(err)
        this.$q.notify({
          message: 'Data failed to load',
          type: 'negative',
          caption: err,
          actions: [{ icon: 'close', color: 'white' }]
        })
      })
    },
    toggleDelete () {
      if (this.confirmDelete) {
        this.newProduct.images = this.newProduct.images.filter((element) => {
          console.log('here')
          return !(element === '')
        })
      }
      this.confirmDelete = !this.confirmDelete
    },
    deleteProduct () {
      this.loading = true
      this.$axios.delete('/product/' + this.id).then((res) => {
        console.log(res)
        this.confirmDelete = false
        this.$q.notify({
          message: 'Deleted product successfully!',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.$router.push({ name: 'Products' })
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
    }
  },
  created () {
    this.getProduct()
  },
  computed: {
    getImages () {
      return this.product.images.filter((element) => {
        return !(element === '')
      })
    },
    isImage () {
      try {
        var requiredImageList = this.product.images.filter((element) => {
          return !(element === '')
        })
        if (requiredImageList.length > 0) {
          return true
        } else {
          return false
        }
      } catch (err) {
        return false
      }
    }
  }

}
</script>

<style lang='scss' scoped src="src/css/product.scss"></style>
