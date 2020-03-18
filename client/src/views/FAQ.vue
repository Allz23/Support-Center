<template>
  <main class="faq">
    <h1>Frequently Asked Questions</h1>

    <!--Loading indicator  -->
    <Loading v-if="remoteDataBusy" />

    <!-- Error alert -->
    <b-alert show variant="danger" v-if="hasRemoteErrors">
      <h4 class="alert-heading">Error loading questions.</h4>
      <p>
        We've encountered an error while trying to load the questions. You could
        check your internet connection to see if everything is going well, or
        try again later.
      </p>
      <hr />
      <p class="mb-0">
        We apologize for the inconvenience caused.
      </p>
    </b-alert>

    <!-- Question list -->
    <section class="list">
      <article v-for="question of questionList" :key="question.id">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
  import RemoteData from "../mixins/RemoteData";

  export default {
    name: "faq",
    mixins: [
      RemoteData({
        questionList: "questions"
      })
    ],
    methods: {},
    created() {}
  };
</script>

<style></style>
