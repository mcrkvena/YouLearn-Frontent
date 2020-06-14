<template>

      <div class="card text-center" id="allposts">
        <div class="card-header text-left" id="titlemail">
          <strong>{{ info.title }} </strong> <strong style="float: right">{{ mailFormat(info.email)  }}</strong>
        </div>
        <div class="card-body" id="postcontent">
          {{ info.url }}
        </div>
        <div class="card-footer text-left" id="postedtime">
          <div style="float: right">{{ timeAgo }}</div>

          <div v-if="showcomments">
            <div class="comments list-group">
              <a :key="c.posted_at" v-for="c in info.comments" href="#" class="animate list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <small>{{ mailFormat(c.email) }} </small>
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
import { Posts } from '@/services'

export default {
  props: [ 'info', 'showcomments' ],
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
        let postId = this.info.id;
        let comment = {
          email: this.global.userEmail,
          comment: this.newComment,
        };
        try {
          await Posts.Comments.add(postId, comment);
        } catch (e) {
          console.error('Error', e);
        } finally {
          this.newComment = '';
        }
        this.refresh();
      }
      },
    async refresh() {
      let post = await Posts.getOne(this.info.id);
      this.info.comments = post.comments;
    },
    async removeComment(commentId) {
      let postId = this.info.id;
      await Posts.Comments.delete(postId, commentId);
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

  #allposts{
    width: 1200px;
    margin-left: -300px;
    font-size: 20px;
  }
  #postcontent{
    padding: 40px;
  }
  #titlemail{
    padding: 5px;
  }
  #postedtime{
    padding: 5px;
  }
  .card{
    margin-bottom: 10px;
  }
  .comments{
    margin: 20px;
    margin-top:50px;
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