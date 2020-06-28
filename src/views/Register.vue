<template>
  <div>
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-5" id="title">Register to YouLearn</h1>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form @submit.prevent="signup" action="Home.vue">
          <div v-if="errorMessage" class="alert alert-danger">
            <strong>Error!</strong>
            {{ errorMessage }}
          </div>
          <div class="form-group">
            <label for="emailField" id="mail">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="emailField"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label for="passwordField" id="pw">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="passwordField"
              placeholder="Password"
            />
          </div>
          <button type="submit" id="submitButton" class="btn btn-primary mt-5">Submit</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      errorMessage: "",
      email: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
        signup() {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email,this.password)
        }
    }
};
</script>

<style>
  #title {
    font-family: Cuprum;
    font-weight: bold;
  }

  #emailField {
    font-family: Cuprum;
  }

  #usernameField {
    font-family: Cuprum;
  }

  #passwordField {
    font-family: Cuprum;
  }

  #mail {
    font-family: Cuprum;
  }
  
  #user {
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