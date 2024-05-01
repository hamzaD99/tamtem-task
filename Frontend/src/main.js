import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from '../router'
import axios from 'axios';
import store from './store/store'

const baseURL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getters.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout')
      if(!error.response && error.response.data == "Wrong Credentials") router.push('/')
    }
    return error;
  }
);


const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')
app.config.globalProperties.$axios = { ...axiosInstance }
const validationRules = {
  nameRules: [
    value => !!value || 'Name is required',
  ],
  emailRules: [
    (value) => !!value || 'Email is required',
    (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email must be valid'
  ],
  passwordRules: [
    (value) => !!value || 'This field is required',
    (value) => value.length >= 8 || 'Password must be at least 8 characters',
    (value) => /[A-Z]/.test(value) || 'Password must contain an uppercase letter',
    (value) => /[a-z]/.test(value) || 'Password must contain a lowercase letter',
    (value) => /\d/.test(value) || 'Password must contain a digit',
    (value) => /[!@#$%^&*]/.test(value) || 'Password must contain a special character',
  ],
  requiredRule: [
    (value) => !!value || 'This field is required',
  ]
}
app.config.globalProperties.$rules = {...validationRules}

const error = (err, message="Something Went Wrong!") =>{
  console.error(err)
  store.dispatch('showSnackbar',{ message: message })
}
app.config.globalProperties.$error = error