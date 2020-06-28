<template>
      <div class="card text-center" id="allvideos">
        <div class="card-header text-left">
            <strong>{{ info.title }} </strong>
            <a style="float: right" @click="removeVideo(info.id)" href="#">Delete</a>
        </div>
        <div class="card-body" >
            <iframe width="1200" height="800"
                :src="info.url" frameborder="0" allowfullscreen>
            </iframe>
        </div>
        <div class="card-footer text-left">
          <div>
            {{ mailFormat(info.email) }} <strong style="float: right">{{ timeAgo }}</strong>
          </div>
          <div v-if="showcomments">
            <div class="comments list-group">
              <a :key="c.posted_at" v-for="c in info.comments" href="#" class="animate list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <small>{{ mailFormat(c.email) }}</small>
                  <a @click="removeComment(c.id)" href="#">Delete</a>
                </div>
                <strong>{{ c.comment }}</strong>
              </a>
            </div>
            <form @submit.prevent="postComment" class="form-inline mb-5">
              <div class="form-group">
                <input v-model="newComment" type="text" class="form-control" id="comment" placeholder="Add a comment">
              </div>
              <button type="submit" class="btn">Post</button>
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
      newComment: ''
    }
  },
  methods: {
    commentTimeAgo(t) {
      return moment(t.posted_at).fromNow()
    },
    mailFormat(str){
      return str.slice(0, str.indexOf("@"));
    },
    async postComment() {
      if (this.newComment) {
        let videoId = this.info.id;
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
        this.refresh();
      }
    },
    async refresh() {
      let video = await Videos.getOne(this.info.id);
      this.info.comments = video.comments;
    },
    async removeComment(commentId) {
      let videoId = this.info.id;
      await Videos.Comments.delete(videoId, commentId);
      this.refresh();
    },
    async removeVideo() {
      let videoId = this.info.id;
      await Videos.delete(videoId);
      this.$router.push({name: 'videos'}).catch(err => console.log(err))
    }
  },
  computed: {
    timeAgo() {
      return moment(this.info.posted_at).fromNow()
    }
  }
}
</script>

<style>
  .card{
    margin-left: -300px;
    font-size: 40px;
    margin-top: -100px;
  }
  .card-body{
      margin-top: -20px;
      margin-left: -21px;
      margin-bottom: -30px;
      width:max-content;
  }
  .card-footer {
      margin-top: 810px;
  }
  .comments {
    margin: 20px;
    margin-top:50px;
    font-size: 20px;
  }
  #comment{
    width: 500px;
  }
  .btn{
    font-family: Cuprum;
    border: 2px;
    border-color: black;
    border-style: solid;
    width: 200px;
    margin-left: 20px;
    font-size: 20px;
    color: black;
  }

  @-webkit-keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}@keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}
  .animate{-webkit-animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both;animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both}

</style>