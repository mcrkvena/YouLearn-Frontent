<template>
  <div class="container-fluid">
    <div v-if="store.authenticated" class="col-lg-8">
        <br>
        CATEROGY: SPORTS
        <br>
        <div class="row1">
            <div @click="expandVideo(card)" :key="card.id" v-for="card in firstrow">
              <Video :info="card"/>
            </div>
          </div>
          <div class="row2">
            <div @click="expandVideo(card)" :key="card.id" v-for="card in secondrow">
              <Video :info="card"/>
            </div>
          </div>
          <div class="row3">
            <div @click="expandVideo(card)" :key="card.id" v-for="card in thirdrow">
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
        Logged in as {{ mailFormat(store.userEmail) }}
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
  computed:{
    firstrow(){
        return this.cards.slice(0,3)
    },
    secondrow(){
        return this.cards.slice(3,6)
    },
    thirdrow(){
        return this.cards.slice(6,9)
    },
  },
  created() {
    this.fetchVideos()
  },
  name: "sports",
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    fetchVideos(term) {
      term = term || store.searchTerm

      Videos.getAll(term)
        .then(response => {
          let data = response.data;
          this.cards = data.filter(doc => doc.category=='Sports')
          .map(doc => {
            return {id: doc._id, url: doc.url, email: doc.postedBy, title: doc.title, posted_at: Number(doc.postedAt)}
          })
        })
    },
    expandVideo(card) {
            this.$router.push({ path: `videos/${card.id}` });
    },
    mailFormat(str){
      return str.slice(0, str.indexOf("@"));
    }
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
  .row1{
    width: 1220px;
    margin-left: -150px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .row2{
    width: 1220px;
    margin-left: -150px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .row3{
    width: 1220px;
    margin-left: -150px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
</style>