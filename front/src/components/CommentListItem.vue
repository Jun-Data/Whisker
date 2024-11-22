<template>
  <div>
    <div>
      <span class="username">{{ comment.user.username }}</span>
      <span class="created-at">{{ comment.created_at }}</span>
    </div>
    <div>
      {{ comment.content }}
      <button  v-if="store.user === comment.user.username" @click="deleteComment(route.params.id, comment.id)">삭제</button>
    </div>
    <hr>
  </div>
</template>

<script setup>
  defineProps({
    comment: Object
  })

  import { useCounterStore } from '@/stores/counter';
  import { useRoute } from 'vue-router';
  const store = useCounterStore()
  const route = useRoute()
  
  const deleteComment = (articleId, commentId) => {
    console.log(articleId, commentId)
    store.deleteComment(articleId, commentId)
  }

</script>

<style scoped>
  .username {
    font-weight: bold;
  }

</style>