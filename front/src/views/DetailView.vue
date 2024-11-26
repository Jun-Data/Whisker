<template>
  <div class="content-wrapper">
    <div v-if="article">
      <div class="article-detail">
        <h1 class="article-title">{{ article.title }}</h1>
        <h2 class="article-content">{{ article.content }}</h2>
        <p class="article-author">작성자 : {{ article.user.username }}</p>
        <p class="article-dates">
          <span>작성일시 : {{ formatDate(article.created_at) }}</span>
          <span> (수정 : {{ formatDate(article.updated_at) }})</span>
        </p>
        <br><br>
        <div>
          <button v-if="store.user === article.user.username" @click="router.push({name: 'ArticleUpdateView', params:{id: article.id}})">수정</button>
          <button v-if="store.user === article.user.username" @click="deleteArticle" style="margin-left: 5px;">삭제</button>
        </div>
      </div>
      <hr>
      <h3>댓글</h3>
      <div v-if="article.comments.length > 0">
        <CommentList :comments="store.comments" />
      </div>

      <div class="comments-container">
        <!-- 로그인 상태에서만 댓글 작성 폼 표시 -->
          <form action="" @submit.prevent="createComment" class="comment-form">
            <textarea v-model="commentInput" placeholder="댓글을 작성하세요" class="comment-input"></textarea>
            <button type="submit" class="btn-action">작성</button>
          </form>
          </div>
      </div>
    <br><br>

    <div class="back-button">
      <RouterLink :to="{ name: 'ArticleView' }">
        <button>뒤로가기</button>
      </RouterLink>

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
const commentInput = ref('')

const createComment = () => {
  if (!store.isLogin) {
    alert('로그인이 필요합니다.')
    router.push({name: 'LogInView'})
    return;
  }

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
    commentInput.value = '' // 입력 필드 초기화
  })
  .catch(e => console.log(e))
}

const deleteArticle = () => {
  axios({
    method: 'delete',
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`,
  })
  .then(res => {
    router.push({ name: 'ArticleView' })
  })
}

// DetailView가 마운트되기 전에 DRF로 단일 게시글 조회 요청 후 응답 데이터를 저장
onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`
  })
  .then((res) => {
    article.value = res.data
    store.comments = res.data.comments
  })
  .catch((err) => {
    console.log(err)
  })
})

// 날짜 형식 변환
const formatDate = (dateString) => {
  const date = new Date(dateString); 
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', }; 
  return date.toLocaleDateString('ko-KR', options); 
}
</script>

<style scoped>
/* 콘텐츠 wrapper 스타일 */
.content-wrapper {
  padding: 20px;
  background-color: #f7f8fa;
  max-width: 800px;
  margin: 50px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
}

/* 제목 스타일 */
h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.article-detail {
  margin-bottom: 20px;
}

.article-id,
.article-author,
.article-title,
.article-content,
.article-dates {
  margin-bottom: 10px;
}

.article-title {
  font-size: 1.8rem;
  font-weight: bold;
  color:#585bd6;
}

.article-content {
  line-height: 1.5;
}

.article-dates {
  font-size: 0.9rem;
  color: #777;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.btn-action {
  padding: 2px 7px;
  font-size: 1.15rem;
  color: #fff;
  border-radius: 4px;
  border: none;
  background-color: #585bd6;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-action:hover {
  background-color: #585bd6;
}

.comments-container {
  margin-top: 30px;
}

.comment-form {
  display: flex;
  flex-direction: column;
}

.comment-input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: vertical;
  min-height: 100px;
}

.comment-input:focus {
  border-color: #585bd6;
  outline: none;
}

.btn-submit {
  padding: 10px 20px;
  background-color: #585bd6;
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.btn-submit:hover {
  background-color: #585bd6;
}


.back-button {
  display: flex;
  justify-content: flex-end; /* 뒤로가기 버튼을 오른쪽 정렬 */
  margin-top: 20px; /* 위와의 간격 조절 */
}

.back-button button {
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #ccc;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button button:hover {
  background-color: #bbb;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 15px;
  }

  .comment-input {
    font-size: 1rem;
  }
}
</style>
