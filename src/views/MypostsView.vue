<template>
  <div class="home grid">
    <div @click="Check" class="switch-button">
      <input ref="checkbox" class="switch-button-checkbox" type="checkbox" />
      <label class="switch-button-label" for=""
        ><span class="switch-button-label-span">Off</span></label
      >
    </div>
    <div v-for="post in posts" v-bind:key="post.postId" class="card">
      <div v-show="EditEnabled" class="icons">
        <img
          @click="Transfer(post)"
          src="./../../public/icons/edit.svg"
          title="Delete"
          alt="trash can"
        />
        <!-- <img src="./../../public/icons/edit.svg" title="Edit" alt="trash can" class="icon-img" /> -->
        <img
          @click="DeletePost(post)"
          src="./../../public/icons/trash-can-solid.svg"
          title="Delete"
          alt="trash can"
        />
      </div>
      <!-- <img src="img/Web-Dev-Blog.png" alt="" class="card__img" /> -->
      <div class="card__content">
        <h2 class="card__title">{{ post.title }}</h2>
        <p class="card__description" v-html="post.content"></p>
        <router-link :to="{name: 'Showpost', params:{title:post.title, description:post.content}}"><button>Show Post</button></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "./../storage/index";
import router from "../router/index.js";

const posts = ref([]);
const storage = useStore();

const Transfer = (post) => {
  router.push({
    name: "Editpost",
    params: { postId: post.postId, title: post.title, content: post.content },
  });
};

const DeletePost = (post) => {
  storage.DeletePost(post.postId);
  getMyPosts()
}


const getMyPosts = async () => {
  posts.value = await storage.MyPosts();
};

onMounted(() => {
  getMyPosts();
});

const checkbox = ref(null);
const EditEnabled = ref(null);

const Check = () => {
  if (checkbox.value.checked) {
    EditEnabled.value = true;
  } else {
    EditEnabled.value = false;
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
}
.icons {
  display: flex;
}

.icons img {
  height: 30%;
  width: 50%;
  padding: 1rem;
  cursor: pointer;
}
.icons img:hover {
  background-color: rgba(240, 248, 255, 0.525);
}

.edit-icon {
  height: 50px;
  margin: 20%;
  border-radius: 15px;
}
.edit-icon:hover {
  background-color: rgba(240, 248, 255, 0.525);
}

.switch-button {
  color: black;
  margin: 1rem auto;
  background: rgba(255, 255, 255, 0.316);
  border-radius: 30px;
  overflow: hidden;
  width: 240px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #000;
  position: relative;
  padding-right: 120px;
  position: relative;

  &:before {
    content: "Edit";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  &-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;

    &:checked + .switch-button-label:before {
      transform: translateX(120px);
      transition: transform 300ms linear;
    }

    & + .switch-button-label {
      position: relative;
      padding: 15px 0;
      display: block;
      user-select: none;
      pointer-events: none;

      &:before {
        content: "";
        background: rgba(240, 248, 255, 0.692);
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 30px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
      }
    }
  }
}

@media (min-width: 340px) {
  .icons img {
    width: 20%;
  }

  @media (min-width: 900px) {
    .icons img {
      width: 10%;
    }

    @media (min-width: 1200px) {
      .card {
        width: 40%;
      }
      .icons img {
        width: 15%;
      }
    }
    @media (min-width: 1650px) {
      .card {
        width: 30%;
      }
      .icons img {
        width: 10%;
      }
    }
  }
}
</style>
