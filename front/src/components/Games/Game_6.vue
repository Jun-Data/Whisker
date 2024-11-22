<template>
    <div class="container">
      <h3>3개의 선택지 중 하나를 선택해</h3>
      <h1>나를 위한 간식이나 동물병원은 자주 바뀌어? </h1>
      <div class="options">
        <!-- 상 : 금융 상품 가입 및 변경 빈도  -->
        <div class="option" :class="{ active: selected === 1 }" @click="selectOption(1)">
          <p>"새로운 것들을 찾아봐야지! 새로운 맛과 경험을 찾는 게 중요하니까!"</p>
        </div>

        <!-- 하  -->
        <div class="option" :class="{ active: selected === 2 }" @click="selectOption(2)">
          <p>"한 번 정한 간식은 계속 유지하는 게 좋아. 안정적인 게 최고지!"</p>
        </div>
        
        <!-- 중  -->
        <div class="option" :class="{ active: selected === 3 }" @click="selectOption(3)">
          <p>"조금 고민해볼게...간식이 바뀔 때마다 조금씩 고민할 거야. 더 좋은 걸 찾을 수 있을지 모르니까!"</p>
        </div>
      </div>
    <!-- 버튼들 -->
    <div class="buttons">
      <!-- 이전 문제로 가는 버튼 -->
      <button @click="goToPreviousQuestion" class="prev-btn">
        이전 문제로 돌아가기
      </button>

      <!-- 다음 문제로 넘어가는 버튼 -->
      <button @click="goToNextQuestion" class="next-btn">
        다음 문제로 넘어가기
      </button>
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
    const storedSelection = localStorage.getItem('selectedOption6');
    if (storedSelection) {
      selected.value = parseInt(storedSelection); // 문자열을 숫자로 변환하여 설정
    }
  });
  
  // 선택된 옵션을 설정하는 함수
  const selectOption = (option) => {
    selected.value = option; // 클릭한 옵션을 활성화
    localStorage.setItem('selectedOption6', option); // 로컬 스토리지에 저장
  
  // 가중치 반영
  if (option) {
  weights.value.patience = weightMapping.patience[option]; // 'earn'에 해당하는 가중치 저장
}
  }
  
  // 이전 문제로 돌아가는 함수
  const goToPreviousQuestion = () => {
    localStorage.setItem('selectedOption6', selected.value); // 선택한 값 저장
    router.push({ name: 'Game_5' }); // 'Game_5' 라우트로 이동
  }
  
  // 다음 문제로 넘어가는 함수
  const goToNextQuestion = () => {
    if (selected.value) {
      localStorage.setItem('selectedOption6', selected.value); // 선택한 값 저장
      router.push({ name: 'Game_7' }); // 'Game_7' 라우트로 이동
    }
  }
  </script>
  
  <style scoped>
  /* 스타일 */
  .container {
    text-align: center;
    padding: 20px;
  }
  
  .options {
    display: flex;
    gap: 35px; /* 선택지 간 간격*/
    justify-content: center; /* 가운데 정렬 */
    margin-bottom: 40px; /* 선택지 다음 버튼 사이 간격*/
    margin-top: 40px; /* 선택지 문제 사이 간격*/
  }
  
  .option {
    padding: 12px 24px;
    background-color: #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 1.2rem; /* 글씨 크기 */
    font-weight: bold; /* 텍스트 굵기 */
    width: 30%;
  }


  .option.active {
    background-color: #28a745;
    color: white;
    transform: scale(1.1); /* 선택된 옵션 확대 */
  }
  
  .option:hover {
    background-color: #007bff;
    color: white;
    transform: scale(1.05); /* hover 시 살짝 확대 */
  }
  
  .buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center; /* 가운데 정렬 */
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }
  
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  .prev-btn {
    background-color: #ffc107;
  }
  
  .next-btn {
    background-color: #28a745;
    color: white;
  }
  
  button:hover {
    background-color: #007bff;
    color: white;
  }
  </style>