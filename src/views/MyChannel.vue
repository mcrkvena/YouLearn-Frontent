<template>
  <div class="container-fluid">
    <div v-if="store.authenticated" class="col-lg-8">
        <br>
        MY VIDEOS
        <br>
          <div id="videocol1">
            <div :key="card.id" v-for="card in cards">
              <Video :info="card"/>
            </div>
        </div>
          <div id="videocol2">
            <div :key="card.id" v-for="card in cards">
              <Video :info="card"/>
            </div>
        </div>
          <div id="videocol3">
            <div :key="card.id" v-for="card in cards">
              <Video :info="card"/>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
      <br>
      <br>
      <br>
      <br>
      <span v-if="store.authenticated" id="loggedintext">
        Logged in as {{ store.userEmail }}
        <br/>
        <br/>
      </span>
      <router-link v-if="!store.authenticated" class="btn" to="/login" >Login</router-link >
      <router-link v-if="store.authenticated" class="btn" to="/mychannel" >My Channel</router-link >
      <br/>
      <br/>
      <br>
      <router-link v-if="!store.authenticated" class="btn" to="/register" >Register</router-link>
      <router-link v-if="store.authenticated" class="btn" to="/" >Home</router-link>
      <br>
      <br>
      <br>
      <router-link v-if="!store.authenticated" class="btn" to="/" >Home</router-link>
      <router-link v-if="store.authenticated" class="btn" to="/videocategories" >Video Categories</router-link>
      <br>
      <br>
      <br>
      <router-link v-if="!store.authenticated" class="btn" to="/videocategories" >Video Categories</router-link>
      <router-link v-if="store.authenticated" class="btn" to="/forum" >Forum</router-link>
      <br>
      <br>
      <br>
      <router-link v-if="!store.authenticated" class="btn" to="/forum" >Forum</router-link>
      <span v-if="store.authenticated">
        <a class="btn" @click="logout" to="/" >Logout</a>
      </span>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import store from "@/store.js";
import Video from "@/components/Video.vue";
import { Videos } from "@/services"

export default {
  props: ["term"],
  data() {
    return {
      store,
      cards: []
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchVideos(val)}, 500)
  },
  created() {
    this.fetchVideos()
  },
  name: "home",
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    fetchVideos(term) {
      term = term || store.searchTerm

      Videos.getAll(term)
        .then(response => {
          let data = response.data;
          console.log("Backend data: ", data)
          this.cards = data.map(doc => {
            return this.cards.filter(store.userEmail===doc.userEmail,{id: doc.videoid, url: doc.url, email: doc.postedBy, title: doc.title, posted_at: Number(doc.postedAt)}
            )
          })
        })
    },
  },
  components: {
    Video
  }
};
</script>

<style>
  .col-lg-4{
    margin-left: -30%;
  }
  #loggedintext{
    font-family: Cuprum;
    font-size: 20px;
    color: black;
  }
  .btn{
    font-family: Cuprum;
    border: 2px;
    border-color: black;
    border-style: solid;
    width: 200px;
    font-size: 20px;
    color: black;
  }
  .col-lg-4{
      float: left;
  }
  .col-lg-8{
      float: right;
      font-family: Cuprum;
      font-size: 40px;
  }
  #videocol1{
    float: left;
    margin-left: -150px;
    margin-top: 30px;
  }
  #videocol2{
    float: right;
    margin-right: 130px;
    margin-top: 30px;
  }
  #videocol3{
    margin-left: 870px;
    margin-top: 30px;
  }
</style>