<template>
  <div>
    <main class="login">
      <h1>Please login to continue</h1>

      <!-- Login form -->
      <SmartForm
        class="form"
        :title="title"
        :operation="operation"
        :valid="valid"
      >
        <!--  Username form  -->
        <b-form-group
          id="fieldset-1"
          label="Username:"
          label-for="input-1"
          :invalid-feedback="invalidFeedback"
          :state="state"
        >
          <b-form-input
            name="username"
            id="input-1"
            v-model="username"
            type="text"
            :state="state"
            trim
          ></b-form-input>
        </b-form-group>

        <!--  Password form  -->
        <b-form-group
          id="fieldset-2"
          label="Password:"
          label-for="input-2"
          :invalid-feedback="invalidFeedbackPass"
          :valid-feedback="validFeedbackPass"
          :state="statePass"
        >
          <b-form-input
            name="password"
            id="input-2"
            v-model="password"
            type="password"
            :state="statePass"
            trim
          ></b-form-input>
        </b-form-group>

        <template v-if="mode === 'signup'">
          <!--  Verify password form  -->
          <b-form-group
            id="fieldset-3"
            label="Password confirmation:"
            label-for="input-3"
            :invalid-feedback="invalidFeedbackPass"
            :valid-feedback="validFeedbackPass"
            :state="statePass"
          >
            <b-form-input
              name="password2"
              id="input-3"
              v-model="password2"
              type="password"
              :state="statePass"
              trim
            ></b-form-input>
          </b-form-group>

          <!--  Email form  -->
          <b-form-group id="fieldset-4" label="Email:" label-for="input-4">
            <b-form-input
              name="email"
              id="input-4"
              v-model="email"
              type="email"
              trim
            ></b-form-input>
          </b-form-group>
        </template>

        <template slot="actions">
          <!-- Login buttons -->
          <template v-if="mode === 'login'">
            <b-button type="button" variant="primary" @click="mode = 'signup'">
              Signup
            </b-button>

            <b-button type="submit" variant="info" :disabled="!valid">
              Login
            </b-button>
          </template>

          <!-- Signup buttons -->
          <template v-if="mode === 'signup'">
            <b-button type="button" variant="primary" @click="mode = 'login'">
              Back to login
            </b-button>

            <b-button type="submit" variant="info" :disabled="!valid">
              Create account
            </b-button>
          </template>
        </template>
      </SmartForm>
    </main>
  </div>
</template>

<script>
  import SmartForm from "./SmartForm";
  import qs from "qs";
  import axios from "axios";
  const axiosInstance = axios.create({
    baseURL: `http://localhost:8081`
  });
  axiosInstance.defaults.withCredentials = true;

  import { mapActions } from "vuex";

  export default {
    components: {
      SmartForm
    },
    computed: {
      //  Username form validation and user feedback
      state() {
        if (this.mode === "signup") {
          return this.username.length >= 4 ? true : false;
        }
      },
      invalidFeedback() {
        if (this.mode === "signup") {
          if (this.username.length > 4) {
            return "";
          } else if (this.username.length > 0) {
            return "Username must be at least 4 characters long.";
          } else {
            return "";
          }
        }
      },
      // Password validation and feedback
      statePass() {
        if (this.mode === "signup") {
          return this.password.length >= 6 ? true : false;
        }
      },
      invalidFeedbackPass() {
        if (this.mode === "signup") {
          if (this.password.length > 5) {
            return "";
          } else if (this.password.length > 0) {
            return "Password must be at least 6 characters long.";
          } else {
            return "";
          }
        }
      },
      validFeedbackPass() {
        return this.statePass === true ? "All good" : "";
      },
      // SmartForm settings
      title() {
        switch (this.mode) {
          case "login":
            return "Login";
          case "signup":
            return "Create a new account";
        }
      },
      // Smart form validation
      retypePasswordError() {
        return this.password2 && this.password !== this.password2;
      },
      signupValid() {
        return this.password2 && this.email && !this.retypePasswordError;
      },
      valid() {
        return (
          this.username &&
          this.password &&
          (this.mode !== "signup" || this.signupValid)
        );
      }
    },
    data() {
      return {
        mode: "login",
        username: "",
        password: "",
        password2: "",
        email: ""
      };
    },
    methods: {
      ...mapActions(["addUserData"]),
      async operation() {
        await this[this.mode]();
      },
      async login() {
        try {
          const response = await axiosInstance({
            method: "post",
            url: "/login",
            data: qs.stringify({
              username: this.username,
              password: this.password
            }),
            headers: {
              "content-type":
                "application/x-www-form-urlencoded; charset=utf-8",
              credentials: "same-origin"
            }
          });
          // Call store action to update the state's user's data
          const { _id, username } = response.data;
          const userInfo = {
            userData: {
              _id,
              username
            }
          };

          this.addUserData(userInfo);
          // Redirect to 'Home' page
          this.$router.replace(
            this.$route.params.wantedRoute || { name: "home" }
          );
        } catch (e) {
          console.log(e);
        }
      },
      async signup() {
        try {
          await axiosInstance.post("/signup", {
            username: this.username,
            password: this.password,
            email: this.email
          });
          this.mode = "login";
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .form  {
  >>> .content  {
  max-width:  400px;
  }
  }
</style>
