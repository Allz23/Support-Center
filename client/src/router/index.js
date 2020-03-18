import Vue from "vue";
import VueRouter from "vue-router";

// Components for each route we're using
import Home from "../views/Home.vue";
import FAQ from "../views/FAQ.vue";
import About from "../views/About.vue";
import TicketsLayout from "../views/TicketsLayout.vue";
import Ticket from "../components/Ticket.vue";
import Tickets from "../components/Tickets.vue";
import NewTicket from "../components/NewTicket.vue";
import Login from "../components/Login.vue";
import NotFound from "../components/NotFound.vue";

import state from "../store/state";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guest: true }
  },
  {
    path: "/tickets",
    component: TicketsLayout,
    meta: { private: true },
    children: [
      { path: "", name: "tickets", component: Tickets },
      { path: "new", name: "new-ticket", component: NewTicket },
      // We add 'props' since we want to decouple the component from the route
      {
        path: ":id",
        name: "ticket",
        component: Ticket,
        props: route => ({ id: route.params.id })
      }
    ]
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // Like this we can position the scroll at the beginning of the page
  // each time a page loads
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

// Route navigation guards
router.beforeEach((to, from, next) => {
  // It's recommended to use this method to check the routes
  if (to.matched.some(r => r.meta.private) && !state.user) {
    next({
      name: "login",
      // Used to redirect the user later to his/her wanted route
      params: {
        wantedRoute: to.fullPath
      }
    });
    return;
  }

  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: "home" });
    return;
  }
  next();
});

export default router;
