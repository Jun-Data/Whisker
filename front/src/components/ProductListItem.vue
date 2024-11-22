
<template>
  <tr class="product-item" @click="router.push({name: 'ProductDetailView', params: {productId: product.id}})">
    <td>{{ product.type === 'deposit' ? '예금' : '적금' }}</td>
      <td>{{ product.kor_co_nm }}</td>     
      <td>{{ product.fin_prdt_nm }}</td>
      <td>{{ product.intr_rate_type_nm }}</td>
      <td>{{ product.intr_rate }}</td>
      <td>{{ product.intr_rate2 }}</td>
      <td>{{ product.save_trm }}개월</td>
  </tr>
</template>

<script setup>
  defineProps({
    product: Object
  })
  import router from '@/router';
  
</script>

<style scoped>
td {
  padding: 5px;
  
}
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
  text-align: center;
  
}

.product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px; /* 간격 조정 */
  font-size: 1rem;
}

.product-info span {
  text-align: left;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 */
  overflow: hidden; /* 길면 숨기기 */
  text-overflow: ellipsis; /* 텍스트 말줄임 표시 */
}

.type {
  flex: 1 1 10%; /* 고정된 비율로 너비 설정 */
}

.company {
  flex: 1 1 20%;
}

.name {
  flex: 2 1 30%;
}

.rate-type,
.rate {
  flex: 1 1 10%;
}

.term {
  flex: 1 1 10%;
  text-align: right; /* 오른쪽 정렬 */
}
</style>
