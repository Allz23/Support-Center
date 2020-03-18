import Vue from "vue";
import bootstrapVue from "bootstrap-vue";
// Archivos CSS requeridos por Boostrap Vue
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./globalComponents";
import superAxios from "./plugins/superAxios";

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `http://localhost:8081`,
  withCredentials: true,
  headers: {
    credentials: "same-origin"
  }
});

import router from "./router";
import store from "./store";
import AppLayout from "./components/App.Layout.vue";

Vue.use(superAxios, {
  baseUrl: `http://localhost:8081`
});
Vue.use(bootstrapVue);
Vue.config.productionTip = false;

async function main() {
  // Get user info
  try {
    const response = await axiosInstance({
      method: "GET",
      url: "/user",
      headers: {
        credentials: "same-origin"
      }
    });
    // ONGOING ERROR: The state is not updating with the user data after refresh
    if (response.data) {
      // Call store action to update the state's user's data
      const { _id, username } = response.data;
      const userInfo = {
        userData: {
          _id,
          username
        }
      };
      store.dispatch("addUserData", userInfo);
    }
  } catch (error) {
    console.error(error);
  }

  // Launch Vue app
  new Vue({
    router,
    store,
    render: h => h(AppLayout)
  }).$mount("#app");
}

main();
