<template>
  <div>
    <h1>상품 상세 페이지</h1>
    <div v-if="product">
      <div>
        <button v-if="counterStore.isLogin && !isInUserProducts" @click="addUserProduct(product)">담기</button>
        <button v-if="counterStore.isLogin && isInUserProducts" @click="removeUserProduct(product)">삭제</button>
      </div>
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
  import { ref, computed } from 'vue';
  import { onMounted } from 'vue';
  import { useProductStore } from '@/stores/product';
  import { useCounterStore } from '@/stores/counter';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const route = useRoute()
  const store = useProductStore()
  const counterStore = useCounterStore()
  const product = ref(null)
  const isInUserProducts = computed(() => {
    return store.userProducts.some(e => e === product.value?.id)
  })
  onMounted(() => {
    axios({
      method: 'get',
      url: `${store.API_URL}/api/v1/finlife/products/${route.params.productId}/`
    })
    .then(res => {
      product.value = res.data
    })
    .catch(err => console.log(err))
  })

  const addUserProduct = (prdt) => {
    axios({
      method: 'put',
      url: `${store.API_URL}/accounts/add/product/${counterStore.userData.pk}/`,
      data: {
        product: prdt,
      }
    })
    .then(res => {
      console.log(res.data)
      counterStore.getUser()
    })
    
  }

  const removeUserProduct = (prdt) => {
    axios({
      method: 'put',
      url: `${store.API_URL}/accounts/remove/product/${counterStore.userData.pk}/`,
      data: {
        product: prdt,
      }
    })
    .then(res => {
      console.log(res.data)
      counterStore.getUser()
    })
    
  }
  
  


</script>

<style scoped>
  
</style>