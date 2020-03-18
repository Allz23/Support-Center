<template>
  <div class="ticket">
    <h2>Ticket</h2>
    <Loading v-if="remoteDataBusy" />
    <div class="empty" v-else-if="!ticket">Ticket not found.</div>
    <template v-else>
      <!--  General  info  -->
      <section class="infos">
        <div class="info">
          <!-- Created on <strong>{{ ticket.date | date }}</strong> -->
          Created on <strong>{{ ticket.date }}</strong>
        </div>
        <div class="info">
          Author <strong>{{ ticket.author }}</strong>
        </div>
        <div class="info">
          Status <span class="badge">{{ ticket.status }}</span>
        </div>
      </section>
      <!--  Content  -->
      <section class="content">
        <h3>{{ ticket.title }}</h3>
        <p>{{ ticket.description }}</p>
      </section>
    </template>
  </div>
</template>

<script>
  export default {
    computed: {
      remoteDataBusy() {
        return this.remoteDataLoading !== 0;
      },
      hasRemoteErrors() {
        return Object.keys(this.remoteErrors).some(
          key => this.remoteErrors[key]
        );
      }
    },
    data() {
      return {
        ticket: {
          _id: "",
          title: "",
          status: "",
          author: "",
          description: "",
          date: ""
        },
        //  Indicates that there's data being fetched
        remoteDataLoading: 0,
        // Initialize data properties
        remoteErrors: {}
      };
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    async created() {
      this.remoteDataLoading++;
      this.remoteErrors = null;
      try {
        const ticketData = await this.$axios(`tickets/${this.id}`);
        // We assign the values
        this.ticket._id = ticketData.id;
        this.ticket.title = ticketData.title;
        this.ticket.description = ticketData.description;
        this.ticket.date = ticketData.date;
        this.ticket.status = ticketData.status;
        this.ticket.author = ticketData.author.username;
      } catch (e) {
        console.error(e);
        //  We pass the error
        this.remoteErrors = e;
      }
      this.$data.remoteDataLoading--;
    }
  };
</script>

<style></style>
