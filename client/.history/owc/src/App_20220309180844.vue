<template>
  <v-app>
    <v-app-bar
      class="app-bar"
      color="primary"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>

  .app-bar {
    max-height: 50px;
  }
</style>
