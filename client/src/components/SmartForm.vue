<template>
  <div>
    <!-- b-form starting tag -->
    <b-form @submit.prevent="onSubmit">
      <section class="content">
        <h2>{{ title }}</h2>

        <!-- Main content -->
        <b-form-group>
          <slot />
        </b-form-group>

        <div class="actions">
          <!-- Action buttons -->
          <slot name="actions" />
        </div>

        <!-- Error provider -->
        <b-alert show variant="danger" v-if="error"> {{ error }}</b-alert>
      </section>

      <transition name="fade">
        <!-- Expanding over the form -->
        <Loading v-if="busy" class="overlay" />
      </transition>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: null,
        busy: false
      };
    },
    props: {
      title: {
        type: String,
        required: true
      },
      operation: {
        type: Function,
        required: true
      },
      valid: {
        type: Boolean,
        required: true
      }
    },

    methods: {
      async onSubmit() {
        if (this.valid && !this.busy) {
          this.error = null;
          this.busy = true;
          try {
            await this.operation();
          } catch (e) {
            this.error = e.message;
          }
          this.busy = false;
        }
      }
    }
  };
</script>

<style></style>
