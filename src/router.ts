import Vue from "vue";
import Router from "vue-router";
// Pages
import Home from "./pages/Home/Home.vue";
import Contact from "./pages/Contact/Contact.vue";

Vue.use(Router);

export default new Router({
  // removes #, more info on https://router.vuejs.org/guide/essentials/history-mode.html
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "contact",
      path: "/contact",
      component: Contact
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/About/About.vue")
    }
  ]
});
