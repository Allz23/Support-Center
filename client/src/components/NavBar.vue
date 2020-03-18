<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      class="mb-3"
      id="navBar"
    >
      <b-navbar-brand>Support Center</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/faq" exact>F.A.Q</b-nav-item>
          <b-nav-item to="/tickets" exact>Support Tickets</b-nav-item>
          <b-nav-item to="/about" exact>About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="user">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em> {{ user.userData.username }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logOut">Logout</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/login" v-else>Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  import axios from "axios";
  const axiosInstance = axios.create({
    baseURL: `http://localhost:8081`,
    withCredentials: true,
    headers: {
      credentials: "same-origin"
    }
  });

  export default {
    computed: {
      ...mapState(["user"])
    },
    data() {
      return {};
    },
    methods: {
      ...mapActions(["addUserData"]),
      async logOut() {
        const response = await axiosInstance
          .post("/logout")
          .then(res => {
            if (res.status === 200) {
              const userInfo = null;
              this.addUserData(userInfo);
            }
          })
          .catch(err => console.log(err));
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../style/imports';
</style>

<style lang="css">
  #navBar a.nav-link.router-link-active {
    border-bottom-color: #fff;
  }

  #navBar {
    border-radius: 15px;
  }
</style>
