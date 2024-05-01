<template>
  <div>
    <v-container fluid style="padding: 70px;">
      <v-row justify="center">
        <v-col cols="9">
          <h1 style="font-weight: bolder;">Edit</h1>
        </v-col>
        <v-col style="width: 100%; border-radius: 3%;box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 20px 0px" cols="9" class="d-flex pa-15 justify-center flex-column align-center">
          <div style="width: 70%">
            <h2 class="mb-3">Upload Image</h2>
            <v-file-input
              v-model="selectedImage"
              label="SELECT FILE TO UPLOAD"
              accept="image/*"
            ></v-file-input>
            <h2 class="mb-3">Product Name</h2>
            <InputField v-model="name" name="Enter Name" label/>
          </div>
          <div style="width: 70%;margin-top: 25px">
            <h2 class="mb-3">Product Description</h2>
            <InputField v-model="description" name="Enter Description" label/>
          </div>
          <div style="width: 70%;margin-top: 25px">
            <h2 class="mb-3">Product Price</h2>
            <InputField v-model="price" name="Enter Price" label/>
          </div>

          <div style="width: 70%;flex-direction: row-reverse; column-gap: 15px;" class="d-flex">
            <div @click="saveProduct" style="cursor: pointer; background-color: rgb(48 114 66);width: 30%; color: white; padding: 10px;border-radius: 500px;text-align: center;font-size: 25px;margin-top: 30px;" class="mb-3">
              <v-progress-circular v-if="EditProductLoading" size="50" indeterminate color="white" />
              <span v-else>Save Changes</span>
            </div>
            <div @click="$router.push(`/product/${id}`)" style="cursor: pointer;background-color: rgb(104 111 106);width: 30%; color: white; padding: 10px;border-radius: 500px;text-align: center;font-size: 25px;margin-top: 30px;" class="mb-3">Cancel</div>
          </div>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
export default {
  name: 'EditProductPage',
  components: {
    InputField
  },
  data() {
    return {
      id: this.$route.params.id,
      EditProductLoading: false,
      name: null,
      description: null,
      price: null,
      selectedImage: null
    };
  },
  watch:{
    name(){
      console.log(this.name)
    }
  },

  methods: {
    async saveProduct() {
      this.EditProductLoading = true;
      let t = new FormData()
      t.append('file', this.selectedImage)

      console.log(t)
      await this.$axios.post(`/products/${this.id}`,
      {
        id: this.id,
        name: this.name,
        price: this.price,
        description: this.description,
        image: t
      })
        .then(() => {
          this.$router.push(`/product/${this.id}`)
        })
        .catch((err) => {
          this.$error(err)
        })
        .finally(() => {
          this.EditProductLoading = false
        })
    },
  }
};
</script>

<style scoped></style>
