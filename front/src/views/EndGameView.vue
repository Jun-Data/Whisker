<template>
  <div class="end-game-container">
    <h1 class="game-result-title"><font-awesome-icon icon="gamepad" /> 게임 결과</h1>

    <h2 class="user-message"> <span style="font-size: xx-large; color: #6A669D;" >{{ userdata.userData.username }}</span> 님의 성향에 맞춘 금융 추천 상품 <font-awesome-icon :icon="['fas', 'gifts']" /></h2> 

    <div class="product-list-container">
      <RecommededProductItem :product="store.recommededProduct" />
    </div>
    <img :src="ttabong" alt="cattabong">
    <div class="restart-container">
      <h5>다시 해보시겠습니까?</h5>
      <RouterLink @click="resetGame" to="/game/1" class="button restart-button">
        게임 다시하기
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
// import ProductListItem from '@/components/ProductListItem.vue';
import RecommededProductItem from '@/components/RecommededProductItem.vue';
import { useCounterStore } from '@/stores/counter';
import ttabong from '@/assets/ttabong.jpg';

const router = useRouter();
const store = useProductStore();
const userdata = useCounterStore();

// 게임 초기화 함수
const resetGame = () => {
  for (let i = 1; i <= 7; i++) {
    localStorage.removeItem(`selectedOption${i}`);
  }
  router.push('/game/1');
};
</script>

<style scoped>
img {
  width: 10%; /* 부모 컨테이너의 30% 크기로 설정 */
  height: auto; /* 비율을 유지하면서 높이 자동 조정 */
}
/* 전체 게임 결과 페이지 스타일 */
.end-game-container {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background-color: #f7f8fa;
  padding: 30px 20px;
  animation: fadeIn 1s ease-in-out;
}

/* 제목 스타일 */
.game-result-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

/* 사용자 맞춤 메시지 스타일 */
.user-message {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 30px;
  animation: slideIn 1s ease-out;
}

/* 상품 리스트 컨테이너 스타일 */
.product-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  animation: zoomIn 0.8s ease-out;
}

/* 버튼 컨테이너 스타일 */
.restart-container {
  margin-top: 20px;
  font-size: 1.2rem;
}

/* 게임 다시하기 버튼 스타일 */
.restart-button {
  background-color: #35aebe;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 10px 30px;
  margin-top: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.restart-button:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* 버튼 클릭 효과 */
.restart-button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 애니메이션 추가 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
