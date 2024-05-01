<template>
  <div>
    <!-- Landing -->
    <v-container fluid style="padding: 70px;">
      <v-row v-if="productsLoading" align="center" justify="center">
        <v-progress-circular size="50" indeterminate color="red" />
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="12" style="display: flex;justify-content: space-between;">
          <h1 style="font-weight: bolder;">Products Page</h1>
          <a @click="logout()" v-if="token" exact style="text-decoration: none;
            padding: 8px 16px;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            font-size: 20px;
            color: #0c2d48;
            font-weight: bolder;">Logout</a>
          <router-link v-else :to="{ name: 'LoginPage' }" exact style="text-decoration: none;
            color: #0c2d48;
            padding: 12px 16px;
            border-bottom: 2px solid transparent;
            font-size: 20px;
            font-weight: bolder;">Login</router-link>
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
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      token: 'token',
      user: 'user'
    })
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
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.go("/")
    }
  },
};
</script>

<style scoped>

</style>
