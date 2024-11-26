<template>
  <div class="product-container">
    <h1 class="page-title">예적금 상품 조회</h1>

    <!-- 검색 입력창 -->
    <div class="search-container">
      <font-awesome-icon icon="magnifying-glass" class="search-icon"/>
      <input
        type="text"
        v-model="keyword"
        placeholder="상품명을 입력하세요"
        class="search-input"
        @input="filterProducts"
      />
    </div>

    <!-- 상품 목록 -->
    <div v-if="store.products.length > 0">
      <p class="product-count">
        총 <span class="count">{{ store.productCount }}</span>건
      </p>

      <div class="product-list">
        <ProductList :products="store.currentProducts" />
      </div>

      <!-- 페이지네이션 -->
      <div class="pagination">
        <button @click="store.currentPage--" v-if="store.currentPage > 1" class="page-btn"><font-awesome-icon icon="angles-left" /></button>
        <span class="page-info">{{ store.currentPage }} / {{Math.round(store.totalPages)}}</span>
        <button @click="store.currentPage++" v-if="store.currentPage < store.totalPages" class="page-btn"><font-awesome-icon icon="angles-right" /></button>
      </div>
    </div>

    <!-- 상품이 없을 경우 -->
    <div v-else>
      <p>상품이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import ProductList from '@/components/ProductList.vue';
import { ref, onMounted } from 'vue';

const store = useProductStore();
const keyword = ref('');

// 상품 필터링 함수
const filterProducts = () => {
  if (keyword.value) {
    store.filterProducts(keyword.value);
    store.currentPage = 1; // 페이지를 1로 초기화
  } else {
    store.products = store.PRODUCTS;
  }
};

onMounted(() => {
  if (store.products.length === 0) store.getProducts();
});
</script>

<style scoped>
h1 {
  font-weight: 700; /* 글자 두께를 더 두껍게 */
  font-size: 2rem; /* 글자 크기 설정 */
}

/* 전체 컨테이너 스타일 */
.product-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* 페이지 제목 */
.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

/* 검색창 스타일 */
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-icon {
  margin-right: 10px;
  font-size: 1.7rem;
}

.search-input {
  width: 70%;
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

/* 상품 개수 스타일 */
.product-count {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.count {
  font-weight: bold;
}

/* 상품 목록 스타일 */
.product-list {
  margin-bottom: 20px;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.page-btn {
  padding: 5px 15px;
  font-size: 1rem;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.page-btn:hover {
  background-color: #e0e0e0;
}

.page-info {
  margin: 0 15px;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
