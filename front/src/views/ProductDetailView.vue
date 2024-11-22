<template>
  <div>
    <h1>상품 상세 페이지</h1>
    <div v-if="product">

      <p>{{ product.type }}</p>
      <p>{{ product.kor_co_nm }}</p>
      <p>{{ product.fin_prdt_nm }}</p>
      <p>{{ product.etc_note }}</p>
      <p>{{ product.join_member }}</p>
      <p>{{ product.join_way }}</p>
      <p>{{ product.max_limit }}</p>
      <p>{{ product.spcl_cnd }}</p>
      <hr>
      <p>{{ product.intr_rate_type_nm }}</p>
      <p>{{ product.intr_rate }}</p>
      <p>{{ product.intr_rate2 }}</p>
      <p>{{ product.save_trm }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  import { useProductStore } from '@/stores/product';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  const route = useRoute()
  const store = useProductStore()
  const product = ref(null)

  onMounted(() => {
    axios({
      method: 'get',
      url: `${store.API_URL}/api/v1/finlife/products/${route.params.productId}/`
    })
    .then(res => {
      console.log(res.data)
      product.value = res.data
      
    })
    .catch(err => console.log(err))
  })
  
</script>

<style scoped>
  
</style>