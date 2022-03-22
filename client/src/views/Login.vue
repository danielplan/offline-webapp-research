<template>
    <v-row align="center" class="fill-height bg-light">
        <v-col align="center" class="flex-center-container fill-height">
            <div
                class="fill-height"
                style="
                    max-width: 414px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                "
            >
                <div class="fill-height flex-center-container">
                    <img
                        style="width: 50% !important"
                        src="../assets/logo.png"
                    />
                </div>
                <v-form ref="form" lazy-validation style="margin: 0px 20px">
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                        background-color="white"
                        solo
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="password"
                        label="Password"
                        @click:append="show1 = !show1"
                        background-color="white"
                        solo
                    ></v-text-field>
                    <v-btn
                        type="button"
                        color="primary"
                        @click="signInUserWithEmailAndPassword()"
                        >submit</v-btn
                    >
                </v-form>
                <div
                    class="fill-height"
                    style="
                        display: flex;
                        align-items: end;
                        justify-content: center;
                    "
                >
                    New here?
                    <router-link
                        to="/register"
                        style="margin-left: 5px; color: var(--v-primary-base)"
                        >Sign up?</router-link
                    >
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        show1: false,
        password: "",
        rules: {
            required: (value) => !!value || " Password is required.",
            min: (v) => v.length >= 8 || "Min 8 characters",
            emailMatch: () => "The email and password you entered don't match",
        },
        email: "",
        emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
    }),
    methods: {
        /**
         * Tries to log the user in using the Firebase authentication, if successful routes to the home.
         */
        signInUserWithEmailAndPassword() {
            console.log(this.email);
            console.log(this.password);
        },

        /**
         * Routes to the register component.
         */
        register() {
            this.$router.push("/register");
        },

        forgotPassword() {},

        /**
         * Makes the login via the google popup and routes to the home.
         */
    },
};
</script>

<style>
.flex-center-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

body {
    height: 100vh;
    max-height: 100vh;
}

* {
    box-sizing: border-box;
}
</style>
