let baseUrl;

import axios from "axios";
import state from "../store/state";

export async function $axios(url, options) {
  const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    withCredentials: true,
    headers: {
      credentials: "same-origin"
    }
  });
  const response = await axiosInstance({
    method: "GET",
    url: `/${url}`
  });
  if (response.status === 200) {
    return response.data.sentData;
  } else if (response.status === 403) {
    // If the session is no longer valid
    // We logout the user
    state.user = null;
    // If the route was private we redirect to login
    if (router.currentRoute.matched.some(route => route.meta.private)) {
      router.replace({
        name: "login",
        params: {
          wantedRoute: router.currentRoute.fullPath
        }
      });
    }
  }
}

export default {
  install(Vue, options) {
    //  console.log("Plugin installed", options);
    //  Plugin options
    baseUrl = options.baseUrl;

    // Axios
    Vue.prototype.$axios = $axios;
  }
};
