// Mixins let us reuse component definition objects, such as data, watchers, computers, methos and so on
import axios from "axios";
import router from "../router";

const axiosInstance = axios.create({
  baseURL: `http://localhost:8081`,
  withCredentials: true,
  headers: {
    credentials: "same-origin"
  }
});

// Since many components have different data to fetch, we need to pass thos parameters to our mixin, then return the custom definition object
export default function(resources) {
  return {
    data() {
      //  We initialize each data property to a 'null' value, so Vue can set up reactivity on them.
      let initData = {
        //  Indicates that there's data being fetched
        remoteDataLoading: 0
      };
      // Initialize data properties
      initData.remoteErrors = {};
      for (const key in resources) {
        initData[key] = null;
        initData.remoteErrors[key] = null;
      }
      return initData;
    },
    methods: {
      async fetchResourse(key, url) {
        this.$data.remoteDataLoading++;
        this.$data.remoteErrors[key] = null;
        try {
          this.$data[key] = await this.$axios(url);
        } catch (e) {
          console.error(e);
          //  We pass the error
          this.$data.remoteErrors[key] = e;
        }
        this.$data.remoteDataLoading--;
      }
    },
    computed: {
      remoteDataBusy() {
        return this.$data.remoteDataLoading !== 0;
      },
      hasRemoteErrors() {
        return Object.keys(this.$data.remoteErrors).some(
          key => this.$data.remoteErrors[key]
        );
      }
    },
    created() {
      for (const key in resources) {
        let url = resources[key];
        // If the value is a function, we watch it's result
        if (typeof url !== "function") {
          this.fetchResourse(key, url);
        }
      }
    }
  };
}
