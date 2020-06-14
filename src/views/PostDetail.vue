<template>
  <div class="container-fluid">
    <div class="col-lg-8">
        <br>
        <br>
        <div v-if="card">
            <ForumPost :info="card" :showcomments="true" />
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
import ForumPost from '@/components/ForumPost.vue';
import store from '@/store.js';
import { Posts } from '@/services';

export default {
    props: ["id"],
    data() {
        return {
            store,
            card: null
        };
    },
    async mounted() {
        this.card = await Posts.getOne(this.id);
    },
    methods: {
        logout() {
            firebase.auth().signOut();
        },
        mailFormat(str){
          return str.slice(0, str.indexOf("@"));
        }
    },
    name: "postdetail",
    components: {
        ForumPost
    }
};
</script>

<style>
</style>