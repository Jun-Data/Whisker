<template>
    <div class="container">
      <h3>3개의 선택지 중 하나를 선택해</h3>
      <h1>나를 위해 얼마나 위험을 감수 할 수 있어?</h1>
  
      <div class="options">
        <!-- 하 : 리스크 위험 수용 성향 -->
        <div class="option" :class="{ active: selected === 1 }" @click="selectOption(1)">
          <p>위험은 싫어요. 고정금리로 안정적인 이자만 받으면 그만입니다.</p>
        </div>
  
        <!-- 중 -->
        <div class="option" :class="{ active: selected === 2 }" @click="selectOption(2)">
          <p>위험을 감수해도 괜찮아요. 조금 더 높은 수익을 원하지만, 위험은 적당히 감수할 수 있죠.</p>
        </div>
  
        <!-- 상 -->
        <div class="option" :class="{ active: selected === 3 }" @click="selectOption(3)">
          <p>어떤 상품이든 도전해보고 싶어요! 높은 리스크가 있는 투자도 감수할 준비가 되어 있어요!</p>
        </div>
      </div>
  
      <!-- 버튼들 -->
      <div class="buttons">
        <!-- 이전 문제로 가는 버튼 -->
        <button @click="goToPreviousQuestion" class="prev-btn">
          이전 문제로 돌아가기
        </button>
  
        <!-- 다음 문제로 넘어가는 버튼 -->
        <button @click="goToNextQuestion" :disabled="!selected" class="next-btn">
          다음 문제로 넘어가기
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const selected = ref(null); // 선택된 옵션을 추적
  const router = useRouter(); // 라우터 인스턴스 가져오기

     // 페이지가 로드될 때 로컬 스토리지에서 선택된 값을 불러오기
     onMounted(() => {
    const storedSelection = localStorage.getItem('selectedOption3');
    if (storedSelection) {
      selected.value = parseInt(storedSelection); // 문자열을 숫자로 변환하여 설정
    }
  });
  
  // 선택된 옵션을 설정하는 함수
  const selectOption = (option) => {
    selected.value = option; // 클릭한 옵션을 활성화
  }
  
  // 이전 문제로 돌아가는 함수
  const goToPreviousQuestion = () => {
    localStorage.setItem('selectedOption3', selected.value); // 선택한 값 저장
    router.push({ name: 'Game_2' }); // 'Game_2' 라우트로 이동
  }
  
  // 다음 문제로 넘어가는 함수
  const goToNextQuestion = () => {
    if (selected.value) {
      localStorage.setItem('selectedOption3', selected.value); // 선택한 값 저장
      router.push({ name: 'Game_4' }); // 'Game_3' 라우트로 이동
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
  