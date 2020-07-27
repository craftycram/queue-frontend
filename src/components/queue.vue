<template>
  <b-container style="margin-top: 50px;">
    <b-row>
      <b-col>
        <h1>Warteschlange</h1>
        <!--{{queue}}-->
      </b-col>
      <b-col v-show="$store.state.loggedIn===true" md="auto">
        <b-button @click="addToQueue">In Warteschlange</b-button>
      </b-col>
    </b-row>
    <b-row v-show="!connected">
      {{connectedMsg}}
    </b-row>
    <b-row>
      <b-card v-show="connected" v-for="user in queue" :key="user.id" class="user">
          <b-card-title>
            {{user.name}}


            <b-button v-show="$store.state.admin && user.id>1" class="btton" @click="move(user.id, 'up')">
              <b-icon icon="caret-up"></b-icon>
              <!--<b-icon icon="x"></b-icon>-->
            </b-button>
            <b-button v-show="$store.state.admin && user.id<queue.length" disabled="true" class="btton" @click="move(user.id, 'down')">
              <b-icon icon="caret-down"></b-icon>
              <!--<b-icon icon="x"></b-icon>-->
            </b-button>


            <b-button v-show="$store.state.admin || $store.state.user===user.name" class="button" @click="removeFromQueue(user.id)">
              <b-icon icon="trash"></b-icon>
              <!--<b-icon icon="x"></b-icon>-->
            </b-button>
          </b-card-title>
          <b-card-sub-title></b-card-sub-title>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        queue: [],
        connectedMsg: 'Keine Verbindung zum Server',
        connected: false,
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
        this.queue.push(data);
      });
      this.sockets.subscribe('admin', (data) => {
        if (data.name === this.$store.state.user && data.admin) {
          this.$store.state.admin = true;
        } else if (data.name === this.$store.state.user && !data.admin) {
          this.$store.state.admin = false;
        }
      });
    },
    methods: {
      addToQueue() {
        this.$socket.emit('add', {
          name: this.$store.state.user
        })
      },
      removeFromQueue(id) {
        this.$socket.emit('remove', {
          id
        });
      },
      move(id, dir) {
        this.$socket.emit('move', {
          id,
          dir
        });
      }
    }
  }
</script>

<style>
  .button {
    position: absolute;
    right: 20px;
  }

  .user {
    /*height: 50px;*/
    width: 100%;
    margin-top: 10px;
  }
</style>