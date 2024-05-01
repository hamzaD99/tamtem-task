<template>
  <div>
    <v-container fluid style="padding: 70px;">
      <v-row v-if="productLoading" align="center" justify="center">
        <v-progress-circular size="50" indeterminate color="red" />
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="11">
          <h1 style="font-weight: bolder;">Product Details</h1>
        </v-col>
        <v-col style="border-radius: 3%;box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 20px 0px" cols="11" class="d-flex pa-0 justify-space-between">
          <div class="d-flex" style="width: 100%;">
            <v-img cover style="border-radius: 3%;box-shadow: rgba(0, 0, 0, 0.02) 20px 5px 20px 0px":src="product.image ? getBlob(product.image) :require('@/assets/default-item.jpg')" max-width="50%" width="100%" />
            <div style="padding: 70px;" class="d-flex flex-column justify-space-evenly">
              <h1 style="font-weight: bolder;padding: 20px 0px">{{ product.name }}</h1>
              <p v-html="product.description" style="font-size: 20px;padding: 20px 0px"></p>
              <h1 style="font-weight: bolder;font-size: 20px;padding: 20px 0px">Price ${{ product.price }}</h1>
              <div style="background-color: rgb(48 114 66); width: 70%;min-width:220px;color: white; padding: 20px;border-radius: 500px;text-align: center;font-size: 25px;margin-top: 30px;" class="mb-3">CTA</div>
            </div>
          </div>
          <div style="cursor: pointer;display: flex;color:gray;margin: 20px 15px;height: fit-content;" @click="$router.push(`/product/${product.id}/edit`)"><v-icon size="25" style="margin-right: 5px">mdi-file-document-edit</v-icon><span>Edit</span></div>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  components: {
  },
  data() {
    return {
      id: this.$route.params.id,
      productLoading: false,
      product: {}
    };
  },
  created() {
    this.getProductById()
  },

  methods: {
    async getProductById() {
      this.productLoading = true;
      await this.$axios.get(`/products/${this.id}`)
        .then((res) => {
          this.product = res.data
          console.log(this.product)
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.productLoading = false
        })
    },
    getBlob(image) {
      return 'data:image/jpeg;base64,' + btoa(
        new Uint8Array(image.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    }
  },
};
</script>

<style scoped></style>
