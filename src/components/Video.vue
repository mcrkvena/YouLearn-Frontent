<template>

      <div class="card text-center" id="allvideos">
        <div class="card-header text-left">
          {{ timeAgo }} <strong style="float: right">{{ info.email }}</strong>
        </div>
        <div class="card-body" >
            <iframe width="500" height="315"
                :src="info.url" frameborder="0" allowfullscreen>
            </iframe>
        </div>
        <div class="card-footer text-left">
          <div style="float: left">
              <strong>{{ info.title }} </strong>
          </div>
          <div v-if="showcomments">
            <div class="comments list-group">
              <a :key="c.posted_at" v-for="c in info.comments" href="#" class="animate list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <small>{{ formatTime(c.posted_at) }} by {{ c.email }} </small>
                  <a @click="removeComment(c.id)" href="#">Delete</a>
                </div>
                <small>{{ c.comment }}</small>
              </a>
            </div>

            <form @submit.prevent="postComment" class="form-inline mb-5">
              <div class="form-group">
                <input v-model="newComment" type="text" class="form-control" placeholder="Comment">
              </div>
              <button type="submit" class="btn btn-primary ml-2">Post</button>
            </form>
          </div>

        </div>
      </div>

</template>

<script>
import moment from 'moment'
import store from '@/store.js'
import { Videos } from '@/services'

export default {
  props: [ "info", "showcomments" ],
  data () {
    return {
      global: store,
      newComment: "",
      comments: []
    }
  },
  methods: {
    formatTime(t) {
      return moment(t.posted_at).fromNow()
    },
    postComment() {
      if (this.newComment) {
            collection("comments")
            .doc(this.info.videoid)
            .add({ email: this.global.userEmail, comment: this.newComment, posted_at: Date.now() })
              .then(result => {
                console.log(result)
                this.newComment = "";
              })
              .catch(e => {
                console.error(e)
              })
      }
    },
    async postComment() {
      if (this.newComment) {
      let videoId = this.info.videoid;
      let comment = {
        email: this.global.userEmail,
        comment: this.newComment,
      };
      try {
      await Videos.Comments.add(videoId, comment);
      } catch (e) {
      console.error('Error', e);
      } finally {
      this.newComment = '';
      }
      }
      },
    async refresh() {
      let video = await Videos.getOne(this.info.videoid);
      this.info.comments = video.comments;
    },
    async removeComment(commentId) {
      let videoId = this.info.videoid;
      await Videos.Comments.delete(videoId, commentId);
      this.refresh();
    }
  },
  computed: {
    timeAgo () {
      return moment(this.info.posted_at).fromNow()
    }
  }
}
</script>

<style>

  #allvideos{
    width: 500px;
    margin-left: -300px;
    font-size: 20px;
  }
  .card-body{
      margin-top: -20px;
      margin-left: -21px;
      margin-bottom: -30px;
      width:max-content
  }
  .card {
    margin-bottom: 10px
  }
  .comments {
    margin: 20px 0
  }

  @-webkit-keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}@keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}
  .animate{-webkit-animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both;animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both}

</style>