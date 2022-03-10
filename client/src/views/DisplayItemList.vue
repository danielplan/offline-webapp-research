<template>
  <v-main>
    <v-data-table
      :headers="headers"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <tbody v-for="(item, key) in rows" :key="key">
      <tr>
        <td>
          <strong>{{ item.name }}</strong>
        </td>
        <td>
          {{ item.price }}
        </td>
      </tr>
    </tbody>
  </v-main>
</template>

<script>
import { getProducts } from "../api/product";
export default {
  data() {
    return {
      rows: [],
      headers: ["name", "price"],
    };
  },
  created() {
    this.getDataFromApi();
  },
  methods: {
    async getDataFromApi() {
      this.rows = await getProducts();
    },
  },
};
</script>

<style></style>
