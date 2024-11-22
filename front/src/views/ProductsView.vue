<template>
  <div>
    <h1>예적금 상품 조회</h1>

    <section class="container">
      <div class="query">
        <form @submit.prevent="filterProducts">
          <input type="text" v-model="keyword">
          <input type="submit">
        </form>
      </div>
      <p>총 <span style="font-weight: bold;">{{ store.productCount }}</span>건</p>
      <ProductList
      :products="currentProducts"
       />
      <div>
        <button @click="currentPage--" v-if="currentPage > 1"><<</button>
        <button @click="currentPage++" v-if="currentPage < totalPages">>></button>
      </div>
    </section>
    
  </div>
</template>

<script setup>
  import { useProductStore } from '@/stores/product';
  import ProductList from '@/components/ProductList.vue';
  import { onMounted } from 'vue';
  import { ref, computed } from 'vue';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
  const store = useProductStore()
  const keyword = ref(null)
  const filterProducts = () => {
    if (keyword.value){
      store.filterProducts(keyword.value)
      currentPage.value = 1

    }
    else {
      store.products = store.PRODUCTS
    }
  }

  // pagination
  const productsPerPage = 10
  const currentPage = ref(1)
  const totalPages = computed(() => {
    return store.productCount / productsPerPage
  })
  const startIndex = computed(() => {
    return (currentPage.value - 1) * productsPerPage
  })
  const endIndex = computed(() => {
    return startIndex.value + productsPerPage
  })
  const currentProducts = computed(() => {
    return store.products.slice(startIndex.value, endIndex.value)
  })
  

  onMounted(() => {
    store.getProducts()
  })

  
</script>

<style scoped>
.container{
  text-align: center;
  margin: auto;
}
  
</style>