<template>
  <div class="product-item" @click="router.push({name: 'ProductDetailView', params: {productId: product.id}})">
    <div class="product-header">
      <span id="company-name">{{ product.kor_co_nm }}</span>
      <span id="product-name">{{ product.fin_prdt_nm }}</span>
    </div>
    <div class="product-details">
      <span>{{ product.type === 'deposit' ? '예금' : '적금' }}</span>
      <span>{{ product.intr_rate_type_nm }}</span>
      <span>금리 {{ product.intr_rate }}%</span>
      <span>최고우대금리 {{ product.intr_rate2 }}%</span>
      <span>가입기간 {{ product.save_trm }}개월</span>
    </div>
  </div>
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
  /* display: flex; */
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
.product-header {
  display: flex;
  justify-content: center;
  
}
.product-details {
  display: flex;
  justify-content: space-evenly;
  margin: 0 10px;

}
.product-details span {
  margin: 0 10px;

}
.product-header #product-name {
  
  font-weight: bold;
  margin-left: 10px;
  font-size: larger;
}
.product-header #company-name {
  /* font-weight: bold;
  margin-left: 10px; */
  font-size: larger;
}
.product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.product-item {
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