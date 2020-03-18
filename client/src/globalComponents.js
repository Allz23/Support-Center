// Global components are registered in this file to use across all the application

import Vue from "vue";
import Loading from "./components/Loading.vue";
import smartForm from "./components/SmartForm.vue";
import formInput from "./components/FormInput.vue";

Vue.component("Loading", Loading);
Vue.component("SmartForm", smartForm);
Vue.component("FormInput", formInput);
