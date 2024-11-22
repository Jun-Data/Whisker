<template>
  <div>
    <h1>{{ store.user }} 님의 프로필 페이지</h1>
    <div v-for="(value,key) in store.userData" :key="key">
      <div v-if="key !=='pk'">
        <p>{{ key }} : {{ value }}</p>
      </div>     
    </div>
    <button @click="router.push({name: 'ProfileUpdateView'})">수정하기</button>
    <br><br><br>
    <h2>가입한 상품</h2>
    <div v-for="product in userProducts">
      {{ product.fin_prdt_nm }}
    </div>
    
    <br><br><br>
    <h2>가입한 상품 금리</h2>
    <Bar 
    :options="chartOptions"
    :data="chartData"
    />
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'; // store 가져오기
import { ref, onMounted, computed } from 'vue'; // ref와 onMounted 가져오기
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const store = useCounterStore();
const userProducts = ref([])
const router = useRouter()

onMounted(()=>{
  store.getUser()
  axios({
    method: 'get',
    url: `${store.API_URL}/accounts/${store.userData.pk}/products/`
  })
  .then(res => {
    userProducts.value = res.data
    console.log(userProducts.value)
  })
})



// 차트
const chartData = computed(() => {
  const labels = userProducts.value.map(e => e.fin_prdt_nm)
  const datasets = [
    {
      data: userProducts.value.map(e => e.intr_rate),
      label: '저축금리',
      backgroundColor: 'skyblue'
    },
    {
      data: userProducts.value.map(e => e.intr_rate2),
      label: '우대금리',
      backgroundColor: 'pink'
    },
  ]
  return {labels, datasets}
})
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true, // 범례 표시
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Y축 0부터 시작
      title: {
        display: true,
        text: '금리(%)',
      },
    },
    x: {
      title: {
        display: true,
        text: '상품 이름',
      },
    },
  },
}
</script>

<style scoped>
/* 스타일 추가 */
</style>
