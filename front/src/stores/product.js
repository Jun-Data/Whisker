import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useCounterStore } from './counter'
export const useProductStore = defineStore('product', () => {
  const API_URL = 'http://127.0.0.1:8000'

  const counterStore = useCounterStore()
  const products = ref([])
  const PRODUCTS = ref([])
  const userProducts = computed(() => {
    if (!counterStore.isLogin) return []
    return counterStore.userData.products
  })

  const productCount = computed(() => {
    return products.value.length
  })


  const getProducts = () => {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/finlife/products/`,

    })
    .then(res=> {
      PRODUCTS.value = res.data
      products.value = res.data
    })
    .catch(err => {
      console.error(err)
    })
  }

  const filterProducts = (keyword) => {
    console.log(keyword.value)
    products.value = Object.values(PRODUCTS.value).filter(e =>
        e.type.includes(keyword) ||
        e.kor_co_nm.includes(keyword) ||
        e.fin_prdt_nm.includes(keyword))
    }

  const sortProducts = (col, desc) => {
    if (col === 'intr') {
        products.value.sort((a, b) => {
        return (a.intr_rate - b.intr_rate) * desc.value;
      })
    }
    else if (col === 'intr2') {
        products.value.sort((a, b) => {
        return (a.intr_rate2 - b.intr_rate2) * desc.value;
      })
    }
    else if (col === 'term') {
        products.value.sort((a, b) => {
        return (a.save_trm - b.save_trm) * desc.value;
      })
    }
  }

  return { 
    API_URL,  products, productCount, PRODUCTS, userProducts,
    getProducts, filterProducts, sortProducts
   }
}, {persist: true})