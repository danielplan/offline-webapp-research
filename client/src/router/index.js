import Vue from "vue";
import VueRouter from "vue-router";
import DisplayItemList from "../views/DisplayItemList.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "DisplayItemList",
        component: DisplayItemList,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
