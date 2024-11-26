<template>
  <div class="product-table-container">
    <table class="product-table">
      <thead>
        <tr>
          <th>유형</th>
          <th>금융회사명</th>
          <th>상품명</th>
          <th>금리유형</th>
          <th>금리
            <button class="sort-button" @click="runSort('intr')">
              {{ descInterest > 0 ? '▼' : '▲' }}
            </button>
          </th>
          <th>최고우대금리
            <button class="sort-button" @click="runSort('intr2')">
              {{ descInterest2 > 0 ? '▼' : '▲' }}
            </button>
          </th>
          <th>가입기간
            <button class="sort-button" @click="runSort('term')">
              {{ descTerm > 0 ? '▼' : '▲' }}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <ProductListItem
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  defineProps({
    products: Array
  });
  
  import { ref } from 'vue';
  import ProductListItem from './ProductListItem.vue';
  import { useProductStore } from '@/stores/product';
  
  const store = useProductStore();
  const descInterest = ref(1);
  const descInterest2 = ref(1);
  const descTerm = ref(1);
  
  const runSort = (col) => {
    if (col === 'intr') {
      store.sortProducts(col, descInterest);
      descInterest.value *= -1;
    } else if (col === 'intr2') {
      store.sortProducts(col, descInterest2);
      descInterest2.value *= -1;
    } else if (col === 'term') {
      store.sortProducts(col, descTerm);
      descTerm.value *= -1;
    }
  };
</script>

<style scoped>
/* 전체 테이블 컨테이너 스타일 */
.product-table-container {
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 테이블 스타일 */
.product-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  color: #333;
}

.product-table th {
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
}

.product-table tr:hover {
  background-color: #f1f1f1;
}

/* 정렬 버튼 스타일 */
.sort-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
}

.sort-button:hover {
  color: #000;
}

/* 셀 스타일 */
.product-table td {
  word-break: break-word;
}

/* 제목 셀 스타일 */
.product-table th,
.product-table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
