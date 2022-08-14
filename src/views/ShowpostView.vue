<template>
  <div class="grid" data-visible="true">
    <div class="card">
      <img alt="" class="card__img" />
      <div class="card__content">
        <h2 class="card__title">{{ post.title }}</h2>
        <p class="card__description" v-html="post.description"> 
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "../router/index";
const post = router.currentRoute._value.params;
</script>

