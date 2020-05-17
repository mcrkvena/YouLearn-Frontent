<template>

      <div class="card text-center" id="allposts">
        <div class="card-header text-left" id="titlemail">
          <strong>{{ info.title }} </strong> <strong style="float: right">{{ info.email }}</strong>
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
import { Posts } from '@/services'

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
            .doc(this.info.id)
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
    margin-bottom: 10px
  }
  .comments{
    margin: 20px 0
  }

  @-webkit-keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}@keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}
  .animate{-webkit-animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both;animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both}

</style>