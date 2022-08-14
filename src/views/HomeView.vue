<script setup>
import { ref,onMounted, computed } from "vue";
import { useStore } from "./../storage/index";

const storage = useStore()

var totalPosts = ref([])
const top = ref(null);
const search = ref("");

const posts = ref(computed(()=>{return totalPosts.value.filter(post => post.title.toLowerCase().includes(search.value.toLocaleLowerCase()))  }))
// const posts = ref([])

const LoadPost = async() =>{
  const query = await storage.LoadPosts();
  query.forEach(element =>{
    totalPosts.value.push(element.data())
  })
} 
// const Filter = () => {
//   posts.value = totalPosts.value.filter(post => post.title.toLowerCase().includes(search.value.toLocaleLowerCase()))  
// }

onMounted(async() => {
  Scroll();
  LoadPost();
  

});



const Scroll = () => {
  try{

    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
      top.value.style.display = "block";
    } else{
      top.value.style.display = "none";
    }
  }catch(error){
    error
  }
};

const ScrollTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

window.onscroll = function () {
  Scroll();
};
</script>

<template>
  <div @onscroll="Scroll" class="home">
    <!--  -->
    <div class="search-box">
      <input
      ref="input"
        v-model="search"
        type="text"
        class="input-search"
        placeholder="Type to Search..."
      />
    </div>
    <!--  -->
    <div class="grid" data-visible="true">
      <div v-for="post in posts" v-bind:key="post.postId" class="card">
        <img alt="" class="card__img" />
        <div class="card__content">
          <h2 class="card__title">{{post.title}}</h2>
          <p class="card__description" v-html="post.content">
          </p>
          <!-- <button>Show Post</button> -->
          <router-link :to="{name: 'Showpost', params:{title:post.title, description:post.content}}"><button>Show Post</button></router-link>
        </div>
      </div>
    </div>
    
    <!-- Scroll bar -->
    <div class="top-svg">
      <img
        @click="ScrollTop"
        ref="top"
        class="top"
        src="../../public/img/arrow-up-solid.svg"
        alt=""
      />
    </div>
  </div>
</template>


<style lang="css" scoped>

.top-svg {
  background-color: white;
  /* height: 5%;
  width: 5%; */
}
.top {
  position: fixed;
  bottom: 3%;
  left: 85%;

  background: rgba(255, 255, 255, 0.473);
  padding: 1rem;
  height: 7%;
  border-radius: 100%;
}

/* Search box */
.search-box {
  display: flex;
  justify-content: center;
  font-family: var(--ff-Bungee);
}
.input-search {
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  outline: none;
  border-radius: 100%;
  background-color: #030e0f00;
  padding-right: 40px;
  color: #fff;
  font-family: var(--ff-Bungee);
  width: 70%;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  width: 70%;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
</style>
