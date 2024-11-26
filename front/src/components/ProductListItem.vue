<template>
  <tr class="product-item" @click="router.push({name: 'ProductDetailView', params: {productId: product.id}})">
    <td>{{ product.type === 'deposit' ? '예금' : '적금' }}</td>
    <td>{{ product.kor_co_nm }}</td>
    <td>{{ product.fin_prdt_nm }}</td>
    <td>{{ product.intr_rate_type_nm }}</td>
    <td>{{ product.intr_rate }}%</td>
    <td>{{ product.intr_rate2 }}%</td>
    <td>{{ product.save_trm }}개월</td>
  </tr>
</template>

<script setup>
  defineProps({
    product: Object
  });
  import router from '@/router';
</script>

<style scoped>
/* 각 행 스타일 */
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  text-align: center;
}

.product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-item td {
  padding: 12px 16px;
  text-align: center;
  vertical-align: middle;
  font-size: 1rem;
  color: #333;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 */
  overflow: hidden; /* 긴 텍스트 숨기기 */
  text-overflow: ellipsis; /* 텍스트 말줄임 표시 */
}

</style>
