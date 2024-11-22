<template>
  <tr>
    <td>{{ article.id }}</td>
    <td>{{ article.user.username }}</td>
    <td @click="router.push({name: 'DetailView', params:{id:article.id}})" class="article-title">{{ article.title }}</td>

  </tr>
</template>

<script setup>

import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router';
const router = useRouter()
defineProps({
  article: Object
})
</script>
<style scoped>
  tr {
    text-align: center
  }
  tr .article-title{
    border: 1px solid black;
    
  }
</style>
