<template>
  <v-app style="overflow: hidden;">
    <v-main>
      <router-view style="min-height: calc(100vh - 186px);"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>