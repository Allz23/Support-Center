<template>
  <div class="tickets">
    <Loading v-if="remoteDataBusy" />

    <div class="empty" v-else-if="tickets.length === 0">
      You don't have any ticket yet.
    </div>

    <section v-else class="tickets-list">
      <div v-for="ticket of tickets" :key="ticket.id" class="ticket-item">
        <router-link :to="{ name: 'ticket', params: { id: ticket._id } }"
          >{{ ticket.title }}
        </router-link>
        <span class="badge">{{ ticket.status }}</span>
        <span class="date">{{ ticket.date }}</span>
      </div>
    </section>
  </div>
</template>

<script>
  import remoteData from "../mixins/RemoteData";

  export default {
    data() {
      return {};
    },
    mixins: [
      remoteData({
        tickets: "tickets"
      })
    ],
    methods: {}
  };
</script>

<style></style>
