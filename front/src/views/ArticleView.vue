<template>
  <div class="content-wrapper">
    <!-- 헤더 영역 -->
    <header class="header">
      <h1>자유 게시판</h1>
      <RouterLink :to="{ name: 'CreateView' }" class="btn-create">
        <font-awesome-icon icon="pen" /> 글 작성
      </RouterLink>
    </header>

    <!-- 게시글 리스트 -->
    <div class="article-list">
      <ArticleList />
    </div>
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue';
import { onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { RouterLink } from 'vue-router';

const store = useCounterStore();

onMounted(() => {
  // mount 되기 전에 store에 있는 전체 게시글 요청 함수를 호출
  store.getArticles();
});
</script>

<style scoped>
/* 콘텐츠 wrapper 스타일 */
.content-wrapper {
  padding: 20px;
  background-color: #f7f8fa;
  max-width: 1400px; /* 최대 너비 설정 */
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden; /* 테이블이 영역을 벗어나지 않도록 설정 */
  box-sizing: border-box;
}

/* 게시글 리스트 */
.article-list {
  margin-top: 20px;
  overflow-x: auto; /* 테이블이 크기를 초과할 경우 가로 스크롤 추가 */
  width: 100%; /* .article-list를 100% 너비로 설정 */
}

/* 테이블 스타일 */
table {
  width: 100%; /* 테이블 너비를 wrapper에 맞춤 */
  border-collapse: collapse; /* 테이블 경계선 간격 제거 */
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  table-layout: auto; /* 기본값으로 자동 너비 조정 */
  max-width: 100%; /* 최대 너비를 100%로 설정 */
  box-sizing: border-box; /* padding과 border가 크기에 포함되도록 설정 */
}

.btn-create {
  color: black;  /* 텍스트 색상 검정으로 변경 */
  text-decoration: none;  /* 밑줄 제거 */ 
  margin-top: 45px;
}
.btn-create:hover {
  color: #585bd6;
}

</style>
