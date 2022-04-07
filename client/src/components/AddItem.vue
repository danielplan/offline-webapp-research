<template>
    <v-card style="padding: 10px; border-radius: 15px;">
        <v-card-title>
            Add an Item
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                    outlined
                ></v-text-field>

                <v-text-field
                    v-model="price"
                    :rules="priceRules"
                    label="Price"
                    required
                    outlined
                ></v-text-field>
                <div style="width: 100%; display: flex; align-items: center; justify-content: center">
                    <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit" rounded>
                        Add
                    </v-btn>

                    <v-btn icon @click="reset" color="error" style="position: absolute; bottom: 0; right: 0; margin: 0px 10px 10px 0px">
                        <v-icon>mdi-reload</v-icon>
                    </v-btn>
                </div>

            </v-form>
        </v-card-text>
    </v-card>
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
