<template>
    <v-main>
        <v-data-table
            :headers="headers"
            :items="data"
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
};
</script>

<style></style>
