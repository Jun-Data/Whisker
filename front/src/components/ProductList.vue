<template>
  <div>
    <table class="container">
      <thead>
        <tr>
          <th>유형</th>
          <th>금융회사명</th>
          <th>상품명</th>
          <th>금리유형</th>
          <th>금리<button @click="runSort('intr')">{{ descInterest > 0 ? '▼' : '▲' }}</button></th>
          <th>최고우대금리<button @click="runSort('intr2')">{{ descInterest2 > 0 ? '▼' : '▲' }}</button></th>
          <th>가입기간<button @click="runSort('term')">{{ descTerm > 0 ? '▼' : '▲' }}</button></th>
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
  })
  import { ref } from 'vue';
  import ProductListItem from './ProductListItem.vue';
  import { useProductStore } from '@/stores/product';
  const store = useProductStore()
  const descInterest = ref(1)
  const descInterest2 = ref(1)
  const descTerm = ref(1)
  
  const runSort = (col) => {
    if (col === 'intr') {
      store.sortProducts(col, descInterest)
      descInterest.value *= -1
      // console.log(descInterest.value)
    }
    if (col === 'intr2') {
      store.sortProducts(col, descInterest2)
      descInterest2.value *= -1
      // console.log(descInterest.value)
    }
    else if (col === 'term') {
      store.sortProducts(col, descTerm)
      descTerm.value *= -1
    }
    
  }
</script>

<style scoped>
  .container{
    text-align: center;
    margin: 0 auto;
  }
</style>