import Vue from "vue";
import VueRouter from "vue-router";
import DisplayItemList from "../views/DisplayItemList.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "DisplayItemList",
        component: DisplayItemList,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
