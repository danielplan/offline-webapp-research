<template class="dialog-content">
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
        ></v-text-field>

        <v-text-field
            v-model="price"
            :rules="priceRules"
            label="Price"
            required
        ></v-text-field>

        <v-btn
            rounded
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
        >
            Add
        </v-btn>

        <v-btn icon color="error" class="mr-4" @click="reset">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
    </v-form>
</template>

<script>
import { addProduct, getProducts } from "../api/product";

export default {
    data: () => ({
        valid: true,
        name: "",
        nameRules: [(v) => !!v || "Name is required"],
        price: "",
        priceRules: [
            (v) => !!v || "Price is required",
            (v) => /[0-9]+.?[0-9]+/.test(v) || "Price must be valid",
        ],
    }),

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                console.log(this.name);
                console.log(parseFloat(this.price));
                addProduct({ name: this.name, price: parseFloat(this.price) });
                this.$refs.form.reset();
                getProducts().then((v) => console.log(v));
            }
        },
        reset() {
            this.$refs.form.reset();
        },
    },
};
</script>

<style>
.v-dialog {
    background-color: white !important;
    padding: 10px !important;
    border-radius: 20px !important;
}
</style>
