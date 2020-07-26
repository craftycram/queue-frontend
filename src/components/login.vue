<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Anmeldung</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-input v-model="inputName" v-show="!$store.state.loggedIn" placeholder="Nutzername"></b-form-input>
        <p v-show="$store.state.loggedIn">Angemeldet als <b>{{inputName}}</b></p>
      </b-col>
      <b-col md="auto">
        <b-button @click="login" v-show="inputName.length>0 && !$store.state.loggedIn">Anmelden</b-button>
        <b-button @click="logout" v-show="$store.state.loggedIn">Abmelden</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      inputName: ''
    }
  },
  mounted() {
    if (this.$cookies.isKey('loggedIn')) {
      if (this.$cookies.get('loggedIn') === 'true') {
        this.$store.state.loggedIn = true;
        this.inputName = this.$cookies.get('login')
        this.$store.state.user = this.$cookies.get('login')
        this.$socket.emit('auth', {
          name: this.$store.state.user
          })
      }
    }
  },
  methods: {
    login() {
      this.$cookies.set('login', this.inputName);
      this.$cookies.set('loggedIn', true);
      this.$store.state.user = this.inputName;
      this.$store.state.loggedIn = true;
      this.$socket.emit('auth', {
        name: this.$store.state.user
        })
    },
    logout() {
      this.$cookies.remove('login');
      this.$cookies.remove('loggedIn');
      this.$cookies.set('loggedIn', false);
      this.$store.state.user = '';
      this.$store.state.loggedIn = false;
      this.$store.state.admin = false;
    }
  }
}
</script>

<style>

</style>