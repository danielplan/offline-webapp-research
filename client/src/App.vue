<template>
  <v-app>
    <v-app-bar class="app-bar" color="primary" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
  mounted: () => {
    window.addEventListener("online", () => {
      localStorage.setItem("online", 1);
    });
    window.addEventListener("offline", () => {
      localStorage.setItem("online", 0);
    });
    localStorage.setItem("online", window.navigator.onLine ? 1 : 0);
  },
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
