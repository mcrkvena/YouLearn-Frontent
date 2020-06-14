<template>
  <form @submit.prevent="CreateVideo" class="mb-5">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Title</span>
      </div>
      <input v-model="title" type="text" class="form-control">
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">YouTube URL</span>
      </div>
      <input v-model="url" type="url" class="form-control">
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Choose Category</span>
      </div>
      <input v-model="category" type="radio" class="form-control" id="school" name="school" value="School">
      <label class="labels" for="school"> School </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="vehicles" name="vehicles" value="Vehicles">
      <label class="labels" for="vehicles"> Vehicles </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="music" name="music" value="Music">
      <label class="labels" for="music"> Music </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="games" name="games" value="Games">
      <label class="labels" for="games"> Games </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="tech" name="tech" value="Tech">
      <label class="labels" for="tech"> Tech </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="gardening" name="gardening" value="Gardening">
      <label class="labels" for="gardening"> Gardening </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="sports" name="sports" value="Sports">
      <label class="labels" for="sports"> Sports </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="cooking" name="cooking" value="Cooking">
      <label class="labels" for="cooking"> Cooking </label>
      <br>
      <input v-model="category" type="radio" class="form-control" id="misc" name="misc" value="Misc">
      <label class="labels" for="misc"> Miscellaneous </label>
      <br>

    </div>
    <button type="submit" class="btn">Add Video</button>
  </form>
</template>

<script>
import { Videos } from '@/services'
import Video from "@/components/Video.vue";
import store from "@/store.js";

export default {
  data() {
    return {
      store,
      title: '',
      url: '',
      category: ''
    }
  },
  name: "newvideo",
  methods: {
    async CreateVideo() {
      var string = this.url
      var newstring = string.replace('watch?v=', 'embed/')
      let videodata = {
        postedBy: this.store.userEmail,
        postedAt: Date.now(),
        title: this.title,
        url: newstring,
        category: this.category
      }
      console.log(this.category)
      let newvid = await Videos.add(videodata)
      console.log("Saved video: ", newvid.data)
      this.$router.push({name: "videos"})
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
.btn{
  font-family: Cuprum;
  border: 2px;
  border-color: black;
  border-style: solid;
  width: 200px;
  font-size: 20px;
  color: black;
}
.labels{
    font-family: Cuprum;
    font-size: 24px;
}
.input-group {
  margin-bottom: 20px;
}
</style>