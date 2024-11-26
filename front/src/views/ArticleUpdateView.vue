<template>
  <div class="content-wrapper">
    <h1 class="page-title">게시글 수정</h1>
    <div v-if="article" class="form-container">
      <form @submit.prevent="updateArticle">
        <div class="form-group">
          <label for="title" class="form-label">제목</label>
          <input id="title" type="text" v-model.trim="titleInput" class="form-input">
        </div>
        <div class="form-group">
          <label for="content" class="form-label">내용</label>
          <textarea id="content" v-model.trim="contentInput" class="form-textarea"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">수정 완료</button>
          <RouterLink :to="{ name: 'DetailView', params: { id: route.params.id } }" class="btn-cancel">취소</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'

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
  .then(() => {
    router.push({ name: 'DetailView', params: { id: article.value.id } })
  })
}

// 게시글 데이터를 불러옵니다
onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`
  })
    .then((res) => {
      article.value = res.data
      titleInput.value = article.value.title
      contentInput.value = article.value.content
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<style scoped>
/* 전체 레이아웃 */
.content-wrapper {
  padding: 20px;
  max-width: 800px;
  margin: 50px auto;
  background-color: #f7f8fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
}

/* 페이지 제목 */
.page-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* 폼 스타일 */
.form-container {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #585bd6;
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* 버튼 스타일 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-submit,
.btn-cancel {
  padding: 5px 7px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-submit {
  background-color: #585bd6;
  color: white;
}

.btn-submit:hover {
  background-color: #4c50b8;
}



/* 반응형 디자인 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
