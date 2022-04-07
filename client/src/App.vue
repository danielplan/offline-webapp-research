<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  mounted: () => {},
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.app-bar {
  max-height: 50px;
}
</style>
