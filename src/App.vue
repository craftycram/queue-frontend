<template>
  <div id="app">
    <b-button></b-button>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  sockets: {
    connect() {
      console.log('socket connected');
      this.connected = 'Connected';
      this.$socket.emit('register_front');
    },

    disconnect() {
      console.log('socket disconnected');
      this.connected = 'Disonnected';
    },
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      // eslint-disable-next-line no-console
      console.log('message-channel');
      // eslint-disable-next-line no-console
      console.log(data);
    },
  },
  mounted() {
    this.sockets.subscribe('broadcastLike', (data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
