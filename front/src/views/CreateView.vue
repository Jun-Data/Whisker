<template>
  <div class="content-wrapper">
    <h1>게시글 작성</h1>

    <form @submit.prevent="createArticle" class="article-form">
      <div class="form-group">
        <label for="title">제목 : </label>
        <input type="text" id="title" v-model.trim="title" required>
      </div>

      <div class="form-group">
        <label for="content">내용 : </label>
        <textarea id="content" v-model.trim="content" required></textarea>
      </div>

      <div class="form-actions">
        <RouterLink :to="{ name: 'ArticleView' }" class="btn-cancel">취소</RouterLink>
        <input type="submit" value="작성" class="btn-submit">
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const title = ref('')
const content = ref('')
const store = useCounterStore()
const router = useRouter()

// DRF로 게시글 생성 요청을 보내는 함수
const createArticle = function () {
  axios({
    method: 'post',
    url: `${store.API_URL}/api/v1/articles/create/`,
    data: {
      title: title.value,
      content: content.value
    },
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then((res) => {
      router.push({ name: 'ArticleView' })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped>
/* 콘텐츠 wrapper 스타일 */
.content-wrapper {
  padding: 20px;
  background-color: #ffffff;
  max-width: 800px;
  margin: 50px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* 제목 스타일 */
h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* 폼 스타일 */
.article-form {
  display: flex;
  flex-direction: column;
}

/* 폼 그룹 (label, input) */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 1.1rem;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #585bd6;
  outline: none;
}

/* 텍스트 영역 스타일 */
.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

/* 버튼 스타일 */
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.btn-cancel {
  background-color: #f4f4f4;
  color: #333;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  background-color: #e1e1e1;
}

.btn-submit {
  background-color: #585bd6;
  color: #fff;
  border: none;
}

.btn-submit:hover {
  background-color: #4c50b8;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 15px;
  }

  .form-group input,
  .form-group textarea {
    font-size: 1rem;
  }
}
</style>
