<template>
  <div class="app-layout">
    <b-container>
      <header class="header">
        <div><img class="img" src="../assets/logo.svg" /></div>
        <div>My shirt shop</div>
      </header>

      <!-- Navigation bar -->
      <NavBar />

      <!--  Menu  will  be  here  -->
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  export default {
    components: {
      NavBar
    }
  };
</script>

<style lang="stylus">
  @import '../style/main';
</style>

<style lang="stylus" scoped>
  @import '../assets/css/Animate.css';

    .header  {
    .img  {
    width:  64px;
    height:  64px;
    }
    }
</style>

<style>
  .page {
    position: fixed;
    width: inherit;
  }
</style>
