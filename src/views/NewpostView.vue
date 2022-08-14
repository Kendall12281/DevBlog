<template>
  <div class="grid">
    <div class="container">
      <div class="title">
        <label>Post Title</label>
        <input v-model="title" type="text" required/>
      </div>
      <div class="center">
        <QuillEditor
          @ready="onEditorReady($event)"
          style="
            min-height: 50vh;
            font-family: var(--ff-Bungee);
            border-top: 5px solid black;
          "
          toolbar="full"
        ></QuillEditor>
      </div>
      <button @click="newPost">Publish</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../storage/index";
import { ref } from "vue";

const title = ref("");
const storage = useStore();
var quill;

const onEditorReady = (e) => {
  quill = e.container.querySelector(".ql-blank");
};

const newPost = () => {
  try {
    storage.NewPost(title.value, quill.innerHTML);
    quill.innerHTML = "";
    title.value = "";
  } catch (error) {
    error;
  }
};
</script>

<style lang="css" scoped>
.container {
  background-color: rgba(240, 248, 255, 0.679);
  margin: 0 auto;
  width: 90%;
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
}

.center {
  margin: 1rem auto;
  width: 80%;
  border: 5px solid black;
}
button {
  font-family: var(--ff-Bungee);
  margin: 1rem;
  padding: 0.5rem 2rem;
}
button:hover {
  color: #008081;
}

.title{
  display: flex;
  flex-direction: column;
}
.title label{
  font-family: var(--ff-Bungee-Shade);
  font-size: 2rem;
  color: black;
}
.title input{
  margin: 0 auto;
  text-align: center;
  padding: .5rem;
  border-radius: 15px;
  font-family: var(--ff-Bungee);
  width: 90%;
  
}

@media (max-width: 750px) {
  .center {
    width: 100%;
  }
}
</style>
