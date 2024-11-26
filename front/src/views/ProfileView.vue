<template>
  <div class="profile-container">
    <h1>{{ store.user }} 님의 프로필 페이지</h1>
    
    <div class="profile-details">
      <!-- 프로필 이미지 -->
      <img :src="maxwell" alt="profile" class="profile-img">
      
      <!-- 프로필 정보 -->
      <div class="profile-content">
        <p><span>Username:</span> <span>{{ store.userData.username }}</span></p>
        <p><span>Email:</span> <span>{{ store.userData.email }}</span></p>
        <p><span>Nickname:</span> <span>{{ store.userData.nickname }}</span></p>
        <p><span>First Name:</span> <span>{{ store.userData.first_name }}</span></p>
        <p><span>Last Name:</span> <span>{{ store.userData.last_name }}</span></p>
        <p><span>Age:</span> <span>{{ store.userData.age }}</span></p>
      </div>

      <!-- 프로필 수정 버튼 -->
      <div class="profile-actions">
        <button @click="router.push({name: 'ProfileUpdateView'})">수정하기</button>
      </div>
    </div>

    <div class="product-section">
      <h2>관심있는 상품</h2>
      <div v-for="product in userProducts" :key="product.id" class="product-item">
        <p>{{ product.fin_prdt_nm }}</p>
      </div>

      <h2> 상품 금리</h2>
      <Bar :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'; // store 가져오기
import { ref, onMounted, computed } from 'vue'; // ref와 onMounted 가져오기
import axios from 'axios';
import maxwell from '@/assets/maxwell.gif'
import { useRouter } from 'vue-router';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useCounterStore();
const userProducts = ref([]);
const router = useRouter();

onMounted(() => {
  store.getUser();
  axios({
    method: 'get',
    url: `${store.API_URL}/accounts/${store.userData.pk}/products/`
  })
  .then(res => {
    userProducts.value = res.data;
  })
})

// 차트 데이터
const chartData = computed(() => {
  const labels = userProducts.value.map(e => e.fin_prdt_nm);
  const datasets = [
    {
      data: userProducts.value.map(e => e.intr_rate),
      label: '저축금리',
      backgroundColor: 'skyblue',
    },
    {
      data: userProducts.value.map(e => e.intr_rate2),
      label: '우대금리',
      backgroundColor: 'pink',
    },
  ];
  return { labels, datasets };
});

// 차트 옵션
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
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
      beginAtZero: true,
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
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.profile-img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border: 3px solid #ddd;
}

.profile-content {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
}

.profile-content p {
  font-size: 1rem;
  margin-bottom: 12px;
}

.profile-content span {
  font-weight: bold;
}

.profile-actions {
  text-align: center;
}

button {
  background-color: #6A669D;
  color: white;
  padding: 12px 25px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);}

.product-section {
  margin-top: 30px;
}

.product-item {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.product-item p {
  font-size: 1.1rem;
  font-weight: bold;
}

h2 {
  font-size: 1.5rem;
  margin-top: 20px;
  color: #333;
}
</style>
