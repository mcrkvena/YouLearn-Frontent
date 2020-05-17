<template>
  <div id="app">
    <div class="bg-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light">
              <router-link class="navbar-brand" :to="{ name: 'videos' }">
                <img src="/images/logo.png" width="220" height="50" />
              </router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                  <input v-model="searchTerm" class="form-control mr-sm-2" type="search" id="searchbar" placeholder="Search..." aria-label="Search" />
                </form>
              </div>
              <span>
                <router-link v-if="authenticated" class="btn" to="/newvideo" >Upload</router-link >
              </span>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script type="text/javascript">
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "@/store.js";

export default {
  data() {
    return store;
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Logged in as " + user.email)
        this.authenticated = true
        this.userEmail = user.email
        if (this.$route.name !== 'videos')
          this.$router.push({name: 'videos'}).catch(err => console.log(err))
      }
      else {
        console.log("Not logged in")
        this.authenticated = false
        if (this.$route.name !== 'videos')
          this.$router.push({name: 'videos'}).catch(err => console.log(err))
      }
    });
  }
};
</script>

<style lang="scss">
body {
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
}

.bg-white {
  background-color: white;
  border-bottom: #ccc 1px solid;
  margin-bottom: 20px;
  padding: 2px;
}

nav.navbar {
  background-color: white;

  a {
    svg {
      border-right: #aaa 1px solid;
      margin-right: 10px;
      padding-right: 10px;
    }

    img {
      position: relative;
      top: 3px;
    }
  }
}

.btn-primary {
  color: #007bff;
  background: none;
  border-color: #007bff;
}

#in{
  font-family: Cuprum;
  background-color: darkred;
  border: 0px;
  color: aquamarine;
  display: flex;
  justify-content: center;
}

#out{
  font-family: Cuprum;
  background-color: darkred;
  border: 0px;
  color: aquamarine;
  display: flex;
  justify-content: center;
}

#reg{
  font-family: Cuprum;
  background-color: darkred;
  border: 0px;
  color: aquamarine;
  display: flex;
  justify-content: center;
}

#searchbar{
  font-family: Cuprum;
  width: 400px;
}
</style>
