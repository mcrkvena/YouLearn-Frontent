<template>
<div>
  <div class="row">
    <div class="col">
      <h1 class="text-center mb-5" id="title">Login to YouLearn</h1>
    </div>
  </div>
  <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1" id="mail">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" id="pw">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" id="submitButton" class="btn btn-primary mt-5">Submit</button>
        </form>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error){
            console.log(error)
          });
      }
  }
}
</script>

<style>
  #title {
    font-family: Cuprum;
    font-weight: bold;
  }

  #exampleInputEmail1 {
    font-family: Cuprum;
  }

  #exampleInputPassword1 {
    font-family: Cuprum;
  }

  #mail {
    font-family: Cuprum;
  }

  #pw {
    font-family: Cuprum;
  }
  
  #submitButton {
    font-family: Cuprum;
    background-color: darkred;
    border: 0px;
    color: aquamarine;
    display: flex;
    justify-content: center;
  }
</style>