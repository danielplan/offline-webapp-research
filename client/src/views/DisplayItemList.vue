<template>
    <v-main>
        <v-data-table
            :headers="headers"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>  
    </v-main>
</template>

<script>
export default {
    data () {
        return {
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Price', value: 'price' },
            ],
        }
    },
}
</script>

<style>

</style>