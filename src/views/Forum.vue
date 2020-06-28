<template>
  <div class="container-fluid">
    <div class="col-lg-8">
        <br>
        POSTS
        <span id="addpost">
          <router-link v-if="store.authenticated" class="btn" to="/newpost" >Add Post</router-link >
        </span>
        <br>
          <div id="singlepost">
            <div @click="expandPost(card)" :key="card.id" v-for="card in cards">
              <ForumPost :info="card"/>
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
import ForumPost from "@/components/ForumPost.vue";
import { Posts } from "@/services";

export default {
  data() {
    return {
      store,
      cards: []
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
  },
  created() {
    this.fetchPosts()
  },
  name: "posts",
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    fetchPosts(term) {
      term = term || store.searchTerm
      Posts.getAll(term)
        .then(response => {
          let data = response.data;
          this.cards = data.map(doc => {
            return {id: doc._id, url: doc.content, email: doc.postedBy, title: doc.title, posted_at: Number(doc.postedAt)}
          })
        })
    },
    expandPost(card) {
            this.$router.push({ path: `forum/${card.id}` });
    },
    mailFormat(str) {
      return str.slice(0, str.indexOf("@"));
    },
  },
  components: {
    ForumPost
  },
};
</script>

<style>
  #loggedintext {
    font-family: Cuprum;
    font-size: 20px;
    color: black;
  }

  .btn {
    font-family: Cuprum;
    border: 2px;
    border-color: black;
    border-style: solid;
    width: 200px;
    font-size: 20px;
    color: black;
  }

  #singlepost {
    margin-top: 30px;
  }

  #addpost {
    float:right;
    margin-right: -210px;
  }

  .col-lg-4 {
      float: left;
  }
  
  .col-lg-8 {
      float: right;
      font-family: Cuprum;
      font-size: 40px;
  }
</style>