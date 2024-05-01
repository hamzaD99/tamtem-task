<template>
  <div>
    <!-- Landing -->
    <v-container fluid style="padding: 70px;">
      <v-row v-if="productsLoading" align="center" justify="center">
        <v-progress-circular size="50" indeterminate color="red" />
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="12">
          <h1 style="font-weight: bolder;">Products Page</h1>
        </v-col>
        <v-col md="3" sm="6 "cols="12" v-for="product in products" :key="product.id">
          <ProductCard :name="product.name" :price="product.price" :image="product.image" :id="product.id" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'ListingPage',
  components: {
    ProductCard
  },
  data() {
    return {
      productsLoading: false,
      products: []
    };
  },
  created() {
    this.getProducts()
  },
  
  methods: {
    async getProducts() {
      this.productsLoading = true;
      await this.$axios.get(`/products/`)
        .then((res) => {
          this.products = res.data
          console.log(this.products)
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.productsLoading = false
        })
    }
  },
};
</script>

<style scoped>

</style>
