<template>
  <div class="content-wrapper">
    <!-- 상단 문구 영역 -->
    <div class="header-section">
      <div class="headline-1">
        당신만을 위한 맞춤 금융 <span class="whisker-font">Whisker</span>
      </div>
      <div class="headline-2">
        모든 사용자들의 편리하고 안전한 금융 생활을 위스커가 함께합니다!
      </div>
    </div>
  </div>

  <!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide" data-swiper-autoplay="2000"><img src="@/assets/article.png" alt="슬라이더 이미지" class="swiper-image"/></div>
    <div class="swiper-slide"> <img src="@/assets/rec.png" alt="슬라이더 이미지" class="swiper-image"/></div>
    <div class="swiper-slide"><img src="@/assets/cal.png" alt="슬라이더 이미지" class="swiper-image"/></div>
  </div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>
</div>

  <!-- 카드 섹션 -->
  <div class="cards-section">
    <div class="card">
      <h3>금융상품에 대한 이야기를 공유해보세요!</h3>
      <RouterLink :to="{ name: 'ArticleView' }" ><button>더 알아보기</button></RouterLink>
    </div>
    <div class="card">
      <h3>게임을 플레이하고 금융 상품을 추천 받아 보세요!</h3>
      <RouterLink :to="{ name: 'RecView' }" ><button>더 알아보기</button></RouterLink>
    </div>
    <div class="card">
      <h3>내 주변 혹은 원하는 지역의 은행을 검색해보세요!</h3>
      <RouterLink :to="{ name: 'MapView' }" ><button>더 알아보기</button></RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

onMounted(() => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, EffectCoverflow], // EffectCoverflow 모듈 추가
    direction: 'horizontal',
    effect: 'coverflow', // coverflow 효과 설정
    coverflowEffect: {
      rotate: 50, // 슬라이드 회전 각도 설정 (기본 50도)
      stretch: 10, // 슬라이드 간 간격 설정 (슬라이드가 겹치지 않게)
      depth: 200, // 슬라이드가 겹치는 정도
      modifier: 1, // 회전 효과 강도
      slideShadows: true, // 그림자 효과 활성화
    },
    speed: 800, // 전환 속도 설정 (기본값은 300ms)
    loop: true, // 루프 설정
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 50, // 슬라이드 간 간격을 넓게 설정
    slidesPerView: 'auto', // 여러 슬라이드를 동시에 보이게 설정
    centeredSlides: true, // 슬라이드가 중앙에 위치하도록 설정
    grabCursor: true, // 커서가 손 모양으로 변경되어 슬라이드를 쉽게 드래그할 수 있도록
  });

  // GSAP 애니메이션
  gsap.fromTo(
    '.headline-1',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.5, delay: 0.01 }
  );

  gsap.fromTo(
    '.headline-2',
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8, delay: 0.7 }
  );
});
</script>

<style scoped>
/* 전체 콘텐츠 Wrapper 스타일 */
.content-wrapper {
  padding: 0 20px;
  background-color: #ffffff;
  overflow: hidden;
}

/* 상단 문구와 슬라이더 영역 */
.header-section {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px; /* 상단 문구의 여백 확보 */
}

/* 상단 헤드라인 스타일 */
.headline-1 {
  font-size: 4rem;
  font-family: sans-serif;
  font-weight: 700;
  color: black;
  margin-bottom: 10px;
}

.headline-2 {
  font-size: 1.5rem;
  font-family: sans-serif;
  font-weight: 545;
  color: black;
}

/* Whisker 스타일 */
.whisker-font {
  font-family: cursive; /* 원하는 폰트로 변경 */
  color: #6751b1;  /* 원하는 색상 */
}

/* 이미지 크기 설정 */
.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 1200px;
  height: 620px;
  transform-style: preserve-3d; /* Cube 효과를 위한 3D 변환을 허용 */
}

.swiper-button-prev, .swiper-button-next {
  color: #6751b1; /* 원하는 색상으로 설정 */
}

.swiper {
  --swiper-pagination-color: #6751b1; /* 기본 색상 */
}


/* 카드 섹션 */
.cards-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 60px; /* 카드 섹션과 슬라이더 사이에 충분한 여백 추가 */
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* 카드 섹션 중앙 정렬 */
  position: relative;
  z-index: 1; /* 카드 섹션이 슬라이더 아래로 위치하도록 설정 */
}

/* 카드 스타일 */
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  justify-content: space-between; /* 글자와 버튼 간격 일정하게 조정 */
  height: 100%;
}

.card:hover {
  transform: translateY(-10px);
}

.card h3 {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.card button {
  padding: 10px 15px;
  background-color: #2c2e88;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto; /* 버튼을 카드 하단에 위치시킴 */
}

.card button:hover {
  background-color: #585bd6;
}
</style>
