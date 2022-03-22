<template>
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

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
            Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
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

<style></style>
