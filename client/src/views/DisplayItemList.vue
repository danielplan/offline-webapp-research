<template>
    <v-main>
        <v-app-bar color="primary"><h4>All the available Items</h4></v-app-bar>
        <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="15"
            class="elevation-1"
            style="margin: 10px"
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
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    fab
                    color="primary"
                    fixed
                    bottom
                    right
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <add-item></add-item>
        </v-dialog>
    </v-main>
</template>

<script>
import { getProducts } from "../api/product";
import AddItem from "../components/AddItem.vue";
export default {
    components: { AddItem },
    data() {
        return {
            dialog: false,
            rows: [],
            headers: [
                {
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Name",
                    value: "name",
                    align: "center",
                },
                {
                    text: "Price",
                    value: "price",
                    align: "center",
                },
            ],

            data: [],
        };
    },
    created() {
        this.getDataFromApi();
    },
    methods: {
        async getDataFromApi() {
            this.data = await getProducts();
        },
    },
    watch: {
        dialog(visible) {
            if (!visible) {
                this.getDataFromApi();
            }
        },
    },
};
</script>

<style></style>
