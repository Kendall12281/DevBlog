<template>
  <div class="grid">
    <div class="card">
      <h1>Log In</h1>
      <form v-on:submit.prevent="Login">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="Username"
          required
        />
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <span ref="reset" class="error"></span>
        <button type="submit">Login</button>
        <div>
          <p>
            Forgot Password?
            <a v-on:click="Clicked">Reset</a>
          </p>
          <p>
            Dont have an Account?
            <router-link to="/Signup"><a>Register</a></router-link>
          </p>
        </div>
      </form>
      <div v-show="false" class="login-buttons">
        <button @click="test" type="button" class="login-with-google-btn">
          Sign in with Google
        </button>
        <button type="button" class="login-with-google-btn microsoft-logo">
          Sign in with Microsoft
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useStore} from "../storage/index.js"

const storage = useStore();

const test = () => {
  storage.SignInWithGoogle();
}
const email = ref("");
const password = ref("");
const reset = ref(null);

//reset password errors
const Clicked = () => {
  try {
    var emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.trim().length < 1 || !(email.value.trim().match(emailValidation))) {
      reset.value.classList.remove("greenBackground");
      reset.value.classList.add("error__handler");
      reset.value.textContent = "Must enter an email address";
    } else{
      reset.value.classList.remove("error__handler");
      reset.value.classList.add("greenBackground");
      reset.value.textContent = "reset link was sent to your email";
    }
  } catch (error) {
    console.log(error);
  }
};

const Login = () => {
  storage.SignIn(email.value, password.value, reset);
}


</script>

<style lang="scss" scoped>
.card {
  color: white;
  background: hsl(0 0% 100% / 0.1);
  width: 80%;
  padding: 3rem;
  border-radius: 15px;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card h1 {
  text-align: center;
  font-family: var(--ff-Bungee-Shade);
}

form {
  display: grid;
}
form button {
  font-family: var(--ff-Bungee);
  background-color: white;
  color: black;
  font-size: 1rem;
  border-radius: 10px;
  border: 0;
  /* padding: .5rem 1,5rem ; */
  width: 30%;
  margin: 1rem auto;
  cursor: pointer;
}
form button:hover {
  color: #008081;
}
form label {
  font-family: var(--ff-Bungee);
  margin: 1rem;
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
form p {
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  font-size: 0.9rem;
}
form p a {
  color: #008081;
  text-decoration: underline;
  cursor: pointer;
}
.reset {
  text-decoration: underline;
  cursor: pointer;
}

form div p {
  margin: 1rem auto;
}

.error__handler {
  display: visible;
  text-align: center;
  border-radius: 10px;
  font-family: var(--ff-Bungee);
  margin: 1rem auto;
  padding: 1rem;
  background-color: rgba(255, 0, 0, 0.394);
  font-size: 0.7rem;
}

.greenBackground {
  display: visible;
  text-align: center;
  border-radius: 10px;
  font-family: var(--ff-Bungee);
  margin: 1rem auto;
  padding: 1rem;
  font-size: 0.7rem;
  background-color: rgba(0, 128, 0, 0.544);
}

/* Sign in buttons */
.login-with-google-btn {
  width: 100%;
  transition: background-color 0.3s, box-shadow 0.3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  background-image: url("/public/img/google.svg");
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
}
.microsoft-logo {
  background-image: url("/public/img/Microsoft-Logo-600x338.png");
  background-size: 20px;
  background-position: 12px;
}
/* Mobile */
@media (max-width: 400px) {
  .card {
    margin-top: 4rem;
    width: 90%;
  }
  .card h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  form label {
    padding: 1rem 0.1rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  form input {
    font-size: 1rem;
    line-height: 1;
    padding: 0.5rem;
    width: 100%;
  }
  form button {
    /* padding: 0.5rem 0.5rem 0.5rem 0.5rem; */
    font-size: 1rem;
    width: 40%;
    padding: 0.5rem 0rem;
  }

  form p {
    font-size: 1rem;
  }
}

@media (max-width: 1300px) {
  @media (min-width: 700px) {
    .card {
      font-size: 2rem;
      width: 50%;
    }

    form label {
      padding: 0.5rem;
      font-size: 1.5rem;
    }

    form button {
      margin: 2rem auto;
      font-size: 1.2rem;
    }
    form p {
      font-size: 1.2rem;
    }

    /*Login icons*/
    .login-buttons {
      display: flex;
      justify-content: center;
    }
    .login-with-google-btn {
      width: 40%;
    }
  }
}

@media (min-width: 1300px) {
  .card {
    font-size: 2rem;
    width: 30%;
  }

  form label {
    padding: 0.5rem;
    font-size: 1.5rem;
  }

  form button {
    margin: 2rem auto;
    font-size: 1.2rem;
  }
  form p {
    font-size: 1.2rem;
  }

  /*Login icons*/
    .login-buttons {
      display: flex;
      justify-content: center;
    }
    .login-with-google-btn {
      width: 40%;
    }
}
</style>
