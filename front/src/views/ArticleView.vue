<template>
  <div class="content-wrapper">
    <!-- 헤더 영역 -->
    <header class="header">
      <h1 class="title fs-1">자유 게시판</h1>
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

/* 헤더 스타일 */
.header {
  display: flex;
  justify-content: space-between; /* 제목과 버튼을 양쪽으로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  margin-bottom: 20px;
  margin-right: 20px;
}

/* 자유 게시판 제목 스타일 (더 두껍게) */
.header h1 {
  font-weight: 700; /* 글자 두께를 더 두껍게 */
  font-size: 2rem; /* 글자 크기 설정 */
}

/* 글 작성 버튼 스타일 */
.btn-create {
  color: black;  /* 텍스트 색상 검정으로 변경 */
  text-decoration: none;  /* 밑줄 제거 */
  font-size: 1rem; /* 폰트 크기 설정 */
  display: flex;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
  font-size: large;
}

.btn-create:hover {
  color: #585bd6;
}

</style>
