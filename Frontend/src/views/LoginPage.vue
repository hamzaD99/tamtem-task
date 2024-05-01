<template>
  <v-form @submit.prevent="login">
      <v-container class="text-center text-md-start">
          <v-row justify="center" style="width: 100%;" class="mb-10">
            <v-col cols="12" v-if="error" style="background-color: #f8d7da;border-color: #f5c6cb;color: #721c24;padding: 10px;border-radius: 5px;margin: 10px 0;">
              {{error}}
            </v-col>
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-img max-width="60px" :src="require('@/assets/Logo.png')" />
                <h1 class="mx-2" style="font-weight: bolder">tamatem plus</h1>
              </v-col>
          </v-row>
          <v-row justify="center" style="width: 100%;">
            <v-col cols="6" style="display: flex; align-items: center; flex-direction: column; border: 1px solid #8080804a;padding: 50px; border-radius: 3%">
              <h2 style="font-weight: bolder;margin-bottom: 25px;">Login</h2>
              <InputField style="width: 100%;margin-bottom: 10px;" :rules="$rules.emailRules" v-model="email" name="Email" label />
              <InputField style="width: 100%;margin-bottom: 10px;" type="password" :rules="$rules.requiredRule" v-model="password" name="Password" label />
              <span style="text-decoration: underline;margin-bottom: 25px;">Forgot your password?</span>
              <v-btn type="submit" height="50px" :loading="loginLoading" :disabled="isLoginDisabled" color="rgb(48 114 66)" width="100%" style="color:white;box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 20px 0px">{{ 'Login' }}</v-btn>
            </v-col>
          </v-row>
      </v-container>
  </v-form>
</template>

<script>

import InputField from '@/components/InputField.vue';
export default {
  name: 'LoginPage',
  components: {
      InputField
  },
  computed: {
      isLoginDisabled() {
          return this.$rules.requiredRule.some(rule => rule(this.email) !== true) || this.$rules.requiredRule.some(rule => rule(this.password) !== true)
      }
  },
  data: () => ({
      password: null,
      loginLoading: false,
      email: null,
      error: null
  }),
  methods: {
      login() {
          this.loginLoading = true;
          this.$axios.post('/users/login', {
              email: this.email,
              password: this.password
          })
              .then((response) => {
                console.log(response)
                  if(response.response && response.response.data && response.response.data.error == "Wrong Credentials"){
                    this.error = "Wrong Credentials"
                  }
                  else{
                    this.$store.dispatch('login', response.data)
                    this.$router.push("/")
                  }
              })
              .catch((err) => {
                this.error = "Something went wrong!"
              })
              .finally(() => {
                  this.loginLoading = false
              })
      }
  },
}
</script>