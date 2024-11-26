<template>
  <div class="rec-container">
    <!-- 타이틀 영역 -->
    <h1 class="title">금융 상품 추천 서비스</h1>
    <h3 class="subtitle">게임을 플레이하고 나에게 맞는 금융 상품을 추천받아보세요!</h3>
    
    <!-- 이미지 영역 -->
    <div class="image-container">
      <img :src="catspin" alt="Logo" class="main-image" />
    </div>
    
    <!-- 버튼 영역 -->
    <RouterLink :to="{ name: 'Game' }">
      <button class="play-button">
        <font-awesome-icon :icon="['fas', 'paw']" /> 게임 시작 !
      </button>
    </RouterLink>
  </div>

  <!-- 큰 박스 영역: 게임 준비 중 메시지 -->
  <div class="game-coming-soon-box">
    <h3 class="coming-soon-text">New Game Coming Soon...</h3>
    <p class="coming-soon-description">새로운 게임이 곧 출시될 예정입니다! 조금만 기다려 주세요!</p>
  </div>
</template>

<script setup>
import catspin from '@/assets/catspin.gif'; // 이미지 import
</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.rec-container {
  text-align: center;
  margin: 0 auto;
  padding: 40px 20px;
  max-width: 800px;
  background-color: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px; /* 금융 상품 추천 서비스와 새로운 박스 간의 여백 */
}

/* 타이틀 스타일 */
.title {
  font-size: 2.6rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* 이미지 컨테이너 스타일 */
.image-container {
  margin: 20px auto;
}

.main-image {
  width: 60%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #bcbdbb;
}
.main-image:hover {
  transform: scale(1.1); /* hover 시 확대 */
}

/* 버튼 스타일 */
.play-button {
  background-color: #585bd6;
  color: white;
  border: none;
  border-radius: 50px; /* 더 부드러운 버튼 모서리 */
  padding: 15px 35px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  margin-top: 30px;
}

.play-button:hover {
  background-color: #3134c7; /* hover 시 더 진한 색 */
  transform: scale(1.1); /* hover 시 살짝 확대 */
}

.play-button:active {
  transform: scale(0.95); /* 클릭 시 살짝 축소 */
}

/* 큰 박스 영역: 게임 준비 중 메시지 */
.game-coming-soon-box {
  margin-top: 40px;
  padding: 30px;
  background-color: #f3f3f3;
  border: 2px solid #dcdcdc;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.coming-soon-text {
  font-size: 2rem;
  font-weight: bold;
  color: #341781; /* 강조된 빨간색 */
  margin-bottom: 10px;
}

.coming-soon-description {
  font-size: 1.4rem;
  color: #666;
  line-height: 1.6;
  text-align: center;
}

.game-coming-soon-box:hover {
  transform: scale(1.05); /* hover 시 확대 효과 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* hover 시 그림자 더 강조 */
}
</style>
