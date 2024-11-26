<template>
  <div class="board-container">
    <!-- 검색 입력창 -->
    <div class="search-container">
      <font-awesome-icon icon="magnifying-glass" class="search-icon"/>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="검색어를 입력하세요 (제목, 글쓴이)"
        class="search-input"
      />
    </div>

    <!-- 게시글 테이블 -->
    <table class="article-table">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="(article, index) in filteredArticles"
        :key="article.id"
        @click="goToArticleDetail(article.id)"
        class="clickable-row">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="title-cell" :title="article.title">{{ article.title }} 
              <span v-if="article.comments_count > 0"> [ {{ article.comments_count }} ]</span>
            </div>
          </td>
          <td>{{ article.user.username }}</td>
          <td>{{ formatDate(article.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';

const store = useCounterStore();
const router = useRouter();

// 검색 쿼리 상태
const searchQuery = ref('');

// 검색 필터링된 게시글
const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) {
    return orderedArticles.value;
  }
  return orderedArticles.value.filter((article) => {
    const query = searchQuery.value.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.user.username.toLowerCase().includes(query)
    );
  });
});

// No. 값 재정렬: 최신 게시글이 상단에 위치
const orderedArticles = computed(() =>
  store.articles.slice().reverse()
);

// 날짜 형식 변환 함수
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // AM/PM 제거
  };
  return new Date(date).toLocaleString('en-US', options).replace(',', '');
};

// 상세 페이지로 이동 함수
const goToArticleDetail = (id) => {
  router.push(`/articles/${id}`);
};
</script>

<style scoped>
/* 자유게시판 외부 컨테이너 스타일 */
.board-container {
  width: 100%; /* 가로 크기 설정: 필요에 따라 100% 또는 고정값 사용 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 20px; /* 내부 여백 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
}

/* 검색 창 스타일 */
.search-container {
  margin-bottom: 20px;
  display: flex; /* 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
}

.search-icon {
  margin-right: 10px; /* 아이콘과 입력창 사이에 여백 추가 */
  font-size: 1.7rem;

}

.search-input {
  width: 80%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #666;
}

/* 테이블 스타일 */
.article-table {
  width: 100%; /* 부모 컨테이너의 너비에 맞게 설정 */
  table-layout: fixed; /* 고정 테이블 레이아웃 */
  border-collapse: collapse;
  margin: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 테이블 셀 스타일 */
.article-table th,
.article-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  word-break: break-word; /* 긴 글 자동 줄바꿈 */
}

/* 제목 셀 스타일: 텍스트 잘림 처리 */
.title-cell {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* 긴 글 줄임표 처리 */
}

/* 테이블 헤더 스타일 */
.article-table th {
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
  font-size: large;
}

/* 테이블 행 스타일 */
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.clickable-row:hover {
  background-color: #f1f1f1; /* 행 호버 색상 */
}
</style>
