<template>
  <div class="new-ticket">
    <SmartForm title="New Ticket" :operation="operation" :valid="valid">
      <FormInput
        name="title"
        v-model="title"
        placeholder="Short description (max 100 chars)"
        maxlength="100"
        required
      />

      <FormInput
        type="textarea"
        name="description"
        v-model="description"
        placeholder="Describe your problem in details"
        required
        rows="4"
      />
      <!-- Form actions -->
      <template slot="actions">
        <router-link
          tag="button"
          :to="{ name: 'tickets' }"
          class="btn btn-secondary"
        >
          Go back
        </router-link>
        <button type="submit" :disabled="!valid" class="btn btn-primary">
          Send ticket
        </button>
      </template>
    </SmartForm>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import PersistentData from "../mixins/PersistentData";

  import qs from "qs";
  import axios from "axios";
  const axiosInstance = axios.create({
    baseURL: `http://localhost:8081`,
    withCredentials: true,
    headers: {
      credentials: "same-origin"
    }
  });

  export default {
    mixins: [PersistentData("NewTicket", ["title", "description"])],
    data() {
      return { title: "", description: "" };
    },
    computed: {
      ...mapState(["user"]),
      valid() {
        return !!this.title && !!this.description;
      }
    },
    methods: {
      async operation() {
        await axiosInstance({
          method: "post",
          url: "/tickets/new",
          data: qs.stringify({
            title: this.title,
            description: this.description,
            author: this.user.userData._id
          }),
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=utf-8"
          }
        });
        this.title = this.description = "";
        localStorage.setItem(`${id}.${field}`, JSON.stringify(val));
      }
    }
  };
</script>

<style></style>
