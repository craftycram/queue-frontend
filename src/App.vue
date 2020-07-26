<template>
  <div id="app">
   <b-container>
    <b-row v-show="connected">
      <b-col>
        <b-form-input v-model="inputName" placeholder="Dein Name"></b-form-input>
      </b-col>
      <b-col md="auto">
        <b-button @click="addToQueue" v-show="inputName.length>0">In Warteschlange</b-button>
      </b-col>
    </b-row>
    <b-row v-show="!connected">
      {{connectedMsg}}
    </b-row>
    <b-row v-show="connected" v-for="user in queue" :key="user.id">
      <p>
        {{user.name}}
      </p>
      <b-button
        v-show="admin || me===user.name"
        class="button"
        @click="removeFromQueue(user.id)"
        >
        X
        <b-icon  icon="x"></b-icon>
      </b-button>
    </b-row>
   </b-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      queue: [],
      connectedMsg: 'Keine Verbindung zum Server',
      connected: false,
      me: '',
      admin: false,
      inputName: '',
    }
  },
  sockets: {
    connect() {
      console.log('socket connected');
      this.connected = true;
      this.connectedMsg = 'Mit Server verbunden';
    },

    disconnect() {
      console.log('socket disconnected');
      this.connected = false;
      this.connectedMsg = 'Verbindung getrennt';
    },
    // Fired when the server sends something on the "messageChannel" channel.
    auth(data) {
      // eslint-disable-next-line no-console
      console.log('message-channel');
      // eslint-disable-next-line no-console
      console.log(data);
      this.msg = data;
    }
  },
  mounted() {
    this.sockets.subscribe('init-queue', (data) => {
      this.queue = data
    });
    this.sockets.subscribe('add-user', (data) => {
      if (data !== 'admin') {
        this.queue.push(data);
      } else {
        this.admin = true;
      }
    });
  },
  methods: {
    addToQueue () {
      this.me = this.inputName;
      this.$socket.emit('auth', {name: this.inputName})
    },
    removeFromQueue (id) {
      this.$socket.emit('remove', {id});
    }
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

.button {
  right: 10px;
  align-self: right;
}
</style>
