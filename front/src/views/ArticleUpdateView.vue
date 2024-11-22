<template>
  <div>
    <h1>게시글 수정 페이지</h1>
    <div v-if="article">
      <form @submit.prevent="updateArticle">
        <div>
          <label for="title">제목 : </label>
          <input id="title" type="text" v-model.trim="titleInput">
        </div>
        <div>
          <label for="content">내용 : </label>
          <textarea name="" id="content" v-model.trim="contentInput"></textarea>
        </div>
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { useCounterStore } from '@/stores/counter'
  import axios from 'axios';

  const store = useCounterStore()
  const route = useRoute()
  const router = useRouter()
  const article = ref(null)
  const titleInput = ref(null)
  const contentInput = ref(null)

  const updateArticle = () => {
    axios({
      method: 'put',
      url: `${store.API_URL}/api/v1/articles/${route.params.id}/`,
      data: {
        title: titleInput.value,
        content: contentInput.value
      }
    })
    .then(res => {
      router.push({name: 'DetailView', params:{id: article.value.id}})
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
        // form
        titleInput.value = article.value.title
        contentInput.value = article.value.content
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

<style scoped>
  
</style>