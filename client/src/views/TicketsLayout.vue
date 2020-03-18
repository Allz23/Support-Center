<template>
  <div class="tickets-layout">
    <h1>Your support tickets</h1>
    <!-- TODO -->
    <div class="actions mb-5">
      <router-link
        v-if="$route.name !== 'tickets'"
        tag="a"
        class="btn btn-outline-secondary mx-2"
        :to="{ name: 'tickets' }"
      >
        See all tickets
      </router-link>
      <router-link
        v-if="$route.name !== 'new-ticket'"
        tag="a"
        class="btn btn-outline-primary mx-2"
        :to="{ name: 'new-ticket' }"
      >
        New ticket
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {};
</script>

<style lang="stylus" scoped>
  .actions {
    margin-bottom: 32px;
  }
</style>
