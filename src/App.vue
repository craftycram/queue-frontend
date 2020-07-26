<template>
  <div id="app">
    <login></login>
    <queue></queue>
  </div>
</template>

<script>
  import login from './components/login.vue';
  import queue from './components/queue.vue';

export default {
  name: 'App',
  components: {
    login,
    queue,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
