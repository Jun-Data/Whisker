<template>
  <tr @click="router.push({ name: 'DetailView', params: { id: article.id } })">
    <td>{{ article.id }}</td>
    <td class="title-cell">{{ article.title }}</td>
    <td>{{ article.user.username }}</td>
    <td style="font-size: small;">{{ formatDate(article.created_at) }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()


</script>

<style scoped>
tr {
  text-align: center;
}

.title-cell {
  text-align: left;
  padding-left: 100px; /* 왼쪽 여백 추가 */
  font-weight: bold;
}
</style>
