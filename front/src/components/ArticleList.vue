<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>작성자</th>
          <th>제목</th>
        </tr>
      </thead>
      <tbody>
        
        <ArticleListItem
        v-for="article in store.articles"
        :key="article.id"
        :article="article"/>
  
      </tbody>
    </table>
    
  </div>
</template>

<script setup>
import ArticleListItem from '@/components/ArticleListItem.vue'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
</script>
