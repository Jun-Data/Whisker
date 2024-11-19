<template>
  <div>
    <h5> 글 번호 : {{ article.id }}</h5>
    <!-- <p> 제목 : {{ article.title }}</p> -->
    <!-- <p> 내용 : {{ article.content }}</p> -->
     
    <RouterLink 
      :to="{ name: 'DetailView', params: { id: article.id } }"  
    >
      <!-- 상세보기 -->
      <p> 제목 : {{ article.title }}</p>   
    </RouterLink>
    <h6> 작성자 : {{ article.user }}</h6>
    <h6>댓글 수 : </h6>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  article: Object
})
</script>
