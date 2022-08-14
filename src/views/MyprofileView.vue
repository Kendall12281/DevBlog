<template>
  <div class="center grid">
    <div class="card1">
      <img src="./../../public/img/user-profile-icon-free-vector.webp" alt="" />
      <div class="name">
        <label>Name</label>
        <input v-model="name" type="text" />
        <label>Last Name</label>
        <input v-model="lastName" type="text" />
      </div>
      <div class="description">
        <label>description</label>
        <textarea v-model="description" cols="30" rows="10"></textarea>
      </div>
      <div class="email">
        <label>Email</label>
        <input v-model="email" type="text" disabled />
      </div>
      <div class="total">
        <label>Total Posts</label>
        <p>{{totalPosts}}</p>
      </div>
      <button @click="UpdateUser">Update</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../storage/index";
import { ref,onMounted } from "vue";

const storage = useStore();

const name = ref(storage.activeUser.name);
const lastName = ref(storage.activeUser.lastName);
const description = ref(storage.activeUser.description);
const email = ref(storage.activeUser.email);
const  totalPosts =  ref("")


const UpdateUser = () => {
  if(name.value.length > 1 && lastName.value.length > 1){
    storage.UpdateUserInfo(name.value,lastName.value,description.value)
  }
}

onMounted(async() => {
  totalPosts.value = await storage.TotalPostUser()
});

</script>

<style lang="css" scoped>
.center {
  display: grid;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
}
.card1 {
  background: hsl(0 0% 100% / 0.1);
  border-radius: 15px;
}
.card1 div {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
label {
  color: white;
  font-family: var(--ff-Bungee);
  font-size: 1rem;
}
img {
  margin: 1rem auto;
  width: 20%;
  border-radius: 50%;
}
input,
textarea {
  margin: 0 auto;
  text-align: center;
  width: 65%;
  border-radius: 4px;
  border: 0;
  font-family: var(--ff-Bungee);
  font-size: 0.9rem;
  color: black;
}
input {
  line-height: 3;
}
.card1 {
  margin: 1rem;
  text-align: center;
}
button {
  margin: 1rem auto;
  font-family: var(--ff-Bungee);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  width: 20%;
}
button:hover {
  color: #008081;
}
p {
  color: white;
  font-family: var(--ff-Bungee);
}

@media (max-width: 900px) {
  .center {
    width: 80%;
  }
  button {
  margin: 1rem auto;
  font-family: var(--ff-Bungee);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  width: 30%;
}
}
</style>
