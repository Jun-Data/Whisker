<template>
  <div>
    <h1>게시글 상세 페이지</h1>
    <div v-if="article">
      <p>게시글 번호 : {{ article.id }}</p>
      <p>작성자 : {{ article.user.username }}</p>
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성일시 : {{ formatDate(article.created_at) }}</p>
      <p>마지막 수정일시 : {{ formatDate(article.updated_at) }}</p>
      <button v-if="store.user === article.user.username" @click="router.push({name: 'ArticleUpdateView', params:{id: article.id}})">글 수정</button>
      <button v-if="store.user === article.user.username" @click="deleteArticle">글 삭제</button>
      
      <hr>
      <h3>댓글</h3>
      <div v-if="article.comments.length > 0">
        <CommentList
        :comments="store.comments"
        />
      </div>
      <div class="comments-container">
        <p class="username">{{ store.user }}</p>
        <form action="" @submit.prevent="createComment">
          <textarea name="" id="" v-model="commentInput"></textarea>
          <input type="submit">
        </form>
      </div>
    </div>
  </div>
  </template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import CommentList from '@/components/CommentList.vue'
const store = useCounterStore()
const route = useRoute()
const router = useRouter()
const article = ref(null)
const commentInput = ref(null)

console.log(store.user)
const createComment = () => {
    axios({
      method: 'post',
      url: `${store.API_URL}/api/v1/articles/${route.params.id}/comment/create/`,
      data: {
        content: commentInput.value,
      },
      headers: {
        Authorization: `Token ${store.token}`
      }
    })
    .then(res => {
      store.comments.push(res.data)
      commentInput.value = ''
    })
    .catch(e => console.log(e))
  }

const deleteArticle = () => {
  axios({
    method: 'delete',
    url :`${store.API_URL}/api/v1/articles/${route.params.id}/`,
  })
  .then(res=> {
    router.push({name: 'ArticleView'})
  })
}
// DetailView가 마운트되기전에 DRF로 단일 게시글 조회를 요청 후 응답데이터를 저장
onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`
  })
    .then((res) => {
      // console.log(res.data)
      article.value = res.data
      store.comments = res.data.comments
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
