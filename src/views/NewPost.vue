<template>
  <form @submit.prevent="CreatePost" class="mb-5">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Title</span>
      </div>
      <input v-model="title" type="text" class="form-control">
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Content</span>
      </div>
      <input v-model="content" type="text" id="content" class="form-control">
    </div>
    <button type="submit" class="btn">Create Post</button>
  </form>
</template>

<script>
import { Posts } from '@/services'
import ForumPost from "@/components/ForumPost.vue";
import store from "@/store.js";

export default {
  data() {
    return {
      store,
      title: '',
      content: ''
    }
  },
  name: "newpost",
  methods: {
    async CreatePost() {
      let post = {
        postedBy: this.store.userEmail,
        postedAt: Date.now(),
        title: this.title,
        content: this.content
      }
      let newpost = await Posts.add(post)
      console.log("Saved post: ", newpost.data)
      this.$router.push({name: "posts"})
    }
  }
};
</script>

<style lang="scss">

.card-body {
  padding: 0px;
}

img:hover {
  cursor: pointer;
}

.btn-post {
  width: 200px;
}

#content {
  height: 200px;
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

.croppa-container {
  border: 3px dashed gray;
  width: 400px;
  display: block;
  margin-bottom: 10px;
}

.input-group {
  margin-bottom: 20px;
}
</style>