<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { NavbarClicked,clicked } from "./../public/js/navbar.js";
import { onMounted } from "vue";
import {useStore} from "./storage/index.js"

const storage = useStore();

const signOut = () =>{
  storage.SignOut();
  clicked();

}
onMounted(() => {
  //Show or hide navbar
  NavbarClicked();
  //Fetch user
  storage.FetchUser();
});
</script>

<template>
  <header class="primary-header flex home">
    <router-link to="/">
      <a v-on:click="clicked"
        ><img src="./../public/img/logo.png" alt="Logo" class="logo" /></a
    ></router-link>
    <button
      aria-controls="primary-navigation"
      aria-expanded="false"
      class="sr-only mobile-nav-toggle"
    ></button>
    <nav>
      <ul
        data-visible="false"
        id="primary-navigation"
        class="primary-navigation underline-indicators flex"
      >
        <li class="active">
          <router-link to="/"
            ><a v-on:click="clicked"
              >Home</a
            ></router-link
          >
        </li>
        <li v-show="storage.activeUser == null">
          <router-link to="/Login"
            ><a v-on:click="clicked"
              >Log In</a
            ></router-link
          >
        </li>
        <li v-show="storage.activeUser != null"><router-link to="/Myprofile"><a v-on:click="clicked">My Profile</a></router-link></li>
        <li v-show="storage.activeUser != null"><router-link to="/Myposts"><a v-on:click="clicked" >My Posts</a></router-link></li>
        <li v-show="storage.activeUser != null"><router-link to="/Newpost"><a v-on:click="clicked" >New Post</a></router-link></li>
        <li v-show="storage.activeUser != null"><a v-on:click="signOut" >Sign Out</a></li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="css">
@import "/public/css/styles.css";
/* set up the body */
/* Img backgroud home */
html {
  background-image: url("/img/stars.jpg");
  background-position: center center;
  background-size: cover;
  font-family: var(--ff-Bungee);
  line-height: 1.5;
  overflow-x: hidden;
  
}

/* make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}
/* Display */
.flex {
  display: flex;
  gap: var(--gap, 1rem);
}

/* css */
.mobile-nav-toggle {
  display: none;
}

/* Blur navbar firefox not supported  */
@supports (backdrop-filter: blur(1rem)) {
  .primary-navigation {
    background: hsl(0 0% 100% / 0.1);
    backdrop-filter: blur(1rem);
  }
}

/* Hero home */
.logo {
  margin: 1rem;
  border-radius: 10px;
  height: 5em;
  box-shadow: white 0 1px 10px;
  cursor: pointer;
}

/* grid */
.grid {
  display: grid;
  gap: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  /* grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); */
}
/* CARD */
img,
picture {
  max-width: 100%;
  display: block;
  border-radius: 15px;
  margin: 0 auto;
}
.card {
  margin: 0 auto;
  padding: 1rem;
  width: 80%;
  border-radius: 15px;
  background-color: #eff8f826;
}
.card img {
  text-align: center;
  margin: 0 auto;
}
.card h2 {
  color: #008081;
}
.card p {
  font-family: var(--ff-Bungee-hairline);
  color: aliceblue;
  font-weight: 900;
}
.card button {
  font-family: var(--ff-Bungee-Shade);
  font-size: 1rem;
  color: white;
  background-color: black;
  border: 0;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
}
.card button:hover {
  color: #008081;
}


nav {
  margin: 0;
}

/* Navbar */
.primary-navigation {
  list-style: none;
  gap: 2rem;
  padding: min(30vh, 10rem) 1rem;
  margin: 0;
  inset: 0 0 0 30%;
  position: fixed;
  flex-direction: column;
  z-index: 1000;

  transform: translateX(100%);
  transition: transform 390ms ease-out;

  text-align: left;
  background: #e1e6e66b;
}
.primary-navigation li {
  height: 10%;
}
.primary-navigation a {
  color: white;
  font-family: "Bungee Shade", cursive;
  font-weight: 700;
  margin-right: 0.5em;
  font-size: 2rem;
}
.primary-navigation a:hover {
  /* color: #008081; */
  /* color: #0db6b6cf; */
  color: #000;
}

.primary-navigation[data-visible="true"] {
  transform: translateX(0%);
}

.mobile-nav-toggle[aria-expanded="true"] {
  background-image: url("/public/img/close.svg");
}

.mobile-nav-toggle {
  display: block;
  position: absolute;
  background: url("/public/img//hamburger.svg");
  background-repeat: no-repeat;
  border: 0;
  width: 2rem;
  aspect-ratio: 1;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
}

/* Mobile  */
@media (max-width: 470px) {
  .primary-navigation a {
    margin-right: 1rem;
    font-size: 1.5rem;
  }
}
/* bif screens */
@media (max-width: 2000px), screen and (min-width: 1150) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
@media (min-width: 2000px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}
</style>
