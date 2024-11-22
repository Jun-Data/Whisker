<template>
    <div class="container">
      <h3>3개의 선택지 중 하나를 선택해</h3>
      <h1>나는 여행을 좋아해 지금 당장 여행을 떠나고 싶어!</h1>
  
      <div class="options">
        <!-- 상 : 소득 수준 -->
        <div
          class="option"
          :class="{ active: selected === 1 }"
          @click="selectOption(1)"
        >
          <p>"내가 가진 자산으로 고양이를 위한 럭셔리 여행 준비 완료!"</p>
        </div>
          <!-- 하 : 소득 수준 -->

        <div
          class="option"
          :class="{ active: selected === 2 }"
          @click="selectOption(2)"
        >
          <p>"지금은 자금이 없지만 작은 저축으로라도 고양이와의 모험을 시작할 수 있어!"</p>
        </div>
          <!-- 중 : 소득 수준 -->

        <div
          class="option"
          :class="{ active: selected === 3 }"
          @click="selectOption(3)"
        >
          <p>"매달 조금씩 모으며 고양이와의 행복한 여행을 준비할 거야!"</p>
        </div>
      </div>
  
      <!-- 다음 문제로 넘어가는 버튼 -->
      <div class="next-btn">
        <button @click="goToNextQuestion">
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
    const storedSelection = localStorage.getItem('selectedOption1');
    if (storedSelection) {
      selected.value = parseInt(storedSelection); // 문자열을 숫자로 변환하여 설정
    }
  });
  
  // 선택된 옵션을 설정하는 함수
  const selectOption = (option) => {
    selected.value = option; // 클릭한 옵션을 활성화
    localStorage.setItem('selectedOption1', option); // 로컬 스토리지에 저장
  
    // 가중치 반영
    if (option) {
    weights.value.earn = weightMapping.earn[option]; // 'earn'에 해당하는 가중치 저장
  }
};


  // 2번 문제로 넘어가는 함수
  const goToNextQuestion = () => {
    if (selected.value) {
      localStorage.setItem('selectedOption1', selected.value); // 선택한 값 저장
      // 선택된 값이 있을 때만 이동
      router.push({ name: 'Game_2' });
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
  
  button:hover {
    background-color: #007bff;
    color: white;
  }
  </style>
  