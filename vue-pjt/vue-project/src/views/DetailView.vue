<template>
  <div>
    <h1>게시글 상세 페이지</h1>
    <div v-if="article">
      <p>게시글 번호 : {{ article.id }}</p>
      <p>작성자 : {{ article.user }}</p>
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성일시 : {{ formatDate(article.created_at) }}</p>
      <p>마지막 수정일시 : {{ formatDate(article.updated_at) }}</p>
    </div>
    <button>글 수정</button>
    <button>글 삭제</button>
    <button>댓글 작성</button>
  </div>
  <hr>
  <h3>댓글</h3>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRoute } from 'vue-router'

const store = useCounterStore()
const route = useRoute()
const article = ref(null)

// DetailView가 마운트되기전에 DRF로 단일 게시글 조회를 요청 후 응답데이터를 저장
onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`
  })
    .then((res) => {
      // console.log(res.data)
      article.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})

// 날짜 형식 변환
const formatDate = (dateString) => {
  const date = new Date(dateString); // ISO 형식 문자열을 Date 객체로 변환
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', 
  minute: '2-digit',  }; // 날짜 형식 지정
  return date.toLocaleDateString('ko-KR', options); // 한국 날짜 형식으로 포맷팅
}

</script>

<style>

</style>
