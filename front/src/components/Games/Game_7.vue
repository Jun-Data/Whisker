<template>
    <div class="container">
      <h6>3개의 선택지 중 하나를 선택해주세요</h6>
      <h1>나는 가지고 싶은게 많아! 요즘은 제태크가 필수라는데? </h1>
      <div class="options">
        <!-- 중 : 금융 지식  -->
        <div class="option" :class="{ active: selected === 1 }" @click="selectOption(1)">
          <p>"이것 저것 하고는 있지만 더 알아보고 싶어!"</p>
        </div>
        
        <!-- 하  -->
        <div class="option" :class="{ active: selected === 2 }" @click="selectOption(2)">
          <p>"아직 제태크에 대해 잘 알지는 못하지만 알아보고 가입할 준비가 되어있어!"</p>
        </div>
        
        <!-- 상  -->
        <div class="option" :class="{ active: selected === 3 }" @click="selectOption(3)">
          <p>"나는 제태크에 관심이 많아서 이미 혜택을 고려한 복합적인 상품까지 선택할 수 있어!"</p>
        </div>
      </div>
  
  <div class="icon-button">
      <!-- 이전 문제로 가는 버튼 -->
      <font-awesome-icon :icon="['fas', 'circle-left']" @click="goToPreviousQuestion"/>
    </div>
  </div>

</template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRouter } from 'vue-router';
  
  const selected = ref(null); // 선택된 옵션을 추적
  const router = useRouter(); // 라우터 인스턴스 가져오기

  // 부모에서 제공된 가중치 매핑과 선택된 값 가져오기
  const weightMapping = inject('weightMapping'); // 부모에서 제공된 가중치 매핑
  const weights = inject('weights'); // 부모에서 제공된 선택된 가중치 객체

  // 페이지가 로드될 때 로컬 스토리지에서 선택된 값을 불러오기
  onMounted(() => {
    const storedSelection = localStorage.getItem('selectedOption7');
    if (storedSelection && weights.value.know!==null) { // 로컬 스토리지 값이 유효한지 확인
      selected.value = parseInt(storedSelection); // 문자열을 숫자로 변환하여 설정  // 유효하면 값 설정
    } else {
      // 유효하지 않으면 로컬 스토리지 초기화
      selected.value = null;
      localStorage.removeItem('selectedOption7');
    }
  });
  
  // 선택된 옵션을 설정하는 함수
  const selectOption = (option) => {
    if (selected.value === option) { // 이미 선택된 옵션을 다시 클릭하면 선택 취소
      selected.value = null
      localStorage.removeItem('selectedOption7')  // 선택 취소 시 로컬 스토리지에서 제거
      weights.value.know = null; // 가중치도 초기화
    } else {
      selected.value = option; // 클릭한 옵션을 활성화
      localStorage.setItem('selectedOption7', option); // 로컬 스토리지에 저장
      // 가중치 반영
      if (option) {
      weights.value.know = weightMapping.know[option]; // 'know'에 해당하는 가중치 저장
    }
  }
};
  
  // 이전 문제로 돌아가는 함수
  const goToPreviousQuestion = () => {
    localStorage.setItem('selectedOption7', selected.value); // 선택한 값 저장
    router.push({ name: 'Game_6' }); // 'Game_6' 라우트로 이동
  }
</script>

<style scoped>
/* 전체 컨테이너 */
.container {
  text-align: center;
  padding: 20px;
  min-height: 50vh; /* 화면의 최소 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상, 중, 하로 공간 분배 */
}

/* 선택지 스타일 */
.options {
  display: flex;
  gap: 35px; /* 선택지 간 간격 */
  justify-content: center; /* 가운데 정렬 */
  margin: 40px 0; /* 위아래 간격 */
  flex: 1; /* 남는 공간을 차지하도록 설정 */
}

.option {
  padding: 10px 5px;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.2rem; /* 글씨 크기 */
  font-weight: bold; /* 텍스트 굵기 */
  width: 40%;
  text-align: center; /* 텍스트 중앙 정렬 */
  min-height: 70px; /* 선택지의 최소 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.option.active {
  background-color: #6a669d;
  color: white;
  transform: scale(1.1); /* 선택된 옵션 확대 */
}

.option:hover {
  background-color: #6a669d;
  color: white;
  transform: scale(1.05); /* hover 시 살짝 확대 */
}

/* 아이콘 버튼 스타일 */
.icon-button {
  font-size: 2.7rem; /* 아이콘 크기 */
  cursor: pointer; /* 클릭 가능한 포인터 스타일 */
  color: #6a669d; /* 기본 색상 */
  transition: transform 0.2s, color 0.2s ease;
}

.icon-button:hover {
  transform: scale(1.2); /* 호버 시 크기 확대 */
  color: #423c9b; /* 호버 시 색상 변경 */
}

.icon-button:active {
  transform: scale(0.9); /* 클릭 시 크기 축소 */
  color: #2a247b; /* 클릭 시 색상 변경 */
}
</style>
