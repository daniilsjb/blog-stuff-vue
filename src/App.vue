<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app clipped-left dark color="primary">
      <!-- Home Button -->
      <v-app-bar-nav-icon @click="$router.push('/')">
        <v-icon>mdi-home</v-icon>
      </v-app-bar-nav-icon>

      <!-- App Title -->
      <v-toolbar-title>Blog Stuff</v-toolbar-title>
    </v-app-bar>

    <!-- Page Content -->
    <v-content>
      <v-container fluid fill-height align-start>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    data: () => ({
    })
  };
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
