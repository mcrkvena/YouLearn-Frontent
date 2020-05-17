<template>
  <div class="container-fluid">
    <div class="col-lg-8">
        <br>
        VIDEO CATEGORIES
        <br>
          <div id="catlist">
            <div class="allcats1">
              School
            </div>
            <div class="allcats2">
              Vehicles
            </div>
            <div class="allcats1">
              Music
            </div>
            <div class="allcats2">
              Games
            </div>
            <div class="allcats1">
              Tech
            </div>
            <div class="allcats2">
              Gardening
            </div>
            <div class="allcats1">
              Sports
            </div>
            <div class="allcats2">
              Cooking
            </div>
            <div class="allcats1">
              Miscellaneous
            </div>
        </div>
    </div>
    <div class="col-lg-4">
      <br>
      <br>
      <br>
      <br>
      <span v-if="authenticated" id="loggedintext">
        Logged in as {{ userEmail }}
        <br/>
        <br/>
      </span>
      <router-link v-if="!authenticated" class="btn" to="/login" >Login</router-link >
      <router-link v-if="authenticated" class="btn" to="/mychannel" >My Channel</router-link >
      <br/>
      <br/>
      <br>
      <router-link v-if="!authenticated" class="btn" to="/register" >Register</router-link>
      <router-link v-if="authenticated" class="btn" to="/" >Home</router-link>
      <br>
      <br>
      <br>
      <router-link v-if="!authenticated" class="btn" to="/" >Home</router-link>
      <router-link v-if="authenticated" class="btn" to="/videocategories" >Video Categories</router-link>
      <br>
      <br>
      <br>
      <router-link v-if="!authenticated" class="btn" to="/videocategories" >Video Categories</router-link>
      <router-link v-if="authenticated" class="btn" to="/forum" >Forum</router-link>
      <br>
      <br>
      <br>
      <router-link v-if="!authenticated" class="btn" to="/forum" >Forum</router-link>
      <span v-if="authenticated">
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
import store from "@/store.js";

export default {
  props: ["term"],
  data() {
    return store;
  },
  name: "home",
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>
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
  #catlist{
    margin-left: -200px;
    margin-top: 30px;
    font-size: 32px;
  }
  .allcats1{
    margin-bottom: 20px;
    background-color:lightgrey;
    border-radius: 25px;
    text-align: center;
  }
  .allcats2{
    margin-bottom: 20px;
    background-color: lightblue;
    border-radius: 25px;
    text-align: center;
  }
  .col-lg-4{
      float: left;
  }
  .col-lg-8{
      float: right;
      font-family: Cuprum;
      font-size: 40px;
  }
</style>