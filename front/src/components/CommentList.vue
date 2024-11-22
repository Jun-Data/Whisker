<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <CommentListItem
      :comment="comment"
      />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    comments: Array
  })
  import CommentListItem from './CommentListItem.vue';

  
  

</script>

<style scoped>
  .username {
    font-weight: bold;
  }
</style>