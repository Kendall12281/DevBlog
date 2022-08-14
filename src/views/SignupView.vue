<template>
  <div class="margin grid">
    <div class="card">
      <h1>Register</h1>
      <form v-on:submit.prevent="SignUp()">
        <label for="name">Name</label>
        <input v-model="name" type="text" name="name" id="name" required />
        <label for="lastName">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          name="lastName"
          id="lastName"
          required
        />
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" id="email" required />
        <label for="password1">Password</label>
        <input
          v-model="password1"
          type="password"
          name="password1"
          id="password1"
          required
        />
        <label for="password2">Retype Password</label>
        <input
          v-model="password2"
          v-on:input="PasswordCheck"
          type="password"
          name="password2"
          id="password2"
          required
        />
        <span ref="error"></span>
        <button class="register">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../storage/index";

//Password
const password1 = ref("");
const password2 = ref("");
const error = ref(null);

//V-model
const name = ref("");
const lastName = ref("");
const email = ref("");
//Storage
const storage = useStore();

const SignUp = () => {
  if (PasswordCheck()) {
    if (PasswordLengthCheck()) {
      storage.SignUp(email.value, name.value, lastName.value, password1.value);
    }
  }
};

const PasswordCheck = () => {
  if (password2.value.trim() != password1.value.trim()) {
    error.value.classList.add("error__handler");
    error.value.textContent = "Passwords must match";
    return false;
  } else {
    error.value.classList.remove("error__handler");
    error.value.textContent = "";
    return true;
  }
};

const PasswordLengthCheck = () => {
  if (password1.value.length >= 8) {
    error.value.classList.remove("error__handler");
    error.value.textContent = "";
    return true;
  } else {
    error.value.classList.add("error__handler");
    error.value.textContent = "Passwords must be at least 8 characters long";
    return false;
  }
};
</script>

<style lang="css" scoped>
.margin {
  margin: 1rem 1rem;
}
.card {
  padding: 1rem 1rem;
  width: 90%;
  margin: 0 auto;
  background: hsl(0 0% 100% / 0.1);
  color: white;
  border-radius: 15px;
}
.card h1 {
  text-align: center;
  font-family: var(--ff-Bungee-Shade);
}
form {
  display: grid;
}
form label {
  font-family: var(--ff-Bungee);
  margin: 2rem;
}
form input {
  font-family: var(--ff-Bungee);
  font-size: 1rem;
  text-align: center;
  color: black;
  margin: 0 auto;
  line-height: 2;
  width: 80%;
  border: 0;
  border-radius: 10px;
  background-color: white;
}
form button {
  font-family: var(--ff-Bungee);
  width: 30%;
  padding: 0.5rem;
  margin: 1rem auto;
  background-color: white;
  color: black;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}
form button:hover {
  color: #008081;
}

.error__handler {
  text-align: center;
  border-radius: 10px;
  font-family: var(--ff-Bungee);
  margin: 1rem auto;
  padding: 1rem;
  background-color: rgba(255, 0, 0, 0.394);
  font-size: 0.7rem;
}

.registered {
  display: none;
  font-family: var(--ff-Bungee);
  position: absolute;
  color: black;
  padding: 2rem;
  font-size: 2rem;
  background-color: #008081;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
}

@media (min-width: 700px) {
  .card {
    width: 60%;
  }
}
@media (min-width: 1200px) {
  .card {
    width: 40%;
  }
}
</style>
